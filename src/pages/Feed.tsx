import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Home, Bell, ShoppingCart, MessageSquare, User, 
  Heart, Share2, Bookmark, Music, Flame, Plus 
} from "lucide-react";

interface Video {
  id: number;
  username: string;
  description: string;
  music: string;
  likes: number;
  comments: number;
  profileImage: string;
  videoUrl: string;
}

const mockVideos: Video[] = [
  {
    id: 1,
    username: "@tacoselrey",
    description: "Los mejores tacos al pastor de la ciudad 🌮✨ #tacos #comida #cdmx",
    music: "Sonido Original - Tacos El Rey",
    likes: 12500,
    comments: 340,
    profileImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=taco",
    videoUrl: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400&h=800&fit=crop"
  },
  {
    id: 2,
    username: "@pizzalovers",
    description: "Pizza artesanal con masa madre 🍕 Recién salida del horno",
    music: "Italian Vibes - Chef Antonio",
    likes: 18200,
    comments: 520,
    profileImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=pizza",
    videoUrl: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=800&fit=crop"
  },
  {
    id: 3,
    username: "@sushimaster",
    description: "Sushi rolls premium 🍣 Arte en cada bocado #sushi #japanese",
    music: "Tokyo Nights - Sushi Master",
    likes: 25300,
    comments: 680,
    profileImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=sushi",
    videoUrl: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400&h=800&fit=crop"
  },
  {
    id: 4,
    username: "@burgerhouse",
    description: "Smash burger con doble carne 🍔 Simplemente perfecta",
    music: "Burger Beats - House Special",
    likes: 31400,
    comments: 890,
    profileImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=burger",
    videoUrl: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=800&fit=crop"
  },
  {
    id: 5,
    username: "@pastaparadise",
    description: "Carbonara auténtica italiana 🍝 Receta tradicional",
    music: "Roma Nights - Pasta Paradise",
    likes: 21800,
    comments: 450,
    profileImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=pasta",
    videoUrl: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400&h=800&fit=crop"
  },
  {
    id: 6,
    username: "@dessertheaven",
    description: "Cheesecake de fresa 🍰 El postre perfecto",
    music: "Sweet Dreams - Dessert Heaven",
    likes: 19500,
    comments: 380,
    profileImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=dessert",
    videoUrl: "https://images.unsplash.com/photo-1524351199678-941a58a3df50?w=400&h=800&fit=crop"
  },
  {
    id: 7,
    username: "@ramenspot",
    description: "Ramen picante con huevo perfecto 🍜 #ramen #spicy",
    music: "Asian Fusion - Ramen Spot",
    likes: 28700,
    comments: 720,
    profileImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=ramen",
    videoUrl: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&h=800&fit=crop"
  },
  {
    id: 8,
    username: "@wingsworld",
    description: "Alitas BBQ con salsa secreta 🔥🍗 Nivel experto",
    music: "Spicy Beats - Wings World",
    likes: 23400,
    comments: 610,
    profileImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=wings",
    videoUrl: "https://images.unsplash.com/photo-1608039829572-78524f79c4c7?w=400&h=800&fit=crop"
  },
  {
    id: 9,
    username: "@smoothiebar",
    description: "Smoothie bowl tropical 🥥🍓 Energía natural",
    music: "Tropical Vibes - Smoothie Bar",
    likes: 16200,
    comments: 290,
    profileImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=smoothie",
    videoUrl: "https://images.unsplash.com/photo-1590301157890-4810ed352733?w=400&h=800&fit=crop"
  },
  {
    id: 10,
    username: "@bbqkings",
    description: "Costillas ahumadas 12 horas 🔥 BBQ auténtico",
    music: "Smokey Beats - BBQ Kings",
    likes: 34500,
    comments: 980,
    profileImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=bbq",
    videoUrl: "https://images.unsplash.com/photo-1544025162-d76694265947?w=400&h=800&fit=crop"
  }
];

