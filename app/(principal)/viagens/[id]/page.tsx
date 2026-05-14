'use client';
import { formatarData, formatarMoeda } from '@/app/funcoes/funcoes'
import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { useDados } from '@/app/contexto/DadosContexto';
import { Viagem } from '@/app/tipos/indices';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Edit, Trash2, MapPin, Navigation, Fuel, Clock } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

import { getViagemById } from "@/lib/viagens";
import { ViagemAPI } from '@/app/tipos/api';

export default function PaginaDetalhesViagem() {
  const router = useRouter();
  const params = useParams();
  const { deletarViagem } = useDados();
  const [viagem, setViagem] = useState<ViagemAPI | null>(null);
  const [mostrarConfirmacao, setMostrarConfirmacao] = useState(false);

  useEffect(() => {
    async function carregarViagem() {
      try {
        const id = params.id as string;
        const dadosViagem = await getViagemById(id);
        setViagem(dadosViagem);
      } catch (error) {
        console.error(error);
      }
    }
    carregarViagem();
  }, [params.id]);

  if (!viagem) {
    return (
      <div className="min-h-screen bg-[#0b0e14] flex items-center justify-center">
        <p className="text-[#4a505e] font-serif italic">Carregando telemetria...</p>
      </div>
    );
  }

  console.log("custo da .... ", viagem.combustivel_gasto)

  const handleDeletar = () => {
    deletarViagem(viagem.id);
    router.push('/viagens');
  };



  return (
    <div className="min-h-screen bg-[#0b0e14] text-[#717681] p-6 lg:p-10 space-y-10 antialiased">
      
      {/* Cabeçalho Técnico */}
      <div className="flex justify-between items-end border-b border-[#1d2333] pb-8">
        <div className="flex items-center gap-6">
          <Button
            variant="ghost"
            size="icon"
            className="h-12 w-12 rounded-xl bg-[#121620] border border-[#1a1f2e] text-zinc-400 hover:text-purple-400"
            onClick={() => router.back()}
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="space-y-1">
            <p className="text-[9px] text-purple-400 font-bold uppercase tracking-[0.4em]">LOGÍSTICA DE FROTA</p>
            <h1 className="text-3xl text-white font-medium italic font-serif">Controle de <span className="text-purple-400 not-italic font-sans">Viagem</span></h1>
          </div>
        </div>
        
        <div className="flex items-center gap-2 bg-[#121620] px-3 py-1.5 rounded-full border border-[#1d2333]">
           <div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_5px_#22c55e]" />
           <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-tighter">Servidor Online</span>
        </div>
      </div>

      {/* Grid de Cards - Estilo Dashboard */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        {/* Card: Status da Viagem (Cor Roxa da Imagem) */}
        <Card className="bg-[#121620] border-none rounded-[1.2rem] p-6 space-y-8 shadow-lg">
          <div className="flex justify-between items-center">
            <p className="text-[10px] font-bold tracking-[0.15em] text-[#4a505e] uppercase">Live Status</p>
            <div className="w-7 h-7 rounded-lg bg-[#1d2333] flex items-center justify-center text-purple-500">
                <Navigation className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="space-y-4">
            <h2 className="text-5xl text-white font-light tracking-tighter italic">
              {viagem.status === 'emAndamento' ? 'em Andamento' : viagem.status}
            </h2>
            <div className="pt-4 border-t border-[#1d2333]/50">
               <div className="flex justify-between items-center text-[10px] font-bold text-white tracking-wide">
                  <span className="flex items-center gap-2 uppercase tracking-widest">
                    <div className="w-1 h-1 rounded-full bg-purple-500 shadow-[0_0_5px_purple]" /> 
                    {viagem.status}
                  </span>
               </div>
            </div>
          </div>
        </Card>

        {/* Card: Distância */}
        <Card className="bg-[#121620] border-none rounded-[1.2rem] p-6 space-y-8 shadow-lg">
          <div className="flex justify-between items-center">
            <p className="text-[10px] font-bold tracking-[0.15em] text-[#4a505e] uppercase">Percurso</p>
            <div className="w-7 h-7 rounded-lg bg-[#1d2333] flex items-center justify-center text-blue-400">
                <MapPin className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="space-y-2">
            <p className="text-[9px] font-bold text-[#4a505e] tracking-widest uppercase">Km Totais</p>
            <h2 className="text-4xl text-white font-bold tracking-tighter">
              {viagem.distancia} <span className="text-[10px] text-[#4a505e] ml-1 font-bold">KM</span>
            </h2>
          </div>
        </Card>

        {/* Card: Financeiro */}
        <Card className="bg-[#121620] border-none rounded-[1.2rem] p-6 space-y-8 shadow-lg">
          <div className="flex justify-between items-center">
            <p className="text-[10px] font-bold tracking-[0.15em] text-[#4a505e] uppercase">Custos</p>
            <div className="w-7 h-7 rounded-lg bg-[#1d2333] flex items-center justify-center text-emerald-500">
                <Fuel className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-[9px] font-bold text-[#4a505e] tracking-widest uppercase">Combustível / Viagem</p>
            <h2 className="text-2xl text-white font-bold tracking-tighter">
              {formatarMoeda(viagem.custo_viagem)}
            </h2>
            <h2 className="text-[13pt] text-emerald-500 font-mono tracking-tighter">{viagem.combustivel_gasto} Litros consumidos</h2>
          </div>
        </Card>

        {/* Card: Operadores */}
        <Card className="bg-[#121620] border-none rounded-[1.2rem] p-6 space-y-8 shadow-lg">
          <div className="flex justify-between items-center">
            <p className="text-[10px] font-bold tracking-[0.15em] text-[#4a505e] uppercase">Atribuição</p>
            <div className="w-7 h-7 rounded-lg bg-[#1d2333] flex items-center justify-center text-amber-500">
                <div className="w-1.5 h-1.5 rounded-full border border-amber-500" />
            </div>
          </div>
          <div className="space-y-3">
            <div>
              <p className="text-[9px] text-[#4a505e] font-bold uppercase tracking-widest mb-1">Motorista</p>
              <p className="text-[11px] text-zinc-200 font-bold uppercase">{viagem.motorista?.nome}</p>
            </div>
            <div>
              <p className="text-[9px] text-[#4a505e] font-bold uppercase tracking-widest mb-1">Matrícula</p>
              <p className="text-[11px] text-zinc-400 font-mono">{viagem.veiculo?.placa}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Rota e Datas */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-5">
        <div className="lg:col-span-3 bg-[#121620] rounded-[1.2rem] p-8 flex flex-col justify-between relative overflow-hidden">
           <div className="absolute top-0 right-0 p-8 opacity-[0.03]">
              <Navigation className="w-32 h-32 text-white" />
           </div>
           
           <div className="space-y-6">
             <p className="text-[9px] font-bold text-[#4a505e] tracking-[0.3em] uppercase">Itinerário Principal</p>
             <div className="flex items-center gap-4 text-2xl text-zinc-200 font-serif italic">
               <span>{viagem.local_partida}</span>
               <div className="h-px w-12 bg-[#1d2333]" />
               <span>{viagem.local_destino}</span>
             </div>
             
             {viagem.observacoes && (
               <p className="text-sm text-zinc-500 font-sans italic leading-relaxed border-t border-[#1d2333] pt-4">
                 "{viagem.observacoes}"
               </p>
             )}
           </div>
        </div>

        <div className="bg-[#121620] rounded-[1.2rem] p-8 flex flex-col justify-between">
           <p className="text-[9px] font-bold text-[#4a505e] tracking-[0.3em] uppercase mb-4">Tempos</p>
           <div className="space-y-6">
              <div className="flex items-center gap-3">
                 <Clock className="w-4 h-4 text-[#4a505e]" />
                 <div>
                   <p className="text-[9px] text-[#4a505e] uppercase font-bold tracking-widest">Partida</p>
                   <p className="text-xs text-zinc-300 font-mono">{formatarData(viagem.data_inicio)}</p>
                 </div>
              </div>
              <div className="flex items-center gap-3">
                 <div className={`w-4 h-4 border-b-2 border-r-2 border-[#1d2333] rounded-sm`} />
                 <div>
                   <p className="text-[9px] text-[#4a505e] uppercase font-bold tracking-widest">Chegada</p>
                   <p className="text-xs text-zinc-300 font-mono">
                     {viagem.data_fim ? formatarData(viagem.data_fim) : 'Em trânsito...'}
                   </p>
                 </div>
              </div>
           </div>
        </div>
      </div>

      {/* Barra de Ações Inferior */}
      <div className="flex gap-4">
        <Link href={`/viagens/${viagem.id}/editar`} className="flex-1">
          <button className="w-full bg-purple-600 hover:bg-purple-500 transition-all rounded-xl py-4 flex items-center justify-center gap-3 text-[10px] font-bold text-white tracking-[0.2em]">
            <Edit className="w-3.5 h-3.5" /> ATUALIZAR VIAGEM
          </button>
        </Link>
        <button 
          onClick={() => setMostrarConfirmacao(true)}
          className="flex-1 bg-[#121620] hover:bg-red-900/20 text-red-500 border border-[#1d2333] rounded-xl py-4 flex items-center justify-center gap-3 text-[10px] font-bold tracking-[0.2em] transition-all"
        >
          <Trash2 className="w-3.5 h-3.5" /> ELIMINAR REGISTRO
        </button>
      </div>

      {/* AlertDialog */}
      <AlertDialog open={mostrarConfirmacao} onOpenChange={setMostrarConfirmacao}>
        <AlertDialogContent className="bg-[#121620] border-none rounded-[1.5rem] p-10">
          <AlertDialogHeader className="space-y-4">
            <AlertDialogTitle className="text-2xl text-white font-serif italic">Confirmar Exclusão?</AlertDialogTitle>
            <AlertDialogDescription className="text-[#4a505e] text-sm">
              Esta ação removerá todos os dados de telemetria desta viagem. Não é possível reverter.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="flex gap-4 mt-8">
            <AlertDialogCancel className="flex-1 bg-[#1d2333] border-none text-white rounded-xl h-12 text-[10px] font-bold tracking-widest">CANCELAR</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeletar} className="flex-1 bg-red-600 hover:bg-red-500 text-white rounded-xl h-12 text-[10px] font-bold tracking-widest">SIM, ELIMINAR</AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}





// 'use client';
// import {formatarData, formatarMoeda} from '@/app/funcoes/funcoes'
// import { useEffect, useState } from 'react';
// import { useRouter, useParams } from 'next/navigation';
// import Link from 'next/link';
// import { useDados } from '@/app/contexto/DadosContexto';
// import { Viagem } from '@/app/tipos/indices';
// import { Card } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Badge } from '@/components/ui/badge';
// import { ArrowLeft, Edit, Trash2 } from 'lucide-react';
// import {
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogHeader,
//   AlertDialogTitle,
// } from '@/components/ui/alert-dialog';

// import { getViagemById } from "@/lib/viagens";


// export default function PaginaDetalhesViagem() {
//   const router = useRouter();
//   const params = useParams();
//   const { obterViagem, deletarViagem } = useDados();
//   const [viagem, setViagem] = useState<Viagem | null>(null);
//   const [mostrarConfirmacao, setMostrarConfirmacao] = useState(false);

// useEffect(() => {
//   async function carregarViagem() {
//     try {
//       const id = params.id as string;

//       const viagem = await getViagemById(id);

//       setViagem(viagem);
//     } catch (error) {
//       console.error(error);
//     }
//   }

//   carregarViagem();
// }, [params.id]);

//   if (!viagem) {
//     return (
//       <Card className="p-8 text-center">
//         <p className="text-muted-foreground">Viagem não encontrado</p>
//       </Card>
//     );
//   }

//   const handleDeletar = () => {
//     deletarViagem(viagem.id);
//     router.push('/viagens');
//   };


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
//             <h1 className="text-3xl font-bold text-foreground">Detalhes da Viagem</h1>
//             <p className="text-muted-foreground mt-2">{viagem.localPartida} para {viagem.localDestino} - {viagem.distancia} Km</p>
//           </div>
//         </div>
//         <div className="flex gap-2">
//           <Link href={`/veiculos/${viagem.id}/editar`}>
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

//       {/* Informações Básicas */}
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//         <Card className="p-6">
//           <p className="text-sm text-muted-foreground mb-2">Motorista</p>
//           <p className="text-lg font-semibold text-foreground">{viagem.motorista?.nome}</p>
//         </Card>
//         <Card className="p-6">
//           <p className="text-sm text-muted-foreground mb-2">Veículo</p>
//           <p className="text-lg font-semibold text-foreground">{viagem.veiculo?.placa}</p>
//         </Card>
//         <Card className="p-6">
//           <p className="text-sm text-muted-foreground mb-2">Distância</p>
//           <p className="text-lg font-semibold text-foreground">{viagem.distancia} Km</p>
//         </Card>
//         <Card className="p-6">
//           <p className="text-sm text-muted-foreground mb-2">Status</p>
//           <Badge variant={viagem.status ? 'default' : 'secondary'} className="text-base">
//             {viagem.status}
//           </Badge>
//         </Card>
//       </div>

//       {/* Local de Partida, Local de Destino e Distância */}
//       <Card className="p-6">
//         <h2 className="text-xl font-bold text-foreground mb-4">Locais e Distância</h2>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           <div>
//             <p className="text-sm text-muted-foreground mb-2">Local de Partida</p>
//             <p className="text-lg font-semibold text-foreground">{viagem.localPartida}</p>
//           </div>
//           <div>
//             <p className="text-sm text-muted-foreground mb-2">Local de Destino</p>
//             <p className="text-lg font-semibold text-foreground">{viagem.localDestino}</p>
//           </div>
//           <div>
//             <p className="text-sm text-muted-foreground mb-2">Distância</p>
//             <Badge variant="outline" className="text-base capitalize">{viagem.distancia} Km</Badge>
//           </div>
//         </div>
//       </Card>

//       {/* Especificações */}
//       <Card className="p-6">
//         <h2 className="text-xl font-bold text-foreground mb-4">Datas e Tempo Estimado</h2>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           <div>
//             <p className="text-sm text-muted-foreground mb-2">Data Inicio</p>
//             <Badge variant="outline" className="text-base capitalize">{formatarData(viagem.dataInicio)}</Badge>
//           </div>
//           <div>
//             <p className="text-sm text-muted-foreground mb-2">Data Fim</p>
//             <p className="text-lg font-semibold text-foreground">{viagem.dataFim === undefined ? 'Sem data final.' : formatarData(viagem.dataFim)}</p>
//           </div>
//           <div>
//             <p className="text-sm text-muted-foreground mb-2">Tempo</p>
//             <p className="text-lg font-semibold text-foreground">{0}</p>
//           </div>
//         </div>
//       </Card>

//       {/* Especificações */}
//       <Card className="p-6">
//         <h2 className="text-xl font-bold text-foreground mb-4">Datas e Tempo Estimado</h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <div>
//             <p className="text-sm text-muted-foreground mb-2">Combustivel Gasto</p>
//             <Badge variant="outline" className="text-base capitalize">{viagem.combustivelGasto} Litros</Badge>
//           </div>
//           <div>
//             <p className="text-sm text-muted-foreground mb-2">Custo Viagem</p>
//             <p className="text-lg font-semibold text-foreground">{formatarMoeda(viagem.custoViagem)}</p>
//           </div>
//         </div>
//       </Card>

//       {/* Observações */}
//       <Card className="p-6">
//         <h2 className="text-xl font-bold text-foreground mb-4">Observações</h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <div>
//             <p className="text-sm text-muted-foreground mb-2">{viagem.observacoes}</p>
//           </div>
//         </div>
//       </Card>

//       {/* Diálogo de Confirmação */}
//       <AlertDialog open={mostrarConfirmacao} onOpenChange={setMostrarConfirmacao}>
//         <AlertDialogContent>
//           <AlertDialogHeader>
//             <AlertDialogTitle>Deletar Veículo</AlertDialogTitle>
//             <AlertDialogDescription>
//               Tem certeza que deseja deletar {viagem.localPartida}? Esta ação não pode ser desfeita.
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
