from http.server import BaseHTTPRequestHandler
import json
import os
import torch
from transformers import pipeline

class MovieAnalyzer:
    def __init__(self):
        # Models will be cached between requests
        self.genre_classifier = pipeline(
            "zero-shot-classification",
            model="facebook/bart-large-mnli"
        )
        
        self.emotion_analyzer = pipeline(
            "text-classification", 
            model="j-hartmann/emotion-english-distilroberta-base",
            top_k=None
        )
        
        self.text_generator = pipeline("text-generation", model="gpt2")
        
        self.genres = [
            "action", "comedy", "drama", "romance", "thriller", 
            "horror", "sci-fi", "mystery", "adventure", "fantasy", "crime"
        ]

    def analyze_movie_plot(self, plot: str):
        # Genre Prediction
        genre_result = self.genre_classifier(
            plot,
            candidate_labels=self.genres,
            multi_label=True
        )
        
        top_genres = []
        for label, score in zip(genre_result['labels'], genre_result['scores']):
            if score > 0.3 and len(top_genres) < 3:
                top_genres.append({"genre": label, "score": round(score, 3)})
        
        # Emotional Analysis
        emotion_results = self.emotion_analyzer(plot[:512])
        top_emotions = sorted(emotion_results[0], key=lambda x: x['score'], reverse=True)[:2]
        cleaned_emotions = [
            {"emotion": e['label'], "score": round(e['score'], 3)} 
            for e in top_emotions
        ]
        
        # Generate Tagline
        prompt = f"Create a catchy movie tagline for a film with this plot: {plot[:150]}\nTagline:"
        
        tagline_result = self.text_generator(
            prompt,
            max_new_tokens=20,
            num_return_sequences=1,
            temperature=0.85,
            do_sample=True,
            truncation=True,
            pad_token_id=50256
        )
        
        generated_text = tagline_result[0]['generated_text']
        tagline = generated_text.split("Tagline:")[-1].strip()
        tagline = self.clean_tagline(tagline)
        
        # Overall confidence
        if top_genres:
            avg_confidence = round((sum(g["score"] for g in top_genres) / len(top_genres)) * 100, 1)
        else:
            avg_confidence = 0.0
        
        return {
            "genres": top_genres,
            "emotions": cleaned_emotions,
            "tagline": tagline,
            "confidence": avg_confidence
        }
    
    def clean_tagline(self, tagline: str) -> str:
        tagline = tagline.replace('"', '').replace("'", "").strip()
        if '.' in tagline:
            tagline = tagline.split('.')[0] + '.'
        return tagline[0].upper() + tagline[1:] if tagline else "In a world..."

# Initialize analyzer (cached between requests)
analyzer = MovieAnalyzer()

def handler(request):
    try:
        # Handle CORS preflight
        if request.method == 'OPTIONS':
            return {
                'statusCode': 200,
                'headers': {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'POST, OPTIONS',
                    'Access-Control-Allow-Headers': 'Content-Type',
                },
                'body': json.dumps({'message': 'OK'})
            }
        
        if request.method == 'POST':
            body = json.loads(request.body)
            plot = body.get('plot', '').strip()
            
            if len(plot) < 10:
                return {
                    'statusCode': 400,
                    'headers': {
                        'Access-Control-Allow-Origin': '*',
                        'Content-Type': 'application/json',
                    },
                    'body': json.dumps({'error': 'Plot summary too short'})
                }
                
            analysis = analyzer.analyze_movie_plot(plot)
            
            return {
                'statusCode': 200,
                'headers': {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json',
                },
                'body': json.dumps(analysis)
            }
        else:
            return {
                'statusCode': 405,
                'headers': {
                    'Access-Control-Allow-Origin': '*',
                },
                'body': json.dumps({'error': 'Method not allowed'})
            }
            
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
            },
            'body': json.dumps({'error': f'Analysis failed: {str(e)}'})
        }