const Feed = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"following" | "foryou">("foryou");
  const [currentVideo, setCurrentVideo] = useState(0);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [liked, setLiked] = useState<number[]>([]);
  const [following, setFollowing] = useState<number[]>([]);
  const videoRefs = useRef<(HTMLDivElement | null)[]>([]);

  const handleRedirect = () => {
    navigate("/home");
  };

  const handleLike = (videoId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setLiked(prev => 
      prev.includes(videoId) 
        ? prev.filter(id => id !== videoId)
        : [...prev, videoId]
    );
  };

  const handleFollow = (videoId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setFollowing(prev => 
      prev.includes(videoId) 
        ? prev.filter(id => id !== videoId)
        : [...prev, videoId]
    );
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = videoRefs.current.findIndex(ref => ref === entry.target);
            if (index !== -1) {
              setCurrentVideo(index);
            }
          }
        });
      },
      { threshold: 0.8 }
    );

    videoRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="fixed inset-0 bg-black overflow-hidden">
      {/* Top Navigation */}
      <div className="absolute top-0 left-0 right-0 z-20 pt-safe bg-gradient-to-b from-black/60 to-transparent">
        <div className="flex justify-center gap-8 px-4 py-4">
          <button
            onClick={() => setActiveTab("following")}
            className={`text-lg font-semibold transition-colors ${
              activeTab === "following" ? "text-white" : "text-white/60"
            }`}
          >
            Siguiendo
          </button>
          <button
            onClick={() => setActiveTab("foryou")}
            className={`text-lg font-semibold transition-colors ${
              activeTab === "foryou" ? "text-white" : "text-white/60"
            }`}
          >
            Para Ti
          </button>
        </div>
      </div>

      {/* Video Feed */}
      <ScrollArea className="h-full snap-y snap-mandatory">
        <div className="relative">
          {mockVideos.map((video, index) => (
            <div
              key={video.id}
              ref={(el) => (videoRefs.current[index] = el)}
              className="relative h-screen w-full snap-start snap-always"
            >
              {/* Video Background */}
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${video.videoUrl})` }}
              >
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40" />
              </div>

              {/* Content Overlay */}
              <div className="absolute inset-0 flex">
                {/* Left side - Info */}
                <div className="flex-1 flex flex-col justify-end p-4 pb-24">
                  <div className="space-y-3">
                    <p className="text-white font-semibold text-lg">
                      {video.username}
                    </p>
                    <p className="text-white text-sm leading-relaxed max-w-xs">
                      {video.description}
                    </p>
                    <div className="flex items-center gap-2">
                      <Music className="w-4 h-4 text-white" />
                      <p className="text-white text-xs">{video.music}</p>
                    </div>
                  </div>
                </div>

                {/* Right side - Actions */}
                <div className="flex flex-col justify-end items-center gap-6 p-4 pb-24">
                  {/* Profile with follow */}
                  <div className="relative">
                    <div 
                      className="w-12 h-12 rounded-full border-2 border-white overflow-hidden cursor-pointer"
                      onClick={handleRedirect}
                    >
                      <img src={video.profileImage} alt={video.username} className="w-full h-full object-cover" />
                    </div>
                    {!following.includes(video.id) && (
                      <button
                        onClick={(e) => handleFollow(video.id, e)}
                        className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-6 h-6 bg-primary rounded-full flex items-center justify-center"
                      >
                        <Plus className="w-4 h-4 text-primary-foreground" />
                      </button>
                    )}
                  </div>

                  {/* Fire button */}
                  <button
                    onClick={handleRedirect}
                    className="flex flex-col items-center gap-1"
                  >
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary via-accent to-primary flex items-center justify-center">
                      <Flame className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-white text-xs font-semibold">Ver</span>
                  </button>

                  {/* Like */}
                  <button
                    onClick={(e) => handleLike(video.id, e)}
                    className="flex flex-col items-center gap-1"
                  >
                    <Heart 
                      className={`w-8 h-8 transition-colors ${
                        liked.includes(video.id) ? 'fill-red-500 text-red-500' : 'text-white'
                      }`}
                    />
                    <span className="text-white text-xs">
                      {(video.likes + (liked.includes(video.id) ? 1 : 0)).toLocaleString()}
                    </span>
                  </button>

                  {/* Comments */}
                  <button onClick={handleRedirect} className="flex flex-col items-center gap-1">
                    <MessageSquare className="w-8 h-8 text-white" />
                    <span className="text-white text-xs">{video.comments}</span>
                  </button>

                  {/* Save */}
                  <button onClick={handleRedirect} className="flex flex-col items-center gap-1">
                    <Bookmark className="w-8 h-8 text-white" />
                  </button>

                  {/* Share */}
                  <button onClick={handleRedirect} className="flex flex-col items-center gap-1">
                    <Share2 className="w-8 h-8 text-white" />
                  </button>

                  {/* Music spinner */}
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent animate-spin-slow flex items-center justify-center">
                    <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center">
                      <Music className="w-4 h-4 text-white" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      {/* Bottom Navigation */}
      <div className="absolute bottom-0 left-0 right-0 z-20 bg-black/90 backdrop-blur-lg border-t border-white/10">
        <div className="flex justify-around items-center px-4 py-3 pb-safe">
          <button onClick={handleRedirect} className="flex flex-col items-center gap-1 min-w-[60px]">
            <Home className="w-6 h-6 text-white" />
            <span className="text-white text-xs">Inicio</span>
          </button>
          
          <button onClick={handleRedirect} className="flex flex-col items-center gap-1 min-w-[60px]">
            <Bell className="w-6 h-6 text-white" />
            <span className="text-white text-xs">Notif</span>
          </button>

          <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
            <SheetTrigger asChild>
              <button className="flex flex-col items-center gap-1 -mt-6 min-w-[60px]">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary via-accent to-primary flex items-center justify-center shadow-glow">
                  <ShoppingCart className="w-7 h-7 text-white" />
                </div>
              </button>
            </SheetTrigger>
            <SheetContent side="bottom" className="h-[85vh] bg-background rounded-t-3xl p-0">
              <DeliveryInterface onNavigate={handleRedirect} />
            </SheetContent>
          </Sheet>

          <button onClick={handleRedirect} className="flex flex-col items-center gap-1 min-w-[60px]">
            <MessageSquare className="w-6 h-6 text-white" />
            <span className="text-white text-xs">Mensajes</span>
          </button>

          <button onClick={handleRedirect} className="flex flex-col items-center gap-1 min-w-[60px]">
            <User className="w-6 h-6 text-white" />
            <span className="text-white text-xs">Perfil</span>
          </button>
        </div>
      </div>
    </div>
  );
};

const DeliveryInterface = ({ onNavigate }: { onNavigate: () => void }) => {
  const [cartItems, setCartItems] = useState([
    { id: 1, name: "Truffle Pasta Combo", description: "Pasta + Garlic Bread + Drink", price: 24.99, quantity: 1, image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=200&h=200&fit=crop" },
    { id: 2, name: "Crispy Calamari", description: "Fresh squid rings with marinara sauce", price: 12.99, quantity: 1, image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=200&h=200&fit=crop" },
  ]);

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const updateQuantity = (id: number, change: number) => {
    setCartItems(items =>
      items.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(0, item.quantity + change) }
          : item
      ).filter(item => item.quantity > 0)
    );
  };

  return (
    <div className="h-full flex flex-col bg-gradient-to-b from-background to-background/95">
      {/* Header */}
      <div className="p-6 pb-4">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-2xl font-bold text-foreground">Tu Pedido</h2>
          <div className="flex items-center gap-2 text-primary">
            <ShoppingCart className="w-5 h-5" />
            <span className="font-semibold">{cartItems.length} items</span>
          </div>
        </div>
        <p className="text-muted-foreground">Revisá y confirmá tu orden</p>
      </div>

      {/* Cart Items */}
      <ScrollArea className="flex-1 px-6">
        <div className="space-y-4 pb-6">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="bg-card rounded-2xl p-4 border border-border flex gap-4 hover:border-primary/50 transition-colors"
            >
              <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 bg-muted">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
              </div>
              
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-foreground truncate">{item.name}</h3>
                <p className="text-sm text-muted-foreground line-clamp-1">{item.description}</p>
                <p className="text-lg font-bold text-primary mt-1">${item.price}</p>
              </div>

              <div className="flex flex-col justify-between items-end">
                <div className="flex items-center gap-2 bg-muted rounded-full p-1">
                  <button
                    onClick={() => updateQuantity(item.id, -1)}
                    className="w-7 h-7 rounded-full bg-background hover:bg-primary hover:text-primary-foreground transition-colors flex items-center justify-center font-bold"
                  >
                    -
                  </button>
                  <span className="w-6 text-center font-semibold">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, 1)}
                    className="w-7 h-7 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors flex items-center justify-center font-bold"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          ))}

          {/* Recommended */}
          <div className="pt-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Recomendados para ti</h3>
            <div className="grid grid-cols-2 gap-3">
              {[
                { name: "Bruschetta Trio", price: 8.99, image: "https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?w=200&h=200&fit=crop" },
                { name: "Tiramisu", price: 7.99, image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=200&h=200&fit=crop" },
              ].map((item, i) => (
                <div key={i} className="bg-card rounded-xl p-3 border border-border hover:border-primary/50 transition-colors cursor-pointer" onClick={onNavigate}>
                  <div className="aspect-square rounded-lg overflow-hidden mb-2 bg-muted">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <p className="font-medium text-sm text-foreground truncate">{item.name}</p>
                  <p className="text-primary font-bold text-sm">${item.price}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </ScrollArea>

      {/* Footer */}
      <div className="p-6 pt-4 bg-card border-t border-border space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-muted-foreground">Subtotal</span>
          <span className="font-semibold text-foreground">${total.toFixed(2)}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-muted-foreground">Envío</span>
          <span className="font-semibold text-foreground">$2.99</span>
        </div>
        <div className="h-px bg-border" />
        <div className="flex justify-between items-center text-lg">
          <span className="font-bold text-foreground">Total</span>
          <span className="font-bold text-primary">${(total + 2.99).toFixed(2)}</span>
        </div>

        <Button
          onClick={onNavigate}
          size="lg"
          className="w-full h-14 text-lg font-semibold rounded-2xl bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity"
        >
          Confirmar Pedido
        </Button>
      </div>
    </div>
  );
};

export default Feed;
