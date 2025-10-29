import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";

interface SecuritySettingsProps {
  onBack: () => void;
}

const SecuritySettings = ({ onBack }: SecuritySettingsProps) => {
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

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
          <h2 className="font-bold text-lg">Seguridad</h2>
          <div className="w-10" />
        </div>
      </div>

      {/* Content */}
      <div className="p-4 pb-32">
        {/* Change Password */}
        <div className="mb-6">
          <h3 className="font-semibold mb-4">Cambiar contraseña</h3>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="current-password">Contraseña actual</Label>
              <Input id="current-password" type="password" placeholder="••••••••" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-password">Nueva contraseña</Label>
              <Input id="new-password" type="password" placeholder="••••••••" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirmar contraseña</Label>
              <Input id="confirm-password" type="password" placeholder="••••••••" />
            </div>
            <Button className="w-full h-12 rounded-xl bg-primary hover:bg-primary/90">
              Actualizar contraseña
            </Button>
          </div>
        </div>

        {/* Two-Factor Authentication */}
        <div className="mb-6">
          <h3 className="font-semibold mb-4">Autenticación de dos factores</h3>
          <div className="bg-card rounded-2xl p-4 border border-border flex items-center justify-between">
            <div>
              <p className="font-medium">2FA</p>
              <p className="text-xs text-muted-foreground">Mayor seguridad para tu cuenta</p>
            </div>
            <Switch 
              checked={twoFactorEnabled} 
              onCheckedChange={setTwoFactorEnabled} 
            />
          </div>
        </div>

        {/* Active Sessions */}
        <div>
          <h3 className="font-semibold mb-4">Sesiones activas</h3>
          <div className="space-y-3">
            <div className="bg-card rounded-2xl p-4 border border-border">
              <div className="flex items-center justify-between mb-2">
                <p className="font-semibold">iPhone 15 Pro</p>
                <span className="text-xs text-primary bg-primary/10 px-2 py-1 rounded-full">Actual</span>
              </div>
              <p className="text-xs text-muted-foreground">Última actividad: Ahora</p>
              <p className="text-xs text-muted-foreground">Ciudad de México, México</p>
            </div>
            <div className="bg-card rounded-2xl p-4 border border-border">
              <div className="flex items-center justify-between mb-2">
                <p className="font-semibold">MacBook Pro</p>
                <button className="text-xs text-destructive hover:underline">Cerrar sesión</button>
              </div>
              <p className="text-xs text-muted-foreground">Última actividad: Hace 2 horas</p>
              <p className="text-xs text-muted-foreground">Ciudad de México, México</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecuritySettings;
