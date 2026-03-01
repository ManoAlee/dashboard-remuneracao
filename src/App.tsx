import { useState, useEffect } from 'react';
import { Calculator } from './components/Calculator';
import { PerformanceChart } from './components/PerformanceChart';
import { NineBoxMatrix } from './components/NineBoxMatrix';
import { useCommission } from './hooks/useCommission';
import { LayoutDashboard, Bell, Settings, User, CheckCircle } from 'lucide-react';

function App() {
  const [notification, setNotification] = useState<string | null>(null);
  const [view, setView] = useState<'dashboard' | 'profile' | 'notifications' | 'settings'>('dashboard');
  const { data, result, updateData } = useCommission({
    sales: 50000,
    goalAchievement: 100,
    absenteeism: 0
  });

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const navigateTo = (newView: typeof view) => {
    setView(newView);
    setNotification(null); // Clear toast when navigating
  };

  // Simulando um contexto de autenticação (Auth Context)
  const currentUser = {
    name: "Operador de Sistema",
    role: "STAFF_ENG_R2",
    accessLevel: "Root / System Engineer",
    avatarInitial: "OP"
  };

  const renderView = () => {
    switch (view) {
      case 'profile':
        return (
          <div className="hacker-box p-12 flex flex-col items-center text-center space-y-6 animate-in zoom-in-95 duration-300">
            <div className="w-32 h-32 rounded-full border-4 border-primary p-2">
              <img src={`https://ui-avatars.com/api/?name=${currentUser.avatarInitial}&background=10b981&color=fff&size=512`} className="rounded-full" />
            </div>
            <div>
              <h2 className="text-3xl font-black text-white uppercase tracking-tighter">{currentUser.name}</h2>
              <p className="text-primary font-mono">{currentUser.role}</p>
            </div>
            <button onClick={() => navigateTo('dashboard')} className="px-6 py-2 bg-white text-black font-bold rounded-lg hover:bg-primary hover:text-white transition-all uppercase text-xs tracking-widest">Voltar ao Terminal</button>
          </div>
        );
      case 'notifications':
        return (
          <div className="space-y-4 animate-in slide-in-from-bottom-4 duration-300">
            <h2 className="text-2xl font-black text-white uppercase mb-6 flex items-center gap-3"><Bell className="text-primary" /> Log de Sistema</h2>
            {[1, 2, 3].map(i => (
              <div key={i} className="hacker-box p-4 border-l-4 border-l-primary flex justify-between items-center">
                <div>
                  <p className="text-white font-bold text-sm">Atualização de Segurança #{i}04{i}</p>
                  <p className="text-slate-500 text-xs mt-1">Sincronização com o banco SQL concluída com sucesso.</p>
                </div>
                <span className="text-[10px] font-mono text-slate-600">HÁ {i} MIN</span>
              </div>
            ))}
          </div>
        );
      case 'settings':
        return (
          <div className="hacker-box p-8 animate-in fade-in duration-500">
            <h2 className="text-2xl font-black text-white uppercase mb-8 flex items-center gap-3"><Settings className="text-primary" /> Configurações de Núcleo</h2>
            <div className="space-y-6">
              <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10">
                <div>
                  <p className="text-white font-bold">Modo de Alta Performance</p>
                  <p className="text-slate-500 text-xs">Prioriza renderização de gráficos em tempo real.</p>
                </div>
                <div className="w-12 h-6 bg-primary rounded-full relative"><div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div></div>
              </div>
              <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10 opacity-50">
                <div>
                  <p className="text-white font-bold">Criptografia RSA-4096</p>
                  <p className="text-slate-500 text-xs">Ativado por padrão para todos os endpoints.</p>
                </div>
                <div className="w-12 h-6 bg-slate-700 rounded-full"></div>
              </div>
            </div>
          </div>
        );
      default:
        return (
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 animate-in fade-in duration-500">
            {/* Left Column: Calculator */}
            <div className="xl:col-span-4 lg:col-span-12">
              <Calculator data={data} result={result} onUpdate={updateData} />
            </div>

            {/* Right Column: Visualizations */}
            <div className="xl:col-span-8 lg:col-span-12 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="hacker-box p-6 flex flex-col justify-center">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Status da API</span>
                  <div className={`text-2xl font-mono flex items-center gap-2 ${import.meta.env.VITE_API_BASE_URL ? 'text-primary' : 'text-yellow-500'}`}>
                    {import.meta.env.VITE_API_BASE_URL ? 'PRODUÇÃO_ON' : 'MODO_SIMULAÇÃO'}
                    <span className="text-xs text-slate-600 font-normal">
                      {import.meta.env.VITE_API_BASE_URL ? 'V1_STABLE' : 'LOCAL_HOST'}
                    </span>
                  </div>
                </div>
                <div className="hacker-box p-6 flex flex-col justify-center border-l-4 border-l-secondary">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Última Sincronização</span>
                  <div className="text-2xl font-mono text-white">
                    {new Date().toLocaleTimeString()}
                  </div>
                </div>
              </div>

              <PerformanceChart />

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <NineBoxMatrix />
                <div className="hacker-box p-6 flex flex-col">
                  <h3 className="font-bold uppercase tracking-tight mb-4 flex items-center gap-2 text-primary">
                    <Settings size={18} /> Resumo do Sistema
                  </h3>
                  <div className="space-y-4 flex-1">
                    <div className="flex justify-between items-center border-b border-white/5 pb-2">
                      <span className="text-sm text-slate-500">Módulos Carregados</span>
                      <span className="font-mono text-white">12/12</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-white/5 pb-2">
                      <span className="text-sm text-slate-500">Latência do Banco</span>
                      <span className="font-mono text-secondary">24ms</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-white/5 pb-2">
                      <span className="text-sm text-slate-500">Integridade de Dados</span>
                      <span className="font-mono text-primary">99.9%</span>
                    </div>
                  </div>
                  <div className="mt-6 pt-4 border-t border-white/5">
                    <p className="text-[10px] text-slate-600 leading-relaxed font-mono">
                      SISTEMA OPERACIONAL: VITALIS BIO-OS // KERNEL: REACT-RECHART-VITE // AUTH: ROOT_ONLY
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row relative transition-colors duration-500">
      {/* Toast Notification */}
      {notification && (
        <div className="fixed top-6 right-6 z-50 animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="bg-primary border border-primary/20 text-white px-4 py-3 rounded-xl shadow-2xl flex items-center gap-3">
            <CheckCircle size={18} />
            <span className="font-bold uppercase tracking-tighter text-sm">{notification}</span>
          </div>
        </div>
      )}

      {/* Sidebar Navigation */}
      <aside className="w-full md:w-20 bg-card border-r border-border flex flex-row md:flex-col items-center py-4 md:py-8 gap-6 md:gap-10 px-4 md:px-0 z-20">
        <div
          onClick={() => navigateTo('dashboard')}
          className="bg-primary/20 p-3 rounded-xl cursor-pointer hover:bg-primary/30 transition-all"
        >
          <LayoutDashboard className="text-primary w-6 h-6" />
        </div>
        <div className="flex flex-row md:flex-col gap-6 items-center flex-1 justify-center">
          <button
            onClick={() => navigateTo('profile')}
            className={`transition-all duration-300 ${view === 'profile' ? 'text-primary' : 'text-slate-500 hover:text-white'}`}
            title="Perfil"
          >
            <User size={24} />
          </button>
          <button
            onClick={() => navigateTo('notifications')}
            className={`transition-all duration-300 ${view === 'notifications' ? 'text-primary' : 'text-slate-500 hover:text-white'}`}
            title="Notificações"
          >
            <Bell size={24} />
          </button>
          <button
            onClick={() => navigateTo('settings')}
            className={`transition-all duration-300 ${view === 'settings' ? 'text-primary' : 'text-slate-500 hover:text-white'}`}
            title="Configurações"
          >
            <Settings size={24} />
          </button>
        </div>
        <div
          onClick={() => navigateTo('profile')}
          className="hidden md:block w-10 h-10 rounded-full bg-slate-800 border-2 border-border mt-auto overflow-hidden cursor-pointer hover:border-primary transition-all"
        >
          <img src={`https://ui-avatars.com/api/?name=${currentUser.avatarInitial}&background=10b981&color=fff`} alt="User Avatar" />
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
          <div onClick={() => navigateTo('dashboard')} className="cursor-pointer group">
            <h1 className="text-3xl font-black text-white tracking-tight uppercase group-hover:text-primary transition-colors">
              Dashboard de <span className="text-primary group-hover:text-white transition-colors">Remuneração</span>
            </h1>
            <p className="text-slate-500 text-sm font-medium mt-1">Nível de Acesso: {currentUser.accessLevel}</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <div className="text-sm font-bold text-white uppercase tracking-wider">{currentUser.name}</div>
              <div className="text-xs text-primary font-mono">{currentUser.role}</div>
            </div>
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_10px_#10b981]"></div>
          </div>
        </header>

      </main>
    </div>
  );
}

export default App;
