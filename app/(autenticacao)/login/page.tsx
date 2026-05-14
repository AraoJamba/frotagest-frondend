'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAutenticacao } from '@/app/contexto/AutenticacaoContexto';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AlertCircle, Loader2, Mail, Lock } from 'lucide-react';

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

    try {
      setCarregando(true);
      await realizarLogin(email, senha);
      router.push('/dashboard');
    } catch (erro) {
      setErro(erro instanceof Error ? erro.message : 'Credenciais inválidas');
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md space-y-6">

        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-foreground">Frotagest</h1>
          <p className="text-muted-foreground text-sm">Acesse sua conta para gerenciar sua frota</p>
        </div>

        {/* Card com formulário */}
        <Card className="p-8 rounded-2xl shadow-xl space-y-6">
          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-xs font-bold uppercase tracking-widest">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="nome@empresa.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={carregando}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            {/* Senha */}
            <div className="space-y-2">
              <Label htmlFor="senha" className="text-xs font-bold uppercase tracking-widest">Senha</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                <Input
                  id="senha"
                  type="password"
                  placeholder="••••••••"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  disabled={carregando}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            {/* Erro */}
            {erro && (
              <div className="flex gap-2 p-3 rounded-lg bg-destructive/10 border border-destructive/20">
                <AlertCircle className="w-4 h-4 text-destructive mt-0.5" />
                <p className="text-sm text-destructive">{erro}</p>
              </div>
            )}

            {/* Botão */}
            <Button
              type="submit"
              className="w-full py-4 font-bold rounded-xl shadow-md hover:bg-blue-500 transition-all"
              disabled={carregando}
            >
              {carregando ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" /> Entrando...
                </span>
              ) : 'Entrar'}
            </Button>

          </form>

          {/* Footer */}
          <div className="mt-6 text-center text-sm">
            <p className="text-muted-foreground">
              Não possui conta?{' '}
              <Link href="/cadastro" className="text-blue-500 font-bold hover:underline">
                Criar Conta
              </Link>
            </p>
          </div>
        </Card>

      </div>
    </div>
  );
}






// 'use client';

// import React from "react"

// import { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import Link from 'next/link';
// import { useAutenticacao } from '@/app/contexto/AutenticacaoContexto';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { Card } from '@/components/ui/card';
// import { AlertCircle } from 'lucide-react';

// export default function PaginaLogin() {
//   const router = useRouter();
//   const { realizarLogin } = useAutenticacao();

//   const [email, setEmail] = useState('');
//   const [senha, setSenha] = useState('');
//   const [erro, setErro] = useState('');
//   const [carregando, setCarregando] = useState(false);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setErro('');
//     setCarregando(true);

//     try {
//       await realizarLogin(email, senha);
//       router.push('/dashboard');
//     } catch (erro) {
//       setErro(erro instanceof Error ? erro.message : 'Erro ao fazer login');
//     } finally {
//       setCarregando(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-background to-secondary flex items-center justify-center px-4">
//       <Card className="w-full max-w-md">
//         <div className="p-8">
//           <div className="text-center mb-8">
//             <h1 className="text-3xl font-bold text-foreground mb-2">Frotagest</h1>
//             <p className="text-muted-foreground">Sistema de Gerenciamento de Frotas</p>
//           </div>

//           <form onSubmit={handleSubmit} className="space-y-6">
//             <div>
//               <Label htmlFor="email">Email</Label>
//               <Input
//                 id="email"
//                 type="email"
//                 placeholder="seu@email.com"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 required
//                 disabled={carregando}
//               />
//             </div>

//             <div>
//               <Label htmlFor="senha">Senha</Label>
//               <Input
//                 id="senha"
//                 type="password"
//                 placeholder="••••••••"
//                 value={senha}
//                 onChange={(e) => setSenha(e.target.value)}
//                 required
//                 disabled={carregando}
//               />
//             </div>

//             {erro && (
//               <div className="flex gap-3 p-3 rounded-lg bg-destructive/10 border border-destructive/20">
//                 <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
//                 <p className="text-sm text-destructive">{erro}</p>
//               </div>
//             )}

//             <Button
//               type="submit"
//               className="w-full"
//               disabled={carregando}
//             >
//               {carregando ? 'Entrando...' : 'Entrar'}
//             </Button>
//           </form>

//           <div className="mt-6 text-center text-sm">
//             <p className="text-muted-foreground">
//               Não possui conta?{' '}
//               <Link href="/cadastro" className="text-primary hover:underline font-medium">
//                 Cadastre-se aqui
//               </Link>
//             </p>
//           </div>
//           {
//             /*
//                       <div className="mt-6 pt-6 border-t border-border">
//                       <p className="text-xs text-muted-foreground text-center mb-4">Contas de teste:</p>
//                       <div className="space-y-2 text-xs">
//                         <div className="p-2 bg-muted rounded">
//                           <p className="font-semibold text-foreground">Admin:</p>
//                           <p className="text-muted-foreground">admin@frotas.com | 123456</p>
//                         </div>
//                         <div className="p-2 bg-muted rounded">
//                           <p className="font-semibold text-foreground">Gerente:</p>
//                           <p className="text-muted-foreground">gerente@frotas.com | 123456</p>
//                         </div>
//                         <div className="p-2 bg-muted rounded">
//                           <p className="font-semibold text-foreground">Motorista:</p>
//                           <p className="text-muted-foreground">motorista@frotas.com | 123456</p>
//                         </div>
//                       </div>
//                     </div>
//             */
//           }

//         </div>
//       </Card>
//     </div>
//   );
// }
