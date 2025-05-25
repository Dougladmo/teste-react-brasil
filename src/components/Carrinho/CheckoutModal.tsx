
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useCarrinho } from '@/hooks/useCarrinho';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { X } from 'lucide-react';

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
  const [loading, setLoading] = useState(false);
  const { limparCarrinho } = useCarrinho();
  const { user } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    try {
      // Criar pedido
      const { data: pedido, error: pedidoError } = await supabase
        .from('pedidos')
        .insert({
          user_id: user.id,
          total,
          endereco_entrega: endereco,
          status: 'pendente',
        })
        .select()
        .single();

      if (pedidoError) throw pedidoError;

      // Criar itens do pedido
      const itensPedido = itens.map(item => ({
        pedido_id: pedido.id,
        produto_id: item.produto_id,
        quantidade: item.quantidade,
        preco_unitario: item.produto.preco,
      }));

      const { error: itensError } = await supabase
        .from('itens_pedido')
        .insert(itensPedido);

      if (itensError) throw itensError;

      // Limpar carrinho
      await limparCarrinho();

      toast({
        title: "Pedido realizado com sucesso!",
        description: `Pedido #${pedido.id.slice(0, 8)} foi criado`,
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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md" data-cy="checkout-modal">
        <div className="p-6 border-b">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">Finalizar Compra</h2>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-5 h-5" />
            </Button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4" data-cy="checkout-form">
          <div>
            <Label htmlFor="rua">Rua</Label>
            <Input
              id="rua"
              value={endereco.rua}
              onChange={(e) => setEndereco({...endereco, rua: e.target.value})}
              required
              data-cy="endereco-rua"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="numero">Número</Label>
              <Input
                id="numero"
                value={endereco.numero}
                onChange={(e) => setEndereco({...endereco, numero: e.target.value})}
                required
                data-cy="endereco-numero"
              />
            </div>
            <div>
              <Label htmlFor="cep">CEP</Label>
              <Input
                id="cep"
                value={endereco.cep}
                onChange={(e) => setEndereco({...endereco, cep: e.target.value})}
                required
                data-cy="endereco-cep"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="bairro">Bairro</Label>
            <Input
              id="bairro"
              value={endereco.bairro}
              onChange={(e) => setEndereco({...endereco, bairro: e.target.value})}
              required
              data-cy="endereco-bairro"
            />
          </div>

          <div>
            <Label htmlFor="cidade">Cidade</Label>
            <Input
              id="cidade"
              value={endereco.cidade}
              onChange={(e) => setEndereco({...endereco, cidade: e.target.value})}
              required
              data-cy="endereco-cidade"
            />
          </div>

          <div className="border-t pt-4 mt-4">
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-bold">Total:</span>
              <span className="text-2xl font-bold text-purple-600">
                {formatarPreco(total)}
              </span>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
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
