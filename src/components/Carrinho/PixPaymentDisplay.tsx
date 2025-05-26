
import { QrCode } from 'lucide-react';
import { Label } from '@/components/ui/label';

interface PixPaymentDisplayProps {
  total: number;
  isVisible: boolean;
}

export function PixPaymentDisplay({ total, isVisible }: PixPaymentDisplayProps) {
  const formatarPreco = (preco: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(preco);
  };

  if (!isVisible) return null;

  return (
    <div className="space-y-4 p-4 bg-bege-po/50 rounded-lg">
      <h4 className="font-medium text-marrom-cafezinho">Pagamento PIX</h4>
      <p className="text-sm text-marrom-cafezinho/70">Escaneie o QR Code abaixo para realizar o pagamento</p>
      
      <div className="flex flex-col items-center space-y-4">
        <div className="w-48 h-48 bg-white border-2 border-cinza-sujo/30 rounded-lg flex items-center justify-center">
          <div className="w-40 h-40 bg-black/10 rounded-lg flex items-center justify-center">
            <QrCode className="w-32 h-32 text-marrom-cafezinho/60" />
          </div>
        </div>
        
        <div className="text-center">
          <p className="text-sm font-medium text-marrom-cafezinho">Valor: {formatarPreco(total)}</p>
          <p className="text-xs text-marrom-cafezinho/70 mt-1">
            QR Code de demonstração para testes
          </p>
        </div>
        
        <div className="w-full">
          <Label className="text-marrom-cafezinho font-medium">Código PIX Copia e Cola</Label>
          <div className="mt-1 p-3 bg-white border border-cinza-sujo/30 rounded-md">
            <p className="text-xs font-mono text-marrom-cafezinho break-all">
              00020126330014BR.GOV.BCB.PIX0111123456789015204000053039865802BR5913GARIMPO TESTE6008BRASILIA62070503***6304DEMO
            </p>
          </div>
          <p className="text-xs text-marrom-cafezinho/70 mt-1">
            Código de demonstração para testes
          </p>
        </div>
      </div>
    </div>
  );
}
