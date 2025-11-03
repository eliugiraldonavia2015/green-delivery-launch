import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { User, Bike, Store } from "lucide-react";

type Role = "cliente" | "repartidor" | "restaurante";

const SelectRole = () => {
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      navigate("/auth");
    }
  }, [user, navigate]);

  const roles = [
    {
      value: "cliente" as Role,
      title: "Cliente",
      description: "Disfruta de tu comida favorita en minutos",
      icon: User,
      features: ["Miles de restaurantes", "Entregas rápidas", "Ofertas exclusivas"]
    },
    {
      value: "repartidor" as Role,
      title: "Repartidor",
      description: "Gana dinero con horarios flexibles",
      icon: Bike,
      features: ["Horarios flexibles", "Ganancias inmediatas", "Seguro incluido"]
    },
    {
      value: "restaurante" as Role,
      title: "Restaurante",
      description: "Aumenta tus ventas sin inversión",
      icon: Store,
      features: ["Sin costo inicial", "Miles de clientes", "Soporte 24/7"]
    }
  ];

  const handleSelectRole = async () => {
    if (!selectedRole || !user) return;

    setLoading(true);
    try {
      const { error } = await supabase
        .from("user_roles")
        .insert([{ user_id: user.id, role: selectedRole }]);

      if (error) {
        if (error.message.includes("duplicate")) {
          toast.error("Ya tienes este rol asignado");
        } else {
          toast.error("Error al asignar rol: " + error.message);
        }
      } else {
        toast.success(`¡Bienvenido como ${selectedRole}!`);
        navigate("/feed");
      }
    } catch (error) {
      toast.error("Error inesperado al asignar rol");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/10 py-16 px-4">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">
            Selecciona tu{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
              rol
            </span>
          </h1>
          <p className="text-lg text-muted-foreground">
            ¿Cómo quieres usar nuestra plataforma?
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {roles.map((role) => {
            const Icon = role.icon;
            const isSelected = selectedRole === role.value;
            const isClient = role.value === "cliente";

            return (
              <button
                key={role.value}
                onClick={() => setSelectedRole(role.value)}
                className={`group relative p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-card border transition-all text-left ${
                  isSelected
                    ? isClient
                      ? "border-accent shadow-[0_0_40px_hsl(25_95%_53%/0.3)] scale-105"
                      : "border-primary shadow-glow scale-105"
                    : isClient
                    ? "border-accent/40 hover:border-accent hover:shadow-[0_0_20px_hsl(25_95%_53%/0.2)]"
                    : "border-primary/20 hover:border-primary/40 hover:shadow-glow"
                }`}
              >
                <div
                  className={`mb-6 inline-flex p-4 rounded-xl transition-colors ${
                    isClient
                      ? "bg-accent/10 group-hover:bg-accent/20"
                      : "bg-primary/10 group-hover:bg-primary/20"
                  }`}
                >
                  <Icon className={`h-10 w-10 ${isClient ? "text-accent" : "text-primary"}`} />
                </div>

                <h3 className="text-xl sm:text-2xl font-bold mb-3">{role.title}</h3>
                <p className="text-sm sm:text-base text-muted-foreground mb-6">
                  {role.description}
                </p>

                <ul className="space-y-3">
                  {role.features.map((feature, i) => (
                    <li key={i} className="flex items-center text-sm">
                      <span
                        className={`w-1.5 h-1.5 rounded-full mr-2 ${
                          isClient ? "bg-accent" : "bg-primary"
                        }`}
                      />
                      {feature}
                    </li>
                  ))}
                </ul>

                {isSelected && (
                  <div className="absolute top-4 right-4">
                    <div className={`w-6 h-6 rounded-full ${isClient ? "bg-accent" : "bg-primary"} flex items-center justify-center`}>
                      <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  </div>
                )}
              </button>
            );
          })}
        </div>

        <div className="flex justify-center">
          <Button
            onClick={handleSelectRole}
            disabled={!selectedRole || loading}
            className="w-full sm:w-auto px-12 py-6 text-lg bg-primary hover:bg-primary-glow shadow-glow"
          >
            {loading ? "Procesando..." : "Continuar"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SelectRole;
