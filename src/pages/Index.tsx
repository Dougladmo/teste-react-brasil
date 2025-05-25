
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
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (!user) {
    return <AuthPage />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <Header onOpenCarrinho={() => setCarrinhoAberto(true)} />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Produtos em Destaque
          </h2>
          <p className="text-gray-600 text-lg">
            Descubra tesouros únicos e produtos de segunda mão em nosso brechó online
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
