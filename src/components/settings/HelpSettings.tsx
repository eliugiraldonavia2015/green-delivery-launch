import { ArrowLeft, ChevronRight, MessageCircle, Mail, FileText, HelpCircle } from "lucide-react";

interface HelpSettingsProps {
  onBack: () => void;
}

const helpOptions = [
  { id: "faq", icon: HelpCircle, label: "Preguntas frecuentes", description: "Encuentra respuestas rápidas" },
  { id: "chat", icon: MessageCircle, label: "Chat en vivo", description: "Habla con soporte" },
  { id: "email", icon: Mail, label: "Contactar por email", description: "support@foodtook.com" },
  { id: "terms", icon: FileText, label: "Términos de servicio", description: "Lee nuestros términos" },
  { id: "privacy", icon: FileText, label: "Política de privacidad", description: "Cómo protegemos tus datos" },
];

const HelpSettings = ({ onBack }: HelpSettingsProps) => {
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
          <h2 className="font-bold text-lg">Ayuda y Soporte</h2>
          <div className="w-10" />
        </div>
      </div>

      {/* Content */}
      <div className="p-4 pb-32">
        <div className="space-y-2">
          {helpOptions.map((option) => (
            <button
              key={option.id}
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
            </button>
          ))}
        </div>

        {/* App Version */}
        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground">Versión de la aplicación</p>
          <p className="font-semibold">Foodtook v1.0.0</p>
        </div>
      </div>
    </div>
  );
};

export default HelpSettings;
