import { useState, useEffect } from 'react';
import { Plus, Trash2, CheckCircle2, Circle, ListTodo } from 'lucide-react';

export default function TaskBoard() {
  // 1. Görevleri LocalStorage'dan Başlatma (Varsayılan olarak dolu gelmesi için)
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('devorbit_tasks');
    if (savedTasks) {
      try {
        return JSON.parse(savedTasks);
      } catch {
        return [];
      }
    }
    // Eğer tarayıcıda kayıtlı görev yoksa örnek iki görev gösterelim
    return [
      { id: 1, text: 'React hooks (useState, useEffect) tekrar et', completed: true, priority: 'Yüksek' },
      { id: 2, text: 'DevOrbit projesini GitHub ve Netlify\'a yükle', completed: false, priority: 'Yüksek' },
    ];
  });

  // Form input alanlarının state'leri
  const [taskText, setTaskText] = useState('');
  const [priority, setPriority] = useState('Orta');

  // 2. tasks state'i her değiştiğinde LocalStorage'a kaydet (Persist)
  useEffect(() => {
    localStorage.setItem('devorbit_tasks', JSON.stringify(tasks));
  }, [tasks]);

  // C (Create): Yeni Görev Ekleme
  const handleAddTask = (e) => {
    e.preventDefault();
    if (!taskText.trim()) return;

    const newTask = {
      id: Date.now(), // Benzersiz bir kimlik (ID) üretmek için milisaniye zamanını kullanıyoruz
      text: taskText.trim(),
      completed: false,
      priority: priority,
    };

    setTasks([newTask, ...tasks]); // Yeni görevi en başa ekle
    setTaskText('');               // Form kutusunu temizle
  };

  // U (Update): Görevin Tamamlandı Durumunu Değiştirme
  const toggleComplete = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // D (Delete): Görevi Silme
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 text-white shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <ListTodo size={20} className="text-indigo-400" />
          <h3 className="font-bold text-lg text-white">Proje Görevleri</h3>
        </div>
        <span className="text-xs bg-slate-800 text-slate-300 px-2.5 py-1 rounded-full font-medium">
          {tasks.filter((t) => t.completed).length}/{tasks.length} Tamamlandı
        </span>
      </div>

      {/* Yeni Görev Ekleme Formu (Create) */}
      <form onSubmit={handleAddTask} className="flex flex-col sm:flex-row gap-2 mb-6">
        <input
          type="text"
          placeholder="Yeni görev veya yapılacak iş ekle..."
          value={taskText}
          onChange={(e) => setTaskText(e.target.value)}
          className="flex-1 bg-slate-950 border border-slate-700 rounded-lg px-4 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
        />

        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-300 focus:outline-none focus:border-indigo-500"
        >
          <option value="Düşük">Düşük</option>
          <option value="Orta">Orta</option>
          <option value="Yüksek">Yüksek</option>
        </select>

        <button
          type="submit"
          className="bg-indigo-600 hover:bg-indigo-500 px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-1 cursor-pointer"
        >
          <Plus size={16} /> Ekle
        </button>
      </form>

      {/* Görev Listesi (Read) */}
      <div className="space-y-2 max-h-[340px] overflow-y-auto pr-1">
        {tasks.length === 0 ? (
          <p className="text-center py-8 text-sm text-slate-500">
            Henüz eklenmiş bir görev yok. Yukarıdan bir tane ekleyebilirsin!
          </p>
        ) : (
          tasks.map((task) => (
            <div
              key={task.id}
              className={`flex items-center justify-between p-3 rounded-lg border transition-all ${
                task.completed
                  ? 'bg-slate-950/40 border-slate-800/60 opacity-60'
                  : 'bg-slate-950/80 border-slate-800 hover:border-slate-700'
              }`}
            >
              {/* Tamamlandı Butonu ve Metin */}
              <div
                onClick={() => toggleComplete(task.id)}
                className="flex items-center gap-3 flex-1 min-w-0 cursor-pointer select-none"
              >
                {task.completed ? (
                  <CheckCircle2 size={18} className="text-emerald-400 shrink-0" />
                ) : (
                  <Circle size={18} className="text-slate-500 hover:text-slate-300 shrink-0" />
                )}
                <span
                  className={`text-sm truncate ${
                    task.completed ? 'line-through text-slate-400' : 'text-slate-200'
                  }`}
                >
                  {task.text}
                </span>
              </div>

              {/* Öncelik Rozeti ve Sil Butonu */}
              <div className="flex items-center gap-2 ml-3 shrink-0">
                <span
                  className={`text-[10px] px-2 py-0.5 rounded font-medium ${
                    task.priority === 'Yüksek'
                      ? 'bg-rose-950/60 text-rose-400 border border-rose-800/40'
                      : task.priority === 'Orta'
                      ? 'bg-amber-950/60 text-amber-400 border border-amber-800/40'
                      : 'bg-slate-800 text-slate-300'
                  }`}
                >
                  {task.priority}
                </span>

                <button
                  onClick={() => deleteTask(task.id)}
                  className="text-slate-500 hover:text-rose-400 p-1 rounded transition-colors cursor-pointer"
                  title="Görevi Sil"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}