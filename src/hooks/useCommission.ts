import { useState, useMemo } from 'react';
import type { CommissionData, CommissionResult } from '../types/commission';

export function useCommission(initialData: CommissionData) {
    const [data, setData] = useState<CommissionData>(initialData);

    const result = useMemo<CommissionResult>(() => {
        const baseSalary = 3000;

        // Logic: 5% of sales
        const salesBonus = data.sales * 0.05;

        // Performance Bonus: up to $1000 based on goal achievement
        let performanceBonus = 0;
        if (data.goalAchievement >= 100) {
            performanceBonus = 1000;
        } else if (data.goalAchievement >= 80) {
            performanceBonus = 500;
        }

        // Deductions: $100 per absenteeism point
        const deductions = data.absenteeism * 100;

        const totalRemuneration = Math.max(0, baseSalary + salesBonus + performanceBonus - deductions);

        return {
            baseSalary,
            salesBonus,
            performanceBonus,
            deductions,
            totalRemuneration,
        };
    }, [data]);

    const updateData = (newData: Partial<CommissionData>) => {
        setData(prev => ({ ...prev, ...newData }));
    };

    return { data, result, updateData };
}
