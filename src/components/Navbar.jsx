import { LayoutDashboard, Flame } from 'lucide-react';

export default function Navbar() {
  // Bugünün tarihini Türkçe olarak alıyoruz, tarayıcıdan
  const today = new Date().toLocaleDateString('tr-TR', {
    day: 'numeric',
    month: 'long',
    weekday: 'long',
  });

  return (
    <header className="bg-slate-900 border-b border-slate-800 text-white px-6 py-4 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Sol Alan: Proje Adı ve Logo */}
        <div className="flex items-center space-x-3">
          <div className="bg-indigo-600 p-2 rounded-lg text-white shadow-md shadow-indigo-500/20">
            <LayoutDashboard size={22} />
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight text-white leading-tight">DevOrbit</h1>
            <p className="text-xs text-slate-400">Geliştirici Çalışma İstasyonu</p>
          </div>
        </div>

        {/* Sağ Alan: Rozet ve Tarih */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1.5 text-xs font-medium text-amber-400 bg-amber-950/40 border border-amber-800/40 px-3 py-1.5 rounded-full">
            <Flame size={14} className="text-amber-400" />
            <span>Odak Modu</span>
          </div>
          <span className="text-xs text-slate-400 border-l border-slate-800 pl-4 capitalize hidden sm:inline-block">
            {today}
          </span>
        </div>

      </div>
    </header>
  );
}