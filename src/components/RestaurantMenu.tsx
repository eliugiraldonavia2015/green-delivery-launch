import { useState } from "react";
import { ArrowLeft, ShoppingCart, Plus, Minus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent } from "@/components/ui/sheet";

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

interface RestaurantMenuProps {
  restaurant: {
    name: string;
    profileImage: string;
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
    category: "Platos Principales"
  },
  {
    id: 2,
    name: "Margherita Pizza",
    description: "Pizza artesanal con mozzarella fresca y albahaca",
    price: 15.99,
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=300&fit=crop",
    category: "Platos Principales"
  },
  {
    id: 3,
    name: "Caesar Salad",
    description: "Lechuga romana, crutones y aderezo césar casero",
    price: 9.99,
    image: "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400&h=300&fit=crop",
    category: "Entradas"
  },
  {
    id: 4,
    name: "Calamari Fritti",
    description: "Anillos de calamar crujientes con salsa marinara",
    price: 12.99,
    image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=400&h=300&fit=crop",
    category: "Entradas"
  },
  {
    id: 5,
    name: "Limonada Natural",
    description: "Refrescante limonada hecha al momento",
    price: 3.99,
    image: "https://images.unsplash.com/photo-1523677011781-c91d1bbe2f9e?w=400&h=300&fit=crop",
    category: "Bebidas"
  },
  {
    id: 6,
    name: "Tiramisu",
    description: "Postre italiano clásico con café y mascarpone",
    price: 7.99,
    image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&h=300&fit=crop",
    category: "Postres"
  }
];

const RestaurantMenu = ({ restaurant, onBack, onCheckout, highlightedDishId }: RestaurantMenuProps) => {
  const [cart, setCart] = useState<{ [key: number]: number }>(
    highlightedDishId ? { [highlightedDishId]: 1 } : {}
  );
  const [showCart, setShowCart] = useState(false);

  const categories = ["Platos Principales", "Entradas", "Bebidas", "Postres"];

  const addToCart = (itemId: number) => {
    setCart(prev => ({ ...prev, [itemId]: (prev[itemId] || 0) + 1 }));
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
    const item = mockMenuItems.find(i => i.id === Number(id));
    return sum + (item?.price || 0) * qty;
  }, 0);

  const cartItemCount = Object.values(cart).reduce((sum, qty) => sum + qty, 0);

  return (
    <div className="fixed inset-0 z-30 bg-background overflow-hidden flex flex-col">
      {/* Header */}
      <div className="flex-shrink-0 bg-card border-b border-border">
        <div className="flex items-center gap-4 p-4">
          <button
            onClick={onBack}
            className="w-10 h-10 rounded-full bg-muted flex items-center justify-center"
          >
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </button>
          
          <div className="flex items-center gap-3 flex-1">
            <img 
              src={restaurant.profileImage} 
              alt={restaurant.name} 
              className="w-10 h-10 rounded-full"
            />
            <div>
              <h2 className="font-bold text-foreground">{restaurant.name}</h2>
              <p className="text-xs text-muted-foreground">Menú Completo</p>
            </div>
          </div>

          {cartItemCount > 0 && (
            <button
              onClick={() => setShowCart(true)}
              className="relative w-12 h-12 rounded-full bg-black flex items-center justify-center"
            >
              <ShoppingCart className="w-6 h-6 text-primary" />
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-primary-foreground text-xs font-bold rounded-full flex items-center justify-center">
                {cartItemCount}
              </span>
            </button>
          )}
        </div>
      </div>

      {/* Menu Content */}
      <ScrollArea className="flex-1">
        <div className="p-4 space-y-6 pb-24">
          {categories.map(category => {
            const items = mockMenuItems.filter(item => item.category === category);
            if (items.length === 0) return null;

            return (
              <div key={category}>
                <h3 className="text-xl font-bold text-foreground mb-4">{category}</h3>
                <div className="space-y-3">
                  {items.map(item => (
                    <div
                      key={item.id}
                      className={`bg-card rounded-2xl overflow-hidden border-2 transition-all ${
                        highlightedDishId === item.id
                          ? 'border-primary shadow-glow'
                          : 'border-border'
                      }`}
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
                                onClick={() => removeFromCart(item.id)}
                                className="w-8 h-8 rounded-full bg-background hover:bg-primary hover:text-primary-foreground transition-colors flex items-center justify-center"
                              >
                                <Minus className="w-4 h-4" />
                              </button>
                              <span className="w-8 text-center font-semibold">{cart[item.id]}</span>
                              <button
                                onClick={() => addToCart(item.id)}
                                className="w-8 h-8 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors flex items-center justify-center"
                              >
                                <Plus className="w-4 h-4" />
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => addToCart(item.id)}
                              className="w-10 h-10 rounded-full bg-black hover:bg-primary transition-colors flex items-center justify-center"
                            >
                              <Plus className="w-5 h-5 text-primary hover:text-primary-foreground transition-colors" />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
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
                  const item = mockMenuItems.find(i => i.id === Number(id));
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
    </div>
  );
};

export default RestaurantMenu;
