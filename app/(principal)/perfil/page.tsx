'use client';

import { useEffect, useState } from 'react';
import { useAutenticacao } from '@/app/contexto/AutenticacaoContexto';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import {
  Edit,
  User,
  Mail,
  Shield,
  Save,
  X
} from 'lucide-react';

export default function PaginaPerfil() {

  const { usuarioAtual } = useAutenticacao();

  const [editando, setEditando] = useState(false);

  const [dados, setDados] = useState({
    nome: '',
    email: '',
  });

  useEffect(() => {
    if (usuarioAtual) {
      setDados({
        nome: usuarioAtual.nome || '',
        email: usuarioAtual.email || '',
      });
    }
  }, [usuarioAtual]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log(dados);

    setEditando(false);
  };

  return (
    <Card className="bg-white border border-slate-200 rounded-2xl shadow-sm">

      {/* HEADER */}
      <div className="border-b border-slate-200 px-6 py-5 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-800">
            Meu Perfil
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Gerencie suas informações pessoais
          </p>
        </div>

        {!editando && (
          <Button
            type="button"
            onClick={() => setEditando(true)}
            variant="outline"
            className="h-10 px-4"
          >
            <Edit className="w-4 h-4 mr-2" />
            Editar
          </Button>
        )}
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-6">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* NOME */}
          <div className="space-y-2">
            <Label>Nome Completo</Label>

            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />

              <Input
                value={dados.nome}
                onChange={(e) => setDados({ ...dados, nome: e.target.value })}
                disabled={!editando}
                className="pl-10 h-11"
              />
            </div>
          </div>

          {/* EMAIL */}
          <div className="space-y-2">
            <Label>Email</Label>

            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />

              <Input
                type="email"
                value={dados.email}
                onChange={(e) => setDados({ ...dados, email: e.target.value })}
                disabled={!editando}
                className="pl-10 h-11"
              />
            </div>
          </div>

          {/* PAPEL */}
          <div className="space-y-2 md:col-span-2">
            <Label>Nível de Acesso</Label>

            <div className="relative">
              <Shield className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />

              <Input
                value={usuarioAtual?.papel?.toUpperCase() || ''}
                disabled
                className="pl-10 h-11 bg-slate-100 cursor-not-allowed"
              />
            </div>
          </div>

        </div>

        {/* BOTÕES */}
        {editando && (
          <div className="flex flex-col sm:flex-row justify-end gap-3 pt-6 border-t border-slate-200">

            <Button
              type="button"
              variant="outline"
              onClick={() => setEditando(false)}
              className="h-11 px-6"
            >
              <X className="w-4 h-4 mr-2" />
              Cancelar
            </Button>

            <Button
              type="submit"
              className="h-11 px-6 bg-blue-600 hover:bg-blue-700"
            >
              <Save className="w-4 h-4 mr-2" />
              Salvar
            </Button>

          </div>
        )}

      </form>

    </Card>
  );
}






// 'use client';

// import { useState } from 'react';
// import { useAutenticacao } from '@/app/contexto/AutenticacaoContexto';
// import { Card } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { Badge } from '@/components/ui/badge';
// import { Edit, User, Mail, Shield, Save, X, Lock, History } from 'lucide-react';

// export default function PaginaPerfil() {
//   const { usuarioAtual } = useAutenticacao();
//   const [editando, setEditando] = useState(false);
//   const [dados, setDados] = useState({
//     nome: usuarioAtual?.nome || '',
//     email: usuarioAtual?.email || '',
//   });

//   const handleSalvar = () => {
//     setEditando(false);
//   };

//   return (
//     <div className="space-y-8 max-w-3xl antialiased pb-10">
      
//       {/* Cabeçalho de Identificação */}
//       <div className="space-y-1">
//         <p className="text-[10px] text-blue-500 font-bold uppercase tracking-[0.4em]">
//           Configurações de Conta
//         </p>
//         <h1 className="text-4xl text-white font-medium">
//           Meu <span className="text-blue-400 italic font-serif">Perfil</span>
//         </h1>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
//         {/* Coluna da Esquerda: Avatar e Papel */}
//         <div className="space-y-6">
//           <Card className="bg-[#11141d] border-[#1c212c] p-8 rounded-[24px] text-center flex flex-col items-center shadow-xl">
//             <div className="w-24 h-24 rounded-full bg-[#0a0c14] border-2 border-[#1c212c] flex items-center justify-center mb-4 relative">
//               <User className="w-10 h-10 text-zinc-600" />
//               <div className="absolute bottom-0 right-0 w-6 h-6 bg-green-500 border-4 border-[#11141d] rounded-full" />
//             </div>
//             <h3 className="text-zinc-200 font-bold tracking-tight">{usuarioAtual?.nome}</h3>
//             <p className="text-[10px] text-zinc-500 uppercase tracking-widest mt-1 mb-4">Membro desde 2026</p>
            
