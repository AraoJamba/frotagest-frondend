'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { useDados } from '@/app/contexto/DadosContexto';
import { ManutencaoVeiculo } from '@/app/tipos/indices';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Edit, Trash2, Wrench, Clock, DollarSign } from 'lucide-react';
import { formatarData } from "@/app/funcoes/funcoes"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

export default function PaginaDetalhesServico() {
  const router = useRouter();
  const params = useParams();
  const { obterManutencao, deletarManutencao } = useDados();
  const [manutencao, setManutencao] = useState<ManutencaoVeiculo | null>(null);
  const [mostrarConfirmacao, setMostrarConfirmacao] = useState(false);

  useEffect(() => {
    const id = params.id as string;
    const manutencaoEncontrado = obterManutencao(id);
    if (manutencaoEncontrado) setManutencao(manutencaoEncontrado);
  }, [params.id, obterManutencao]);

  if (!manutencao) return null;

  const handleDeletar = () => {
    deletarManutencao(manutencao.id);
    router.push('/manutencoes');
  };

  return (
    <div className="min-h-screen bg-[#0b0e14] text-[#717681] p-6 lg:p-10 space-y-10 antialiased">
      
      {/* Cabeçalho Refinado */}
      <div className="flex justify-between items-end border-b border-[#1d2333] pb-8">
        <div className="space-y-2">
          <p className="text-[9px] text-blue-500 font-bold uppercase tracking-[0.4em]">
            SISTEMA DE FROTA V2.0
          </p>
          <h1 className="text-3xl text-white font-medium">
            Painel de <span className="text-blue-400 italic font-serif">Controle</span>
          </h1>
        </div>
        
        <div className="flex items-center gap-2 bg-[#121620] px-3 py-1.5 rounded-full border border-[#1d2333]">
           <div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_5px_#22c55e]" />
           <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-tighter">Servidor Online</span>
        </div>
      </div>

      {/* Grid de Cards - Proporções da Imagem */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        {/* Card: Status */}
        <Card className="bg-[#121620] border-none rounded-[1.2rem] p-6 space-y-8 shadow-lg">
          <div className="flex justify-between items-center">
            <p className="text-[10px] font-bold tracking-[0.15em] text-[#4a505e] uppercase">Live Status</p>
            <div className="w-7 h-7 rounded-lg bg-[#1d2333] flex items-center justify-center">
                <div className="w-1 h-1 rounded-full bg-blue-500" />
            </div>
          </div>
          <div className="space-y-4">
            <h2 className="text-3xl text-white font-light tracking-tighter">
              {manutencao.status}
            </h2>
            <div className="space-y-2 pt-4 border-t border-[#1d2333]/50">
               <div className="flex justify-between items-center text-[10px] font-bold text-white tracking-wide">
                  <span className="flex items-center gap-2 uppercase tracking-widest"><div className="w-1 h-1 rounded-full bg-blue-500" /> {manutencao.status}</span>
                  <span className="font-mono text-[#4a505e]">01</span>
               </div>
            </div>
          </div>
        </Card>

        {/* Card: Categoria */}
        <Card className="bg-[#121620] border-none rounded-[1.2rem] p-6 space-y-8 shadow-lg">
          <div className="flex justify-between items-center">
            <p className="text-[10px] font-bold tracking-[0.15em] text-[#4a505e] uppercase">Veículo</p>
            <div className="w-7 h-7 rounded-lg bg-[#1d2333] flex items-center justify-center">
                <Wrench className="w-3.5 h-3.5 text-emerald-500" />
            </div>
          </div>
          <div className="space-y-4">
            <h2 className="text-5xl text-white font-light tracking-tighter italic">01</h2>
            <div className="pt-4 border-t border-[#1d2333]/50">
              <span className="text-[10px] font-bold text-white uppercase tracking-widest flex items-center gap-2">
                <div className="w-1 h-1 rounded-full bg-emerald-500" /> {manutencao.tipo_manutencao}
              </span>
            </div>
          </div>
        </Card>

        {/* Card: Custo */}
        <Card className="bg-[#121620] border-none rounded-[1.2rem] p-6 space-y-8 shadow-lg">
          <div className="flex justify-between items-center">
            <p className="text-[10px] font-bold tracking-[0.15em] text-[#4a505e] uppercase">Financeiro</p>
            <div className="w-7 h-7 rounded-lg bg-[#1d2333] flex items-center justify-center text-blue-400">
                <DollarSign className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-[9px] font-bold text-[#4a505e] tracking-widest uppercase">Valor Estimado</p>
            <h2 className="text-3xl text-white font-bold tracking-tighter">
              {new Intl.NumberFormat('pt-AO').format(manutencao.custo)}
              <span className="text-[10px] text-[#4a505e] ml-1 font-bold">KZ</span>
            </h2>
          </div>
        </Card>

        {/* Card: Agenda */}
        <Card className="bg-[#121620] border-none rounded-[1.2rem] p-6 space-y-8 shadow-lg">
          <div className="flex justify-between items-center">
            <p className="text-[10px] font-bold tracking-[0.15em] text-[#4a505e] uppercase">Cronograma</p>
            <div className="w-7 h-7 rounded-lg bg-[#1d2333] flex items-center justify-center">
                <Clock className="w-3.5 h-3.5 text-purple-500" />
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center border-b border-[#1d2333]/50 pb-2">
              <span className="text-[9px] font-bold uppercase text-[#4a505e]">Agendado</span>
              <span className="text-[11px] text-zinc-300 font-mono">{formatarData(manutencao.data_agendada)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[9px] font-bold uppercase text-[#4a505e]">Previsão</span>
              <span className="text-[11px] text-zinc-300 font-mono">{formatarData(manutencao.data_conclusao)}</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Seção de Descrição e Ações */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-5">
        <div className="lg:col-span-3 bg-[#121620] rounded-[1.2rem] p-8">
           <p className="text-[9px] font-bold text-[#4a505e] tracking-[0.3em] mb-4 uppercase">Descrição Técnica</p>
           <p className="text-xl text-zinc-300 font-serif italic leading-relaxed">
             "{manutencao.descricao}"
           </p>
        </div>

        <div className="flex flex-col gap-3">
           <button 
             onClick={() => router.back()}
             className="flex-1 bg-[#121620] hover:bg-[#1d2333] transition-all rounded-xl border border-[#1d2333] flex items-center justify-center gap-3 text-[10px] font-bold text-white tracking-widest py-4"
           >
              <ArrowLeft className="w-3.5 h-3.5" /> VOLTAR
           </button>
           <Link href={`/manutencoes/${manutencao.id}/editar`} className="flex-1">
              <button className="w-full h-full bg-blue-600 hover:bg-blue-500 rounded-xl flex items-center justify-center gap-3 text-[10px] font-bold text-white tracking-widest py-4">
                 <Edit className="w-3.5 h-3.5" /> EDITAR
              </button>
           </Link>
        </div>
      </div>

    </div>
  );
}




// 'use client';

// import { useEffect, useState } from 'react';
// import { useRouter, useParams } from 'next/navigation';
// import Link from 'next/link';
// import { useDados } from '@/app/contexto/DadosContexto';
// import { ManutencaoVeiculo } from '@/app/tipos/indices';
// import { Card } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Badge } from '@/components/ui/badge';
// import { ArrowLeft, Edit, Trash2 } from 'lucide-react';
// import {formatarData} from "@/app/funcoes/funcoes"
// import {
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogHeader,
//   AlertDialogTitle,
// } from '@/components/ui/alert-dialog';

// export default function PaginaDetalhesServico() {
//   const router = useRouter();
//   const params = useParams();
//   const { obterManutencao, deletarManutencao } = useDados();
//   const [manutencao, setManutencao] = useState<ManutencaoVeiculo | null>(null);
//   const [mostrarConfirmacao, setMostrarConfirmacao] = useState(false);

//   useEffect(() => {
//     const id = params.id as string;
//     const manutencaoEncontrado = obterManutencao(id);
//     if (manutencaoEncontrado) {
//       setManutencao(manutencaoEncontrado);
//     }
//   }, [params.id, obterManutencao]);

//   if (!manutencao) {
//     return (
//       <Card className="p-8 text-center">
//         <p className="text-muted-foreground">ServAAAAAAAiço não encontrado</p>
//       </Card>
//     );
//   }

//   const handleDeletar = () => {
//     deletarManutencao(manutencao.id);
//     router.push('/manutencoes');
//   };

//   // const formatarData = (data: string) => {
//   //   return new Date(data).toLocaleDateString('pt-AO');
//   // };

//   return (
//     <div className="space-y-6">
//       {/* Cabeçalho */}
//       <div className="flex items-center justify-between">
//         <div className="flex items-center gap-4">
//           <Button
//             variant="ghost"
//             size="icon"
//             onClick={() => router.back()}
//           >
//             <ArrowLeft className="w-6 h-6" />
//           </Button>
//           <div>
//             <h1 className="text-3xl font-bold text-foreground">{manutencao.tipo_manutencao}</h1>
//             <p className="text-muted-foreground mt-2">Detalhes do serviço</p>
//           </div>
//         </div>
//         <div className="flex gap-2">
//           <Link href={`/manutencoes/${manutencao.id}/editar`}>
//             <Button className="gap-2">
//               <Edit className="w-5 h-5" />
//               Editar
//             </Button>
//           </Link>
//           <Button
//             variant="destructive"
//             className="gap-2"
//             onClick={() => setMostrarConfirmacao(true)}
//           >
//             <Trash2 className="w-5 h-5" />
//             Deletar
//           </Button>
//         </div>
//       </div>

//       {/* Informações Principais */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         <Card className="p-6">
//           <p className="text-sm text-muted-foreground mb-2">Status</p>
//           <Badge className="text-base">
//             {manutencao.status}
//           </Badge>
//         </Card>
//         <Card className="p-6">
//           <p className="text-sm text-muted-foreground mb-2">Tipo</p>
//           <Badge variant="outline" className="text-base capitalize">{manutencao.tipo_manutencao}</Badge>
//         </Card>
//       </div>

//       {/* Descrição */}
//       <Card className="p-6">
//         <h2 className="text-xl font-bold text-foreground mb-4">Descrição</h2>
//         <p className="text-foreground">{manutencao.descricao}</p>
//       </Card>

//       {/* Custo */}
//       <Card className="p-6">
//         <h2 className="text-xl font-bold text-foreground mb-4">Informações Financeiras</h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <div>
//             <p className="text-sm text-muted-foreground mb-2">Custo Estimado</p>
//             <p className="text-2xl font-normal text-foreground">
//               {new Intl.NumberFormat('pt-AO', { style: 'currency', currency: 'AOA' }).format(manutencao.custo)}
//             </p>
//           </div>
//           <div>
//             <p className="text-sm text-muted-foreground mb-2">Data de Cadastro</p>
//             <p className="text-lg font-normal text-foreground">{formatarData(manutencao.data_agendada)}</p>
//           </div>
//         </div>
//       </Card>

//       {/* Custo */}
//       <Card className="p-6">
//         <h2 className="text-xl font-bold text-foreground mb-4">Informações Financeiras</h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <div>
//             <p className="text-sm text-muted-foreground mb-2">Data a Agenda</p>
//             <p className="text-lg font-normal text-foreground">{formatarData(manutencao.data_agendada)}</p>
//           </div>
//           <div>
//             <p className="text-sm text-muted-foreground mb-2">Data de Conclusão</p>
//             <p className="text-lg font-normal text-foreground">{formatarData(manutencao.data_conclusao)}</p>
//           </div>
//         </div>
//       </Card>

//       {/* Diálogo de Confirmação */}
//       <AlertDialog open={mostrarConfirmacao} onOpenChange={setMostrarConfirmacao}>
//         <AlertDialogContent>
//           <AlertDialogHeader>
//             <AlertDialogTitle>Deletar Serviço</AlertDialogTitle>
//             <AlertDialogDescription>
//               Tem certeza que deseja deletar {manutencao.descricao}? Esta ação não pode ser desfeita.
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
