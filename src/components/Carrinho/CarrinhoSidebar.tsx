
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useCarrinho } from '@/hooks/useCarrinho';
import { X, Plus, Minus, ShoppingBag } from 'lucide-react';
import { CheckoutModal } from './CheckoutModal';

interface CarrinhoSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CarrinhoSidebar({ isOpen, onClose }: CarrinhoSidebarProps) {
  const { itens, total, removerItem, atualizarQuantidade, loading } = useCarrinho();
  const [showCheckout, setShowCheckout] = useState(false);

  const formatarPreco = (preco: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(preco);
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-50" onClick={onClose} />
      <div className="fixed right-0 top-0 h-full w-96 bg-marrom-cafezinho shadow-2xl z-50 transform transition-transform" data-cy="carrinho-sidebar">
        <div className="p-6 border-b border-cinza-sujo/30">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold flex items-center gap-2 text-off-white-envelhecido">
              <ShoppingBag className="w-6 h-6" />
              Carrinho
            </h2>
            <Button variant="ghost" size="sm" onClick={onClose} className="text-off-white-envelhecido hover:bg-bege-po hover:text-marrom-cafezinho" data-cy="fechar-carrinho">
              <X className="w-5 h-5" />
            </Button>
          </div>
        </div>        <div className="flex-1 overflow-y-auto p-6">
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin w-8 h-8 border-2 border-terracota-queimado border-t-transparent rounded-full mx-auto mb-4"></div>
              <p className="text-off-white-envelhecido/80">Carregando carrinho...</p>
            </div>
          ) : itens.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingBag className="w-16 h-16 mx-auto text-cinza-sujo mb-4" />
              <p className="text-off-white-envelhecido/80">Seu carrinho está vazio</p>
            </div>
          ) : (
            <div className="space-y-4" data-cy="itens-carrinho">
              {itens.map((item) => (
                <div key={item.id} className="flex gap-4 p-4 bg-bege-po/30 rounded-lg" data-cy="item-carrinho">
                  <img
                    src={item.produto.imagem_url || '/placeholder.svg'}
                    alt={item.produto.nome}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium text-sm text-off-white-envelhecido" data-cy="item-nome">{item.produto.nome}</h3>
                    <p className="text-terracota-queimado font-bold" data-cy="item-preco">
                      {formatarPreco(item.produto.preco)}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => atualizarQuantidade(item.id, Math.max(1, item.quantidade - 1))}
                        className="border-cinza-sujo text-marrom-cafezinho hover:bg-bege-po hover:text-marrom-cafezinho"
                        data-cy="diminuir-quantidade"
                      >
                        <Minus className="w-3 h-3" />
                      </Button>
                      <span className="w-8 text-center text-off-white-envelhecido" data-cy="item-quantidade">{item.quantidade}</span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => atualizarQuantidade(item.id, item.quantidade + 1)}
                        className="border-cinza-sujo text-marrom-cafezinho hover:bg-bege-po hover:text-marrom-cafezinho"
                        data-cy="aumentar-quantidade"
                      >
                        <Plus className="w-3 h-3" />
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => removerItem(item.id)}
                        className="ml-auto bg-terracota-queimado hover:bg-terracota-queimado/80"
                        data-cy="remover-item"
                      >
                        <X className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {itens.length > 0 && (
          <div className="border-t border-cinza-sujo/30 p-6">
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-bold text-off-white-envelhecido">Total:</span>
              <span className="text-2xl font-bold text-terracota-queimado" data-cy="total-carrinho">
                {formatarPreco(total)}
              </span>
            </div>
            <Button
              className="w-full bg-terracota-queimado hover:bg-terracota-queimado/80 text-off-white-envelhecido"
              onClick={() => setShowCheckout(true)}
              data-cy="finalizar-compra"
            >
              Finalizar Compra
            </Button>
          </div>
        )}
      </div>

      <CheckoutModal 
        isOpen={showCheckout} 
        onClose={() => setShowCheckout(false)} 
        total={total}
        itens={itens}
      />
    </>
  );
}
