
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { ProdutoCard } from './ProdutoCard';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Produto {
  id: string;
  nome: string;
  descricao: string;
  preco: number;
  imagem_url: string;
  categoria: string;
}

// Produtos mock para quando não há dados no Supabase
const produtosMock: Produto[] = [
  {
    id: '1',
    nome: 'Fone Bluetooth Usado',
    descricao: 'Fone de ouvido bluetooth em bom estado',
    preco: 89.90,
    imagem_url: '/lovable-uploads/d8162ae9-c55f-448f-a892-058c0977b9a0.png',
    categoria: 'Eletrônicos'
  },
  {
    id: '2',
    nome: 'Notebook Dell i5',
    descricao: 'Notebook Dell com processador i5, 8GB RAM',
    preco: 1299.90,
    imagem_url: '/lovable-uploads/d65556d4-aa3f-4927-b55d-8eb4733a68d5.png',
    categoria: 'Eletrônicos'
  },
  {
    id: '3',
    nome: 'iPhone com Tela Trincada',
    descricao: 'iPhone funcionando, apenas tela trincada',
    preco: 899.90,
    imagem_url: '/lovable-uploads/9a4563cb-fa92-4572-951a-8e92d501565c.png',
    categoria: 'Eletrônicos'
  },
  {
    id: '4',
    nome: 'Camiseta Vintage',
    descricao: 'Camiseta vintage em ótimo estado',
    preco: 35.90,
    imagem_url: '/lovable-uploads/6a386e6a-4772-4b74-a548-f82e8d843180.png',
    categoria: 'Roupas'
  },
  {
    id: '5',
    nome: 'Tênis Nike Usado',
    descricao: 'Tênis Nike Air Max em bom estado',
    preco: 159.90,
    imagem_url: '/lovable-uploads/6fc4ec07-5d33-427c-a133-12d1d92ea9f8.png',
    categoria: 'Calçados'
  },
  {
    id: '6',
    nome: 'Livro História do Brasil',
    descricao: 'Livro educativo sobre história brasileira',
    preco: 29.90,
    imagem_url: '/lovable-uploads/9d228fb6-8a82-4881-b6ed-57781b59e346.png',
    categoria: 'Livros'
  }
];

export function ListaProdutos() {
  const [produtos, setProdutos] = useState<Produto[]>(produtosMock);
  const [produtosFiltrados, setProdutosFiltrados] = useState<Produto[]>(produtosMock);
  const [loading, setLoading] = useState(false);
  const [ordenacao, setOrdenacao] = useState<string>('nome');
  const [categoriaFiltro, setCategoriaFiltro] = useState<string>('todas');

  const carregarProdutos = async () => {
    try {
      const { data, error } = await supabase
        .from('produtos')
        .select('*')
        .eq('ativo', true);

      if (error) {
        console.log('Usando produtos mock - erro no Supabase:', error);
        setProdutos(produtosMock);
        setProdutosFiltrados(produtosMock);
        return;
      }
      
      if (data && data.length > 0) {
        setProdutos(data);
        setProdutosFiltrados(data);
      } else {
        console.log('Usando produtos mock - sem dados no Supabase');
        setProdutos(produtosMock);
        setProdutosFiltrados(produtosMock);
      }
    } catch (error) {
      console.log('Usando produtos mock - erro:', error);
      setProdutos(produtosMock);
      setProdutosFiltrados(produtosMock);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarProdutos();
  }, []);

  useEffect(() => {
    let produtosFiltrados = [...produtos];

    // Filtrar por categoria
    if (categoriaFiltro !== 'todas') {
      produtosFiltrados = produtosFiltrados.filter(p => p.categoria === categoriaFiltro);
    }

    // Ordenar
    switch (ordenacao) {
      case 'preco-asc':
        produtosFiltrados.sort((a, b) => a.preco - b.preco);
        break;
      case 'preco-desc':
        produtosFiltrados.sort((a, b) => b.preco - a.preco);
        break;
      case 'nome':
      default:
        produtosFiltrados.sort((a, b) => a.nome.localeCompare(b.nome));
        break;
    }

    setProdutosFiltrados(produtosFiltrados);
  }, [produtos, ordenacao, categoriaFiltro]);

  const categorias = [...new Set(produtos.map(p => p.categoria))];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-terracota-queimado"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="flex gap-4">
          <Select value={categoriaFiltro} onValueChange={setCategoriaFiltro}>
            <SelectTrigger className="w-48 bg-off-white-envelhecido/90 border-cinza-sujo/30" data-cy="filtro-categoria">
              <SelectValue placeholder="Categoria" />
            </SelectTrigger>
            <SelectContent className="bg-off-white-envelhecido">
              <SelectItem value="todas">Todas as categorias</SelectItem>
              {categorias.map(categoria => (
                <SelectItem key={categoria} value={categoria}>
                  {categoria}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={ordenacao} onValueChange={setOrdenacao}>
            <SelectTrigger className="w-48 bg-off-white-envelhecido/90 border-cinza-sujo/30" data-cy="ordenacao-produtos">
              <SelectValue placeholder="Ordenar por" />
            </SelectTrigger>
            <SelectContent className="bg-off-white-envelhecido">
              <SelectItem value="nome">Nome</SelectItem>
              <SelectItem value="preco-asc">Menor preço</SelectItem>
              <SelectItem value="preco-desc">Maior preço</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" data-cy="lista-produtos">
        {produtosFiltrados.map(produto => (
          <ProdutoCard key={produto.id} produto={produto} />
        ))}
      </div>

      {produtosFiltrados.length === 0 && (
        <div className="text-center py-12">
          <p className="text-marrom-cafezinho text-lg">Nenhum produto encontrado</p>
        </div>
      )}
    </div>
  );
}
