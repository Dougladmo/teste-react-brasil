
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/hooks/useAuth';
import { toast } from '@/hooks/use-toast';

interface RegisterFormProps {
  onToggleMode: () => void;
}

export function RegisterForm({ onToggleMode }: RegisterFormProps) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { signUp } = useAuth();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);    try {
      await signUp(email, password, nome);
      toast({
        title: "Sucesso",
        description: "Conta criada com sucesso! Você já pode fazer login.",
      });
      
      // Limpar formulário após sucesso
      setNome('');
      setEmail('');
      setPassword('');
      
      // Mudar para tela de login após 2 segundos
      setTimeout(() => {
        onToggleMode();
      }, 2000);
      
    } catch (error: any) {
      toast({
        title: "Erro",
        description: error.message || "Erro ao criar conta",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4" data-cy="register-form">
      <div>
        <Label htmlFor="nome">Nome</Label>
        <Input
          id="nome"
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
          data-cy="register-name"
          placeholder="Seu nome completo"
        />
      </div>
      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          data-cy="register-email"
          placeholder="seu@email.com"
        />
      </div>
      <div>
        <Label htmlFor="password">Senha</Label>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          data-cy="register-password"
          placeholder="••••••••"
          minLength={6}
        />
      </div>
      <Button type="submit" disabled={loading} className="w-full" data-cy="register-submit">
        {loading ? 'Criando conta...' : 'Criar Conta'}
      </Button>
      <p className="text-center text-sm text-gray-600">
        Já tem conta?{' '}
        <button
          type="button"
          onClick={onToggleMode}
          className="text-purple-600 hover:underline"
          data-cy="toggle-to-login"
        >
          Faça login
        </button>
      </p>
    </form>
  );
}
