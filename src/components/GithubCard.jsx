import { useState, useEffect } from 'react';
import { Search, GitBranch, Users, BookOpen, ExternalLink, Loader2 } from 'lucide-react';

export default function GithubCard() {
  const [username, setUsername] = useState('facebook');
  const [inputVal, setInputVal] = useState('');
  const [userData, setUserData] = useState(null);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Veri çekme mantığını useEffect içine bağlıyoruz
  useEffect(() => {
    let isMounted = true; // Sayfa kapanırsa arka planda gereksiz state güncellemesini önlemek için

    async function loadData() {
      setLoading(true);
      setError(null);

      try {
        const userRes = await fetch(`https://api.github.com/users/${username}`);
        if (!userRes.ok) {
          throw new Error('Kullanıcı bulunamadı!');
        }
        const userJson = await userRes.json();

        const repoRes = await fetch(
          `https://api.github.com/users/${username}/repos?sort=updated&per_page=4`
        );
        const repoJson = await repoRes.json();

        if (isMounted) {
          setUserData(userJson);
          setRepos(repoJson);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message);
          setUserData(null);
          setRepos([]);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadData();

    return () => {
      isMounted = false;
    };
  }, [username]); // username değiştikçe useEffect tetiklenir

  const handleSearch = (e) => {
    e.preventDefault();
    if (inputVal.trim()) {
      setUsername(inputVal.trim());
      setInputVal('');
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 text-white shadow-lg">
      {/* Arama Kutusu */}
      <form onSubmit={handleSearch} className="flex gap-2 mb-6">
        <div className="relative flex-1">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="GitHub kullanıcı adı ara (örn: torvalds)"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            className="w-full bg-slate-950 border border-slate-700 rounded-lg pl-10 pr-4 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
          />
        </div>
        <button
          type="submit"
          className="bg-indigo-600 hover:bg-indigo-500 px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer"
        >
          Ara
        </button>
      </form>

      {/* Yükleniyor Durumu */}
      {loading && (
        <div className="flex items-center justify-center py-12 text-slate-400">
          <Loader2 size={28} className="animate-spin text-indigo-500 mr-2" />
          <span>Veriler çekiliyor...</span>
        </div>
      )}

      {/* Hata Durumu */}
      {error && !loading && (
        <div className="text-rose-400 bg-rose-950/40 border border-rose-800/40 rounded-lg p-4 text-sm text-center">
          {error}
        </div>
      )}

      {/* Kullanıcı Bilgisi ve Repolar */}
      {userData && !loading && (
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <img
              src={userData.avatar_url}
              alt={userData.name || userData.login}
              className="w-16 h-16 rounded-full border-2 border-indigo-500/40"
            />
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-bold text-white truncate">
                {userData.name || userData.login}
              </h3>
              <a
                href={userData.html_url}
                target="_blank"
                rel="noreferrer"
                className="text-xs text-indigo-400 hover:underline flex items-center gap-1 mt-0.5"
              >
                @{userData.login} <ExternalLink size={12} />
              </a>
              {userData.bio && (
                <p className="text-xs text-slate-400 mt-1 line-clamp-2">{userData.bio}</p>
              )}
            </div>
          </div>

          {/* İstatistik Rozetleri */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div className="bg-slate-950/60 border border-slate-800 p-3 rounded-lg flex items-center gap-2.5">
              <BookOpen size={18} className="text-indigo-400" />
              <div>
                <p className="text-xs text-slate-400">Repolar</p>
                <p className="text-base font-semibold">{userData.public_repos}</p>
              </div>
            </div>
            <div className="bg-slate-950/60 border border-slate-800 p-3 rounded-lg flex items-center gap-2.5">
              <Users size={18} className="text-emerald-400" />
              <div>
                <p className="text-xs text-slate-400">Takipçiler</p>
                <p className="text-base font-semibold">{userData.followers}</p>
              </div>
            </div>
            <div className="bg-slate-950/60 border border-slate-800 p-3 rounded-lg flex items-center gap-2.5 col-span-2 sm:col-span-1">
              <GitBranch size={18} className="text-amber-400" />
              <div>
                <p className="text-xs text-slate-400">Takip Edilen</p>
                <p className="text-base font-semibold">{userData.following}</p>
              </div>
            </div>
          </div>

          {/* Son Repolar */}
          <div>
            <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
              Son Güncellenen Projeler
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {repos.map((repo) => (
                <a
                  key={repo.id}
                  href={repo.html_url}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-slate-950/40 hover:bg-slate-800/60 border border-slate-800 hover:border-slate-700 p-3 rounded-lg transition-all group flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-sm font-medium text-slate-200 group-hover:text-indigo-400 truncate">
                        {repo.name}
                      </span>
                      <ExternalLink size={12} className="text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                      {repo.description || 'Açıklama belirtilmemiş.'}
                    </p>
                  </div>
                  <div className="mt-3 flex items-center gap-2 text-[11px] text-slate-500">
                    <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
                    <span>{repo.language || 'Markdown / Diğer'}</span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}