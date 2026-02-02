import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Card, Input, Button, Alert, Form } from 'antd';
import { Lock, User, AlertCircle, Eye, EyeOff } from 'lucide-react';

const Login: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (values: { username: string; password: string }) => {
    setError('');
    setIsLoading(true);

    // Simular delay de autenticação
    await new Promise(resolve => setTimeout(resolve, 500));

    const success = login(values.username.trim(), values.password);
    
    if (success) {
      navigate('/financiamento-aps', { replace: true });
    } else {
      setError('Usuário ou senha inválidos');
    }
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-primary/10 p-4">
      <Card className="w-full max-w-md shadow-lg">
        <div className="text-center mb-6">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary">
            <Lock className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold">Figma Teste</h1>
          <p className="text-gray-500 mt-1">
            Digite suas credenciais para acessar o sistema
          </p>
        </div>

        <Form onFinish={handleSubmit} layout="vertical">
          {error && (
            <Alert
              type="error"
              message={error}
              icon={<AlertCircle className="h-4 w-4" />}
              showIcon
              className="mb-4"
            />
          )}
          
          <Form.Item
            label="Usuário"
            name="username"
            rules={[{ required: true, message: 'Por favor, digite seu usuário' }]}
          >
            <Input
              prefix={<User className="h-4 w-4 text-gray-400" />}
              placeholder="Digite seu usuário"
              autoComplete="username"
            />
          </Form.Item>
          
          <Form.Item
            label="Senha"
            name="password"
            rules={[{ required: true, message: 'Por favor, digite sua senha' }]}
          >
            <Input
              prefix={<Lock className="h-4 w-4 text-gray-400" />}
              suffix={
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              }
              type={showPassword ? 'text' : 'password'}
              placeholder="Digite sua senha"
              autoComplete="current-password"
            />
          </Form.Item>
          
          <Form.Item>
            <Button 
              type="primary" 
              htmlType="submit"
              loading={isLoading}
              block
            >
              {isLoading ? 'Entrando...' : 'Entrar'}
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
