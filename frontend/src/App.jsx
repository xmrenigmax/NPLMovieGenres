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
      const response = await fetch('/api/analyze-movie', {
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
      setError('AI models are loading... This may take 20-30 seconds on first request. Please try again!');
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
    setError('');
    setAnalysis(null);
  };

  const ScoreBar = ({ label, score, color }) => (
    <div className="flex items-center gap-4 mb-4">
      <div className="w-32 text-white font-medium capitalize">{label}</div>
      <div className="flex-1 bg-white/20 rounded-full h-3 overflow-hidden">
        <div 
          className={`h-full rounded-full ${color}`}
          style={{ width: `${score}%` }}
        ></div>
      </div>
      <div className="w-16 text-right text-white font-bold">{score}%</div>
    </div>
  );

  return (
    <div className="min-h-screen cinema-gradient animate-gradient-shift">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-blue-500 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/3 right-1/3 w-24 h-24 bg-indigo-500 rounded-full blur-2xl animate-float" style={{animationDelay: '2s'}}></div>
      </div>
      
      <div className="container mx-auto px-4 py-8 max-w-7xl relative z-10">
        {/* Header */}
        <header className="text-center mb-16 animate-fade-in">
          <div className="premium-glass rounded-3xl p-12 mb-8 border-glow relative overflow-hidden">
            <div className="relative z-10">
              <h1 className="text-6xl font-black text-white mb-6 drop-shadow-2xl">
                <span className="shimmer-text">🎬 CINEMA</span>
                <span className="text-gradient"> GENIUS</span>
              </h1>
              <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
                Transform your movie concepts into cinematic masterpieces. Advanced AI analyzes plots, 
                detects emotional arcs, and crafts <span className="font-semibold text-blue-200">Hollywood-ready taglines</span> in seconds.
              </p>
            </div>
          </div>
        </header>

        {/* Input Section */}
        <div className="premium-glass rounded-3xl p-8 mb-8 glass-hover animate-slide-up">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-3 h-3 bg-gradient-to-r from-blue 600 to-indigo-600 rounded-full"></div>
              <label className="block text-white text-xl font-bold">
                🎭 YOUR CINEMATIC MASTERPIECE
              </label>
            </div>
            <textarea
              value={plot}
              onChange={(e) => setPlot(e.target.value)}
              placeholder="Describe your movie plot... Imagine the next blockbuster! ✨"
              rows="6"
              className="w-full px-6 py-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none text-lg leading-relaxed"
              disabled={loading}
            />
          </div>

          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"></div>
              <p className="text-white/80 font-semibold">🚀 INSPIRATION STARTERS:</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {samplePlots.map((sample, index) => (
                <button
                  key={index}
                  onClick={() => useSamplePlot(sample)}
                  disabled={loading}
                  className="p-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-white text-left transition-all duration-300 glass-hover"
                >
                  <div className="text-lg mb-1">#{index + 1}</div>
                  <div className="text-sm opacity-70 line-clamp-3">
                    {sample.split(' ').slice(0, 15).join(' ')}...
                  </div>
                </button>
              ))}
            </div>
          </div>

          <button 
            onClick={analyzeMovie} 
            disabled={loading || !plot.trim()}
            className="w-full py-5 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600 text-white font-bold text-xl rounded-2xl neon-glow btn-hover disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin mr-3"></div>
                ANALYZING CINEMATIC POTENTIAL...
              </span>
            ) : (
              '🎬 LAUNCH AI ANALYSIS'
            )}
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="premium-glass rounded-3xl p-6 mb-8 border-l-4 border-amber-400 animate-fade-in">
            <div className="text-amber-100 text-lg font-medium">
              ⚡ {error}
            </div>
          </div>
        )}

        {/* Results */}
        {analysis && (
          <div className="animate-slide-up">
            {/* Confidence Badge */}
            <div className="flex items-center justify-center mb-10">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-2xl font-bold text-xl neon-glow">
                🎯 {analysis.confidence}% ANALYSIS CONFIDENCE
              </div>
            </div>

            {/* Results Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
              {/* Genres Card */}
              <div className="premium-glass rounded-3xl p-8 glass-hover movie-card-hover">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"></div>
                  <h3 className="text-2xl font-bold text-white">🎭 CINEMATIC GENRES</h3>
                </div>
                <div className="space-y-6">
                  {analysis.genres.map((genre, index) => (
                    <ScoreBar 
                      key={index}
                      label={genre.genre}
                      score={(genre.score * 100).toFixed(1)}
                      color="bg-gradient-to-r from-blue-500 to-blue-600"
                    />
                  ))}
                </div>
              </div>

              {/* Emotions Card */}
              <div className="premium-glass rounded-3xl p-8 glass-hover movie-card-hover">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-3 h-3 bg-gradient-to-r from-indigo-500 to-rose-500 rounded-full"></div>
                  <h3 className="text-2xl font-bold text-white">😊 EMOTIONAL JOURNEY</h3>
                </div>
                <div className="space-y-6">
                  {analysis.emotions.map((emotion, index) => (
                    <ScoreBar 
                      key={index}
                      label={emotion.emotion}
                      score={(emotion.score * 100).toFixed(1)}
                      color="bg-gradient-to-r from-indigo-500 to-rose-600"
                    />
                  ))}
                </div>
              </div>

              {/* Tagline Card */}
              <div className="premium-glass rounded-3xl p-8 glass-hover movie-card-hover bg-gradient-to-br from-blue-500/20 to-indigo-500/20">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-violet-500 rounded-full"></div>
                  <h3 className="text-2xl font-bold text-white">✨ BLOCKBUSTER TAGLINE</h3>
                </div>
                <div className="text-center space-y-6">
                  <div className="text-3xl italic text-white leading-tight bg-white/5 p-6 rounded-2xl border border-white/10">
                    "{analysis.tagline}"
                  </div>
                  <div className="text-white/70 text-lg font-medium">
                    🎨 Ready for Your Movie Poster
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <footer className="text-center mt-16">
          <div className="premium-glass rounded-2xl p-6 inline-block border-glow">
            <p className="text-white/80 font-medium text-lg">
             Built by xmrenigmax
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;