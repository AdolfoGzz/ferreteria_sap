import { 
  Button,
  FlexBox
} from '@ui5/webcomponents-react';
import { useMemo } from 'react';
import BaseTable from './BaseTable';

export interface Sugerencia {
  id: number;
  producto: string;
  cantidad: number;
  costo: number;
  proveedor: string;
}

interface SugerenciasTableProps {
  sugerencias: Sugerencia[];
  onAceptar: (sugerencia: Sugerencia) => void;
  onRechazar: (sugerencia: Sugerencia) => void;
  onEditar: (sugerencia: Sugerencia) => void;
}

const STYLES = {
  button: {
    minWidth: '32px',
    padding: '0 4px'
  }
} as const;

export default function SugerenciasTable({ 
  sugerencias,
  onAceptar,
  onRechazar,
  onEditar
}: SugerenciasTableProps) {
  const columns = useMemo(() => [
    {
      Header: 'Producto',
      accessor: 'producto',
    },
    {
      Header: 'Cantidad',
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
      Header: 'Acciones',
      accessor: 'actions',
      Cell: ({ row }: { row: { original: Sugerencia } }) => (
        <FlexBox justifyContent="Center" gap="0.5rem">
          <Button
            icon="accept"
            design="Positive"
            onClick={() => onAceptar(row.original)}
            title="Aceptar sugerencia"
            style={STYLES.button}
          />
          <Button
            icon="decline"
            design="Negative"
            onClick={() => onRechazar(row.original)}
            title="Rechazar sugerencia"
            style={STYLES.button}
          />
          <Button
            icon="edit"
            design="Transparent"
            onClick={() => onEditar(row.original)}
            title="Editar cantidad"
            style={STYLES.button}
          />
        </FlexBox>
      )
    }
  ], [onAceptar, onRechazar, onEditar]);

  return (
    <BaseTable
      title="Sugerencias de Compra IA"
      data={sugerencias}
      columns={columns}
    />
  );
} 