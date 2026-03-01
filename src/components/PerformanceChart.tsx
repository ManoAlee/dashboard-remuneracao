import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { fetchMockData } from '../services/api';
import { TrendingUp } from 'lucide-react';

export const PerformanceChart: React.FC = () => {
    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchMockData().then(d => {
            setData(d);
            setLoading(false);
        });
    }, []);

    if (loading) return <div className="hacker-box h-[400px] flex items-center justify-center animate-pulse">Carregando...</div>;

    return (
        <div className="hacker-box p-6 h-[400px]">
            <div className="flex items-center gap-2 mb-6">
                <TrendingUp className="text-secondary w-5 h-5" />
                <h3 className="font-bold uppercase tracking-tight">Performance: Simulação vs Realizado</h3>
            </div>
            <ResponsiveContainer width="100%" height="90%">
                <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                    <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `R$${value}`} />
                    <Tooltip
                        contentStyle={{ backgroundColor: '#121216', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                        itemStyle={{ color: '#fff' }}
                    />
                    <Legend wrapperStyle={{ paddingTop: '20px' }} />
                    <Bar dataKey="simulated" name="Simulação" fill="#10b981" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="actual" name="Realizado" fill="#06b6d4" radius={[4, 4, 0, 0]} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};
