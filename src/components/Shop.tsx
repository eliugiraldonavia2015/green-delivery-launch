import { useState } from "react";
import { motion } from "framer-motion";
import { X, MapPin, Search, Mic, SlidersHorizontal, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ShopProps {
  onClose: () => void;
}

const categories = [
  "Burgers", "Pizza", "Saludable", "Carnes", "Drinks", "Sushi", "Mexicana", "Italiana"
];

const categoryIcons = [
  { emoji: "🍔", name: "Burgers" },
  { emoji: "🍕", name: "Pizza" },
  { emoji: "🥗", name: "Saludable" },
  { emoji: "🥩", name: "Carnes" },
  { emoji: "🍹", name: "Drinks" },
  { emoji: "🍣", name: "Sushi" },
  { emoji: "🌮", name: "Mexicana" },
  { emoji: "🍝", name: "Italiana" },
];

const popularItems = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  name: `Plato Especial ${i + 1}`,
  restaurant: `Restaurante ${i + 1}`,
  image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c",
  rating: (4 + Math.random()).toFixed(1),
  discount: Math.floor(Math.random() * 30 + 10),
  price: (15 + Math.random() * 20).toFixed(2),
  deliveryTime: `${20 + Math.floor(Math.random() * 20)} min`
}));

const Shop = ({ onClose }: ShopProps) => {
  const [selectedCategory, setSelectedCategory] = useState("Burgers");

  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ type: "spring", damping: 30, stiffness: 300 }}
      className="fixed inset-0 z-50 bg-background overflow-y-auto"
    >
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-md border-b border-border px-4 py-3">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium">Tu ubicación</span>
          </div>
          <span className="text-xl font-bold">Foodtook</span>
        </div>

        {/* Search Bar */}
        <div className="flex items-center gap-2">
          <div className="flex-1 flex items-center gap-2 bg-card rounded-full px-4 py-2.5 border border-border">
            <Search className="w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Buscar restaurantes..."
              className="flex-1 bg-transparent outline-none text-sm"
            />
            <Mic className="w-5 h-5 text-muted-foreground" />
          </div>
          <button className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center">
            <SlidersHorizontal className="w-5 h-5 text-foreground" />
          </button>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="px-4 py-3 overflow-x-auto no-scrollbar">
        <div className="flex gap-2 min-w-max">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedCategory === cat
                  ? "bg-primary text-primary-foreground"
                  : "bg-card text-foreground hover:bg-muted"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Promo Banner */}
      <div className="px-4 mb-4">
        <div className="relative h-40 rounded-3xl overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1"
            alt="Promo"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent flex flex-col justify-center px-6">
            <p className="text-3xl font-bold text-white mb-1">Get 50% Off</p>
            <p className="text-sm text-white/90 mb-3">en tu primera orden sobre $25</p>
            <Button className="w-32 bg-primary hover:bg-primary/90 text-primary-foreground">
              Ordenar ahora
            </Button>
          </div>
        </div>
      </div>

      {/* Category Icons */}
      <div className="px-4 mb-6 overflow-x-auto no-scrollbar">
        <div className="flex gap-4 min-w-max">
          {categoryIcons.map((cat) => (
            <button
              key={cat.name}
              className="flex flex-col items-center gap-2 min-w-[70px]"
            >
              <div className="w-16 h-16 rounded-2xl bg-card border border-border flex items-center justify-center text-3xl hover:scale-105 transition-transform">
                {cat.emoji}
              </div>
              <span className="text-xs text-muted-foreground">{cat.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Popular Section */}
      <div className="px-4 pb-24">
        <h2 className="text-xl font-bold mb-4">Popular cerca de ti</h2>
        <div className="grid grid-cols-2 gap-3">
          {popularItems.map((item) => (
            <motion.div
              key={item.id}
              whileTap={{ scale: 0.95 }}
              className="bg-card rounded-2xl overflow-hidden border border-border"
            >
              <div className="relative h-32">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1">
                  <Star className="w-3 h-3 text-accent fill-accent" />
                  <span className="text-xs text-white font-semibold">{item.rating}</span>
                </div>
                <div className="absolute bottom-2 left-2 bg-accent text-accent-foreground rounded-full px-2 py-1 text-xs font-bold">
                  {item.discount}% off
                </div>
              </div>
              <div className="p-3">
                <h3 className="font-semibold text-sm mb-1 truncate">{item.name}</h3>
                <p className="text-xs text-muted-foreground mb-2 truncate">{item.restaurant}</p>
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-primary">${item.price}</span>
                  <span className="text-muted-foreground">{item.deliveryTime}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Close Button */}
      <button
        onClick={onClose}
        className="fixed top-4 right-4 w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center z-20"
      >
        <X className="w-5 h-5" />
      </button>

      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </motion.div>
  );
};

export default Shop;