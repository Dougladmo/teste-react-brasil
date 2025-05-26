
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

  // Mapear categorias para as novas imagens enviadas pelo usuário
  const getImagemProduto = (categoria: string, nome: string) => {
    switch (categoria) {
      case 'Eletrônicos':
        if (nome.toLowerCase().includes('fone') || nome.toLowerCase().includes('headphone') || nome.toLowerCase().includes('bluetooth')) {
          return '/lovable-uploads/d8162ae9-c55f-448f-a892-058c0977b9a0.png'; // Headphone/Fone
        } else if (nome.toLowerCase().includes('notebook') || nome.toLowerCase().includes('laptop')) {
          return '/lovable-uploads/d65556d4-aa3f-4927-b55d-8eb4733a68d5.png'; // Notebook
        } else if (nome.toLowerCase().includes('celular') || nome.toLowerCase().includes('smartphone') || nome.toLowerCase().includes('iphone')) {
          return '/lovable-uploads/9a4563cb-fa92-4572-951a-8e92d501565c.png'; // Celular com tela quebrada
        }
        break;
      case 'Roupas':
        if (nome.toLowerCase().includes('camisa') || nome.toLowerCase().includes('camiseta')) {
          return '/lovable-uploads/6a386e6a-4772-4b74-a548-f82e8d843180.png'; // Camiseta
        }
        break;
      case 'Calçados':
        if (nome.toLowerCase().includes('tênis') || nome.toLowerCase().includes('chuteira') || nome.toLowerCase().includes('sapato')) {
          return '/lovable-uploads/6fc4ec07-5d33-427c-a133-12d1d92ea9f8.png'; // Tênis/Chuteira
        }
        break;
      case 'Livros':
        return '/lovable-uploads/9d228fb6-8a82-4881-b6ed-57781b59e346.png'; // Livro Lula
      default:
        return produto.imagem_url || '/placeholder.svg';
    }
    return produto.imagem_url || '/placeholder.svg';
  };

  return (
    <div className="bg-off-white-envelhecido/95 backdrop-blur-sm rounded-xl shadow-lg border border-cinza-sujo/30 overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1" data-cy="produto-card">
      <div className="aspect-square overflow-hidden">
        <img
          src={getImagemProduto(produto.categoria, produto.nome)}
          alt={produto.nome}
          className="w-full h-full object-cover"
          data-cy="produto-imagem"
        />
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg text-marrom-cafezinho mb-2" data-cy="produto-nome">
          {produto.nome}
        </h3>
        <p className="text-marrom-cafezinho/70 text-sm mb-3" data-cy="produto-descricao">
          {produto.descricao}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-terracota-queimado" data-cy="produto-preco">
            {formatarPreco(produto.preco)}
          </span>
          <Button
            onClick={() => adicionarItem(produto.id)}
            className="bg-terracota-queimado hover:bg-terracota-queimado/80 text-off-white-envelhecido font-medium"
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
