
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { CreditCard, QrCode } from 'lucide-react';
import { DadosCartaoForm } from './DadosCartaoForm';
import { PixPaymentDisplay } from './PixPaymentDisplay';

interface DadosCartaoData {
  numero: string;
  nome: string;
  validade: string;
  cvv: string;
}

interface FormaPagamentoSectionProps {
  formaPagamento: string;
  onFormaPagamentoChange: (value: string) => void;
  dadosCartao: DadosCartaoData;
  onDadosCartaoChange: (dados: DadosCartaoData) => void;
  total: number;
  onPixPaymentConfirmed?: () => void;
}

export function FormaPagamentoSection({
  formaPagamento,
  onFormaPagamentoChange,
  dadosCartao,
  onDadosCartaoChange,
  total,
  onPixPaymentConfirmed
}: FormaPagamentoSectionProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-marrom-cafezinho">Forma de Pagamento</h3>
      
      <RadioGroup value={formaPagamento} onValueChange={onFormaPagamentoChange} required>
        <div className="flex items-center space-x-2 p-4 border border-cinza-sujo/30 rounded-lg hover:bg-bege-po/30">
          <RadioGroupItem value="cartao" id="cartao" />
          <Label htmlFor="cartao" className="flex items-center gap-2 cursor-pointer text-marrom-cafezinho font-medium">
            <CreditCard className="w-5 h-5" />
            Cartão de Crédito/Débito
          </Label>
        </div>
        
        <div className="flex items-center space-x-2 p-4 border border-cinza-sujo/30 rounded-lg hover:bg-bege-po/30">
          <RadioGroupItem value="pix" id="pix" />
          <Label htmlFor="pix" className="flex items-center gap-2 cursor-pointer text-marrom-cafezinho font-medium">
            <QrCode className="w-5 h-5" />
            PIX
          </Label>
        </div>
      </RadioGroup>

      <DadosCartaoForm
        dadosCartao={dadosCartao}
        onChange={onDadosCartaoChange}
        isVisible={formaPagamento === 'cartao'}
      />

      <PixPaymentDisplay
        total={total}
        isVisible={formaPagamento === 'pix'}
        onPixPaymentConfirmed={onPixPaymentConfirmed}
      />
    </div>
  );
}
