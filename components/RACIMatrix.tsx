import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { RACIItem } from '../types/types';

interface AreaInfo {
  name: string;
  responsibleName: string;
  analystName: string;
}

interface RACIMatrixProps {
  data: RACIItem[];
  areaInfos?: AreaInfo[];
}

const defaultColumns = [
  "Atividade",
  "Suprimentos",
  "RH",
  "Financeiro",
  "Jurídico",
  "Tributário",
  "Tecnologia",
  "Gestão/Estratégico",
  "Frente"
];

export function RACIMatrix({ data, areaInfos = [] }: RACIMatrixProps) {
  const columns = defaultColumns;

  const getCellColor = (value: string) => {
    switch (value) {
      case 'C': return 'bg-blue-200';
      case 'REE': return 'bg-red-200';
      case 'NA': return 'bg-sky-100';
      case 'IM': return 'bg-orange-200';
      case 'AP': return 'bg-teal-100';
      case 'R': return 'bg-yellow-50';
      default: return '';
    }
  };

  const getAreaInfo = (columnName: string) => {
    console.log("Area Info Names: ", areaInfos)
    return areaInfos.find(info => info.name === columnName);
  };

  return (
    <div className="h-full overflow-x-auto">
      <Table className="min-w-full text-xs border">
        <TableHeader>
          <TableRow>
            {columns.map((column) => (
              <TableHead key={column} className="truncate whitespace-normal p-2 text-left font-bold border-x">
                <div>{column}</div>
                {column !== "Atividade" && column !== "Frente" && (
                  <div className="text-xs font-normal truncate">
                    {getAreaInfo(column) ? (
                      <>
                        <div>R: {getAreaInfo(column)?.responsibleName}</div>
                        <div>A: {getAreaInfo(column)?.analystName}</div>
                      </>
                    ) : (
                      <div className="text-gray-400">Sem info</div>
                    )}
                  </div>
                )}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item, index) => (
            <TableRow key={index} className={index % 2 === 0 ? 'bg-gray-50' : ''}>
              {columns.map((column) => {
                if (column === "Frente" && !item.isFirstInGroup) {
                  return null;
                }

                return (
                  <TableCell 
                    key={column} 
                    className={`${
                      column === "Atividade" ? "whitespace-normal min-w-[300px]" : "text-center"
                    } ${getCellColor(String(item[column.toLowerCase().replace('/', '').replace(' ', '')]))} p-2 border-x`}
                    {...(column === "Frente" && item.isFirstInGroup ? { rowSpan: item.rowSpan } : {})}
                  >
                    {column === "Frente" ? item.grupo : item[column.toLowerCase().replace('/', '').replace(' ', '')] || ''}
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

