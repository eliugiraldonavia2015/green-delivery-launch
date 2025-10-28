import { useState, useRef } from "react";
import { ArrowLeft, ShoppingCart, Plus, Minus, X, Clock, DollarSign, Star, Share2, Bookmark } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { motion, AnimatePresence } from "framer-motion";
import { Textarea } from "@/components/ui/textarea";
import ProductDetailOverlay from "./ProductDetailOverlay";

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  restaurant?: string;
  deliveryTime?: number;
}

interface RestaurantMenuProps {
  restaurant: {
    name: string;
    profileImage: string;
    coverImage?: string;
    location?: string;
    rating?: number;
  };
  onBack: () => void;
  onCheckout: () => void;
  highlightedDishId?: number;
}

const mockMenuItems: MenuItem[] = [
  {
    id: 1,
    name: "Truffle Pasta",
    description: "Pasta cremosa con trufa negra y parmesano",
    price: 18.99,
    image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400&h=300&fit=crop",
    category: "todo"
  },
  {
    id: 2,
    name: "Margherita Pizza",
    description: "Pizza artesanal con mozzarella fresca y albahaca",
    price: 15.99,
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=300&fit=crop",
    category: "popular"
  },
  {
    id: 3,
    name: "Caesar Salad",
    description: "Lechuga romana, crutones y aderezo césar casero",
    price: 9.99,
    image: "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400&h=300&fit=crop",
    category: "entradas"
  },
  {
    id: 4,
    name: "Calamari Fritti",
    description: "Anillos de calamar crujientes con salsa marinara",
    price: 12.99,
    image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=400&h=300&fit=crop",
    category: "entradas"
  },
  {
    id: 5,
    name: "Limonada Natural",
    description: "Refrescante limonada hecha al momento",
    price: 3.99,
    image: "https://images.unsplash.com/photo-1523677011781-c91d1bbe2f9e?w=400&h=300&fit=crop",
    category: "bebidas"
  },
  {
    id: 6,
    name: "Tiramisu",
    description: "Postre italiano clásico con café y mascarpone",
    price: 7.99,
    image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&h=300&fit=crop",
    category: "especiales"
  }
];

