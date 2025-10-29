import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";

interface NotificationSettingsProps {
  onBack: () => void;
}

const NotificationSettings = ({ onBack }: NotificationSettingsProps) => {
  const [settings, setSettings] = useState({
    pushNotifications: true,
    emailNotifications: true,
    smsNotifications: false,
    orderUpdates: true,
    promotions: true,
    newRestaurants: false,
    recommendations: true,
  });

  const handleToggle = (key: keyof typeof settings) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="fixed inset-0 z-50 bg-background overflow-y-auto">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-md border-b border-border">
        <div className="flex items-center justify-between p-4">
          <button
            onClick={onBack}
            className="w-10 h-10 rounded-full bg-card flex items-center justify-center hover:bg-muted transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h2 className="font-bold text-lg">Notificaciones</h2>
          <div className="w-10" />
        </div>
      </div>

      {/* Content */}
      <div className="p-4 pb-32">
        <div className="space-y-6">
          {/* General */}
          <div>
            <h3 className="font-semibold mb-4">General</h3>
            <div className="space-y-3">
              <div className="bg-card rounded-2xl p-4 border border-border flex items-center justify-between">
                <div>
                  <p className="font-medium">Notificaciones Push</p>
                  <p className="text-xs text-muted-foreground">Recibir notificaciones en tu dispositivo</p>
                </div>
                <Switch 
                  checked={settings.pushNotifications} 
                  onCheckedChange={() => handleToggle('pushNotifications')} 
                />
              </div>

              <div className="bg-card rounded-2xl p-4 border border-border flex items-center justify-between">
                <div>
                  <p className="font-medium">Email</p>
                  <p className="text-xs text-muted-foreground">Recibir notificaciones por correo</p>
                </div>
                <Switch 
                  checked={settings.emailNotifications} 
                  onCheckedChange={() => handleToggle('emailNotifications')} 
                />
              </div>

              <div className="bg-card rounded-2xl p-4 border border-border flex items-center justify-between">
                <div>
                  <p className="font-medium">SMS</p>
                  <p className="text-xs text-muted-foreground">Recibir notificaciones por mensaje</p>
                </div>
                <Switch 
                  checked={settings.smsNotifications} 
                  onCheckedChange={() => handleToggle('smsNotifications')} 
                />
              </div>
            </div>
          </div>

          {/* Pedidos */}
          <div>
            <h3 className="font-semibold mb-4">Pedidos</h3>
            <div className="space-y-3">
              <div className="bg-card rounded-2xl p-4 border border-border flex items-center justify-between">
                <div>
                  <p className="font-medium">Actualizaciones de pedidos</p>
                  <p className="text-xs text-muted-foreground">Estado de tus pedidos</p>
                </div>
                <Switch 
                  checked={settings.orderUpdates} 
                  onCheckedChange={() => handleToggle('orderUpdates')} 
                />
              </div>
            </div>
          </div>

          {/* Marketing */}
          <div>
            <h3 className="font-semibold mb-4">Marketing</h3>
            <div className="space-y-3">
              <div className="bg-card rounded-2xl p-4 border border-border flex items-center justify-between">
                <div>
                  <p className="font-medium">Promociones</p>
                  <p className="text-xs text-muted-foreground">Ofertas y descuentos especiales</p>
                </div>
                <Switch 
                  checked={settings.promotions} 
                  onCheckedChange={() => handleToggle('promotions')} 
                />
              </div>

              <div className="bg-card rounded-2xl p-4 border border-border flex items-center justify-between">
                <div>
                  <p className="font-medium">Nuevos restaurantes</p>
                  <p className="text-xs text-muted-foreground">Cuando se agregan nuevos lugares</p>
                </div>
                <Switch 
                  checked={settings.newRestaurants} 
                  onCheckedChange={() => handleToggle('newRestaurants')} 
                />
              </div>

              <div className="bg-card rounded-2xl p-4 border border-border flex items-center justify-between">
                <div>
                  <p className="font-medium">Recomendaciones</p>
                  <p className="text-xs text-muted-foreground">Sugerencias personalizadas</p>
                </div>
                <Switch 
                  checked={settings.recommendations} 
                  onCheckedChange={() => handleToggle('recommendations')} 
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationSettings;
