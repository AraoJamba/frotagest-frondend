'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { useDados } from '@/app/contexto/DadosContexto';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {formatarMoeda} from '@/app/funcoes/funcoes'
import {ManutencaoVeiculo } from '@/app/tipos/indices'
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

  const manutencoesFiltrados = useMemo(() => {
    return manutencoes.filter(
      (m) =>
        m.responsavel.toLowerCase().includes(busca.toLowerCase()) ||
        m.status.toLowerCase().includes(busca.toLowerCase()) ||
        m.tipo_manutencao.includes(busca),
    );
  }, [manutencoes, busca]);

  const handleDeletar = () => {
    if (idParaDeletar) {
      deletarManutencao(idParaDeletar);
      setIdParaDeletar(null);
    }
  };

  return (
    <div className="space-y-8 pb-10 antialiased">
      
      {/* Cabeçalho */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Manutenções</h1>
          <p className="text-muted-foreground mt-2">Gerencie todas as manutenções realizadas</p>
        </div>
        <Link href="/manutencoes/adicionar">
          <Button className="gap-2">
            <Plus className="w-5 h-5" />
            Nova Manutenção
          </Button>
        </Link>
      </div>

      {/* Barra de Busca */}
      <Card className="p-4">
        <div className="relative border-[0.5px] rounded-xl border-slate-200 bg-slate-50 text-sm shadow-none focus-visible:ring-2 focus-visible:ring-blue-500/20">
          <Search className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
          <Input
            placeholder=""
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            className="pl-10 rounded-2xl outline-[0.5px]"
          />
        </div>
      </Card>

      {/* Tabela de Serviços Estilo Enterprise */}
      <Card className="overflow-hidden">
        {manutencoesFiltrados.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-muted-foreground">Nenhum motorista cadastrad</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="text-white border-b border-border">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">
                    Veiculo
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">
                    Tipo
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">
                    Oficina
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">
                    Custo
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">
                    Status
                  </th>
                  <th className="px-6 py-3 text-center text-sm font-semibold text-foreground">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {manutencoesFiltrados.map((manutencao) => (
                  <tr
                    key={manutencao.id}
                    className="hover:bg-muted/50 transition-colors"
                  >
                    <td className="px-6 py-4 text-sm text-foreground font-medium">
                      {manutencao.veiculo_id}
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">
                      {manutencao.tipo_manutencao}
                    </td>
                    <td className="px-6 py-4 text-sm text-foreground">
                      {manutencao.responsavel}
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">
                      {formatarMoeda(manutencao.custo)}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <Badge variant={"default"}>{manutencao.status}</Badge>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <Link href={`/manutencoes/${manutencao.id}`}>
                          <Button variant="ghost" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                        </Link>
                        <Link href={`/manutencoes/${manutencao.id}/editar`}>
                          <Button variant="ghost" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                        </Link>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-destructive hover:text-destructive"
                          onClick={() => setIdParaDeletar(manutencao.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      {/* DELETE DIALOG */}
      <AlertDialog
        open={idParaDeletar !== null}
        onOpenChange={() => setIdParaDeletar(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>

            <AlertDialogDescription>
              Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <div className="flex justify-end gap-2 mt-4">
            <AlertDialogCancel>Cancelar</AlertDialogCancel>

            <AlertDialogAction
              onClick={handleDeletar}
              className="bg-red-600 hover:bg-red-700"
            >
              Excluir
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
