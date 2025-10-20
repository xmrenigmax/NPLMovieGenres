from http.server import BaseHTTPRequestHandler
import json
import os
import torch
from transformers import pipeline
from typing import List, Dict, Any

# Initialize models (they'll be cached between requests)
class MovieAnalyzer:
    def __init__(self):
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

    def analyze_movie_plot(self, plot: str) -> Dict[str, Any]:
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

class handler(BaseHTTPRequestHandler):
    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()
    
    def do_POST(self):
        try:
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            request_data = json.loads(post_data)
            
            plot = request_data.get('plot', '').strip()
            
            if len(plot) < 10:
                self.send_error(400, "Plot summary too short")
                return
                
            analysis = analyzer.analyze_movie_plot(plot)
            
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            self.wfile.write(json.dumps(analysis).encode())
            
        except Exception as e:
            self.send_error(500, f"Analysis failed: {str(e)}")