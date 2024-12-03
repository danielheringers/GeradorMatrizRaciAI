'use client'

import { useState, useCallback } from 'react';
import { useAI } from '../hooks/useAI';
import { AIPrompt } from '../components/AIPrompt';
import { RACIMatrix } from '../components/RACIMatrix';
import { AreaInfoForm } from '../components/AreaInfoForm';
import { AreaInfoCard } from '../components/AreaInfoCard';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"
import { motion, AnimatePresence } from 'framer-motion';
import { ChatMessage } from '../types/types';

interface AreaInfo {
  name: string;
  responsibleName: string;
  responsibleEmail: string;
  analystName: string;
  analystEmail: string;
}

const areas = ['Suprimentos', 'RH', 'Financeiro', 'Jurídico', 'Tributário', 'Tecnologia', 'Gestão/Estratégico'];

export default function Home() {
  const { isLoading, error, response, generateResponse } = useAI();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [currentAreaIndex, setCurrentAreaIndex] = useState(-1);
  const [areaInfos, setAreaInfos] = useState<AreaInfo[]>([]);
  const [showMatrix, setShowMatrix] = useState(false);
  const [showForm, setShowForm] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [showInitialMessage, setShowInitialMessage] = useState(false);
  const [showCards, setShowCards] = useState(true);

  const handlePromptSubmit = useCallback((prompt: string) => {
    setMessages(prev => [...prev, { role: 'user', content: prompt }]);
    
    if (prompt.toLowerCase() === 'iniciar') {
      setShowInitialMessage(true);
      setMessages(prev => [...prev, { 
        role: 'system', 
        content: "Para montar sua matriz RACI, eu preciso de algumas informações. Enquanto trabalho em segundo plano, por favor preencha os formulários que irão aparecer." 
      }]);
      
      setTimeout(() => {
        setCurrentAreaIndex(0);
        setShowForm(true);
      }, 5000);
    }
  }, [setMessages, setCurrentAreaIndex, setShowForm]);

  const handleAreaInfoComplete = useCallback((info: AreaInfo) => {
    setAreaInfos(prev => [...prev, { ...info, name: areas[currentAreaIndex] }]);
    
    if (currentAreaIndex < areas.length - 1) {
      setCurrentAreaIndex(prev => prev + 1);
    } else {
      setShowForm(false);
      setMessages(prev => [...prev, { role: 'system', content: "Finalizando matriz..." }]);
      setTimeout(() => {
        setShowCards(false);
        setTimeout(() => {
          setShowMatrix(true);
          generateResponse("Gerar matriz RACI");
        }, 500);
      }, 1000);
    }
  }, [currentAreaIndex, setMessages, setShowMatrix, generateResponse]);

  const handleFormClose = useCallback(() => {
    setShowForm(false);
    setMessages(prev => [...prev, { role: 'system', content: "Formulário fechado. Digite 'Continuar' para prosseguir ou 'Iniciar' para recomeçar." }]);
  }, [setMessages]);

  return (
    <div className="container max-w-[1920px] mx-auto p-4 h-[calc(100vh-4rem)]">
      <h1 className="text-2xl font-bold mb-4">Gerador de Matriz RACI Assistido por IA</h1>
      <ResizablePanelGroup direction="horizontal" className="min-h-[calc(100vh-8rem)] rounded-lg border">
        <ResizablePanel defaultSize={50} minSize={30}>
          <div className="flex flex-col h-full p-4 relative">
            <h2 className="text-xl font-semibold mb-2">Prompt de IA</h2>
            <div className="flex-grow overflow-hidden">
              <AIPrompt onSubmit={handlePromptSubmit} isLoading={isLoading} messages={messages} />
            </div>
            <AnimatePresence>
              {showForm && currentAreaIndex < areas.length && (
                <motion.div
                  key="form"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -50 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 bg-white bg-opacity-90 flex items-center justify-center p-4 z-10"
                >
                  <AreaInfoForm
                    areaName={areas[currentAreaIndex]}
                    onComplete={handleAreaInfoComplete}
                    onClose={handleFormClose}
                  />
                </motion.div>
              )}
            </AnimatePresence>
            {error && <p className="text-red-500 mt-2">{error}</p>}
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={50} minSize={30}>
          <div className="flex flex-col h-full p-4">
            <h2 className="text-xl font-semibold mb-2">Prévia da Matriz RACI</h2>
            <div className="flex-grow overflow-hidden">
              <AnimatePresence>
                {showCards && (
                  <motion.div
                    className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4"
                    exit={{ x: "100%", opacity: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    {areaInfos.map((info) => (
                      <motion.div
                        key={info.name}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.5 }}
                      >
                        <AreaInfoCard info={info} />
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
              <AnimatePresence>
                {showMatrix && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    {response ? (
                      <RACIMatrix data={response.raci} areaInfos={areaInfos} />
                    ) : (
                      <p>Gerando matriz RACI...</p>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}

