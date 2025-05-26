
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useCarrinho } from '@/hooks/useCarrinho';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { X, CreditCard, Banknote, Smartphone } from 'lucide-react';

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
  const [dadosPix, setDadosPix] = useState({
    chave: '',
    tipo: '',
  });
  const [loading, setLoading] = useState(false);
  const { limparCarrinho } = useCarrinho();
  const { user } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !formaPagamento) return;

    setLoading(true);
    try {
      // Criar pedido com dados de pagamento
      const { data: pedido, error: pedidoError } = await supabase
        .from('pedidos')
        .insert({
          user_id: user.id,
          total,
          endereco_entrega: endereco,
          forma_pagamento: formaPagamento,
          dados_pagamento: formaPagamento === 'cartao' ? dadosCartao : dadosPix,
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
          {/* Endereço de Entrega */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-marrom-cafezinho">Endereço de Entrega</h3>
            
            <div>
              <Label htmlFor="rua" className="text-marrom-cafezinho">Rua</Label>
              <Input
                id="rua"
                value={endereco.rua}
                onChange={(e) => setEndereco({...endereco, rua: e.target.value})}
                required
                data-cy="endereco-rua"
                className="border-cinza-sujo/30"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="numero" className="text-marrom-cafezinho">Número</Label>
                <Input
                  id="numero"
                  value={endereco.numero}
                  onChange={(e) => setEndereco({...endereco, numero: e.target.value})}
                  required
                  data-cy="endereco-numero"
                  className="border-cinza-sujo/30"
                />
              </div>
              <div>
                <Label htmlFor="cep" className="text-marrom-cafezinho">CEP</Label>
                <Input
                  id="cep"
                  value={endereco.cep}
                  onChange={(e) => setEndereco({...endereco, cep: e.target.value})}
                  required
                  data-cy="endereco-cep"
                  className="border-cinza-sujo/30"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="bairro" className="text-marrom-cafezinho">Bairro</Label>
              <Input
                id="bairro"
                value={endereco.bairro}
                onChange={(e) => setEndereco({...endereco, bairro: e.target.value})}
                required
                data-cy="endereco-bairro"
                className="border-cinza-sujo/30"
              />
            </div>

            <div>
              <Label htmlFor="cidade" className="text-marrom-cafezinho">Cidade</Label>
              <Input
                id="cidade"
                value={endereco.cidade}
                onChange={(e) => setEndereco({...endereco, cidade: e.target.value})}
                required
                data-cy="endereco-cidade"
                className="border-cinza-sujo/30"
              />
            </div>
          </div>

          {/* Forma de Pagamento */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-marrom-cafezinho">Forma de Pagamento</h3>
            
            <RadioGroup value={formaPagamento} onValueChange={setFormaPagamento} required>
              <div className="flex items-center space-x-2 p-4 border border-cinza-sujo/30 rounded-lg">
                <RadioGroupItem value="cartao" id="cartao" />
                <Label htmlFor="cartao" className="flex items-center gap-2 cursor-pointer text-marrom-cafezinho">
                  <CreditCard className="w-5 h-5" />
                  Cartão de Crédito/Débito
                </Label>
              </div>
              
              <div className="flex items-center space-x-2 p-4 border border-cinza-sujo/30 rounded-lg">
                <RadioGroupItem value="pix" id="pix" />
                <Label htmlFor="pix" className="flex items-center gap-2 cursor-pointer text-marrom-cafezinho">
                  <Smartphone className="w-5 h-5" />
                  PIX
                </Label>
              </div>
              
              <div className="flex items-center space-x-2 p-4 border border-cinza-sujo/30 rounded-lg">
                <RadioGroupItem value="dinheiro" id="dinheiro" />
                <Label htmlFor="dinheiro" className="flex items-center gap-2 cursor-pointer text-marrom-cafezinho">
                  <Banknote className="w-5 h-5" />
                  Dinheiro (Entrega)
                </Label>
              </div>
            </RadioGroup>

            {/* Dados do Cartão */}
            {formaPagamento === 'cartao' && (
              <div className="space-y-4 p-4 bg-bege-po/50 rounded-lg">
                <h4 className="font-medium text-marrom-cafezinho">Dados do Cartão</h4>
                
                <div>
                  <Label htmlFor="numero-cartao" className="text-marrom-cafezinho">Número do Cartão</Label>
                  <Input
                    id="numero-cartao"
                    placeholder="1234 5678 9012 3456"
                    value={dadosCartao.numero}
                    onChange={(e) => setDadosCartao({...dadosCartao, numero: e.target.value})}
                    required={formaPagamento === 'cartao'}
                    className="border-cinza-sujo/30"
                  />
                </div>
                
                <div>
                  <Label htmlFor="nome-cartao" className="text-marrom-cafezinho">Nome no Cartão</Label>
                  <Input
                    id="nome-cartao"
                    placeholder="Nome como no cartão"
                    value={dadosCartao.nome}
                    onChange={(e) => setDadosCartao({...dadosCartao, nome: e.target.value})}
                    required={formaPagamento === 'cartao'}
                    className="border-cinza-sujo/30"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="validade" className="text-marrom-cafezinho">Validade</Label>
                    <Input
                      id="validade"
                      placeholder="MM/AA"
                      value={dadosCartao.validade}
                      onChange={(e) => setDadosCartao({...dadosCartao, validade: e.target.value})}
                      required={formaPagamento === 'cartao'}
                      className="border-cinza-sujo/30"
                    />
                  </div>
                  <div>
                    <Label htmlFor="cvv" className="text-marrom-cafezinho">CVV</Label>
                    <Input
                      id="cvv"
                      placeholder="123"
                      value={dadosCartao.cvv}
                      onChange={(e) => setDadosCartao({...dadosCartao, cvv: e.target.value})}
                      required={formaPagamento === 'cartao'}
                      className="border-cinza-sujo/30"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Dados do PIX */}
            {formaPagamento === 'pix' && (
              <div className="space-y-4 p-4 bg-bege-po/50 rounded-lg">
                <h4 className="font-medium text-marrom-cafezinho">Dados do PIX</h4>
                
                <div>
                  <Label htmlFor="tipo-chave" className="text-marrom-cafezinho">Tipo de Chave PIX</Label>
                  <Select value={dadosPix.tipo} onValueChange={(value) => setDadosPix({...dadosPix, tipo: value})}>
                    <SelectTrigger className="border-cinza-sujo/30">
                      <SelectValue placeholder="Selecione o tipo de chave" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cpf">CPF</SelectItem>
                      <SelectItem value="email">E-mail</SelectItem>
                      <SelectItem value="telefone">Telefone</SelectItem>
                      <SelectItem value="aleatoria">Chave Aleatória</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="chave-pix" className="text-marrom-cafezinho">Chave PIX</Label>
                  <Input
                    id="chave-pix"
                    placeholder="Digite sua chave PIX"
                    value={dadosPix.chave}
                    onChange={(e) => setDadosPix({...dadosPix, chave: e.target.value})}
                    required={formaPagamento === 'pix'}
                    className="border-cinza-sujo/30"
                  />
                </div>
              </div>
            )}
          </div>

          <div className="border-t border-cinza-sujo/20 pt-4 mt-4">
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-bold text-marrom-cafezinho">Total:</span>
              <span className="text-2xl font-bold text-terracota-queimado">
                {formatarPreco(total)}
              </span>
            </div>

            <Button
              type="submit"
              disabled={loading || !formaPagamento}
              className="w-full bg-terracota-queimado hover:bg-terracota-queimado/80 text-off-white-envelhecido"
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
