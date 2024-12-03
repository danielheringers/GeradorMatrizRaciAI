import { useState } from 'react';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

interface AreaInfo {
  name: string;
  responsibleName: string;
  responsibleEmail: string;
  analystName: string;
  analystEmail: string;
}

interface AreaInfoFormProps {
  areaName: string;
  onComplete: (info: AreaInfo) => void;
  onClose: () => void;
}

export function AreaInfoForm({ areaName, onComplete, onClose }: AreaInfoFormProps) {
  const [info, setInfo] = useState<AreaInfo>({
    name: areaName,
    responsibleName: '',
    responsibleEmail: '',
    analystName: '',
    analystEmail: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onComplete(info);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInfo({ ...info, [e.target.name]: e.target.value });
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Informações da Área de {areaName}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="responsibleName">Nome do responsável pela área</Label>
            <Input
              id="responsibleName"
              name="responsibleName"
              value={info.responsibleName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="responsibleEmail">E-mail do responsável pela área</Label>
            <Input
              id="responsibleEmail"
              name="responsibleEmail"
              type="email"
              value={info.responsibleEmail}
              onChange={handleChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="analystName">Nome do Analista delegado para área</Label>
            <Input
              id="analystName"
              name="analystName"
              value={info.analystName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="analystEmail">E-mail do Analista delegado pela área</Label>
            <Input
              id="analystEmail"
              name="analystEmail"
              type="email"
              value={info.analystEmail}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex justify-between">
            <Button type="button" variant="outline" onClick={onClose}>Fechar</Button>
            <Button type="submit">Próxima Área</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

