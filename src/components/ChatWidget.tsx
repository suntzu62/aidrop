import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageCircle, 
  Send, 
  X, 
  Bot, 
  User,
  Phone,
  MessageSquare,
  Clock
} from 'lucide-react';
import { chatService } from '../services/api';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot' | 'agent';
  timestamp: Date;
  channel: 'whatsapp' | 'mercadolivre' | 'internal';
}

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Olá! Sou seu assistente virtual. Como posso ajudar você hoje?',
      sender: 'bot',
      timestamp: new Date(),
      channel: 'internal'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [activeChannel, setActiveChannel] = useState<'whatsapp' | 'mercadolivre' | 'internal'>('internal');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date(),
      channel: activeChannel
    };

    setMessages(prev => [...prev, newMessage]);
    setInputText('');
    setIsTyping(true);

    try {
      // Simulate AI response
      setTimeout(() => {
        const botResponse: Message = {
          id: (Date.now() + 1).toString(),
          text: generateBotResponse(inputText),
          sender: 'bot',
          timestamp: new Date(),
          channel: activeChannel
        };
        
        setMessages(prev => [...prev, botResponse]);
        setIsTyping(false);
      }, 1500);

      // Send to external service if not internal
      if (activeChannel !== 'internal') {
        await chatService.sendMessage(inputText, activeChannel);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setIsTyping(false);
    }
  };

  const generateBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('estoque')) {
      return 'Posso ajudar você com questões de estoque! Verifique o painel de inventário para ver produtos com estoque baixo e recomendações de reposição.';
    }
    
    if (lowerMessage.includes('pedido') || lowerMessage.includes('venda')) {
      return 'Para acompanhar seus pedidos, acesse a seção "Orquestração de Pedidos" no dashboard. Lá você pode ver o status de cada venda em tempo real.';
    }
    
    if (lowerMessage.includes('previsão') || lowerMessage.includes('vendas')) {
      return 'Nossa análise preditiva pode ajudar! Confira o gráfico de previsão de vendas para insights sobre o desempenho futuro do seu negócio.';
    }
    
    if (lowerMessage.includes('whatsapp')) {
      return 'Posso integrar com WhatsApp para automatizar o atendimento aos seus clientes. Quer que eu configure isso para você?';
    }
    
    return 'Entendi! Posso ajudar com gestão de estoque, acompanhamento de pedidos, análises de vendas e muito mais. O que você gostaria de saber especificamente?';
  };

  const getChannelIcon = (channel: string) => {
    switch (channel) {
      case 'whatsapp': return <Phone className="w-4 h-4" />;
      case 'mercadolivre': return <MessageSquare className="w-4 h-4" />;
      default: return <Bot className="w-4 h-4" />;
    }
  };

  const getChannelColor = (channel: string) => {
    switch (channel) {
      case 'whatsapp': return 'bg-green-500';
      case 'mercadolivre': return 'bg-yellow-500';
      default: return 'bg-primary-500';
    }
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-primary-600 text-white rounded-full shadow-lg hover:bg-primary-700 transition-colors z-50 flex items-center justify-center"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 w-96 h-96 bg-white rounded-xl shadow-2xl border border-gray-200 z-40 flex flex-col"
          >
            {/* Header */}
            <div className="p-4 border-b border-gray-200 rounded-t-xl bg-gradient-to-r from-primary-600 to-accent-500">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-medium">Assistente MLBoost</h3>
                    <p className="text-white/80 text-xs">Online agora</p>
                  </div>
                </div>
                
                {/* Channel Selector */}
                <div className="flex items-center space-x-1">
                  {['internal', 'whatsapp', 'mercadolivre'].map((channel) => (
                    <button
                      key={channel}
                      onClick={() => setActiveChannel(channel as any)}
                      className={`p-2 rounded-lg transition-colors ${
                        activeChannel === channel 
                          ? 'bg-white/20 text-white' 
                          : 'text-white/60 hover:text-white hover:bg-white/10'
                      }`}
                      title={channel === 'internal' ? 'Chat Interno' : 
                             channel === 'whatsapp' ? 'WhatsApp' : 'Mercado Livre'}
                    >
                      {getChannelIcon(channel)}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-xs px-4 py-2 rounded-lg ${
                    message.sender === 'user'
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}>
                    <div className="flex items-center space-x-2 mb-1">
                      {message.sender !== 'user' && (
                        <div className={`w-4 h-4 rounded-full ${getChannelColor(message.channel)} flex items-center justify-center`}>
                          {getChannelIcon(message.channel)}
                        </div>
                      )}
                      <span className="text-xs opacity-75">
                        {message.timestamp.toLocaleTimeString('pt-BR', { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </span>
                    </div>
                    <p className="text-sm">{message.text}</p>
                  </div>
                </motion.div>
              ))}
              
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="bg-gray-100 px-4 py-2 rounded-lg">
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </motion.div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-gray-200">
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Digite sua mensagem..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputText.trim() || isTyping}
                  className="p-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
              
              <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
                <span>Canal: {activeChannel === 'internal' ? 'Interno' : 
                             activeChannel === 'whatsapp' ? 'WhatsApp' : 'Mercado Livre'}</span>
                <span className="flex items-center">
                  <Clock className="w-3 h-3 mr-1" />
                  Resposta em ~2min
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatWidget;