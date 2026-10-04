import { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Sparkles, BookMarked, Save } from 'lucide-react';

export default function FocusWidget() {
  // --- POMODORO SAYACI (25 Dakika) ---
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let timer;
    if (isRunning) {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsRunning(false); // Süre bittiğinde callback içinde güvenle durduruyoruz
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isRunning]);

  const toggleTimer = () => setIsRunning(!isRunning);
  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(25 * 60);
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  // --- GÜNLÜK DEVLOG (Çözülen Bug / Not) ---
  const [devLog, setDevLog] = useState(() => {
    return localStorage.getItem('devorbit_log') || '';
  });
  const [isSaved, setIsSaved] = useState(false);

  const saveLog = () => {
    localStorage.setItem('devorbit_log', devLog);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* 1. Pomodoro Odak Kartı */}
      <div className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-900 to-indigo-950/40 border border-slate-800 rounded-2xl p-6 shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <h3 className="font-semibold text-sm tracking-wide uppercase text-slate-300">
              Derin Odaklanma
            </h3>
          </div>
          <span className="text-xs text-indigo-400 bg-indigo-500/10 px-2.5 py-1 rounded-full border border-indigo-500/20 font-mono">
            25m Sprint
          </span>
        </div>

        {/* Dijital Sayaç */}
        <div className="text-center my-6">
          <div className="text-5xl font-extrabold tracking-wider font-mono text-white">
            {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
          </div>
          <p className="text-xs text-slate-500 mt-2">
            {isRunning ? 'Kod akışındasın... Bildirimleri kapat.' : 'Moladasın veya başlamaya hazırsın.'}
          </p>
        </div>

        {/* Kontrol Butonları */}
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={toggleTimer}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-md cursor-pointer ${
              isRunning
                ? 'bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/30'
                : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-600/30'
            }`}
          >
            {isRunning ? <Pause size={16} /> : <Play size={16} fill="currentColor" />}
            {isRunning ? 'Duraklat' : 'Odaklan'}
          </button>

          <button
            onClick={resetTimer}
            className="p-2.5 rounded-xl bg-slate-800/60 hover:bg-slate-700/60 text-slate-400 hover:text-white border border-slate-700/50 transition-colors cursor-pointer"
            title="Sıfırla"
          >
            <RotateCcw size={16} />
          </button>
        </div>
      </div>

      {/* 2. Bug & Not Alanı (DevLog) */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2 text-indigo-400">
            <BookMarked size={18} />
            <h4 className="font-semibold text-sm text-slate-200">Bugün Ne Çözdüm?</h4>
          </div>
          <Sparkles size={16} className="text-amber-400 opacity-80" />
        </div>

        <p className="text-xs text-slate-400 mb-3">
          Günün en kritik kod notunu veya çözdüğün hatayı buraya bırak. Tarayıcında saklanır.
        </p>

        <textarea
          value={devLog}
          onChange={(e) => setDevLog(e.target.value)}
          placeholder="Örn: Tailwind v4 PostCSS eklentisini kurdum ve useEffect senkron render kuralını çözdüm..."
          rows={4}
          className="w-full bg-slate-950/70 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:border-indigo-500 transition-colors resize-none font-mono"
        />

        <div className="mt-3 flex items-center justify-between">
          <span className="text-[11px] text-emerald-400 font-medium">
            {isSaved ? '✓ Günlüğe kaydedildi' : ''}
          </span>
          <button
            onClick={saveLog}
            className="flex items-center gap-1.5 text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 px-3.5 py-2 rounded-lg font-medium transition-colors border border-slate-700/60 cursor-pointer"
          >
            <Save size={14} /> Kaydet
          </button>
        </div>
      </div>
    </div>
  );
}