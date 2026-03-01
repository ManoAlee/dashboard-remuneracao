import React, { useState } from 'react';
import type { CommissionData, CommissionResult } from '../types/commission';
import { DollarSign, Target, UserX, Calculator as CalcIcon, Save, Loader2, CheckCircle2 } from 'lucide-react';
import { saveCommissionSimulation } from '../services/api';

interface CalculatorProps {
    data: CommissionData;
    result: CommissionResult;
    onUpdate: (data: Partial<CommissionData>) => void;
}

export const Calculator: React.FC<CalculatorProps> = ({ data, result, onUpdate }) => {
    const [isSaving, setIsSaving] = useState(false);
    const [saveStatus, setSaveStatus] = useState<'idle' | 'success'>('idle');

    const handleSave = async () => {
        setIsSaving(true);
        try {
            await saveCommissionSimulation({ ...data, result });
            setSaveStatus('success');
            setTimeout(() => setSaveStatus('idle'), 3000);
        } finally {
            setIsSaving(false);
        }
    };
    return (
        <div className="hacker-box p-6 space-y-6">
            <div className="flex items-center gap-3 border-b border-border pb-4">
                <CalcIcon className="text-primary w-6 h-6" />
                <h2 className="text-xl font-bold tracking-tight uppercase">Simulador Reativo</h2>
            </div>

            <div className="space-y-4">
                <div>
                    <label className="text-sm font-medium text-slate-400 mb-2 flex items-center gap-2">
                        <DollarSign size={14} className="text-secondary" /> Vendas Totais (R$)
                    </label>
                    <input
                        type="number"
                        value={data.sales}
                        onChange={(e) => onUpdate({ sales: Number(e.target.value) })}
                        className="w-full bg-background/50 border border-border rounded-lg p-3 outline-none focus:border-primary transition-colors text-white font-mono"
                        placeholder="Ex: 50000"
                    />
                </div>

                <div>
                    <label className="text-sm font-medium text-slate-400 mb-2 flex items-center gap-2">
                        <Target size={14} className="text-accent" /> Atingimento de Meta (%)
                    </label>
                    <input
                        type="number"
                        value={data.goalAchievement}
                        onChange={(e) => onUpdate({ goalAchievement: Number(e.target.value) })}
                        className="w-full bg-background/50 border border-border rounded-lg p-3 outline-none focus:border-primary transition-colors text-white font-mono"
                        placeholder="Ex: 100"
                    />
                </div>

                <div>
                    <label className="text-sm font-medium text-slate-400 mb-2 flex items-center gap-2">
                        <UserX size={14} className="text-red-500" /> Absenteísmo (Pontos)
                    </label>
                    <input
                        type="number"
                        value={data.absenteeism}
                        onChange={(e) => onUpdate({ absenteeism: Number(e.target.value) })}
                        className="w-full bg-background/50 border border-border rounded-lg p-3 outline-none focus:border-primary transition-colors text-white font-mono"
                        placeholder="Ex: 2"
                    />
                </div>
            </div>

            <div className="bg-primary/10 border border-primary/20 rounded-xl p-5 mt-8">
                <span className="text-xs uppercase tracking-widest text-primary font-bold">Total Estimado</span>
                <div className="text-3xl font-black text-white mt-1 font-mono">
                    R$ {result.totalRemuneration.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-sm pt-4 border-t border-border">
                <div className="text-slate-500">Comissão Vendas</div>
                <div className="text-right text-secondary font-mono">R$ {result.salesBonus.toFixed(2)}</div>
                <div className="text-slate-500">Bônus Meta</div>
                <div className="text-right text-accent font-mono">R$ {result.performanceBonus.toFixed(2)}</div>
                <div className="text-slate-500">Descontos</div>
                <div className="text-right text-red-500 font-mono">- R$ {result.deductions.toFixed(2)}</div>
            </div>

            <button
                onClick={handleSave}
                disabled={isSaving || saveStatus === 'success'}
                className={`w-full py-4 rounded-xl flex items-center justify-center gap-2 font-bold uppercase tracking-widest transition-all ${saveStatus === 'success'
                        ? 'bg-primary/20 text-primary border border-primary/30'
                        : 'bg-white text-black hover:bg-primary hover:text-white'
                    } disabled:opacity-50`}
            >
                {isSaving ? (
                    <Loader2 size={20} className="animate-spin" />
                ) : saveStatus === 'success' ? (
                    <CheckCircle2 size={20} />
                ) : (
                    <Save size={20} />
                )}
                {isSaving ? 'Gravando...' : saveStatus === 'success' ? 'Gravado no SQL' : 'Salvar Simulação'}
            </button>
        </div>
    );
};
