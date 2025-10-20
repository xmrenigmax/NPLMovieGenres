import React, { useState } from 'react';
import './App.css';

function App() {
  const [plot, setPlot] = useState('');
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

const analyzeMovie = async () => {
  if (!plot.trim()) {
    setError('Please enter a movie plot');
    return;
  }

  setLoading(true);
  setError('');
  
  try {
    // Simple environment detection
    const isLocalhost = window.location.hostname === 'localhost' || 
                        window.location.hostname === '127.0.0.1';
    
    const apiUrl = isLocalhost 
      ? 'http://localhost:8000/analyze-movie'
      : 'https://your-future-backend-url.vercel.app/api/analyze-movie'; // We'll update this later

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ plot }),
    });

    if (!response.ok) {
      throw new Error('Analysis failed');
    }

    const data = await response.json();
    setAnalysis(data);
  } catch (err) {
    if (window.location.hostname === 'localhost') {
      setError('Failed to analyze movie plot. Make sure the backend is running on localhost:8000!');
    } else {
      setError('Backend service currently unavailable. The AI analysis requires server-side processing.');
    }
    console.error('Error:', err);
  } finally {
    setLoading(false);
  }
};


  const samplePlots = [
    "A group of astronauts travel through a wormhole in search of a new habitable planet for humanity, confronting time dilation and existential threats in deep space.",
    "In a futuristic city, a lonely writer falls in love with an advanced AI operating system, exploring the nature of love and consciousness in the digital age.",
    "A determined lawyer defends a gentle giant wrongfully accused of murder in a small Southern town, fighting against racial prejudice and injustice."
  ];

  const useSamplePlot = (sample) => {
    setPlot(sample);
  };

  return (
    <div className="app">
      <div className="container">
        <header className="header">
          <h1>🎬 Movie Genre & Mood Analyzer</h1>
          <p>Enter a movie plot and discover its genres, emotional tone, and get an AI-generated tagline!</p>
        </header>

        <div className="input-section">
          <textarea
            value={plot}
            onChange={(e) => setPlot(e.target.value)}
            placeholder="Describe your movie plot... (e.g., 'A young wizard discovers his magical heritage and must battle an evil dark lord')"
            rows="6"
            className="plot-input"
          />
          
          <div className="sample-plots">
            <p>Try these samples:</p>
            {samplePlots.map((sample, index) => (
              <button
                key={index}
                onClick={() => useSamplePlot(sample)}
                className="sample-btn"
              >
                Sample {index + 1}
              </button>
            ))}
          </div>

          <button 
            onClick={analyzeMovie} 
            disabled={loading}
            className="analyze-btn"
          >
            {loading ? '🔮 Analyzing...' : '🎭 Analyze Movie'}
          </button>
        </div>

        {error && <div className="error">{error}</div>}

        {analysis && (
          <div className="results">
            <div className="confidence-badge">
              Analysis Confidence: {analysis.confidence}%
            </div>

            <div className="results-grid">
              <div className="result-card">
                <h3>🎭 Predicted Genres</h3>
                <div className="genres-list">
                  {analysis.genres.map((genre, index) => (
                    <div key={index} className="genre-item">
                      <span className="genre-name">{genre.genre}</span>
                      <div className="score-bar">
                        <div 
                          className="score-fill"
                          style={{ width: `${genre.score * 100}%` }}
                        ></div>
                      </div>
                      <span className="score-text">{(genre.score * 100).toFixed(1)}%</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="result-card">
                <h3>😊 Emotional Tone</h3>
                <div className="emotions-list">
                  {analysis.emotions.map((emotion, index) => (
                    <div key={index} className="emotion-item">
                      <span className="emotion-name">{emotion.emotion}</span>
                      <div className="score-bar">
                        <div 
                          className="score-fill emotion-fill"
                          style={{ width: `${emotion.score * 100}%` }}
                        ></div>
                      </div>
                      <span className="score-text">{(emotion.score * 100).toFixed(1)}%</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="result-card tagline-card">
                <h3>✨ AI-Generated Tagline</h3>
                <div className="tagline">
                  "{analysis.tagline}"
                </div>
                <div className="tagline-subtitle">Perfect for your movie poster!</div>
              </div>
            </div>
          </div>
        )}

        <footer className="footer">
          <p>Powered by Transformers & FastAPI + React</p>
        </footer>
      </div>
    </div>
  );
}

export default App;