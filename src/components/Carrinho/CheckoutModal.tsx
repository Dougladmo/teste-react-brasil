
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useCarrinho } from '@/hooks/useCarrinho';
import { useAuth } from '@/hooks/useAuth';
import { toast } from '@/hooks/use-toast';
import { X } from 'lucide-react';
import { EnderecoForm } from './EnderecoForm';
import { FormaPagamentoSection } from './FormaPagamentoSection';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  total: number;
  itens: any[];
}

export function CheckoutModal({ isOpen, onClose, total, itens }: CheckoutModalProps) {
  const [endereco, setEndereco] = useState({
    rua: '',
    numero: '',
    bairro: '',
    cidade: '',
    cep: '',
  });
  const [formaPagamento, setFormaPagamento] = useState('');
  const [dadosCartao, setDadosCartao] = useState({
    numero: '',
    nome: '',
    validade: '',
    cvv: '',
  });
  const [pixPago, setPixPago] = useState(false);
  const [loading, setLoading] = useState(false);
  const { limparCarrinho } = useCarrinho();
  const { user } = useAuth();

  const handlePixPaymentConfirmed = () => {
    setPixPago(true);
    toast({
      title: "PIX Confirmado",
      description: "Pagamento PIX simulado com sucesso!",
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !formaPagamento) return;

    setLoading(true);
    try {
      // Simular processamento de pagamento
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simular criação de pedido para testes
      const pedidoId = 'pedido-' + Date.now();
      
      // Limpar carrinho
      await limparCarrinho();

      toast({
        title: "Pedido realizado com sucesso!",
        description: `Pedido #${pedidoId.slice(0, 8)} foi criado`,
      });

      onClose();
    } catch (error) {
      console.error('Erro ao finalizar compra:', error);
      toast({
        title: "Erro",
        description: "Erro ao finalizar compra",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const formatarPreco = (preco: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(preco);
  };

  const isFormValid = () => {
    const enderecoValido = endereco.rua && endereco.numero && endereco.bairro && endereco.cidade && endereco.cep;
    const pagamentoValido = formaPagamento && (
      (formaPagamento === 'pix' && pixPago) ||
      (formaPagamento === 'cartao' && dadosCartao.numero && dadosCartao.nome && dadosCartao.validade && dadosCartao.cvv)
    );
    return enderecoValido && pagamentoValido;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-off-white-envelhecido rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto" data-cy="checkout-modal">
        <div className="p-6 border-b border-cinza-sujo/20">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-marrom-cafezinho">Finalizar Compra</h2>
            <Button variant="ghost" size="sm" onClick={onClose} className="text-marrom-cafezinho hover:bg-bege-po">
              <X className="w-5 h-5" />
            </Button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6" data-cy="checkout-form">
          <EnderecoForm endereco={endereco} onChange={setEndereco} />

          <FormaPagamentoSection
            formaPagamento={formaPagamento}
            onFormaPagamentoChange={setFormaPagamento}
            dadosCartao={dadosCartao}
            onDadosCartaoChange={setDadosCartao}
            total={total}
            onPixPaymentConfirmed={handlePixPaymentConfirmed}
          />

          <div className="border-t border-cinza-sujo/20 pt-4 mt-4">
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-bold text-marrom-cafezinho">Total:</span>
              <span className="text-2xl font-bold text-terracota-queimado">
                {formatarPreco(total)}
              </span>
            </div>

            <Button
              type="submit"
              disabled={loading || !isFormValid()}
              className="w-full bg-terracota-queimado hover:bg-terracota-queimado/80 text-off-white-envelhecido font-medium"
              data-cy="confirmar-pedido"
            >
              {loading ? 'Processando...' : 'Confirmar Pedido'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
