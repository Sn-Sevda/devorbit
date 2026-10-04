import Navbar from './components/Navbar';
import GithubCard from './components/GithubCard';
import TaskBoard from './components/TaskBoard';
import FocusWidget from './components/FocusWidget';

export default function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased selection:bg-indigo-500 selection:text-white">
      <Navbar />

      <main className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        {/* Karşılama Başlığı */}
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-5">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
              Çalışma Paneli <span className="text-xs bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-2 py-0.5 rounded-full font-mono font-normal">v1.0</span>
            </h2>
            <p className="text-sm text-slate-400 mt-0.5">
              GitHub aktiviteleri, sprint görevleri ve odaklanma alanı tek ekranda.
            </p>
          </div>
        </div>

        {/* Ana Izgara (Grid) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Sol 2 Kolon: GitHub API + Görevler */}
          <div className="lg:col-span-2 space-y-6">
            <GithubCard />
            <TaskBoard />
          </div>

          {/* Sağ 1 Kolon: Pomodoro + DevLog */}
          <aside className="space-y-6">
            <FocusWidget />
          </aside>
        </div>
      </main>
    </div>
  );
}