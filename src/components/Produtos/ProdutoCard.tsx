
import { Button } from '@/components/ui/button';
import { useCarrinho } from '@/hooks/useCarrinho';
import { ShoppingCart } from 'lucide-react';

interface Produto {
  id: string;
  nome: string;
  descricao: string;
  preco: number;
  imagem_url: string;
  categoria: string;
}

interface ProdutoCardProps {
  produto: Produto;
}

export function ProdutoCard({ produto }: ProdutoCardProps) {
  const { adicionarItem } = useCarrinho();

  const formatarPreco = (preco: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(preco);
  };

  // Mapear categorias para as imagens corretas
  const getImagemProduto = (categoria: string) => {
    switch (categoria) {
      case 'Eletrônicos':
        if (produto.nome.toLowerCase().includes('fone') || produto.nome.toLowerCase().includes('headphone')) {
          return '/lovable-uploads/7f0c4178-d172-48ab-be1e-25bab1e66728.png';
        } else if (produto.nome.toLowerCase().includes('notebook') || produto.nome.toLowerCase().includes('laptop')) {
          return '/lovable-uploads/5a327de5-fa0c-48ae-830b-1c1e56635eb1.png';
        }
        break;
      case 'Roupas':
        if (produto.nome.toLowerCase().includes('camisa') || produto.nome.toLowerCase().includes('camiseta')) {
          return '/lovable-uploads/13a03f1f-f284-4591-88e0-04aaffe886fa.png';
        }
        break;
      case 'Livros':
        return '/lovable-uploads/b4fb352e-d7b0-48dd-8f70-83abeb81a8e9.png';
      default:
        return produto.imagem_url || '/placeholder.svg';
    }
    return produto.imagem_url || '/placeholder.svg';
  };

  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1" data-cy="produto-card">
      <div className="aspect-square overflow-hidden">
        <img
          src={getImagemProduto(produto.categoria)}
          alt={produto.nome}
          className="w-full h-full object-cover"
          data-cy="produto-imagem"
        />
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg text-gray-800 mb-2" data-cy="produto-nome">
          {produto.nome}
        </h3>
        <p className="text-gray-600 text-sm mb-3" data-cy="produto-descricao">
          {produto.descricao}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent" data-cy="produto-preco">
            {formatarPreco(produto.preco)}
          </span>
          <Button
            onClick={() => adicionarItem(produto.id)}
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
            data-cy="adicionar-carrinho"
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            Adicionar
          </Button>
        </div>
      </div>
    </div>
  );
}
