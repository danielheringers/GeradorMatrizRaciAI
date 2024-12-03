import { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card } from "@/components/ui/card"
import { ChatMessage } from '../types/types';
import { motion, AnimatePresence } from 'framer-motion';

interface AIPromptProps {
  onSubmit: (prompt: string) => void;
  isLoading: boolean;
  messages: ChatMessage[];
}

const TypingAnimation = ({ text }: { text: string }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayedText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, 20);

      return () => clearTimeout(timer);
    }
  }, [text, currentIndex]);

  return <span>{displayedText}</span>;
};

export function AIPrompt({ onSubmit, isLoading, messages }: AIPromptProps) {
  const [prompt, setPrompt] = useState('');
  const endOfMessagesRef = useRef<HTMLDivElement>(null);

  const handleSubmit = (e: React.FormEvent | React.KeyboardEvent) => {
    e.preventDefault();
    if (prompt.trim()) {
      console.log("AIPrompt: Enviando prompt:", prompt);
      onSubmit(prompt);
      setPrompt('');
    }
  };

  useEffect(() => {
    console.log("AIPrompt: Mensagens atualizadas:", messages);
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <Card className="flex flex-col h-full p-4">
      <div className="mb-4 text-sm text-muted-foreground">
        Para começar a montar sua matriz RACI, digite &quot;Iniciar&quot; e pressione Enter.
      </div>
      <ScrollArea className="flex-grow mb-4 max-w-full">
        <div className="space-y-4 flex flex-col w-full max-w-full">
          <AnimatePresence>
            {messages.map((message, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className={`p-2 rounded-lg ${
                  message.role === 'user' 
                    ? 'bg-primary text-primary-foreground ml-auto' 
                    : message.role === 'system'
                    ? 'bg-blue-100 text-blue-800 w-full text-left'
                    : 'bg-muted'
                } max-w-[80%] break-words text-sm`}
              >
                <TypingAnimation text={message.content} />
              </motion.div>
            ))}
          </AnimatePresence>
          <div ref={endOfMessagesRef} />
        </div>
      </ScrollArea>
      <form onSubmit={handleSubmit} className="flex space-x-2">
        <Textarea
          placeholder="Digite sua mensagem aqui..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSubmit(e);
            }
          }}
          className="flex-grow resize-none"
          rows={3}
        />
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Enviando...' : 'Enviar'}
        </Button>
      </form>
    </Card>
  );
}

