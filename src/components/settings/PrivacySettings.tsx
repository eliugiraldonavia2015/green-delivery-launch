import { ArrowLeft } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";

interface PrivacySettingsProps {
  onBack: () => void;
}

const PrivacySettings = ({ onBack }: PrivacySettingsProps) => {
  const [settings, setSettings] = useState({
    profileVisible: true,
    showLocation: true,
    showActivity: false,
    allowMessages: true,
    showOnlineStatus: true,
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
          <h2 className="font-bold text-lg">Privacidad</h2>
          <div className="w-10" />
        </div>
      </div>

      {/* Content */}
      <div className="p-4 pb-32">
        <div className="space-y-3">
          <div className="bg-card rounded-2xl p-4 border border-border flex items-center justify-between">
            <div>
              <p className="font-medium">Perfil visible</p>
              <p className="text-xs text-muted-foreground">Permitir que otros vean tu perfil</p>
            </div>
            <Switch 
              checked={settings.profileVisible} 
              onCheckedChange={() => handleToggle('profileVisible')} 
            />
          </div>

          <div className="bg-card rounded-2xl p-4 border border-border flex items-center justify-between">
            <div>
              <p className="font-medium">Mostrar ubicación</p>
              <p className="text-xs text-muted-foreground">Compartir tu ubicación actual</p>
            </div>
            <Switch 
              checked={settings.showLocation} 
              onCheckedChange={() => handleToggle('showLocation')} 
            />
          </div>

          <div className="bg-card rounded-2xl p-4 border border-border flex items-center justify-between">
            <div>
              <p className="font-medium">Mostrar actividad</p>
              <p className="text-xs text-muted-foreground">Permitir ver tu actividad reciente</p>
            </div>
            <Switch 
              checked={settings.showActivity} 
              onCheckedChange={() => handleToggle('showActivity')} 
            />
          </div>

          <div className="bg-card rounded-2xl p-4 border border-border flex items-center justify-between">
            <div>
              <p className="font-medium">Permitir mensajes</p>
              <p className="text-xs text-muted-foreground">Recibir mensajes de otros usuarios</p>
            </div>
            <Switch 
              checked={settings.allowMessages} 
              onCheckedChange={() => handleToggle('allowMessages')} 
            />
          </div>

          <div className="bg-card rounded-2xl p-4 border border-border flex items-center justify-between">
            <div>
              <p className="font-medium">Estado en línea</p>
              <p className="text-xs text-muted-foreground">Mostrar cuando estás activo</p>
            </div>
            <Switch 
              checked={settings.showOnlineStatus} 
              onCheckedChange={() => handleToggle('showOnlineStatus')} 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacySettings;
