
export interface RACIItem {
  atividade: string;
  suprimentos: string;
  rh: string;
  financeiro: string;
  jurídico: string;
  tributário: string;
  tecnologia: string;
  gestãoestratégico: string;
  frente: string;
  grupo: string;
  isFirstInGroup?: boolean;
  rowSpan?: number;
}

export interface AIResponse {
  raci: RACIItem[];
}

export interface ChatMessage {

  role: 'user' | 'ai' | 'system';

  content: string;

}

