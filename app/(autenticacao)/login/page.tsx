'use client';

import React, { useState } from "react"
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAutenticacao } from '@/app/contexto/AutenticacaoContexto';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { AlertCircle, Lock, Mail, Loader2 } from 'lucide-react';

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
      setErro(erro instanceof Error ? erro.message : 'Credenciais inválidas');
    } finally {
      setCarregando(false);
    }
  };

  return (
    // Fundo com gradiente radial profundo
    <div className="min-h-screen bg-[#09090b] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-[#09090b] to-[#09090b] flex items-center justify-center px-4 antialiased">
      
      <div className="w-full max-w-[400px] space-y-6">
        
        {/* Logo/Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600/10 border border-blue-500/20 mb-2">
            <Lock className="w-6 h-6 text-blue-500" />
          </div>
          <h1 className="text-3xl font-black tracking-tighter text-white italic uppercase">
            Frota<span className="text-blue-500">gest</span>
          </h1>
          <p className="text-zinc-500 text-sm font-medium tracking-tight">
            Acesse sua conta para gerenciar sua frota
          </p>
        </div>

        <Card className="bg-zinc-900/50 border-zinc-800 backdrop-blur-xl shadow-2xl p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* Campo Email */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-zinc-400 text-xs font-bold uppercase tracking-widest">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600" />
                <Input
                  id="email"
                  type="email"
                  placeholder="nome@empresa.com"
                  className="bg-zinc-950 border-zinc-800 pl-10 focus:border-blue-500/50 focus:ring-blue-500/20 transition-all text-zinc-200"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={carregando}
                />
              </div>
            </div>

            {/* Campo Senha */}
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="senha" className="text-zinc-400 text-xs font-bold uppercase tracking-widest">Senha</Label>
                <Link href="#" className="text-[10px] text-blue-500 hover:text-blue-400 font-bold uppercase tracking-tighter transition-colors">
                  Esqueceu a senha?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600" />
                <Input
                  id="senha"
                  type="password"
                  placeholder="••••••••"
                  className="bg-zinc-950 border-zinc-800 pl-10 focus:border-blue-500/50 focus:ring-blue-500/20 transition-all text-zinc-200"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  required
                  disabled={carregando}
                />
              </div>
            </div>

            {/* Alerta de Erro */}
            {erro && (
              <div className="flex gap-3 p-3 rounded-xl bg-red-500/10 border border-red-500/20 animate-in fade-in zoom-in duration-300">
                <AlertCircle className="w-5 h-5 text-red-500 shrink-0" />
                <p className="text-xs font-medium text-red-400 leading-tight">{erro}</p>
              </div>
            )}

            {/* Botão Submit */}
            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-6 rounded-xl transition-all shadow-[0_0_20px_rgba(37,99,235,0.2)] active:scale-[0.98]"
              disabled={carregando}
            >
              {carregando ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Autenticando...
                </>
              ) : 'ENTRAR NO SISTEMA'}
            </Button>
          </form>

          {/* Rodapé do Card */}
          <div className="mt-8 pt-6 border-t border-zinc-800 text-center">
            <p className="text-sm text-zinc-500 font-medium">
              Ainda não tem acesso?{' '}
              <Link href="/cadastro" className="text-blue-500 hover:text-blue-400 font-bold transition-colors">
                Solicitar Registro
              </Link>
            </p>
          </div>
        </Card>

        {/* Info adicional opcional fora do card */}
        <p className="text-center text-[10px] text-zinc-600 font-bold uppercase tracking-[0.2em]">
          &copy; {new Date().getFullYear()} Frotagest v2.0
        </p>
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
