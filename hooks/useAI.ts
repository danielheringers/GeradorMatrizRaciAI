import { useState } from 'react';
import { AIResponse, ChatMessage, RACIItem } from '../types/types';

const MAX_MESSAGE_LENGTH = 500;


export function useAI() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [response, setResponse] = useState<AIResponse | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  const truncateMessage = (content: string) => {
    if (content.length > MAX_MESSAGE_LENGTH) {
      return content.slice(0, MAX_MESSAGE_LENGTH) + '...';
    }
    return content;
  };

  const generateResponse = async (prompt: string) => {
    setIsLoading(true);
    setError(null);
    const truncatedPrompt = truncateMessage(prompt);
    setMessages(prev => [...prev, { role: 'user', content: truncatedPrompt }]);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const rawData: RACIItem[] = [
        {
          atividade: "Rever estruturas (Plantas, Centros de Distribuição) inclusive para regiões incentivadas",
          suprimentos: "C",
          rh: "C",
          financeiro: "C",
          'jurídico': "REE",
          'tributário': "REE",
          tecnologia: "IM",
          'gestãoestratégico': "AP",
          frente: "",
          grupo: "Jurídico e Tributária"
        },
        {
          atividade: "Avaliar estratégias de M&A",
          suprimentos: "C",
          rh: "C",
          financeiro: "C",
          'jurídico': "REE",
          'tributário': "C",
          tecnologia: "IM",
          'gestãoestratégico': "AP",
          frente: "",
          grupo: "Jurídico e Tributária"
        },
        {
          atividade: "Avaliação dos Impactos de incentivos fiscais e oportunidades em relação Zona Franca de Manaus",
          suprimentos: "C",
          rh: "NA",
          financeiro: "NA",
          'jurídico': "REE",
          'tributário': "REE",
          tecnologia: "IM",
          'gestãoestratégico': "AP",
          frente: "",
          grupo: "Jurídico e Tributária"
        },
        {
          atividade: "Estratégia de Fornecedores - CLT x PJ - Recomposição de Preços",
          suprimentos: "REE",
          rh: "C",
          financeiro: "C",
          'jurídico': "REE",
          'tributário': "C",
          tecnologia: "IM",
          'gestãoestratégico': "AP",
          frente: "",
          grupo: "Jurídico e Tributária"
        },
        {
          atividade: "Estratégia de Fornecedores e Clientes - Renegociação de Contratos",
          suprimentos: "REE",
          rh: "NA",
          financeiro: "C",
          'jurídico': "R",
          'tributário': "C",
          tecnologia: "IM",
          'gestãoestratégico': "AP",
          frente: "",
          grupo: "Jurídico e Tributária"
        },
        {
          atividade: "Definir nova formação de Preço de Venda",
          suprimentos: "C",
          rh: "C",
          financeiro: "C",
          'jurídico': "C",
          'tributário': "REE",
          tecnologia: "IM",
          'gestãoestratégico': "REE",
          frente: "",
          grupo: "Jurídico e Tributária"
        },
        {
          atividade: "Avaliar Requisito mínimos para o ERP?",
          suprimentos: "C",
          rh: "NA",
          financeiro: "NA",
          'jurídico': "NA",
          'tributário': "NA",
          tecnologia: "REE",
          'gestãoestratégico': "AP",
          frente: "",
          grupo: "Serviços Tecnológicos"
        },
        {
          atividade: "Revisão dos impactos em Obrigações acessórias – Solução Fiscal",
          suprimentos: "NA",
          rh: "NA",
          financeiro: "NA",
          'jurídico': "NA",
          'tributário': "C",
          tecnologia: "REE",
          'gestãoestratégico': "AP",
          frente: "",
          grupo: "Serviços Tecnológicos"
        },
        {
          atividade: "Saneamento Dados Mestres",
          suprimentos: "C",
          rh: "C",
          financeiro: "C",
          'jurídico': "NA",
          'tributário': "REE",
          tecnologia: "IM",
          'gestãoestratégico': "AP",
          frente: "",
          grupo: "Serviços Tecnológicos"
        },
        {
          atividade: "Avaliar Impactos em Customizações",
          suprimentos: "C",
          rh: "C",
          financeiro: "C",
          'jurídico': "NA",
          'tributário': "REE",
          tecnologia: "IM",
          'gestãoestratégico': "AP",
          frente: "",
          grupo: "Serviços Tecnológicos"
        },
        {
          atividade: "Avaliar Impactos do Split Payment x Fluxo de Caixa",
          suprimentos: "C",
          rh: "C",
          financeiro: "REE",
          'jurídico': "R",
          'tributário': "REE",
          tecnologia: "IM",
          'gestãoestratégico': "AP",
          frente: "",
          grupo: "Visão Estratégica de Negócios"
        },
        {
          atividade: "Avaliar Posicionamento de Concorrentes",
          suprimentos: "C",
          rh: "NA",
          financeiro: "REE",
          'jurídico': "REE",
          'tributário': "C",
          tecnologia: "IM",
          'gestãoestratégico': "AP",
          frente: "",
          grupo: "Visão Estratégica de Negócios"
        },
        {
          atividade: "Avaliar impactos Macro Econômicos - Juros, Endividamento, ETC.",
          suprimentos: "REE",
          rh: "C",
          financeiro: "REE",
          'jurídico': "R",
          'tributário': "C",
          tecnologia: "IM",
          'gestãoestratégico': "AP",
          frente: "",
          grupo: "Visão Estratégica de Negócios"
        },
        {
          atividade: "Investimentos (Treinamentos, mudanças físicas, consultoria e TI)",
          suprimentos: "C",
          rh: "C",
          financeiro: "REE",
          'jurídico': "C",
          'tributário': "C",
          tecnologia: "C",
          'gestãoestratégico': "AP",
          frente: "",
          grupo: "Visão Estratégica de Negócios"
        },
        {
          atividade: "Reavaliação Periódica ao decorrer da Reforma Tributária",
          suprimentos: "R",
          rh: "R",
          financeiro: "R",
          'jurídico': "R",
          'tributário': "R",
          tecnologia: "R",
          'gestãoestratégico': "AP",
          frente: "",
          grupo: "Visão Estratégica de Negócios"
        }
      ];

      const processedData = rawData.reduce((acc: RACIItem[], curr, idx, arr) => {
        const item = { ...curr };

        if (idx === 0 || arr[idx - 1].grupo !== curr.grupo) {
          item.isFirstInGroup = true;

          item.rowSpan = arr.slice(idx).filter(i => i.grupo === curr.grupo).length;
        }
        
        acc.push(item);
        return acc;
      }, []);

      const mockResponse: AIResponse = {
        raci: processedData
      };

      setResponse(mockResponse);
      const aiResponse = 'Aqui está a matriz RACI baseada na sua entrada.';
      setMessages(prev => [...prev, { role: 'ai', content: truncateMessage(aiResponse) }]);
    } catch {
      setError('Falha ao gerar resposta. Por favor, tente novamente.');
      setMessages(prev => [...prev, { role: 'ai', content: 'Desculpe, encontrei um erro. Por favor, tente novamente.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, error, response, generateResponse, messages };
}

