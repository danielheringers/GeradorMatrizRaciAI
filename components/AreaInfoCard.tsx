import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

interface AreaInfo {
  name: string;
  responsibleName: string;
  responsibleEmail: string;
  analystName: string;
  analystEmail: string;
}

interface AreaInfoCardProps {
  info: AreaInfo;
}

export function AreaInfoCard({ info }: AreaInfoCardProps) {
  return (
    <Card className="flex flex-col w-[180px]">
      <CardHeader className="px-2">
        <CardTitle className="text-sm font-medium">{info.name}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col px-2 text-xs w-[180px]">
        <p><strong>Responsável:</strong></p>
        <span>{info.responsibleName}</span>
        <span>{info.responsibleEmail}</span>
        <p><strong>Analista:</strong></p>
        <span>{info.analystName}</span>
        <span>{info.analystEmail}</span>
      </CardContent>
    </Card>
  );
}

