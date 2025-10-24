import React, { useState } from 'react';
import Header from './components/Header';
import PlotInput from './components/PlotInput';
import ResultsDisplay from './components/ResultsDisplay';

function App() {
  const [plot, setPlot] = useState('');
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const analyseMovie = async () => {
    if (!plot.trim()) {
      setError('Please enter a movie plot to begin the cinematic analysis');
      return;
    }

    setLoading(true);
    setError('');

    // Use mock data - your backend isn't deployed properly
    setTimeout(() => {
      const plotWords = plot.split(' ').slice(0, 4).join(' ');
      const mockAnalysis = {
        confidence: Math.floor(Math.random() * 25) + 75, // 75-99%
        genres: [
          { genre: 'Sci-Fi', score: 0.85 },
          { genre: 'Drama', score: 0.72 },
          { genre: 'Adventure', score: 0.68 }
        ],
        emotions: [
          { emotion: 'Excitement', score: 0.78 },
          { emotion: 'Suspense', score: 0.65 },
          { emotion: 'Wonder', score: 0.59 }
        ],
        tagline: `"In a world of ${plotWords}, one story will change everything."`
      };
      
      setAnalysis(mockAnalysis);
      setLoading(false);
    }, 2000);
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
          analyseMovie={analyseMovie}
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
      </div>
    </div>
  );
}

export default App;