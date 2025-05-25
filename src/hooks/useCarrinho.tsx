
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
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

export function useCarrinho() {
  const [itens, setItens] = useState<ItemCarrinho[]>([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const carregarCarrinho = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('carrinho')
        .select(`
          id,
          produto_id,
          quantidade,
          produto:produtos(nome, preco, imagem_url)
        `)
        .eq('user_id', user.id);

      if (error) throw error;
      setItens(data || []);
    } catch (error) {
      console.error('Erro ao carregar carrinho:', error);
    } finally {
      setLoading(false);
    }
  };

  const adicionarItem = async (produtoId: string) => {
    if (!user) {
      toast({
        title: "Erro",
        description: "Você precisa estar logado para adicionar itens ao carrinho",
        variant: "destructive",
      });
      return;
    }

    try {
      const { error } = await supabase
        .from('carrinho')
        .upsert({
          user_id: user.id,
          produto_id: produtoId,
          quantidade: 1,
        }, {
          onConflict: 'user_id,produto_id',
        });

      if (error) throw error;
      
      toast({
        title: "Sucesso",
        description: "Item adicionado ao carrinho",
      });
      
      carregarCarrinho();
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
      
      carregarCarrinho();
    } catch (error) {
      console.error('Erro ao remover item:', error);
    }
  };

  const atualizarQuantidade = async (itemId: string, quantidade: number) => {
    try {
      const { error } = await supabase
        .from('carrinho')
        .update({ quantidade })
        .eq('id', itemId);

      if (error) throw error;
      carregarCarrinho();
    } catch (error) {
      console.error('Erro ao atualizar quantidade:', error);
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
    } catch (error) {
      console.error('Erro ao limpar carrinho:', error);
    }
  };

  useEffect(() => {
    if (user) {
      carregarCarrinho();
    } else {
      setItens([]);
    }
  }, [user]);

  const total = itens.reduce((acc, item) => acc + (item.produto.preco * item.quantidade), 0);
  const quantidadeTotal = itens.reduce((acc, item) => acc + item.quantidade, 0);

  return {
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
}
