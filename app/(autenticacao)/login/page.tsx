'use client';

import React from "react"

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAutenticacao } from '@/app/contexto/AutenticacaoContexto';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { AlertCircle } from 'lucide-react';

export default function PaginaLogin() {
  const router = useRouter();
  const { realizarLogin } = useAutenticacao();

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro('');
    setCarregando(true);

    try {
      await realizarLogin(email, senha);
      router.push('/dashboard');
    } catch (erro) {
      setErro(erro instanceof Error ? erro.message : 'Erro ao fazer login');
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary flex items-center justify-center px-4">
      <Card className="w-full max-w-md">
        <div className="p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Frotagest</h1>
            <p className="text-muted-foreground">Sistema de Gerenciamento de Frotas</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={carregando}
              />
            </div>

            <div>
              <Label htmlFor="senha">Senha</Label>
              <Input
                id="senha"
                type="password"
                placeholder="••••••••"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                required
                disabled={carregando}
              />
            </div>

            {erro && (
              <div className="flex gap-3 p-3 rounded-lg bg-destructive/10 border border-destructive/20">
                <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                <p className="text-sm text-destructive">{erro}</p>
              </div>
            )}

            <Button
              type="submit"
              className="w-full"
              disabled={carregando}
            >
              {carregando ? 'Entrando...' : 'Entrar'}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm">
            <p className="text-muted-foreground">
              Não possui conta?{' '}
              <Link href="/cadastro" className="text-primary hover:underline font-medium">
                Cadastre-se aqui
              </Link>
            </p>
          </div>
          {
            /*
                      <div className="mt-6 pt-6 border-t border-border">
                      <p className="text-xs text-muted-foreground text-center mb-4">Contas de teste:</p>
                      <div className="space-y-2 text-xs">
                        <div className="p-2 bg-muted rounded">
                          <p className="font-semibold text-foreground">Admin:</p>
                          <p className="text-muted-foreground">admin@frotas.com | 123456</p>
                        </div>
                        <div className="p-2 bg-muted rounded">
                          <p className="font-semibold text-foreground">Gerente:</p>
                          <p className="text-muted-foreground">gerente@frotas.com | 123456</p>
                        </div>
                        <div className="p-2 bg-muted rounded">
                          <p className="font-semibold text-foreground">Motorista:</p>
                          <p className="text-muted-foreground">motorista@frotas.com | 123456</p>
                        </div>
                      </div>
                    </div>
            */
          }

        </div>
      </Card>
    </div>
  );
}
