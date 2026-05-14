'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useDados } from '@/app/contexto/DadosContexto';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Plus, Trash2, Edit, Eye, Search, Wrench, FileText, Banknote, ClipboardCheck } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

export default function PaginaServicos() {
  const { manutencoes, deletarManutencao } = useDados();
  const [busca, setBusca] = useState('');
  const [idParaDeletar, setIdParaDeletar] = useState<string | null>(null);

  const manutencoesFiltrados = manutencoes.filter(m =>
    m.descricao.toLowerCase().includes(busca.toLowerCase()) ||
    m.tipo_manutencao.toLowerCase().includes(busca.toLowerCase())
  );

  const handleDeletar = () => {
    if (idParaDeletar) {
      deletarManutencao(idParaDeletar);
      setIdParaDeletar(null);
    }
  };

  return (
    <div className="space-y-8 pb-10 antialiased">
      
      {/* Cabeçalho Técnico */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-1">
          <p className="text-[10px] text-blue-500 font-bold uppercase tracking-[0.4em]">
            Manutenção Operacional
          </p>
          <h1 className="text-4xl text-white font-medium">
            Central de <span className="text-blue-400 italic font-serif">Serviços</span>
          </h1>
        </div>
        
        <Link href="/servicos/adicionar">
          <Button className="bg-[#1c212c] hover:bg-blue-600 text-white border border-[#2d3444] hover:border-blue-500 h-12 px-6 rounded-xl transition-all shadow-lg group">
            <Plus className="w-4 h-4 mr-2 group-hover:rotate-90 transition-transform" />
            <span className="tracking-widest text-[11px] font-bold">NOVA ORDEM</span>
          </Button>
        </Link>
      </div>

      {/* Barra de Busca Integrada */}
      <Card className="bg-[#11141d] border-[#1c212c] p-2 rounded-2xl shadow-xl">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600" />
          <Input
            placeholder="Filtrar por descrição do serviço ou tipo de manutenção..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            className="pl-12 bg-[#0a0c14] border-none h-14 rounded-xl text-zinc-200 placeholder:text-zinc-700 focus-visible:ring-1 focus-visible:ring-blue-500/20 transition-all"
          />
        </div>
      </Card>

      {/* Tabela de Serviços Estilo Enterprise */}
      <Card className="bg-[#11141d] border-[#1c212c] rounded-[24px] overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-[#1c212c]">
                <th className="px-6 py-5 text-left text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em]">Serviço / Tipo</th>
                <th className="px-6 py-5 text-left text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em]">Especificações</th>
                <th className="px-6 py-5 text-left text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em]">Custo (Kz)</th>
                <th className="px-6 py-5 text-left text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em]">Status Operacional</th>
                <th className="px-6 py-5 text-center text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em]">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1c212c]/50">
              {manutencoesFiltrados.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center">
                    <p className="text-zinc-600 text-sm italic font-serif">Nenhum registro de serviço no banco de dados.</p>
                  </td>
                </tr>
              ) : (
                manutencoesFiltrados.map((item) => (
                  <tr key={item.id} className="group hover:bg-[#161a24] transition-colors">
                    {/* Nome e Tipo */}
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-[#0a0c14] border border-[#1c212c] flex items-center justify-center group-hover:border-blue-500/30 transition-colors shadow-inner">
                          <Wrench className="w-4 h-4 text-blue-500" />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-zinc-200 tracking-tight capitalize">{item.tipo_manutencao}</p>
                          <Badge variant="outline" className="mt-1 bg-transparent border-blue-500/10 text-[8px] text-zinc-500 font-bold uppercase tracking-widest px-1.5 h-4">
                            ID: {item.id.slice(0, 5)}
                          </Badge>
                        </div>
                      </div>
                    </td>

                    {/* Descrição */}
                    <td className="px-6 py-5">
                      <div className="flex items-start gap-2 max-w-[250px]">
                        <FileText className="w-3 h-3 text-zinc-700 mt-1 shrink-0" />
                        <p className="text-xs text-zinc-500 leading-relaxed truncate group-hover:text-zinc-400 transition-colors">
                          {item.descricao}
                        </p>
                      </div>
                    </td>

                    {/* Custo */}
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2">
                        <Banknote className="w-3.5 h-3.5 text-green-500/50" />
                        <span className="text-sm font-mono text-zinc-200 font-bold tracking-tighter">
                          {new Intl.NumberFormat('pt-AO', { style: 'currency', currency: 'AOA' }).format(item.custo)}
                        </span>
                      </div>
                    </td>

                    {/* Status */}
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#0a0c14] border border-[#1c212c] w-fit group-hover:border-zinc-700 transition-all">
                        <ClipboardCheck className={`w-3 h-3 ${item.status === 'concluida' ? 'text-green-500' : 'text-amber-500'}`} />
                        <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">
                          {item.status}
                        </span>
                      </div>
                    </td>

                    {/* Ações */}
                    <td className="px-6 py-5 text-center">
                      <div className="flex items-center justify-center gap-1">
                        <Link href={`/manutencoes/${item.id}`}>
                          <Button variant="ghost" size="icon" className="h-9 w-9 text-zinc-500 hover:text-blue-400 hover:bg-blue-400/10 rounded-lg">
                            <Eye className="w-4 h-4" />
                          </Button>
                        </Link>
                        <Link href={`/manutencoes/${item.id}/editar`}>
                          <Button variant="ghost" size="icon" className="h-9 w-9 text-zinc-500 hover:text-amber-400 hover:bg-amber-400/10 rounded-lg">
                            <Edit className="w-4 h-4" />
                          </Button>
                        </Link>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-9 w-9 text-zinc-600 hover:text-red-500 hover:bg-red-500/10 rounded-lg"
                          onClick={() => setIdParaDeletar(item.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Modal de Exclusão Estilizado */}
      <AlertDialog open={idParaDeletar !== null} onOpenChange={() => setIdParaDeletar(null)}>
        <AlertDialogContent className="bg-[#11141d] border-[#1c212c] rounded-3xl">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white font-serif italic text-2xl">Excluir Serviço</AlertDialogTitle>
            <AlertDialogDescription className="text-zinc-500 text-sm">
              Você está prestes a remover este registro de serviço. Esta operação é irreversível e afetará os relatórios financeiros.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="flex gap-3 justify-end mt-4">
            <AlertDialogCancel className="bg-transparent border-[#1c212c] text-zinc-400 hover:bg-[#0a0c14] rounded-xl">
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDeletar} 
              className="bg-red-600/10 text-red-500 border border-red-500/20 hover:bg-red-600 hover:text-white rounded-xl transition-all font-bold text-xs tracking-widest"
            >
              CONFIRMAR EXCLUSÃO
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}










// 'use client';
// import { useState } from 'react';
// import Link from 'next/link';
// import { useDados } from '@/app/contexto/DadosContexto';
// import { Button } from '@/components/ui/button';
// import { Card } from '@/components/ui/card';
// import { Input } from '@/components/ui/input';
// import { Badge } from '@/components/ui/badge';
// import { Plus, Trash2, Edit, Eye, Search } from 'lucide-react';
// import {
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogHeader,
//   AlertDialogTitle,
// } from '@/components/ui/alert-dialog';


// export default function PaginaServicos() {
//   const { manutencoes, deletarManutencao } = useDados();
//   const [busca, setBusca] = useState('');
//   const [idParaDeletar, setIdParaDeletar] = useState<string | null>(null);

//   const manutencoesFiltrados = manutencoes.filter(m =>
//     //m.tipoManutencao.toLowerCase().includes(busca.toLowerCase()) ||
//     m.descricao.toLowerCase().includes(busca.toLowerCase())
//   );

//   console.log(manutencoes)

//   const handleDeletar = () => {
//     if (idParaDeletar) {
//       deletarManutencao(idParaDeletar);
//       setIdParaDeletar(null);
//     }
//   };


  

//   return (
    
//     <div className="space-y-6">

//       {/* Cabeçalho */}
//       <div className="flex items-center justify-between">
//         <div>
//           <h1 className="text-3xl font-bold text-foreground">Serviços</h1>
//           <p className="text-muted-foreground mt-2">Gerencie os serviços disponíveis</p>
//         </div>
//         <Link href="/servicos/adicionar">
//           <Button className="gap-2">
//             <Plus className="w-5 h-5" />
//             Novo Serviço
//           </Button>
//         </Link>
//       </div>

//       {/* Barra de Busca */}
//       <Card className="p-4">
//         <div className="relative">
//           <Search className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
//           <Input
//             placeholder="Buscar por nome ou descrição..."
//             value={busca}
//             onChange={(e) => setBusca(e.target.value)}
//             className="pl-10"
//           />
//         </div>
//       </Card>

//       {/* Tabela de Serviços */}
//       <Card className="overflow-hidden">
//         {manutencoesFiltrados.length === 0 ? (
//           <div className="p-8 text-center">
//             <p className="text-muted-foreground">Nenhum serviço encontrado</p>
//           </div>
//         ) : (
//           <div className="overflow-x-auto">
//             <table className="w-full">
//               <thead className="bg-muted border-b border-border">
//                 <tr>
//                   <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Nome</th>
//                   <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Descrição</th>
//                   <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Tipo</th>
//                   <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Custo Estimado</th>
//                   <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Status</th>
//                   <th className="px-6 py-3 text-center text-sm font-semibold text-foreground">Ações</th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-border">
//                 {manutencoesFiltrados.map((manutencoes) => (
//                   <tr key={manutencoes.id} className="hover:bg-muted/50 transition-colors">
//                     <td className="px-6 py-4 text-sm text-foreground font-medium">{manutencoes.tipo_manutencao}</td>
//                     <td className="px-6 py-4 text-sm text-muted-foreground">{manutencoes.descricao}</td>
//                     <td className="px-6 py-4 text-sm">
//                       <Badge variant="default" className="capitalize">{manutencoes.tipo_manutencao}</Badge>
                      
//                     </td>
//                     <td className="px-6 py-4 text-sm text-foreground font-medium">
//                       {new Intl.NumberFormat('pt-AO', { style: 'currency', currency: 'AOA' }).format(manutencoes.custo)}
                      
//                     </td>
//                     <td className="px-6 py-4 text-sm">
//                       <Badge >
//                         {manutencoes.status}
//                       </Badge>
//                     </td>
//                     <td className="px-6 py-4 text-center">
//                       <div className="flex items-center justify-center gap-2">
//                         <Link href={`/manutencoes/${manutencoes.id}`}>
//                           <Button variant="ghost" size="sm">
//                             <Eye className="w-4 h-4" />
//                           </Button>
//                         </Link>
//                         <Link href={`/manutencoes/${manutencoes.id}/editar`}>
//                           <Button variant="ghost" size="sm">
//                             <Edit className="w-4 h-4" />
//                           </Button>
//                         </Link>
//                         <Button
//                           variant="ghost"
//                           size="sm"
//                           className="text-destructive hover:text-destructive"
//                           onClick={() => setIdParaDeletar(manutencoes.id)}
//                         >
//                           <Trash2 className="w-4 h-4" />
//                         </Button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </Card>

//       {/* Diálogo de Confirmação de Exclusão */}
//       <AlertDialog open={idParaDeletar !== null} onOpenChange={() => setIdParaDeletar(null)}>
//         <AlertDialogContent>
//           <AlertDialogHeader>
//             <AlertDialogTitle>Deletar Serviço</AlertDialogTitle>
//             <AlertDialogDescription>
//               Tem certeza que deseja deletar este serviço? Esta ação não pode ser desfeita.
//             </AlertDialogDescription>
//           </AlertDialogHeader>
//           <div className="flex gap-3 justify-end">
//             <AlertDialogCancel>Cancelar</AlertDialogCancel>
//             <AlertDialogAction onClick={handleDeletar} className="bg-destructive hover:bg-destructive/90">
//               Deletar
//             </AlertDialogAction>
//           </div>
//         </AlertDialogContent>
//       </AlertDialog>
//     </div>
//   );
// }
