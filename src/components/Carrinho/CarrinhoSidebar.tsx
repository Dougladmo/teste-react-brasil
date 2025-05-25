
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
  const { itens, total, removerItem, atualizarQuantidade } = useCarrinho();
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
      <div className="fixed right-0 top-0 h-full w-96 bg-white shadow-2xl z-50 transform transition-transform" data-cy="carrinho-sidebar">
        <div className="p-6 border-b">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <ShoppingBag className="w-6 h-6" />
              Carrinho
            </h2>
            <Button variant="ghost" size="sm" onClick={onClose} data-cy="fechar-carrinho">
              <X className="w-5 h-5" />
            </Button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {itens.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingBag className="w-16 h-16 mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500">Seu carrinho está vazio</p>
            </div>
          ) : (
            <div className="space-y-4" data-cy="itens-carrinho">
              {itens.map((item) => (
                <div key={item.id} className="flex gap-4 p-4 bg-gray-50 rounded-lg" data-cy="item-carrinho">
                  <img
                    src={item.produto.imagem_url || '/placeholder.svg'}
                    alt={item.produto.nome}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium text-sm" data-cy="item-nome">{item.produto.nome}</h3>
                    <p className="text-purple-600 font-bold" data-cy="item-preco">
                      {formatarPreco(item.produto.preco)}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => atualizarQuantidade(item.id, Math.max(1, item.quantidade - 1))}
                        data-cy="diminuir-quantidade"
                      >
                        <Minus className="w-3 h-3" />
                      </Button>
                      <span className="w-8 text-center" data-cy="item-quantidade">{item.quantidade}</span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => atualizarQuantidade(item.id, item.quantidade + 1)}
                        data-cy="aumentar-quantidade"
                      >
                        <Plus className="w-3 h-3" />
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => removerItem(item.id)}
                        className="ml-auto"
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
          <div className="border-t p-6">
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-bold">Total:</span>
              <span className="text-2xl font-bold text-purple-600" data-cy="total-carrinho">
                {formatarPreco(total)}
              </span>
            </div>
            <Button
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
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
