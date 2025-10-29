import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { 
  ChevronRight, 
  User, 
  Bell, 
  Lock, 
  Globe, 
  CreditCard, 
  HelpCircle, 
  Shield, 
  Moon, 
  LogOut 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import AccountSettings from "./settings/AccountSettings";
import NotificationSettings from "./settings/NotificationSettings";
import PrivacySettings from "./settings/PrivacySettings";
import LanguageSettings from "./settings/LanguageSettings";
import PaymentSettings from "./settings/PaymentSettings";
import SecuritySettings from "./settings/SecuritySettings";
import HelpSettings from "./settings/HelpSettings";

interface SettingsProps {
  onBack: () => void;
}

const Settings = ({ onBack }: SettingsProps) => {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const [currentScreen, setCurrentScreen] = useState<string | null>(null);

  const settingsOptions = [
    { id: "account", icon: User, label: "Cuenta", description: "Gestiona tu información personal" },
    { id: "notifications", icon: Bell, label: "Notificaciones", description: "Configura tus preferencias" },
    { id: "privacy", icon: Lock, label: "Privacidad", description: "Controla tu privacidad" },
    { id: "language", icon: Globe, label: "Idioma", description: "Español" },
    { id: "payment", icon: CreditCard, label: "Pagos", description: "Métodos de pago" },
    { id: "security", icon: Shield, label: "Seguridad", description: "Contraseña y autenticación" },
    { id: "help", icon: HelpCircle, label: "Ayuda", description: "Centro de ayuda y soporte" },
  ];

  if (currentScreen === "account") return <AccountSettings onBack={() => setCurrentScreen(null)} />;
  if (currentScreen === "notifications") return <NotificationSettings onBack={() => setCurrentScreen(null)} />;
  if (currentScreen === "privacy") return <PrivacySettings onBack={() => setCurrentScreen(null)} />;
  if (currentScreen === "language") return <LanguageSettings onBack={() => setCurrentScreen(null)} />;
  if (currentScreen === "payment") return <PaymentSettings onBack={() => setCurrentScreen(null)} />;
  if (currentScreen === "security") return <SecuritySettings onBack={() => setCurrentScreen(null)} />;
  if (currentScreen === "help") return <HelpSettings onBack={() => setCurrentScreen(null)} />;

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
          <h2 className="font-bold text-lg">Configuración</h2>
          <div className="w-10" />
        </div>
      </div>

      {/* Content */}
      <div className="p-4 pb-32">
        {/* Quick Toggles */}
        <div className="mb-6 space-y-3">
          <div className="bg-card rounded-2xl p-4 border border-border flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Bell className="w-5 h-5 text-primary" />
              <div>
                <p className="font-semibold">Notificaciones</p>
                <p className="text-xs text-muted-foreground">Recibir notificaciones push</p>
              </div>
            </div>
            <Switch checked={notifications} onCheckedChange={setNotifications} />
          </div>

          <div className="bg-card rounded-2xl p-4 border border-border flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Moon className="w-5 h-5 text-primary" />
              <div>
                <p className="font-semibold">Modo Oscuro</p>
                <p className="text-xs text-muted-foreground">Tema de la aplicación</p>
              </div>
            </div>
            <Switch checked={darkMode} onCheckedChange={setDarkMode} />
          </div>
        </div>

        {/* Settings List */}
        <div className="space-y-2 mb-6">
          {settingsOptions.map((option) => (
            <motion.button
              key={option.id}
              onClick={() => setCurrentScreen(option.id)}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-card rounded-2xl p-4 border border-border hover:border-primary/50 transition-all flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <option.icon className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1 text-left">
                <p className="font-semibold">{option.label}</p>
                <p className="text-xs text-muted-foreground">{option.description}</p>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground flex-shrink-0" />
            </motion.button>
          ))}
        </div>

        {/* App Info */}
        <div className="bg-card rounded-2xl p-4 border border-border mb-4 text-center">
          <p className="text-sm text-muted-foreground mb-1">Versión de la aplicación</p>
          <p className="font-semibold">Foodtook v1.0.0</p>
        </div>

        {/* Logout Button */}
        <Button 
          variant="outline" 
          className="w-full h-12 rounded-xl border-2 border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground"
        >
          <LogOut className="w-5 h-5 mr-2" />
          Cerrar Sesión
        </Button>
      </div>
    </div>
  );
};

export default Settings;
