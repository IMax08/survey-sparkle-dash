import { useState } from "react";
import { MessageCircle, X, Send, Phone, Mail, Bot } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

interface ChatMessage {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      content: 'Olá! Eu sou o Agente Survey, seu assistente virtual. Como posso ajudar você hoje?',
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');

  console.log('[Dashboard] ChatBot rendered', { isOpen, messageCount: messages.length });

  const sendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');

    // Simulate bot response
    setTimeout(() => {
      const botResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: getBotResponse(inputValue),
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  const getBotResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    if (input.includes('inspeção') || input.includes('inspecao')) {
      return 'Posso ajudar com informações sobre inspeções! Você pode agendar novas inspeções, consultar o status das existentes ou gerar relatórios. O que você gostaria de fazer?';
    }
    
    if (input.includes('relatório') || input.includes('relatorio')) {
      return 'Para relatórios, você pode acessar a seção "Relatórios" no menu lateral. Lá você encontrará todos os relatórios gerados e poderá criar novos. Precisa de ajuda com algo específico?';
    }
    
    if (input.includes('agenda')) {
      return 'Na agenda você pode visualizar todas as suas inspeções programadas. Quer que eu te mostre as próximas inspeções agendadas?';
    }
    
    if (input.includes('mapa')) {
      return 'O mapa mostra a localização de todas as suas inspeções. Você pode filtrar por cliente, status ou tipo. Gostaria de saber mais sobre alguma inspeção específica?';
    }
    
    return 'Entendo! Posso ajudar com informações sobre inspeções, relatórios, agenda e muito mais. Você também pode entrar em contato conosco pelos botões abaixo para suporte mais detalhado.';
  };

  const quickActions = [
    { label: 'Agendar Inspeção', action: () => console.log('Schedule inspection') },
    { label: 'Ver Relatórios', action: () => console.log('View reports') },
    { label: 'Status Inspeções', action: () => console.log('Check status') },
    { label: 'Ajuda Geral', action: () => console.log('General help') }
  ];

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-primary hover:bg-primary-hover 
                   shadow-premium z-50 animate-bounce-in group"
        size="icon"
      >
        <MessageCircle className="w-6 h-6 text-primary-foreground group-hover:scale-110 transition-transform duration-200" />
      </Button>
    );
  }

  return (
    <Card className="fixed bottom-6 right-6 w-96 h-[500px] bg-card border-border shadow-premium z-50 
                     animate-bounce-in flex flex-col overflow-hidden">
      {/* Header */}
      <div className="p-4 bg-primary text-primary-foreground flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-primary-foreground/20 rounded-full flex items-center justify-center">
            <Bot className="w-4 h-4 text-primary-foreground" />
          </div>
          <div>
            <h3 className="font-semibold text-sm">Agente Survey</h3>
            <p className="text-xs opacity-90">Assistente Virtual</p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsOpen(false)}
          className="w-8 h-8 text-primary-foreground hover:bg-primary-foreground/20"
        >
          <X className="w-4 h-4" />
        </Button>
      </div>

      {/* Messages */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`
              max-w-[80%] px-3 py-2 rounded-lg text-sm
              ${message.sender === 'user' 
                ? 'bg-primary text-primary-foreground' 
                : 'bg-muted text-foreground'
              }
            `}>
              {message.content}
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="p-4 border-t border-border">
        <div className="flex flex-wrap gap-2 mb-3">
          {quickActions.map((action, index) => (
            <Badge
              key={index}
              variant="secondary"
              className="cursor-pointer hover:bg-primary hover:text-primary-foreground 
                         transition-colors duration-200 text-xs px-2 py-1"
              onClick={action.action}
            >
              {action.label}
            </Badge>
          ))}
        </div>

        {/* Contact Options */}
        <div className="flex space-x-2 mb-3">
          <Button
            variant="outline"
            size="sm"
            className="flex-1 text-xs"
            onClick={() => window.open('https://wa.me/5511999999999', '_blank')}
          >
            <Phone className="w-3 h-3 mr-1" />
            WhatsApp
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex-1 text-xs"
            onClick={() => window.open('mailto:contato@survey4.com', '_blank')}
          >
            <Mail className="w-3 h-3 mr-1" />
            Email
          </Button>
        </div>

        {/* Input */}
        <div className="flex space-x-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Digite sua mensagem..."
            className="flex-1 text-sm"
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
          />
          <Button
            onClick={sendMessage}
            size="icon"
            className="w-8 h-8"
            disabled={!inputValue.trim()}
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default ChatBot;