import { ArrowLeft, CreditCard, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PaymentSettingsProps {
  onBack: () => void;
}

const paymentMethods = [
  { id: 1, type: "Visa", last4: "4242", expiry: "12/25" },
  { id: 2, type: "Mastercard", last4: "5555", expiry: "06/26" },
];

const PaymentSettings = ({ onBack }: PaymentSettingsProps) => {
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
          <h2 className="font-bold text-lg">Métodos de Pago</h2>
          <div className="w-10" />
        </div>
      </div>

      {/* Content */}
      <div className="p-4 pb-32">
        <div className="space-y-4">
          {paymentMethods.map((method) => (
            <div
              key={method.id}
              className="bg-card rounded-2xl p-4 border border-border flex items-center gap-4"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                <CreditCard className="w-6 h-6 text-primary" />
              </div>
              <div className="flex-1">
                <p className="font-semibold">{method.type} •••• {method.last4}</p>
                <p className="text-xs text-muted-foreground">Expira {method.expiry}</p>
              </div>
              <button className="text-sm text-destructive hover:underline">
                Eliminar
              </button>
            </div>
          ))}

          <Button className="w-full h-12 rounded-xl bg-card hover:bg-muted border-2 border-dashed border-border text-foreground">
            <Plus className="w-5 h-5 mr-2" />
            Agregar método de pago
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PaymentSettings;
