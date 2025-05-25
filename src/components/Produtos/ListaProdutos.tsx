
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

export function ListaProdutos() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [produtosFiltrados, setProdutosFiltrados] = useState<Produto[]>([]);
  const [loading, setLoading] = useState(true);
  const [ordenacao, setOrdenacao] = useState<string>('nome');
  const [categoriaFiltro, setCategoriaFiltro] = useState<string>('todas');

  const carregarProdutos = async () => {
    try {
      const { data, error } = await supabase
        .from('produtos')
        .select('*')
        .eq('ativo', true);

      if (error) throw error;
      setProdutos(data || []);
      setProdutosFiltrados(data || []);
    } catch (error) {
      console.error('Erro ao carregar produtos:', error);
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
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="flex gap-4">
          <Select value={categoriaFiltro} onValueChange={setCategoriaFiltro}>
            <SelectTrigger className="w-48" data-cy="filtro-categoria">
              <SelectValue placeholder="Categoria" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todas">Todas as categorias</SelectItem>
              {categorias.map(categoria => (
                <SelectItem key={categoria} value={categoria}>
                  {categoria}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={ordenacao} onValueChange={setOrdenacao}>
            <SelectTrigger className="w-48" data-cy="ordenacao-produtos">
              <SelectValue placeholder="Ordenar por" />
            </SelectTrigger>
            <SelectContent>
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
          <p className="text-gray-500 text-lg">Nenhum produto encontrado</p>
        </div>
      )}
    </div>
  );
}
