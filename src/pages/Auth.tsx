import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { z } from "zod";
import { Package, Mail, ArrowLeft, Chrome } from "lucide-react";

const authSchema = z.object({
  email: z.string().trim().email({ message: "Email inválido" }).max(255),
  password: z.string().min(6, { message: "La contraseña debe tener al menos 6 caracteres" }).max(100),
  fullName: z.string().trim().min(2, { message: "El nombre debe tener al menos 2 caracteres" }).max(100).optional()
});

interface AuthProps {
  onComplete: () => void;
}

type AuthView = "welcome" | "email-login" | "email-signup";

const Auth = ({ onComplete }: AuthProps) => {
  const [currentView, setCurrentView] = useState<AuthView>("welcome");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGoogleSignIn = () => {
    setLoading(true);
    toast.info("Redirigiendo a Google...");
    setTimeout(() => {
      toast.success("¡Bienvenido!");
      onComplete();
    }, 1500);
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const validationData = currentView === "email-login"
        ? { email, password }
        : { email, password, fullName };
      
      authSchema.parse(validationData);

      setTimeout(() => {
        toast.success(currentView === "email-login" ? "¡Bienvenido de vuelta!" : "¡Cuenta creada!");
        onComplete();
      }, 1000);
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast.error(error.errors[0].message);
      } else {
        toast.error("Ocurrió un error inesperado");
      }
      setLoading(false);
    }
  };

  // Welcome screen
  if (currentView === "welcome") {
    return (
      <div className="fixed inset-0 bg-background">
        <div className="h-full w-full max-w-lg mx-auto flex flex-col safe-area-inset">
          {/* Hero section */}
          <div className="flex-1 flex flex-col items-center justify-center px-8 pb-8">
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", duration: 0.8 }}
              className="mb-8"
            >
              <div className="w-28 h-28 bg-gradient-to-br from-primary to-primary-glow rounded-[2rem] flex items-center justify-center shadow-glow-lg">
                <Package className="h-14 w-14 text-white" strokeWidth={2.5} />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-center space-y-3 mb-12"
            >
              <h1 className="text-4xl font-bold">DeliveryApp</h1>
              <p className="text-muted-foreground text-lg">
                Tu comida favorita en minutos
              </p>
            </motion.div>
          </div>

          {/* Auth options */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="px-6 pb-8 space-y-3"
          >
            {/* Google button */}
            <Button
              onClick={handleGoogleSignIn}
              disabled={loading}
              size="lg"
              variant="outline"
              className="w-full h-14 text-base font-semibold border-2 hover:bg-card hover:border-primary/50 transition-all duration-300 rounded-2xl"
            >
              <Chrome className="w-5 h-5 mr-3" />
              Continuar con Google
            </Button>

            {/* Email button */}
            <Button
              onClick={() => setCurrentView("email-login")}
              size="lg"
              className="w-full h-14 text-base font-semibold bg-gradient-to-r from-primary to-primary-glow hover:shadow-glow transition-all duration-300 rounded-2xl"
            >
              <Mail className="w-5 h-5 mr-3" />
              Continuar con Email
            </Button>

            {/* Terms */}
            <p className="text-xs text-center text-muted-foreground pt-4 px-4">
              Al continuar, aceptas nuestros Términos de Servicio y Política de Privacidad
            </p>
          </motion.div>
        </div>
      </div>
    );
  }

  // Email login/signup screens
  return (
    <div className="fixed inset-0 bg-background">
      <div className="h-full w-full max-w-lg mx-auto flex flex-col safe-area-inset">
        {/* Header with back button */}
        <div className="px-6 pt-6 pb-4">
          <button
            onClick={() => {
              setCurrentView("welcome");
              setEmail("");
              setPassword("");
              setFullName("");
            }}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm font-medium">Volver</span>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto">
          <div className="px-8 py-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentView}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="mb-8">
                  <h2 className="text-3xl font-bold mb-2">
                    {currentView === "email-login" ? "Iniciar Sesión" : "Crear Cuenta"}
                  </h2>
                  <p className="text-muted-foreground">
                    {currentView === "email-login"
                      ? "Ingresa tus credenciales para continuar"
                      : "Completa los datos para registrarte"}
                  </p>
                </div>

                <form onSubmit={handleEmailSubmit} className="space-y-4">
                  {currentView === "email-signup" && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="space-y-2"
                    >
                      <label className="text-sm font-medium text-muted-foreground">
                        Nombre Completo
                      </label>
                      <Input
                        type="text"
                        placeholder="Juan Pérez"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        required
                        maxLength={100}
                        className="h-12 bg-card border-border/50 rounded-xl focus:border-primary transition-colors"
                      />
                    </motion.div>
                  )}

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">
                      Email
                    </label>
                    <Input
                      type="email"
                      placeholder="tu@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      maxLength={255}
                      className="h-12 bg-card border-border/50 rounded-xl focus:border-primary transition-colors"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">
                      Contraseña
                    </label>
                    <Input
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      maxLength={100}
                      className="h-12 bg-card border-border/50 rounded-xl focus:border-primary transition-colors"
                    />
                  </div>

                  {currentView === "email-login" && (
                    <div className="text-right">
                      <button
                        type="button"
                        className="text-sm text-primary hover:underline"
                      >
                        ¿Olvidaste tu contraseña?
                      </button>
                    </div>
                  )}

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full h-14 text-base font-semibold bg-gradient-to-r from-primary to-primary-glow hover:shadow-glow transition-all duration-300 rounded-2xl mt-6"
                    disabled={loading}
                  >
                    {loading ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                      />
                    ) : currentView === "email-login" ? (
                      "Iniciar Sesión"
                    ) : (
                      "Crear Cuenta"
                    )}
                  </Button>
                </form>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Footer toggle */}
        <div className="px-8 pb-8 text-center">
          <button
            type="button"
            onClick={() =>
              setCurrentView(
                currentView === "email-login" ? "email-signup" : "email-login"
              )
            }
            className="text-sm text-muted-foreground"
          >
            {currentView === "email-login"
              ? "¿No tienes cuenta? "
              : "¿Ya tienes cuenta? "}
            <span className="text-primary font-medium hover:underline">
              {currentView === "email-login" ? "Regístrate" : "Inicia sesión"}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;
