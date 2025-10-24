import React from 'react';

const ResultsDisplay = ({ analysis }) => {
  const ScoreBar = ({ label, score, color }) => (
    <div className="flex items-center gap-4 mb-4">
      <div className="w-32 text-white font-medium capitalize">{label}</div>
      <div className="flex-1 bg-white/10 rounded-full h-3 overflow-hidden">
        <div 
          className={`h-full rounded-full ${color}`}
          style={{ width: `${score}%` }}
        ></div>
      </div>
      <div className="w-16 text-right text-white font-bold">{score}%</div>
    </div>
  );

  return (
    <div className="animate-slide-up">
      {/* Confidence Badge */}
      <div className="flex items-center justify-center mb-10">
        <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white px-8 py-4 rounded-2xl font-bold text-xl neon-glow">
          🎯 {analysis.confidence}% ANALYSIS CONFIDENCE
        </div>
      </div>

      {/* Results Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Genres Card */}
        <div className="premium-glass rounded-3xl p-8 glass-hover movie-card-hover">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-3 h-3 bg-gradient-to-r from-primary-400 to-primary-500 rounded-full"></div>
            <h3 className="text-2xl font-bold text-white">🎭 CINEMATIC GENRES</h3>
          </div>
          <div className="space-y-6">
            {analysis.genres.map((genre, index) => (
              <ScoreBar 
                key={index}
                label={genre.genre}
                score={(genre.score * 100).toFixed(1)}
                color="bg-gradient-to-r from-primary-500 to-primary-600"
              />
            ))}
          </div>
        </div>

        {/* Emotions Card */}
        <div className="premium-glass rounded-3xl p-8 glass-hover movie-card-hover">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-3 h-3 bg-gradient-to-r from-primary-400 to-primary-500 rounded-full"></div>
            <h3 className="text-2xl font-bold text-white">😊 EMOTIONAL JOURNEY</h3>
          </div>
          <div className="space-y-6">
            {analysis.emotions.map((emotion, index) => (
              <ScoreBar 
                key={index}
                label={emotion.emotion}
                score={(emotion.score * 100).toFixed(1)}
                color="bg-gradient-to-r from-primary-500 to-primary-600"
              />
            ))}
          </div>
        </div>

        {/* Tagline Card */}
        <div className="premium-glass rounded-3xl p-8 glass-hover movie-card-hover bg-gradient-to-br from-primary-500/20 to-primary-600/20">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-3 h-3 bg-gradient-to-r from-primary-400 to-primary-500 rounded-full"></div>
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
  );
};

export default ResultsDisplay;