//             <Badge className="bg-blue-500/10 text-blue-400 border-blue-500/20 px-4 py-1 rounded-lg uppercase text-[9px] tracking-widest">
//               {usuarioAtual?.papel || 'Colaborador'}
//             </Badge>
//           </Card>

//           <Card className="bg-[#11141d] border-[#1c212c] p-6 rounded-[24px] shadow-xl">
//             <h4 className="text-[10px] text-zinc-500 font-bold uppercase tracking-[0.2em] mb-4">Segurança</h4>
//             <div className="space-y-2">
//               <Button variant="ghost" className="w-full justify-start gap-3 text-zinc-400 hover:text-white hover:bg-[#1c212c] rounded-xl text-xs h-12">
//                 <Lock className="w-4 h-4" />
//                 Alterar Senha
//               </Button>
//               <Button variant="ghost" className="w-full justify-start gap-3 text-zinc-400 hover:text-white hover:bg-[#1c212c] rounded-xl text-xs h-12">
//                 <History className="w-4 h-4" />
//                 Logs de Acesso
//               </Button>
//             </div>
//           </Card>
//         </div>

//         {/* Coluna da Direita: Formulário */}
//         <div className="md:col-span-2">
//           <Card className="bg-[#11141d] border-[#1c212c] rounded-[24px] shadow-2xl overflow-hidden h-full">
//             <div className="p-8 space-y-6">
//               <div className="flex items-center justify-between border-b border-[#1c212c] pb-6">
//                 <div>
//                   <h2 className="text-lg text-white font-medium">Informações Gerais</h2>
//                   <p className="text-[10px] text-zinc-500 uppercase tracking-wider">Dados de identificação no sistema</p>
//                 </div>
//                 {!editando && (
//                   <Button
//                     onClick={() => setEditando(true)}
//                     className="bg-[#1c212c] hover:bg-blue-600 border border-[#2d3444] rounded-xl h-10 px-4 text-[10px] font-bold tracking-widest"
//                   >
//                     <Edit className="w-3.5 h-3.5 mr-2" />
//                     EDITAR
//                   </Button>
//                 )}
//               </div>

//               <div className="space-y-4">
//                 {/* Campo Nome */}
//                 <div className="space-y-2">
//                   <Label className="text-zinc-500 text-[10px] font-bold uppercase tracking-[0.2em]">Nome Completo</Label>
//                   <div className="relative">
//                     <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-700" />
//                     <Input
//                       value={dados.nome}
//                       onChange={(e) => setDados({ ...dados, nome: e.target.value })}
//                       disabled={!editando}
//                       className="bg-[#0a0c14] border-[#1c212c] h-12 pl-12 rounded-xl text-zinc-200 focus:ring-1 focus:ring-blue-500/30 disabled:opacity-50"
//                     />
//                   </div>
//                 </div>

//                 {/* Campo Email */}
//                 <div className="space-y-2">
//                   <Label className="text-zinc-500 text-[10px] font-bold uppercase tracking-[0.2em]">Endereço de E-mail</Label>
//                   <div className="relative">
//                     <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-700" />
//                     <Input
//                       type="email"
//                       value={dados.email}
//                       onChange={(e) => setDados({ ...dados, email: e.target.value })}
//                       disabled={!editando}
//                       className="bg-[#0a0c14] border-[#1c212c] h-12 pl-12 rounded-xl text-zinc-200 focus:ring-1 focus:ring-blue-500/30 disabled:opacity-50"
//                     />
//                   </div>
//                 </div>

//                 {/* Campo Papel (Read Only) */}
//                 <div className="space-y-2">
//                   <Label className="text-zinc-500 text-[10px] font-bold uppercase tracking-[0.2em]">Nível de Acesso</Label>
//                   <div className="relative">
//                     <Shield className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-800" />
//                     <Input
//                       value={usuarioAtual?.papel?.toUpperCase() || ''}
//                       disabled
//                       className="bg-[#0a0c14]/50 border-[#1c212c] h-12 pl-12 rounded-xl text-zinc-600 font-mono text-[10px] tracking-widest cursor-not-allowed"
//                     />
//                   </div>
//                 </div>

