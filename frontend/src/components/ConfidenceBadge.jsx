export default function ConfidenceBadge({ confidence }) {
  const getConfidenceColor = (conf) => {
    if (conf >= 90) return 'from-emerald-400 to-green-500 shadow-green-500/50';
    if (conf >= 80) return 'from-amber-400 to-orange-500 shadow-amber-500/50';
    if (conf >= 70) return 'from-yellow-400 to-amber-500 shadow-yellow-500/50';
    return 'from-rose-400 to-red-500 shadow-rose-500/50';
  };

  const getConfidenceText = (conf) => {
    if (conf >= 90) return 'Exceptional Accuracy';
    if (conf >= 80) return 'High Confidence';
    if (conf >= 70) return 'Good Reliability';
    return 'Moderate Confidence';
  };

  return (
    <div className="flex flex-col items-center justify-center mb-10 animate-fade-in">
      <div className={`bg-gradient-to-r ${getConfidenceColor(confidence)} text-white px-8 py-4 rounded-2xl font-bold text-xl shadow-2xl neon-glow mb-3`}>
        {confidence}% ANALYSIS CONFIDENCE
      </div>
      <div className="text-white/70 font-medium text-sm">
        {getConfidenceText(confidence)} • AI-Powered Insights
      </div>
    </div>
  );
}