const recommendedDishes: MenuItem[] = [
  { id: 101, name: "Burrito Supreme", description: "Con carne, frijoles y queso", price: 11.99, image: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=300&h=300&fit=crop", category: "popular", restaurant: "Burrito House", deliveryTime: 25 },
  { id: 102, name: "Sushi Roll Mix", description: "12 piezas variadas", price: 19.99, image: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=300&h=300&fit=crop", category: "popular", restaurant: "Sushi Master", deliveryTime: 30 },
  { id: 103, name: "BBQ Ribs", description: "Costillas ahumadas con salsa BBQ", price: 24.99, image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=300&h=300&fit=crop", category: "popular", restaurant: "BBQ Kings", deliveryTime: 35 },
  { id: 104, name: "Pad Thai", description: "Fideos tailandeses con camarones", price: 13.99, image: "https://images.unsplash.com/photo-1559314809-0d155014e29e?w=300&h=300&fit=crop", category: "popular", restaurant: "Thai Garden", deliveryTime: 28 },
  { id: 105, name: "Falafel Wrap", description: "Envuelto de falafel con hummus", price: 9.99, image: "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=300&h=300&fit=crop", category: "popular", restaurant: "Mediterranean Delight", deliveryTime: 20 },
  { id: 106, name: "Ramen Bowl", description: "Ramen picante con huevo", price: 14.99, image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=300&h=300&fit=crop", category: "popular", restaurant: "Ramen Spot", deliveryTime: 32 },
  { id: 107, name: "Fish Tacos", description: "Tacos de pescado con salsa", price: 12.99, image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=300&h=300&fit=crop", category: "popular", restaurant: "Taco Paradise", deliveryTime: 22 },
  { id: 108, name: "Greek Salad", description: "Ensalada griega con feta", price: 10.99, image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=300&h=300&fit=crop", category: "popular", restaurant: "Greek Kitchen", deliveryTime: 18 },
  { id: 109, name: "Chicken Wings", description: "Alitas picantes con salsa", price: 13.99, image: "https://images.unsplash.com/photo-1608039829572-78524f79c4c7?w=300&h=300&fit=crop", category: "popular", restaurant: "Wings World", deliveryTime: 26 },
  { id: 110, name: "Poke Bowl", description: "Bowl hawaiano de atún", price: 16.99, image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300&h=300&fit=crop", category: "popular", restaurant: "Poke Station", deliveryTime: 24 }
];

const categories = ["todo", "popular", "combos", "entradas", "especiales", "sopas", "carnes", "bebidas"];

const RestaurantMenu = ({ restaurant, onBack, onCheckout, highlightedDishId }: RestaurantMenuProps) => {
  const [cart, setCart] = useState<{ [key: number]: number }>(
    highlightedDishId ? { [highlightedDishId]: 1 } : {}
  );
  const [showCart, setShowCart] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("todo");
  const [selectedProduct, setSelectedProduct] = useState<MenuItem | null>(null);
  const [showProductDetail, setShowProductDetail] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const addToCart = (itemId: number, quantity: number = 1, notes?: string) => {
    setCart(prev => ({ ...prev, [itemId]: (prev[itemId] || 0) + quantity }));
  };

  const removeFromCart = (itemId: number) => {
    setCart(prev => {
      const newCart = { ...prev };
      if (newCart[itemId] > 1) {
        newCart[itemId]--;
      } else {
        delete newCart[itemId];
      }
      return newCart;
    });
  };

  const cartTotal = Object.entries(cart).reduce((sum, [id, qty]) => {
    const item = [...mockMenuItems, ...recommendedDishes].find(i => i.id === Number(id));
    return sum + (item?.price || 0) * qty;
  }, 0);

  const cartItemCount = Object.values(cart).reduce((sum, qty) => sum + qty, 0);

  const filteredItems = selectedCategory === "todo" 
    ? mockMenuItems 
    : mockMenuItems.filter(item => item.category === selectedCategory);

  const handleProductClick = (item: MenuItem) => {
    setSelectedProduct(item);
    setShowProductDetail(true);
  };

  return (
    <div className="fixed inset-0 z-30 bg-background overflow-hidden flex flex-col">
      {/* Hero Section with Cover */}
      <div className="relative h-64 flex-shrink-0">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${restaurant.coverImage || restaurant.profileImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-background" />
        </div>
        
        <button
          onClick={onBack}
          className="absolute top-4 left-4 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center z-10"
        >
          <ArrowLeft className="w-6 h-6 text-white" />
        </button>

        {cartItemCount > 0 && (
          <button
            onClick={() => setShowCart(true)}
            className="absolute top-4 right-4 w-12 h-12 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center z-10"
          >
            <ShoppingCart className="w-6 h-6 text-primary" />
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-primary-foreground text-xs font-bold rounded-full flex items-center justify-center">
              {cartItemCount}
            </span>
          </button>
        )}

        {/* Profile Image and Info */}
        <div className="absolute -bottom-16 left-4 right-4 flex items-end gap-4">
          <div className="w-24 h-24 rounded-full border-4 border-background overflow-hidden shadow-glow-lg">
            <img src={restaurant.profileImage} alt={restaurant.name} className="w-full h-full object-cover" />
          </div>
          <div className="flex-1 pb-2">
            <h1 className="text-2xl font-bold text-white mb-1">{restaurant.name}</h1>
            {restaurant.location && (
              <p className="text-sm text-white/80">{restaurant.location}</p>
            )}
          </div>
        </div>
      </div>

      {/* Info Cards */}
      <div className="px-4 pt-20 pb-4 flex-shrink-0">
        <div className="bg-card rounded-2xl p-4 border border-border grid grid-cols-3 gap-4">
          <div className="flex flex-col items-center gap-1">
            <Clock className="w-5 h-5 text-primary" />
            <span className="text-xs text-muted-foreground">Tiempo</span>
            <span className="text-sm font-bold">25-35 min</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <DollarSign className="w-5 h-5 text-primary" />
            <span className="text-xs text-muted-foreground">Envío</span>
            <span className="text-sm font-bold">$2.99</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <Star className="w-5 h-5 text-accent fill-accent" />
            <span className="text-xs text-muted-foreground">Rating</span>
            <span className="text-sm font-bold">{restaurant.rating || 4.8}</span>
          </div>
        </div>
      </div>

      {/* Category Menu */}
      <div className="px-4 pb-4 flex-shrink-0">
        <ScrollArea className="w-full">
          <div className="flex gap-2 pb-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-colors ${
                  selectedCategory === cat
                    ? "bg-primary text-primary-foreground"
                    : "bg-card text-foreground hover:bg-muted"
                }`}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Menu Items */}
      <ScrollArea className="flex-1" ref={scrollRef}>
        <div className="px-4 space-y-3 pb-32">
          {filteredItems.map(item => (
            <motion.div
              key={item.id}
              onClick={() => handleProductClick(item)}
              className={`bg-card rounded-2xl overflow-hidden border-2 transition-all cursor-pointer hover:border-primary/50 ${
                highlightedDishId === item.id ? 'border-primary shadow-glow' : 'border-border'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex gap-4 p-4">
                <div className="w-24 h-24 rounded-xl overflow-hidden flex-shrink-0">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-foreground mb-1">{item.name}</h4>
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                    {item.description}
                  </p>
                  <p className="text-lg font-bold text-primary">${item.price}</p>
                </div>

                <div className="flex items-end">
                  {cart[item.id] ? (
                    <div className="flex items-center gap-2 bg-muted rounded-full p-1">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          removeFromCart(item.id);
                        }}
                        className="w-8 h-8 rounded-full bg-background hover:bg-primary hover:text-primary-foreground transition-colors flex items-center justify-center"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-8 text-center font-semibold">{cart[item.id]}</span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          addToCart(item.id);
                        }}
                        className="w-8 h-8 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors flex items-center justify-center"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(item.id);
                      }}
                      className="w-10 h-10 rounded-full bg-black hover:bg-primary transition-colors flex items-center justify-center"
                    >
                      <Plus className="w-5 h-5 text-primary hover:text-primary-foreground transition-colors" />
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}

          {/* Recommendations Section */}
          <div className="pt-6">
            <h3 className="text-xl font-bold text-foreground mb-4">
              Porque seleccionaste {restaurant.name}
            </h3>
            <ScrollArea className="w-full">
              <div className="flex gap-3 pb-4">
                {recommendedDishes.map((dish) => (
                  <motion.div
                    key={dish.id}
                    onClick={() => handleProductClick(dish)}
                    className="flex-shrink-0 w-48 bg-card rounded-2xl overflow-hidden border border-border hover:border-primary/50 transition-all cursor-pointer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="aspect-square overflow-hidden">
                      <img src={dish.image} alt={dish.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="p-3">
                      <h4 className="font-semibold text-sm mb-1 truncate">{dish.name}</h4>
                      <p className="text-xs text-muted-foreground mb-2 truncate">{dish.restaurant}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-primary font-bold">${dish.price}</span>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Clock className="w-3 h-3" />
                          <span>{dish.deliveryTime}min</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </ScrollArea>
          </div>
        </div>
      </ScrollArea>

      {/* Checkout Button */}
      {cartItemCount > 0 && (
        <div className="flex-shrink-0 p-4 bg-card border-t border-border">
          <Button
            onClick={onCheckout}
            size="lg"
            className="w-full h-14 rounded-2xl bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity text-lg font-bold"
          >
            Ir al Checkout • ${cartTotal.toFixed(2)}
          </Button>
        </div>
      )}

      {/* Cart Sheet */}
      <Sheet open={showCart} onOpenChange={setShowCart}>
        <SheetContent side="bottom" className="h-[70vh] bg-background rounded-t-3xl">
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-foreground">Tu Carrito</h3>
              <button onClick={() => setShowCart(false)}>
                <X className="w-6 h-6 text-foreground" />
              </button>
            </div>

            <ScrollArea className="flex-1">
              <div className="space-y-3">
                {Object.entries(cart).map(([id, qty]) => {
                  const item = [...mockMenuItems, ...recommendedDishes].find(i => i.id === Number(id));
                  if (!item) return null;

                  return (
                    <div key={id} className="flex items-center gap-4 bg-card p-4 rounded-xl">
                      <img src={item.image} alt={item.name} className="w-16 h-16 rounded-lg object-cover" />
                      <div className="flex-1">
                        <h4 className="font-semibold text-foreground">{item.name}</h4>
                        <p className="text-sm text-primary">${item.price}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => removeFromCart(Number(id))}
                          className="w-8 h-8 rounded-full bg-muted flex items-center justify-center"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-8 text-center font-semibold">{qty}</span>
                        <button
                          onClick={() => addToCart(Number(id))}
                          className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </ScrollArea>

            <div className="mt-4 pt-4 border-t border-border">
              <div className="flex justify-between text-lg font-bold mb-4">
                <span>Total</span>
                <span className="text-primary">${cartTotal.toFixed(2)}</span>
              </div>
              <Button
                onClick={onCheckout}
                size="lg"
                className="w-full h-14 rounded-2xl bg-gradient-to-r from-primary to-accent"
              >
                Confirmar Pedido
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Product Detail Overlay */}
      <ProductDetailOverlay
        isOpen={showProductDetail}
        onClose={() => setShowProductDetail(false)}
        product={selectedProduct}
        onAddToCart={addToCart}
      />
    </div>
  );
};

export default RestaurantMenu;
