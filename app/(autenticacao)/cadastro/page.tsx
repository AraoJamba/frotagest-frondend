'use client';

import React, { useState } from "react"
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAutenticacao, PapelUsuario } from '@/app/contexto/AutenticacaoContexto';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AlertCircle, User, Mail, Lock, ChevronLeft, Loader2, ShieldCheck } from 'lucide-react';


export default function PaginaCadastro() {
  const router = useRouter();

  const { realizarCadastro } = useAutenticacao();

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [papel, setPapel] = useState<PapelUsuario>('motorista');

  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setErro('');
    setCarregando(true);

    try {
      if (!nome || !email || !senha) {
        throw new Error('Preencha todos os campos');
      }

      await realizarCadastro(nome, email, senha, papel);

      router.push('/dashboard');
    } catch (error) {
      setErro(
        error instanceof Error
          ? error.message
          : 'Erro ao criar conta',
      );
    } finally {
      setCarregando(false);
    }
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#070b14] px-5 py-10">
      {/* Background Glow */}
      <div className="absolute left-[-120px] top-[-120px] h-[300px] w-[300px] rounded-full bg-blue-600/20 blur-3xl" />
      <div className="absolute bottom-[-120px] right-[-120px] h-[300px] w-[300px] rounded-full bg-cyan-500/10 blur-3xl" />

      <div className="relative z-10 w-full max-w-[500px]">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <p className="mb-2 text-[10px] font-black uppercase tracking-[0.4em] text-blue-400">
              FrotaGest Enterprise
            </p>

            <h1 className="text-4xl font-semibold tracking-tight text-white md:text-5xl">
              Criar Conta
            </h1>

            <p className="mt-2 text-sm text-zinc-400">
              Sistema inteligente de gestão de frotas
            </p>
          </div>

          <Link
            href="/login"
            className="group flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-md transition-all hover:border-blue-500/40 hover:bg-blue-500/10"
          >
            <ArrowLeft className="h-4 w-4 text-zinc-400 transition-colors group-hover:text-blue-400" />

            <span className="text-xs font-semibold uppercase tracking-wider text-zinc-300">
              Login
            </span>
          </Link>
        </div>

        {/* Card */}
        <Card className="border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-xl rounded-3xl">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Nome */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label className="text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-400">
                  Nome Completo
                </Label>

                <User className="h-4 w-4 text-zinc-500" />
              </div>

              <Input
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                placeholder="João Silva"
                disabled={carregando}
                className="h-12 rounded-2xl border-white/10 bg-[#0b1220] text-white placeholder:text-zinc-600 focus-visible:ring-1 focus-visible:ring-blue-500"
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label className="text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-400">
                  E-mail
                </Label>

                <Mail className="h-4 w-4 text-zinc-500" />
              </div>

              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="teu@email.com"
                disabled={carregando}
                className="h-12 rounded-2xl border-white/10 bg-[#0b1220] text-white placeholder:text-zinc-600 focus-visible:ring-1 focus-visible:ring-blue-500"
              />
            </div>

            {/* Senha */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label className="text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-400">
                  Senha
                </Label>

                <Lock className="h-4 w-4 text-zinc-500" />
              </div>

              <Input
                type="password"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                placeholder="••••••••"
                disabled={carregando}
                className="h-12 rounded-2xl border-white/10 bg-[#0b1220] text-white placeholder:text-zinc-600 focus-visible:ring-1 focus-visible:ring-blue-500"
              />
            </div>

            {/* Papel */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label className="text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-400">
                  Tipo de Utilizador
                </Label>

                <ShieldCheck className="h-4 w-4 text-zinc-500" />
              </div>

              <Select
                value={papel}
                onValueChange={(value) => setPapel(value as PapelUsuario)}
                disabled={carregando}
              >
                <SelectTrigger className="h-12 rounded-2xl border-white/10 bg-[#0b1220] text-white focus:ring-1 focus:ring-blue-500">
                  <SelectValue />
                </SelectTrigger>

                <SelectContent className="border-white/10 bg-[#111827] text-white">
                  <SelectItem value="motorista">
                    Motorista
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Error */}
            {erro && (
              <div className="flex items-start gap-3 rounded-2xl border border-red-500/20 bg-red-500/10 p-4 animate-in fade-in">
                <AlertCircle className="mt-0.5 h-4 w-4 text-red-400" />

                <p className="text-sm text-red-300">
                  {erro}
                </p>
              </div>
            )}

            {/* Botão */}
            <Button
              type="submit"
              disabled={carregando}
              className="h-14 w-full rounded-2xl bg-blue-600 text-sm font-bold uppercase tracking-[0.2em] text-white transition-all hover:scale-[1.01] hover:bg-blue-500 active:scale-[0.99]"
            >
              {carregando ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                'Criar Conta'
              )}
            </Button>
          </form>
        </Card>

        {/* Footer */}
        <div className="mt-6 text-center">
          <p className="text-xs tracking-[0.3em] text-zinc-600 uppercase">
            © 2026 FrotaGest
          </p>
        </div>
      </div>
    </main>
  );
}











// 'use client';

// import React from "react"

// import { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import Link from 'next/link';
// import { useAutenticacao, PapelUsuario } from '@/app/contexto/AutenticacaoContexto';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { Card } from '@/components/ui/card';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
// import { AlertCircle } from 'lucide-react';

// export default function PaginaCadastro() {
//   const router = useRouter();
//   const { realizarCadastro } = useAutenticacao();
  
//   const [nome, setNome] = useState('');
//   const [email, setEmail] = useState('');
//   const [senha, setSenha] = useState('');
//   const [papel, setPapel] = useState<PapelUsuario>('motorista');
//   const [erro, setErro] = useState('');
//   const [carregando, setCarregando] = useState(false);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setErro('');
//     setCarregando(true);

//     try {
//       if (!nome || !email || !senha) {
//         throw new Error('Todos os campos são obrigatórios');
//       }
      
//       await realizarCadastro(nome, email, senha, papel);
//       router.push('/dashboard');
//     } catch (erro) {
//       setErro(erro instanceof Error ? erro.message : 'Erro ao cadastrar');
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
//             <p className="text-muted-foreground">Criar Nova Conta</p>
//           </div>

//           <form onSubmit={handleSubmit} className="space-y-4">
//             <div>
//               <Label htmlFor="nome">Nome Completo</Label>
//               <Input
//                 id="nome"
//                 type="text"
//                 placeholder="João Silva"
//                 value={nome}
//                 onChange={(e) => setNome(e.target.value)}
//                 required
//                 disabled={carregando}
//               />
//             </div>

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

//             <div>
//               <Label htmlFor="papel">Tipo de Usuário</Label>
//               <Select value={papel} onValueChange={(value) => setPapel(value as PapelUsuario)} disabled={carregando}>
//                 <SelectTrigger>
//                   <SelectValue />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="motorista">Motorista</SelectItem>
//                   {/*<SelectItem value="gerente">Gerente</SelectItem>*/}
//                   {/*<SelectItem value="admin">Administrador</SelectItem>*/}
//                 </SelectContent>
//               </Select>
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
//               {carregando ? 'Criando conta...' : 'Cadastrar'}
//             </Button>
//           </form>

//           <div className="mt-6 text-center text-sm">
//             <p className="text-muted-foreground">
//               Já possui conta?{' '}
//               <Link href="/login" className="text-primary hover:underline font-medium">
//                 Faça login
//               </Link>
//             </p>
//           </div>
//         </div>
//       </Card>
//     </div>
//   );
// }
