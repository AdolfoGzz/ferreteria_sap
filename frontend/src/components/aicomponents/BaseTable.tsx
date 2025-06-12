import { 
  AnalyticalTable,
  Card,
  Title
} from '@ui5/webcomponents-react';
import { ReactNode } from 'react';

interface BaseTableProps {
  title: string;
  data: any[];
  columns: any[];
  containerStyle?: React.CSSProperties;
  cardStyle?: React.CSSProperties;
  contentStyle?: React.CSSProperties;
}

const STYLES = {
  container: {
    width: '100%',
    marginBottom: '1.5rem'
  },
  card: {
    width: '100%',
    height: 'fit-content',
    padding: '0',
    overflow: 'hidden'
  },
  cardHeader: {
    padding: '1rem',
    borderBottom: '1px solid var(--sapList_BorderColor)',
    fontSize: '1.125rem',
    marginBottom: '1rem'
  },
  table: {
    width: "100%",
    boxShadow: "var(--sapContent_Shadow0)",
    borderRadius: "var(--sapElement_BorderCornerRadius)",
    marginBottom: "0",
    height: 'fit-content'
  },
  content: {
    padding: '1rem'
  }
} as const;

export default function BaseTable({ 
  title,
  data,
  columns,
  containerStyle,
  cardStyle,
  contentStyle
}: BaseTableProps) {
  return (
    <div style={{ ...STYLES.container, ...containerStyle }}>
      <Card style={{ ...STYLES.card, ...cardStyle }}>
        <Title level="H3" style={STYLES.cardHeader}>{title}</Title>
        <div style={{ ...STYLES.content, ...contentStyle }}>
          <AnalyticalTable
            data={data}
            columns={columns}
            selectionMode="None"
            scaleWidthMode="Grow"
            visibleRows={8}
            minRows={4}
            style={STYLES.table}
            infiniteScroll={false}
          />
        </div>
      </Card>
    </div>
  );
} 