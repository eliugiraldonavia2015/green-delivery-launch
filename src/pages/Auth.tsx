import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { z } from "zod";
import { Mail, Phone, Chrome, User, Lock } from "lucide-react";
import deliveryImage from "@/assets/delivery-rider-auth.jpg";

const authSchema = z.object({
  email: z.string().trim().email({ message: "Email inválido" }).max(255),
  password: z.string().min(6, { message: "La contraseña debe tener al menos 6 caracteres" }).max(100),
  fullName: z.string().trim().min(2, { message: "El nombre debe tener al menos 2 caracteres" }).max(100).optional()
});

interface AuthProps {
  onComplete: () => void;
}

type AuthView = "login" | "signup";

const Auth = ({ onComplete }: AuthProps) => {
  const [currentView, setCurrentView] = useState<AuthView>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const validationData = currentView === "login"
        ? { email, password }
        : { email, password, fullName };
      
      authSchema.parse(validationData);

      setTimeout(() => {
        toast.success(currentView === "login" ? "¡Bienvenido de vuelta!" : "¡Cuenta creada!");
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

  const handleSocialAuth = (provider: string) => {
    setLoading(true);
    toast.info(`Conectando con ${provider}...`);
    setTimeout(() => {
      toast.success("¡Bienvenido!");
      onComplete();
    }, 1500);
  };

  // Login screen
  if (currentView === "login") {
    return (
      <div className="fixed inset-0 bg-background overflow-auto">
        <div className="min-h-full w-full max-w-lg mx-auto flex flex-col safe-area-inset px-6 py-8">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-6"
          >
            <h1 className="text-4xl font-bold text-primary">FOODTOOK</h1>
          </motion.div>

          {/* Delivery Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="w-full aspect-[4/3] mb-8 rounded-3xl overflow-hidden shadow-glow-lg"
          >
            <img 
              src={deliveryImage} 
              alt="Delivery rider" 
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Login Form */}
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            {/* Email Input */}
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="email"
                placeholder="Usuario o Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                maxLength={255}
                className="h-14 pl-12 bg-card border-border rounded-2xl focus:border-primary transition-colors text-base"
              />
            </div>

            {/* Password Input */}
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                maxLength={100}
                className="h-14 pl-12 bg-card border-border rounded-2xl focus:border-primary transition-colors text-base"
              />
            </div>

            {/* Remember me & Forgot password */}
            <div className="flex items-center justify-between px-1">
              <div className="flex items-center gap-2">
                <Checkbox 
                  id="remember" 
                  checked={rememberMe}
                  onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                />
                <label 
                  htmlFor="remember" 
                  className="text-sm text-muted-foreground cursor-pointer"
                >
                  Recuérdame
                </label>
              </div>
              <button
                type="button"
                className="text-sm text-primary hover:underline"
              >
                ¿Olvidaste tu contraseña?
              </button>
            </div>

            {/* Login Button */}
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
              ) : (
                "Entrar"
              )}
            </Button>
          </motion.form>

          {/* Sign up link */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-center mt-6"
          >
            <button
              type="button"
              onClick={() => setCurrentView("signup")}
              className="text-sm text-muted-foreground"
            >
              ¿No tienes cuenta?{" "}
              <span className="text-primary font-medium hover:underline">
                Regístrate aquí
              </span>
            </button>
          </motion.div>
        </div>
      </div>
    );
  }

  // Signup screen
  return (
    <div className="fixed inset-0 bg-background overflow-auto">
      <div className="min-h-full w-full max-w-lg mx-auto flex flex-col safe-area-inset px-6 py-8">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-primary">FOODTOOK</h1>
        </motion.div>

        {/* Signup Form */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          {/* Full Name Input */}
          <div className="relative">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Nombre Completo"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              maxLength={100}
              className="h-14 pl-12 bg-card border-border rounded-2xl focus:border-primary transition-colors text-base"
            />
          </div>

          {/* Email Input */}
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              maxLength={255}
              className="h-14 pl-12 bg-card border-border rounded-2xl focus:border-primary transition-colors text-base"
            />
          </div>

          {/* Password Input */}
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              maxLength={100}
              className="h-14 pl-12 bg-card border-border rounded-2xl focus:border-primary transition-colors text-base"
            />
          </div>

          {/* Register Button */}
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
            ) : (
              "Crear Cuenta"
            )}
          </Button>
        </motion.form>

        {/* Separator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex items-center gap-4 my-6"
        >
          <div className="flex-1 h-px bg-border"></div>
          <span className="text-sm text-muted-foreground">o continúa con</span>
          <div className="flex-1 h-px bg-border"></div>
        </motion.div>

        {/* Social Auth Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-3 gap-3"
        >
          <Button
            type="button"
            variant="outline"
            onClick={() => handleSocialAuth("Google")}
            disabled={loading}
            className="h-16 rounded-2xl border-2 hover:bg-card hover:border-primary/50 transition-all"
          >
            <Chrome className="w-6 h-6" />
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => handleSocialAuth("Email")}
            disabled={loading}
            className="h-16 rounded-2xl border-2 hover:bg-card hover:border-primary/50 transition-all"
          >
            <Mail className="w-6 h-6" />
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => handleSocialAuth("Teléfono")}
            disabled={loading}
            className="h-16 rounded-2xl border-2 hover:bg-card hover:border-primary/50 transition-all"
          >
            <Phone className="w-6 h-6" />
          </Button>
        </motion.div>

        {/* Login link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-center mt-8"
        >
          <button
            type="button"
            onClick={() => setCurrentView("login")}
            className="text-sm text-muted-foreground"
          >
            ¿Ya tienes cuenta?{" "}
            <span className="text-primary font-medium hover:underline">
              Inicia sesión
            </span>
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default Auth;
