
import { useState } from 'react';
import { LoginForm } from './LoginForm';
import { RegisterForm } from './RegisterForm';

export function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen bg-gradient-to-br from-marrom-cafezinho via-cinza-sujo to-bege-po flex items-center justify-center p-4">
      <div className="bg-off-white-envelhecido/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 w-full max-w-md border border-cinza-sujo/30">
        <header className="text-center mb-8">
          <h1 className="text-3xl font-bold text-marrom-cafezinho">
            {isLogin ? 'Entrar' : 'Criar Conta'}
          </h1>
          <p className="text-marrom-cafezinho/80 mt-2">
            {isLogin ? 'Acesse sua conta para continuar' : 'Crie sua conta e comece a comprar'}
          </p>
        </header>

        {isLogin ? (
          <LoginForm onToggleMode={() => setIsLogin(false)} />
        ) : (
          <RegisterForm onToggleMode={() => setIsLogin(true)} />
        )}
      </div>
    </div>
  );
}
