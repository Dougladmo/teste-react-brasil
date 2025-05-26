
import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { AuthPage } from '@/components/Auth/AuthPage';
import { Header } from '@/components/Layout/Header';
import { ListaProdutos } from '@/components/Produtos/ListaProdutos';
import { CarrinhoSidebar } from '@/components/Carrinho/CarrinhoSidebar';

const Index = () => {
  const { user, loading } = useAuth();
  const [carrinhoAberto, setCarrinhoAberto] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-verde-milicia via-azul-denim to-cinza-concreto flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-amarelo-mostarda"></div>
      </div>
    );
  }

  if (!user) {
    return <AuthPage />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-verde-milicia via-azul-denim to-cinza-concreto">
      <Header onOpenCarrinho={() => setCarrinhoAberto(true)} />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Produtos em Destaque
          </h2>
          <p className="text-gray-200 text-lg">
            Encontre tesouros únicos e produtos especiais no Garimpo
          </p>
        </div>

        <ListaProdutos />
      </main>

      <CarrinhoSidebar 
        isOpen={carrinhoAberto} 
        onClose={() => setCarrinhoAberto(false)} 
      />
    </div>
  );
};

export default Index;
