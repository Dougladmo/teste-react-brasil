import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { toast } from '@/hooks/use-toast';

interface ItemCarrinho {
  id: string;
  produto_id: string;
  quantidade: number;
  produto: {
    nome: string;
    preco: number;
    imagem_url: string;
  };
}

interface CarrinhoContextType {
  itens: ItemCarrinho[];
  loading: boolean;
  total: number;
  quantidadeTotal: number;
  adicionarItem: (produtoId: string) => Promise<void>;
  removerItem: (itemId: string) => Promise<void>;
  atualizarQuantidade: (itemId: string, quantidade: number) => Promise<void>;
  limparCarrinho: () => Promise<void>;
  carregarCarrinho: () => Promise<void>;
}

const CarrinhoContext = createContext<CarrinhoContextType | undefined>(undefined);

interface CarrinhoProviderProps {
  children: ReactNode;
}

export function CarrinhoProvider({ children }: CarrinhoProviderProps) {
  const [itens, setItens] = useState<ItemCarrinho[]>([]);
  const [loading, setLoading] = useState(false);
  const [initialized, setInitialized] = useState(false);
  const { user, loading: authLoading } = useAuth();

  const carregarCarrinho = async () => {
    if (!user || authLoading) {
      console.log('⚠️ Não é possível carregar carrinho - usuário não definido ou autenticação carregando');
      return;
    }
    
    setLoading(true);
    try {
      console.log('🔍 Carregando carrinho para user:', user.id);
      
      // Primeiro, vamos verificar se existem itens na tabela carrinho
      const { data: carrinhoData, error: carrinhoError } = await supabase
        .from('carrinho')
        .select('*')
        .eq('user_id', user.id);

      console.log('📦 Dados básicos do carrinho:', carrinhoData);

      if (carrinhoError) {
        console.error('Erro na query básica do carrinho:', carrinhoError);
        throw carrinhoError;
      }

      if (!carrinhoData || carrinhoData.length === 0) {
        console.log('🈳 Carrinho vazio - nenhum item encontrado');
        setItens([]);
        return;
      }

      // Agora vamos buscar os produtos separadamente e juntar os dados
      const produtoIds = carrinhoData.map(item => item.produto_id);
      
      const { data: produtosData, error: produtosError } = await supabase
        .from('produtos')
        .select('id, nome, preco, imagem_url')
        .in('id', produtoIds);

      console.log('🛍️ Dados dos produtos:', produtosData);

      if (produtosError) {
        console.error('Erro ao buscar produtos:', produtosError);
        throw produtosError;
      }

      // Juntando os dados manualmente
      const itensCompletos = carrinhoData.map(itemCarrinho => {
        const produto = produtosData?.find(p => p.id === itemCarrinho.produto_id);
        return {
          id: itemCarrinho.id,
          produto_id: itemCarrinho.produto_id,
          quantidade: itemCarrinho.quantidade,
          produto: produto ? {
            nome: produto.nome,
            preco: produto.preco,
            imagem_url: produto.imagem_url
          } : {
            nome: 'Produto não encontrado',
            preco: 0,
            imagem_url: null
          }
        };
      });

      console.log('✅ Itens completos montados:', itensCompletos);
      setItens(itensCompletos);
      
    } catch (error) {
      console.error('Erro ao carregar carrinho:', error);
      setItens([]);
    } finally {
      setLoading(false);
    }
  };

  const adicionarItem = async (produtoId: string) => {
    if (!user || authLoading) {
      toast({
        title: "Erro",
        description: "Você precisa estar logado para adicionar itens ao carrinho",
        variant: "destructive",
      });
      return;
    }

    console.log('🛒 Adicionando item ao carrinho:', { produtoId, userId: user.id });

    try {
      const { data, error } = await supabase
        .from('carrinho')
        .upsert({
          user_id: user.id,
          produto_id: produtoId,
          quantidade: 1,
        }, {
          onConflict: 'user_id,produto_id',
        })
        .select();

      console.log('📝 Resultado do upsert:', { data, error });

      if (error) throw error;
      
      toast({
        title: "Sucesso",
        description: "Item adicionado ao carrinho",
      });
      
      console.log('🔄 Recarregando carrinho após adicionar item...');
      await carregarCarrinho();
    } catch (error) {
      console.error('Erro ao adicionar item:', error);
      toast({
        title: "Erro",
        description: "Erro ao adicionar item ao carrinho",
        variant: "destructive",
      });
    }
  };

  const removerItem = async (itemId: string) => {
    try {
      const { error } = await supabase
        .from('carrinho')
        .delete()
        .eq('id', itemId);

      if (error) throw error;
      
      toast({
        title: "Sucesso",
        description: "Item removido do carrinho",
      });
      
      await carregarCarrinho();
    } catch (error) {
      console.error('Erro ao remover item:', error);
      toast({
        title: "Erro",
        description: "Erro ao remover item do carrinho",
        variant: "destructive",
      });
    }
  };

  const atualizarQuantidade = async (itemId: string, quantidade: number) => {
    try {
      const { error } = await supabase
        .from('carrinho')
        .update({ quantidade })
        .eq('id', itemId);

      if (error) throw error;
      await carregarCarrinho();
    } catch (error) {
      console.error('Erro ao atualizar quantidade:', error);
      toast({
        title: "Erro",
        description: "Erro ao atualizar quantidade",
        variant: "destructive",
      });
    }
  };

  const limparCarrinho = async () => {
    if (!user) return;
    
    try {
      const { error } = await supabase
        .from('carrinho')
        .delete()
        .eq('user_id', user.id);

      if (error) throw error;
      
      setItens([]);
      toast({
        title: "Sucesso",
        description: "Carrinho limpo com sucesso",
      });
    } catch (error) {
      console.error('Erro ao limpar carrinho:', error);
      toast({
        title: "Erro",
        description: "Erro ao limpar carrinho",
        variant: "destructive",
      });
    }
  };

  // Effect para carregar o carrinho quando o usuário mudar
  useEffect(() => {
    // Aguarda o carregamento da autenticação antes de tentar carregar o carrinho
    if (authLoading) {
      console.log('⏳ Aguardando autenticação...');
      return;
    }
    
    if (!initialized) {
      setInitialized(true);
    }
    
    if (user) {
      console.log('👤 Usuário autenticado, carregando carrinho...');
      carregarCarrinho();
    } else {
      console.log('🚫 Usuário não autenticado, limpando carrinho...');
      setItens([]);
    }
  }, [user, authLoading, initialized]);

  // Calculados
  const total = itens.reduce((acc, item) => acc + (item.produto.preco * item.quantidade), 0);
  const quantidadeTotal = itens.reduce((acc, item) => acc + item.quantidade, 0);

  const value: CarrinhoContextType = {
    itens,
    loading,
    total,
    quantidadeTotal,
    adicionarItem,
    removerItem,
    atualizarQuantidade,
    limparCarrinho,
    carregarCarrinho,
  };

  return (
    <CarrinhoContext.Provider value={value}>
      {children}
    </CarrinhoContext.Provider>
  );
}

export function useCarrinhoContext() {
  const context = useContext(CarrinhoContext);
  if (context === undefined) {
    throw new Error('useCarrinhoContext deve ser usado dentro de um CarrinhoProvider');
  }
  return context;
}
