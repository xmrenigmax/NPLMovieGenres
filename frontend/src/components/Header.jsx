export default function Header() {
  return (
    <header className="text-center mb-16 animate-fade-in">
      <div className="premium-glass rounded-3xl p-12 mb-8 border-glow relative overflow-hidden">
        {/* Animated background elements - UPDATED COLORS */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-20 h-20 bg-primary-600 rounded-full blur-xl animate-float"></div>
          <div className="absolute bottom-10 right-10 w-16 h-16 bg-primary-500 rounded-full blur-lg animate-float" style={{animationDelay: '2s'}}></div>
          <div className="absolute top-1/2 left-1/3 w-12 h-12 bg-primary-400 rounded-full blur-md animate-float" style={{animationDelay: '4s'}}></div>
        </div>
        
        <div className="relative z-10">
          <h1 className="text-6xl font-black mb-6 drop-shadow-2xl tracking-tight">
          <span className="cinema-text-dark px-4 py-2 rounded-inline-block">CINEMA Natural Process Language</span>
          </h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed font-light">
            Transform your movie concepts into cinematic masterpieces. 
            Advanced AI analyzes plots, detects emotional arcs, and crafts 
            <span className="font-semibold text-primary-200"> Hollywood-ready taglines</span> in seconds.
          </p>
          <div className="flex justify-center items-center gap-4 mt-6">
            <div className="flex items-center gap-2 text-white/60">
              <div className="w-2 h-2 bg-primary-400 rounded-full animate-pulse"></div>
              <span className="text-sm">AI-Powered Analysis</span>
            </div>
            <div className="flex items-center gap-2 text-white/60">
              <div className="w-2 h-2 bg-primary-300 rounded-full animate-pulse"></div>
              <span className="text-sm">Real-time Insights</span>
            </div>
            <div className="flex items-center gap-2 text-white/60">
              <div className="w-2 h-2 bg-primary-500 rounded-full animate-pulse"></div>
              <span className="text-sm">Professional Grade</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}