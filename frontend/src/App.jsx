import React, { useState } from 'react';
import Header from './components/Header';
import PlotInput from './components/PlotInput';
import ResultsDisplay from './components/ResultsDisplay';

function App() {
  const [plot, setPlot] = useState('');
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const analyzeMovie = async () => {
    if (!plot.trim()) {
      setError('Please enter a movie plot to begin the cinematic analysis');
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
        throw new Error('Analysis failed - our AI is preparing the cinematic insights');
      }

      const data = await response.json();
      setAnalysis(data);
    } catch (err) {
      setError('🎬 Preparing cinematic analysis... First-time setup may take 20-30 seconds as we load Hollywood-grade AI models!');
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

  return (
    <div className="min-h-screen cinema-gradient relative overflow-hidden">
      {/* Animated background elements - UPDATED TO BLUE THEME */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-primary-600 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/3 right-1/3 w-24 h-24 bg-primary-500 rounded-full blur-2xl animate-float" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/3 right-1/4 w-20 h-20 bg-primary-400 rounded-full blur-2xl animate-float" style={{animationDelay: '4s'}}></div>
      </div>
      
      <div className="container mx-auto px-4 py-8 max-w-7xl relative z-10">
        <Header />
        
        <PlotInput 
          plot={plot}
          setPlot={setPlot}
          loading={loading}
          analyzeMovie={analyzeMovie}
          samplePlots={samplePlots}
          useSamplePlot={useSamplePlot}
        />

        {error && (
          <div className="premium-glass rounded-3xl p-6 mb-8 border-l-4 border-amber-400 animate-fade-in neon-glow">
            <div className="text-amber-100 text-lg font-medium flex items-center gap-3">
              <div className="w-3 h-3 bg-amber-400 rounded-full animate-pulse"></div>
              {error}
            </div>
          </div>
        )}

        {analysis && <ResultsDisplay analysis={analysis} />}

        <footer className="text-center mt-16">
          <div className="premium-glass rounded-2xl p-6 inline-block border-glow">
            <p className="text-white/80 font-medium text-lg">
              🚀 Powered by Advanced AI • Built with Cutting-Edge Technology • Hollywood-Grade Insights
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;