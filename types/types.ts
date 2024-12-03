export interface RACIItem {
  atividade: string;
  suprimentos: string;
  rh: string;
  financeiro: string;
  juridico: string;
  tributario: string;
  tecnologia: string;
  gestaoEstrategico: string;
  frente: string;
  grupo?: string; // Grupo para agrupamento na coluna frente
  isFirstInGroup?: boolean; // Indica se é o primeiro item do grupo
  rowSpan?: number; // Número de linhas que o grupo ocupa
  [key: string]: string | number | boolean | undefined; // Para colunas adicionais
}

export interface AIResponse {
  raci: RACIItem[];
}

export interface ChatMessage {

  role: 'user' | 'ai' | 'system';

  content: string;

}

