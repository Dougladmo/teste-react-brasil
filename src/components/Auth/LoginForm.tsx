
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
      // Simular login para usuário de teste
      if (email === 'standard_user@teste.com' && password === 'secret_sauce') {
        // Simular usuário autenticado para testes
        const mockUser = {
          id: 'test-user-id',
          email: email,
          user_metadata: {},
          app_metadata: {},
          aud: 'authenticated',
          confirmation_sent_at: '',
          confirmed_at: '',
          created_at: '',
          email_confirmed_at: '',
          identities: [],
          last_sign_in_at: '',
          phone: '',
          role: '',
          updated_at: ''
        };
        
        // Armazenar no localStorage para simular autenticação
        localStorage.setItem('sb-auth-token', JSON.stringify(mockUser));
        window.location.reload();
        return;
      }

      await signIn(email, password);
      toast({
        title: "Sucesso",
        description: "Login realizado com sucesso!",
      });
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "Erro ao fazer login";
      toast({
        title: "Erro",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4" data-cy="login-form" data-testid="login-form">
      <div>
        <Label htmlFor="email" className="text-marrom-cafezinho font-medium">Email</Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          data-cy="login-email"
          placeholder="seu@email.com"
          className="mt-1 border-cinza-sujo/40 focus:border-terracota-queimado"
        />
      </div>
      <div>
        <Label htmlFor="password" className="text-marrom-cafezinho font-medium">Senha</Label>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          data-cy="login-password"
          placeholder="••••••••"
          className="mt-1 border-cinza-sujo/40 focus:border-terracota-queimado"
        />
      </div>
      <Button 
        type="submit" 
        disabled={loading} 
        className="w-full bg-terracota-queimado hover:bg-terracota-queimado/80 text-off-white-envelhecido font-medium" 
        data-cy="login-submit"
      >
        {loading ? 'Entrando...' : 'Entrar'}
      </Button>
      <p className="text-center text-sm text-marrom-cafezinho">
        Não tem conta?{' '}
        <button
          type="button"
          onClick={onToggleMode}
          className="text-terracota-queimado hover:underline font-medium"
          data-cy="toggle-to-register"
        >
          Cadastre-se
        </button>
      </p>
    </form>
  );
}
