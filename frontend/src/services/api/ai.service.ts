import { apiClient } from './client';
import { API_ENDPOINTS } from './endpoints';

export interface AIPrediction {
    producto_id: number;
    nombre_producto: string;
    prediction: number;
    cantidad_sugerida: number;
    costo_total: number;
    proveedor_id: number;
    nombre_proveedor: string;
    categoria: string;
    ubicacion: string;
    descripcion: string;
}

export class AIService {
    static async getPredictions(): Promise<AIPrediction[]> {
        console.log('Fetching AI predictions from:', API_ENDPOINTS.ai.predict);
        try {
            const response = await apiClient.post<AIPrediction[]>(API_ENDPOINTS.ai.predict, {});
            console.log('AI predictions response:', response);
            return response;
        } catch (error) {
            console.error('Error fetching AI predictions:', error);
            throw error;
        }
    }
} 