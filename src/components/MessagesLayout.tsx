import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Send, Paperclip, Smile, MoreVertical, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Message {
  id: number;
  text: string;
  sender: "user" | "other";
  timestamp: Date;
  status?: "sending" | "delivered" | "read";
}

interface Conversation {
  id: number;
  name: string;
  avatar: string;
  lastMessage: string;
  timestamp: string;
  unread: number;
  online: boolean;
}

interface MessagesLayoutProps {
  onBack: () => void;
  selectedConversation?: number;
}

const mockConversations: Conversation[] = [
  {
    id: 1,
    name: "Tacos El Rey",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=taco",
    lastMessage: "¡Tu pedido está listo!",
    timestamp: "Hace 5 min",
    unread: 2,
    online: true
  },
  {
    id: 2,
    name: "Pizza Lovers",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=pizza",
    lastMessage: "Gracias por tu preferencia",
    timestamp: "Hace 1 hora",
    unread: 0,
    online: false
  }
];

const mockMessages: Message[] = [
  {
    id: 1,
    text: "Hola, ¿tienen disponibilidad para hoy?",
    sender: "user",
    timestamp: new Date(Date.now() - 3600000),
    status: "read"
  },
  {
    id: 2,
    text: "¡Claro que sí! Tenemos espacio a partir de las 7pm",
    sender: "other",
    timestamp: new Date(Date.now() - 3500000),
    status: "read"
  },
  {
    id: 3,
    text: "Perfecto, ¿puedo hacer un pedido especial?",
    sender: "user",
    timestamp: new Date(Date.now() - 3400000),
    status: "read"
  },
  {
    id: 4,
    text: "Por supuesto, dime qué necesitas",
    sender: "other",
    timestamp: new Date(Date.now() - 3300000),
    status: "read"
  }
];

const MessagesLayout = ({ onBack, selectedConversation }: MessagesLayoutProps) => {
  const [view, setView] = useState<"inbox" | "chat">(selectedConversation ? "chat" : "inbox");
  const [messages, setMessages] = useState(mockMessages);
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  // Simulate typing indicator
  useEffect(() => {
    if (newMessage.length > 0) {
      setIsTyping(true);
      const timer = setTimeout(() => setIsTyping(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [newMessage]);

  const handleSend = () => {
    if (!newMessage.trim()) return;

    const message: Message = {
      id: messages.length + 1,
      text: newMessage,
      sender: "user",
      timestamp: new Date(),
      status: "sending"
    };

    setMessages([...messages, message]);
    setNewMessage("");

    // Simulate delivery
    setTimeout(() => {
      setMessages(prev =>
        prev.map(m => m.id === message.id ? { ...m, status: "delivered" } : m)
      );
    }, 500);
  };

  const filteredConversations = mockConversations.filter(conv =>
    conv.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (view === "inbox") {
    return (
      <div className="fixed inset-0 z-30 bg-background">
        {/* Header */}
        <div className="flex items-center gap-4 p-4 border-b border-border">
          <motion.button
            onClick={onBack}
            className="w-10 h-10 rounded-full bg-muted flex items-center justify-center"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </motion.button>
          <h2 className="text-xl font-bold text-foreground">Mensajes</h2>
        </div>

        {/* Search */}
        <div className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Buscar conversaciones..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Conversations List */}
        <ScrollArea className="h-[calc(100vh-140px)]">
          <div className="space-y-1 px-2">
            {filteredConversations.map((conv, index) => (
              <motion.button
                key={conv.id}
                onClick={() => setView("chat")}
                className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-muted transition-colors"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="relative">
                  <img
                    src={conv.avatar}
                    alt={conv.name}
                    className="w-14 h-14 rounded-full"
                  />
                  {conv.online && (
                    <div className="absolute bottom-0 right-0 w-4 h-4 bg-primary rounded-full border-2 border-background" />
                  )}
                </div>

                <div className="flex-1 min-w-0 text-left">
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-semibold text-foreground truncate">
                      {conv.name}
                    </p>
                    <span className="text-xs text-muted-foreground flex-shrink-0 ml-2">
                      {conv.timestamp}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground truncate">
                    {conv.lastMessage}
                  </p>
                </div>

                {conv.unread > 0 && (
                  <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                    {conv.unread}
                  </div>
                )}
              </motion.button>
            ))}
          </div>
        </ScrollArea>
      </div>
    );
  }

  // Chat View
  return (
    <motion.div
      className="fixed inset-0 z-30 bg-background flex flex-col"
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ type: "spring", damping: 25, stiffness: 200 }}
    >
      {/* Chat Header */}
      <div className="flex items-center gap-4 p-4 border-b border-border">
        <motion.button
          onClick={() => setView("inbox")}
          className="w-10 h-10 rounded-full bg-muted flex items-center justify-center"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </motion.button>

        <div className="flex items-center gap-3 flex-1">
          <div className="relative">
            <img
              src={mockConversations[0].avatar}
              alt={mockConversations[0].name}
              className="w-10 h-10 rounded-full"
            />
            {mockConversations[0].online && (
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-primary rounded-full border-2 border-background" />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-foreground">{mockConversations[0].name}</p>
            <p className="text-xs text-muted-foreground">
              {isTyping ? "Escribiendo..." : "En línea"}
            </p>
          </div>
        </div>

        <button className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
          <MoreVertical className="w-5 h-5 text-foreground" />
        </button>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-4" ref={scrollRef}>
        <div className="space-y-4">
          {messages.map((message, index) => (
            <motion.div
              key={message.id}
              className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div
                className={`max-w-[75%] rounded-2xl px-4 py-2 ${
                  message.sender === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-foreground"
                }`}
              >
                <p className="text-sm">{message.text}</p>
                <div className="flex items-center gap-1 mt-1">
                  <span className="text-xs opacity-70">
                    {message.timestamp.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit"
                    })}
                  </span>
                  {message.sender === "user" && message.status && (
                    <span className="text-xs opacity-70">
                      {message.status === "read" ? "✓✓" : "✓"}
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </ScrollArea>

      {/* Composer */}
      <div className="p-4 border-t border-border">
        <div className="flex items-center gap-2">
          <motion.button
            className="w-10 h-10 rounded-full bg-muted flex items-center justify-center"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Paperclip className="w-5 h-5 text-foreground" />
          </motion.button>

          <div className="flex-1 relative">
            <Input
              placeholder="Escribe un mensaje..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              className="pr-10"
            />
            <button className="absolute right-2 top-1/2 -translate-y-1/2">
              <Smile className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>

          <motion.button
            onClick={handleSend}
            className="w-12 h-12 rounded-full bg-primary flex items-center justify-center"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            disabled={!newMessage.trim()}
          >
            <Send className="w-5 h-5 text-primary-foreground" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default MessagesLayout;