//                 {editando && (
//                   <div className="flex gap-3 justify-end pt-6 animate-in fade-in slide-in-from-top-2">
//                     <Button
//                       variant="ghost"
//                       onClick={() => setEditando(false)}
//                       className="text-zinc-500 hover:text-white rounded-xl h-12 px-6 text-xs font-bold"
//                     >
//                       <X className="w-4 h-4 mr-2" />
//                       DESCARTAR
//                     </Button>
//                     <Button 
//                       onClick={handleSalvar}
//                       className="bg-blue-600 hover:bg-blue-500 text-white border border-blue-400/20 rounded-xl h-12 px-8 text-xs font-bold shadow-[0_0_15px_rgba(37,99,235,0.2)]"
//                     >
//                       <Save className="w-4 h-4 mr-2" />
//                       SALVAR ALTERAÇÕES
//                     </Button>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </Card>
//         </div>
//       </div>

//     </div>
//   );
// }




// // 'use client';

// // import { useState } from 'react';
// // import { useAutenticacao } from '@/app/contexto/AutenticacaoContexto';
// // import { Card } from '@/components/ui/card';
// // import { Button } from '@/components/ui/button';
// // import { Input } from '@/components/ui/input';
// // import { Label } from '@/components/ui/label';
// // import { Edit } from 'lucide-react';

// // export default function PaginaPerfil() {
// //   const { usuarioAtual } = useAutenticacao();
// //   const [editando, setEditando] = useState(false);
// //   const [dados, setDados] = useState({
// //     nome: usuarioAtual?.nome || '',
// //     email: usuarioAtual?.email || '',
// //   });

// //   const handleSalvar = () => {
// //     setEditando(false);
    
// //   };

// //   return (
// //     <div className="space-y-6 max-w-2xl">
// //       <div>
// //         <h1 className="text-3xl font-bold text-foreground">Meu Perfil</h1>
// //         <p className="text-muted-foreground mt-2">Gerencie suas informações pessoais</p>
// //       </div>

// //       {/* Informações Básicas */}
// //       <Card className="p-6">
// //         <div className="flex items-center justify-between mb-6">
// //           <h2 className="text-xl font-semibold text-foreground">Informações Pessoais</h2>
// //           <Button
// //             variant={editando ? 'default' : 'outline'}
// //             onClick={() => setEditando(!editando)}
// //             className="gap-2"
// //           >
// //             <Edit className="w-4 h-4" />
// //             {editando ? 'Salvar' : 'Editar'}
// //           </Button>
// //         </div>

// //         <div className="space-y-4">
// //           <div>
// //             <Label htmlFor="nome">Nome</Label>
// //             <Input
// //               id="nome"
// //               value={dados.nome}
// //               onChange={(e) => setDados({ ...dados, nome: e.target.value })}
// //               disabled={!editando}
// //             />
// //           </div>

// //           <div>
// //             <Label htmlFor="email">Email</Label>
// //             <Input
// //               id="email"
// //               type="email"
// //               value={dados.email}
// //               onChange={(e) => setDados({ ...dados, email: e.target.value })}
// //               disabled={!editando}
// //             />
// //           </div>

// //           <div>
// //             <Label htmlFor="papel">Papel</Label>
// //             <Input
// //               id="papel"
// //               value={usuarioAtual?.papel || ''}
// //               disabled
// //               className="bg-muted"
// //             />
// //           </div>

// //           {editando && (
// //             <div className="flex gap-3 justify-end pt-4 border-t border-border">
// //               <Button
// //                 variant="outline"
// //                 onClick={() => setEditando(false)}
// //               >
// //                 Cancelar
// //               </Button>
// //               <Button onClick={handleSalvar}>
// //                 Salvar Mudanças
// //               </Button>
// //             </div>
// //           )}
// //         </div>
// //       </Card>

// //       {/* Segurança */}
// //       <Card className="p-6">
// //         <h2 className="text-xl font-bold text-foreground mb-4">Segurança</h2>
// //         <div className="space-y-4">
// //           <Button variant="outline" className="w-full justify-start bg-transparent">
// //             Alterar Senha
// //           </Button>
// //           <Button variant="outline" className="w-full justify-start bg-transparent">
// //             Atividade de Conta
// //           </Button>
// //         </div>
// //       </Card>
// //     </div>
// //   );
// // }
