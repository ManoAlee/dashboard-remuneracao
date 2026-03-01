import React, { useEffect, useState } from 'react';
import { fetchNineBoxData } from '../services/api';
import { Grid3X3, Star, AlertCircle, TrendingUp, ShieldCheck } from 'lucide-react';

interface Employee {
    id: number;
    name: string;
    potential: number;
    performance: number;
}

export const NineBoxMatrix: React.FC = () => {
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        fetchNineBoxData()
            .then(setEmployees)
            .finally(() => setLoading(false));
    }, []);

    if (loading) return (
        <div className="hacker-box p-6 min-h-[400px] flex flex-col items-center justify-center space-y-4">
            <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
            <span className="text-xs font-mono text-slate-500 animate-pulse uppercase tracking-widest">Sincronizando Banco de Dados...</span>
        </div>
    );

    const getLabel = (pot: number, perf: number) => {
        if (pot === 3 && perf === 3) return { text: 'Estrela', icon: Star, color: 'text-yellow-400 bg-yellow-400/10' };
        if (pot === 1 && perf === 1) return { text: 'Risco', icon: AlertCircle, color: 'text-red-400 bg-red-400/10' };
        if (pot === 3 && perf === 1) return { text: 'Enigma', icon: TrendingUp, color: 'text-cyan-400 bg-cyan-400/10' };
        return { text: 'Core', icon: ShieldCheck, color: 'text-primary bg-primary/10' };
    };

    return (
        <div className="hacker-box p-6">
            <div className="flex items-center gap-2 mb-6">
                <Grid3X3 className="text-accent w-5 h-5" />
                <h3 className="font-bold uppercase tracking-tight">Matriz Nine Box (Talentos)</h3>
            </div>

            <div className="grid grid-cols-3 grid-rows-3 gap-2 aspect-square max-w-[500px] mx-auto relative border border-border bg-background/30 p-2 rounded-lg">
                {/* Y Axis Label */}
                <div className="absolute -left-10 top-1/2 -rotate-90 text-[10px] uppercase tracking-widest text-slate-500 font-bold">Desempenho</div>
                {/* X Axis Label */}
                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-widest text-slate-500 font-bold">Potencial</div>

                {[3, 2, 1].map((perf) => (
                    [1, 2, 3].map((pot) => {
                        const cellEmployees = employees.filter(e => e.potential === pot && e.performance === perf);
                        const { icon: Icon, color, text } = getLabel(pot, perf);

                        return (
                            <div key={`${pot}-${perf}`} className="relative border border-white/5 bg-white/5 rounded-md p-2 flex flex-col items-center justify-center group hover:bg-white/10 transition-colors overflow-hidden">
                                <span className="absolute top-1 right-1 text-[8px] opacity-20 group-hover:opacity-100 transition-opacity font-mono">{pot}-{perf}</span>
                                {cellEmployees.length > 0 ? (
                                    <div className="flex flex-wrap gap-1 justify-center">
                                        {cellEmployees.map(e => (
                                            <div key={e.id} className={`px-2 py-0.5 rounded text-[10px] font-bold ${color} flex items-center gap-1 animate-in fade-in zoom-in duration-300`}>
                                                <Icon size={10} /> {e.name}
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <span className="text-[10px] text-slate-700 font-medium">{text}</span>
                                )}
                            </div>
                        );
                    })
                ))}
            </div>
        </div>
    );
};
