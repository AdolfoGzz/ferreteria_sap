import { useState, useEffect } from 'react';
import { FlexBox, Button, BusyIndicator, Text } from '@ui5/webcomponents-react';
import "@ui5/webcomponents-icons/dist/chart-table-view.js";
import "@ui5/webcomponents-icons/dist/history.js";
import "@ui5/webcomponents-icons/dist/accept.js";
import "@ui5/webcomponents-icons/dist/refresh.js";

import StatsCards from '../components/aicomponents/StatsCards';
import SugerenciasTable, { Sugerencia } from '../components/aicomponents/SugerenciasTable';
import HistorialTable, { HistorialSugerencia } from '../components/aicomponents/HistorialTable';
import { AIService, AIPrediction } from '../services/api/ai.service';

const STYLES = {
  container: {
    width: '100%',
    padding: '1.5rem',
    gap: '1.5rem',
    maxWidth: '1600px',
    margin: '0 auto'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%'
  }
} as const;

const STORAGE_KEY = 'ai_sugerencias_historial';

// Initialize historial from localStorage
const getInitialHistorial = (): HistorialSugerencia[] => {
  try {
    const savedHistorial = localStorage.getItem(STORAGE_KEY);
    if (savedHistorial) {
      return JSON.parse(savedHistorial);
    }
  } catch (err) {
    console.error('Error loading historial from localStorage:', err);
    localStorage.removeItem(STORAGE_KEY);
  }
  return [];
};

export default function AiPage() {
  const [sugerencias, setSugerencias] = useState<Sugerencia[]>([]);
  const [historial, setHistorial] = useState<HistorialSugerencia[]>(getInitialHistorial);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Save historial to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(historial));
  }, [historial]);

  const totalHistorial = historial.length;
  const sugerenciasAceptadas = historial.filter(item => item.estado === 'Aceptado').length;
  const porcentajeEfectividad = totalHistorial > 0 
    ? ((sugerenciasAceptadas / totalHistorial) * 100).toFixed(1)
    : '0.0';

  const handleGenerateSuggestions = async () => {
    try {
      setLoading(true);
      setError(null);
      const predictions = await AIService.getPredictions();
      
      // Transform predictions to sugerencias format
      const newSugerencias: Sugerencia[] = predictions.map((pred, index) => ({
        id: index + 1,
        producto: pred.nombre_producto,
        cantidad: pred.cantidad_sugerida,
        costo: pred.costo_total,
        proveedor: pred.nombre_proveedor
      }));

      setSugerencias(newSugerencias);
    } catch (err) {
      console.error('Error generating suggestions:', err);
      setError('Error al generar sugerencias');
    } finally {
      setLoading(false);
    }
  };

  const handleAceptar = async (sugerencia: Sugerencia) => {
    try {
      // TODO: Implementar llamada al backend
      setSugerencias(prev => prev.filter(s => s.id !== sugerencia.id));
      const nuevaEntradaHistorial: HistorialSugerencia = {
        ...sugerencia,
        fecha: new Date().toISOString().split('T')[0],
        estado: 'Aceptado'
      };
      setHistorial(prev => [nuevaEntradaHistorial, ...prev]);
    } catch (error) {
      console.error('Error al aceptar sugerencia:', error);
    }
  };

  const handleRechazar = async (sugerencia: Sugerencia) => {
    try {
      // TODO: Implementar llamada al backend
      setSugerencias(prev => prev.filter(s => s.id !== sugerencia.id));
      const nuevaEntradaHistorial: HistorialSugerencia = {
        ...sugerencia,
        fecha: new Date().toISOString().split('T')[0],
        estado: 'Rechazado'
      };
      setHistorial(prev => [nuevaEntradaHistorial, ...prev]);
    } catch (error) {
      console.error('Error al rechazar sugerencia:', error);
    }
  };

  const handleEditar = async (sugerencia: Sugerencia) => {
    try {
      // TODO: Implementar llamada al backend
      console.log('Editando sugerencia:', sugerencia);
    } catch (error) {
      console.error('Error al editar sugerencia:', error);
    }
  };

  return (
    <FlexBox direction="Column" style={STYLES.container}>
      <Button
        icon="refresh"
        design="Emphasized"
        onClick={handleGenerateSuggestions}
        disabled={loading}
        style={{ height: '40px' }}
      >
        Generar Sugerencias
      </Button>
      <FlexBox style={STYLES.header}>
        <StatsCards 
          precision={porcentajeEfectividad}
          totalHistorial={totalHistorial}
          sugerenciasAceptadas={sugerenciasAceptadas}
        />
      </FlexBox>

      {loading && (
        <BusyIndicator active size="L" style={{ margin: "2rem auto", display: "block" }} />
      )}

      {error && (
        <Text style={{ color: "red", textAlign: "center" }}>{error}</Text>
      )}

      <SugerenciasTable
        sugerencias={sugerencias}
        onAceptar={handleAceptar}
        onRechazar={handleRechazar}
        onEditar={handleEditar}
      />

      <HistorialTable
        historial={historial}
      />
    </FlexBox>
  );
} 