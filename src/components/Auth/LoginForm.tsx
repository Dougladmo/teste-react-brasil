
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/hooks/useAuth';
import { toast } from '@/hooks/use-toast';

interface LoginFormProps {
  onToggleMode: () => void;
}

export function LoginForm({ onToggleMode }: LoginFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await signIn(email, password);
      toast({
        title: "Sucesso",
        description: "Login realizado com sucesso!",
      });
    } catch (error: any) {
      toast({
        title: "Erro",
        description: error.message || "Erro ao fazer login",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4" data-cy="login-form">
      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          data-cy="login-email"
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
          data-cy="login-password"
          placeholder="••••••••"
        />
      </div>
      <Button type="submit" disabled={loading} className="w-full" data-cy="login-submit">
        {loading ? 'Entrando...' : 'Entrar'}
      </Button>
      <p className="text-center text-sm text-gray-600">
        Não tem conta?{' '}
        <button
          type="button"
          onClick={onToggleMode}
          className="text-purple-600 hover:underline"
          data-cy="toggle-to-register"
        >
          Cadastre-se
        </button>
      </p>
    </form>
  );
}
