
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { useCarrinho } from '@/hooks/useCarrinho';
import { ShoppingCart, User, LogOut } from 'lucide-react';

interface HeaderProps {
  onOpenCarrinho: () => void;
}

export function Header({ onOpenCarrinho }: HeaderProps) {
  const { user, signOut } = useAuth();
  const { quantidadeTotal } = useCarrinho();

  return (
    <header className="bg-white/80 backdrop-blur-sm border-b border-white/20 sticky top-0 z-40">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            FutureShop
          </h1>
          <p className="text-sm text-gray-600">E-commerce do Futuro</p>
        </div>

        <div className="flex items-center gap-4">
          {user && (
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <User className="w-4 h-4" />
              <span data-cy="user-name">{user.user_metadata?.nome || user.email}</span>
            </div>
          )}

          <Button
            variant="outline"
            onClick={onOpenCarrinho}
            className="relative"
            data-cy="abrir-carrinho"
          >
            <ShoppingCart className="w-5 h-5" />
            {quantidadeTotal > 0 && (
              <span className="absolute -top-2 -right-2 bg-purple-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center" data-cy="carrinho-contador">
                {quantidadeTotal}
              </span>
            )}
          </Button>

          {user && (
            <Button
              variant="outline"
              onClick={signOut}
              data-cy="logout-button"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sair
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
