import { 
  FlexBox,
  Icon
} from '@ui5/webcomponents-react';
import { useMemo } from 'react';
import BaseTable from './BaseTable';

export interface HistorialSugerencia {
  id: number;
  fecha: string;
  producto: string;
  cantidad: number;
  costo: number;
  proveedor: string;
  estado: 'Aceptado' | 'Rechazado';
}

interface HistorialTableProps {
  historial: HistorialSugerencia[];
}

export default function HistorialTable({ historial }: HistorialTableProps) {
  const columns = useMemo(() => [
    {
      Header: 'Fecha',
      accessor: 'fecha',
    },
    {
      Header: 'Producto',
      accessor: 'producto',
    },
    {
      Header: 'Cant.',
      accessor: 'cantidad',
      Cell: ({ value }: { value: number }) => value.toLocaleString()
    },
    {
      Header: 'Costo',
      accessor: 'costo',
      Cell: ({ value }: { value: number }) => `$${value.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      })}`
    },
    {
      Header: 'Proveedor',
      accessor: 'proveedor',
    },
    {
      Header: 'Estado',
      accessor: 'estado',
      Cell: ({ value }: { value: 'Aceptado' | 'Rechazado' }) => (
        <FlexBox alignItems="Center" justifyContent="Center" gap="0.25rem">
          <Icon 
            name={value === 'Aceptado' ? 'accept' : 'decline'} 
            style={{ 
              color: value === 'Aceptado' ? 'var(--sapPositiveColor)' : 'var(--sapNegativeColor)',
              fontSize: 'var(--sapFontSize)'
            }} 
          />
          {value === 'Aceptado' ? 'Acep.' : 'Rech.'}
        </FlexBox>
      )
    }
  ], []);

  return (
    <BaseTable
      title="Historial de Sugerencias"
      data={historial}
      columns={columns}
    />
  );
} 