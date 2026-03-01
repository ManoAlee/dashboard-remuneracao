const BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

export const fetchMockData = async () => {
    // If we have a real BASE_URL, we could try to fetch from it
    if (BASE_URL) {
        try {
            const response = await fetch(`${BASE_URL}/performance-metrics`);
            if (response.ok) return await response.json();
        } catch (error) {
            console.error("Failed to fetch real performance data, falling back to mock:", error);
        }
    }

    // Fallback Mock Data
    await new Promise(resolve => setTimeout(resolve, 800));
    return [
        { name: 'Jan', simulated: 4000, actual: 2400 },
        { name: 'Feb', simulated: 3000, actual: 1398 },
        { name: 'Mar', simulated: 2000, actual: 9800 },
        { name: 'Apr', simulated: 2780, actual: 3908 },
        { name: 'May', simulated: 1890, actual: 4800 },
        { name: 'Jun', simulated: 2390, actual: 3800 },
    ];
};

export const fetchNineBoxData = async () => {
    if (BASE_URL) {
        try {
            const response = await fetch(`${BASE_URL}/employees/nine-box`);
            if (response.ok) return await response.json();
        } catch (error) {
            console.error("Failed to fetch real NineBox data, falling back to mock:", error);
        }
    }

    await new Promise(resolve => setTimeout(resolve, 1000));
    return [
        { id: 1, name: 'Alice', potential: 3, performance: 3 },
        { id: 2, name: 'Bob', potential: 2, performance: 2 },
        { id: 3, name: 'Charlie', potential: 1, performance: 1 },
        { id: 4, name: 'Diana', potential: 3, performance: 1 },
        { id: 5, name: 'Edward', potential: 1, performance: 3 },
    ];
};

export const saveCommissionSimulation = async (data: any) => {
    console.log("Saving simulation to API:", data);
    if (!BASE_URL) return { success: true, message: "Mock saved locally" };

    const response = await fetch(`${BASE_URL}/simulations`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    return await response.json();
};
