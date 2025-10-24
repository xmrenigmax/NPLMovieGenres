export default function PlotInput({ plot, setPlot, loading, analyseMovie, samplePlots, useSamplePlot }) {
  return (
    <div className="premium-glass rounded-3xl p-8 mb-8 glass-hover animate-slide-up">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-3 h-3 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full"></div>
              <label className="block text-white text-xl font-bold">
                YOUR CINEMATIC MASTERPIECE
              </label>
            </div>
            <textarea
              value={plot}
              onChange={(e) => setPlot(e.target.value)}
              placeholder="Describe your movie plot... Imagine the next blockbuster! ✨"
              rows="6"
              className="w-full px-6 py-4 rounded-2xl sleek-input text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-primary-400 resize-none text-lg leading-relaxed"
              disabled={loading}
            />
          </div>

          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-2 h-2 bg-gradient-to-r from-primary-400 to-primary-500 rounded-full"></div>
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
            onClick={analyseMovie} 
            disabled={loading || !plot.trim()}
            className="w-full py-5 bg-gradient-to-r from-primary-600 via-primary-700 to-primary-600 text-white font-bold text-xl rounded-2xl neon-glow btn-hover disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin mr-3"></div>
                ANALYSING CINEMATIC POTENTIAL...
              </span>
            ) : (
              'LAUNCH AI ANALYSIS'
            )}
          </button>
        </div>
  );
}