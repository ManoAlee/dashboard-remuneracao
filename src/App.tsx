import { Calculator } from './components/Calculator';
import { PerformanceChart } from './components/PerformanceChart';
import { NineBoxMatrix } from './components/NineBoxMatrix';
import { useCommission } from './hooks/useCommission';
import { LayoutDashboard, Bell, Settings, User } from 'lucide-react';

function App() {
  const { data, result, updateData } = useCommission({
    sales: 50000,
    goalAchievement: 100,
    absenteeism: 0
  });

  // Simulando um contexto de autenticação (Auth Context)
  // Em produção, esses dados viriam de uma API (ex: /api/user/profile)
  const currentUser = {
    name: "Alessandro Meneses",
    role: "STAFF_ENG_R2",
    accessLevel: "Root / System Engineer",
    avatarInitial: "AM"
  };

  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row">
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-20 bg-card border-r border-border flex flex-row md:flex-col items-center py-4 md:py-8 gap-6 md:gap-10 px-4 md:px-0">
        <div className="bg-primary/20 p-3 rounded-xl">
          <LayoutDashboard className="text-primary w-6 h-6" />
        </div>
        <div className="flex flex-row md:flex-col gap-6 items-center flex-1 justify-center">
          <button className="text-slate-500 hover:text-white transition-colors" title="Perfil"><User size={24} /></button>
          <button className="text-slate-500 hover:text-white transition-colors" title="Notificações"><Bell size={24} /></button>
          <button className="text-slate-500 hover:text-white transition-colors" title="Configurações"><Settings size={24} /></button>
        </div>
        <div className="hidden md:block w-10 h-10 rounded-full bg-slate-800 border border-border mt-auto overflow-hidden">
          <img src={`https://ui-avatars.com/api/?name=${currentUser.avatarInitial}&background=10b981&color=fff`} alt="User Avatar" />
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
          <div>
            <h1 className="text-3xl font-black text-white tracking-tight uppercase">
              Dashboard de <span className="text-primary">Remuneração</span>
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

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
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
      </main>
    </div>
  );
}

export default App;
