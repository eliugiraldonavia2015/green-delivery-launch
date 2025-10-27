import { motion } from "framer-motion";
import { ArrowLeft, Heart, MessageSquare, UserPlus, Flame } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface NotificationsProps {
  onBack: () => void;
}

interface Notification {
  id: number;
  type: "like" | "comment" | "follow" | "order";
  user: string;
  avatar: string;
  message: string;
  time: string;
  read: boolean;
  image?: string;
}

const mockNotifications: Notification[] = [
  {
    id: 1,
    type: "like",
    user: "@pizzalovers",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=pizza",
    message: "le gustó tu publicación",
    time: "Hace 5 min",
    read: false,
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=100&h=100&fit=crop"
  },
  {
    id: 2,
    type: "follow",
    user: "@sushimaster",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sushi",
    message: "comenzó a seguirte",
    time: "Hace 15 min",
    read: false
  },
  {
    id: 3,
    type: "comment",
    user: "@burgerhouse",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=burger",
    message: "comentó: '¡Se ve delicioso! 🤤'",
    time: "Hace 1 hora",
    read: true,
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=100&h=100&fit=crop"
  },
  {
    id: 4,
    type: "order",
    user: "Pedido confirmado",
    avatar: "https://api.dicebear.com/7.x/shapes/svg?seed=order",
    message: "Tu pedido está en camino",
    time: "Hace 2 horas",
    read: true
  },
  {
    id: 5,
    type: "like",
    user: "@tacoselrey",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=taco",
    message: "le gustó tu publicación",
    time: "Hace 3 horas",
    read: true,
    image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=100&h=100&fit=crop"
  }
];

const Notifications = ({ onBack }: NotificationsProps) => {
  const getIcon = (type: Notification["type"]) => {
    switch (type) {
      case "like":
        return <Heart className="w-4 h-4 fill-accent text-accent" />;
      case "comment":
        return <MessageSquare className="w-4 h-4 text-primary" />;
      case "follow":
        return <UserPlus className="w-4 h-4 text-primary" />;
      case "order":
        return <Flame className="w-4 h-4 text-accent" />;
    }
  };

  return (
    <div className="fixed inset-0 z-40 bg-background">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="flex items-center gap-4 p-4">
          <button
            onClick={onBack}
            className="w-10 h-10 rounded-full bg-card flex items-center justify-center hover:bg-muted transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h2 className="font-bold text-lg">Notificaciones</h2>
        </div>
      </div>

      {/* Notifications List */}
      <ScrollArea className="h-[calc(100vh-73px)]">
        <div className="divide-y divide-border">
          {mockNotifications.map((notification) => (
            <motion.div
              key={notification.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className={`flex items-start gap-3 p-4 hover:bg-card transition-colors cursor-pointer ${
                !notification.read ? "bg-primary/5" : ""
              }`}
            >
              {/* Avatar with icon badge */}
              <div className="relative flex-shrink-0">
                <img
                  src={notification.avatar}
                  alt={notification.user}
                  className="w-12 h-12 rounded-full"
                />
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-background rounded-full flex items-center justify-center border-2 border-background">
                  {getIcon(notification.type)}
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <p className="text-sm">
                  <span className="font-semibold">{notification.user}</span>{" "}
                  <span className="text-muted-foreground">{notification.message}</span>
                </p>
                <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
              </div>

              {/* Thumbnail */}
              {notification.image && (
                <img
                  src={notification.image}
                  alt=""
                  className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
                />
              )}

              {/* Unread indicator */}
              {!notification.read && (
                <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0 mt-2" />
              )}
            </motion.div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default Notifications;
