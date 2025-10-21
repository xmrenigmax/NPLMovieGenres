export default function PlotInput({ plot, setPlot, loading, analyzeMovie, samplePlots, useSamplePlot }) {
  return (
    <div className="premium-glass rounded-3xl p-8 mb-8 border-glow animate-slide-up movie-card-hover">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-3 h-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse"></div>
          <label className="block text-white text-xl font-bold">
            🎭 YOUR CINEMATIC MASTERPIECE
          </label>
        </div>
        <textarea
          value={plot}
          onChange={(e) => setPlot(e.target.value)}
          placeholder="Describe your movie plot... Imagine the next blockbuster! ✨"
          rows="6"
          className="w-full px-6 py-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300 resize-none backdrop-blur-sm text-lg font-light leading-relaxed"
          disabled={loading}
        />
        <div className="flex justify-between items-center mt-2 text-white/50 text-sm">
          <span>Let your creativity flow...</span>
          <span>{plot.length}/500 characters</span>
        </div>
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
              className="p-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-white text-left transition-all duration-300 hover:scale-105 disabled:opacity-30 disabled:hover:scale-100 group"
            >
              <div className="text-lg mb-1">#{index + 1}</div>
              <div className="text-sm opacity-70 line-clamp-3 group-hover:opacity-100 transition-opacity">
                {sample.split(' ').slice(0, 15).join(' ')}...
              </div>
            </button>
          ))}
        </div>
      </div>

      <button 
        onClick={analyzeMovie} 
        disabled={loading || !plot.trim()}
        className="w-full py-5 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 hover:from-purple-700 hover:via-pink-700 hover:to-blue-700 text-white font-bold text-xl rounded-2xl transition-all duration-500 transform hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed neon-glow relative overflow-hidden group"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
        
        {loading ? (
          <span className="flex items-center justify-center relative z-10">
            <div className="animate-spin rounded-full h-7 w-7 border-b-2 border-white mr-3"></div>
            <span className="bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
              ANALYZING CINEMATIC POTENTIAL...
            </span>
          </span>
        ) : (
          <span className="relative z-10 bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
            🎬 LAUNCH AI ANALYSIS
          </span>
        )}
      </button>
    </div>
  );
}