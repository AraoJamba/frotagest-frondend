"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { useDados } from "@/app/contexto/DadosContexto";
import { ManutencaoVeiculo } from "@/app/tipos/indices";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Edit,
  Trash2,
  Wrench,
  Clock,
  DollarSign,
} from "lucide-react";
import { formatarData, formatarMoeda } from "@/app/funcoes/funcoes";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";

export default function PaginaDetalhesManutencao() {
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
    router.push("/manutencoes");
  };

  return (
    <div className="space-y-6">
      {/* HEADER PADRÃO */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="w-5 h-5" />
        </Button>

        <div className="flex-1">
          <h1 className="text-3xl font-bold text-foreground">
            Detalhes da Manutenção
          </h1>
          <p className="text-muted-foreground mt-1">{manutencao.responsavel}</p>
        </div>

        <div className="flex gap-2">
          <Link href={`/manutencoes/${manutencao.id}/editar`}>
            <Button className="gap-2">
              <Edit className="w-4 h-4" />
              Editar
            </Button>
          </Link>

          <Button
            variant="destructive"
            className="gap-2"
            onClick={() => setMostrarConfirmacao(true)}
          >
            <Trash2 className="w-4 h-4" />
            Deletar
          </Button>
        </div>
      </div>

      {/* CARD PRINCIPAL */}
      <Card className="p-6 space-y-6">
        {/* INFO GERAL */}
        <Card className="p-4 space-y-4 border">
          <h2 className="text-sm font-semibold text-muted-foreground uppercase">
            Informações Gerais
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Item label="veiculo_id" value={manutencao.veiculo_id} />
            <Item label="Tipo Manutencao" value={manutencao.tipo_manutencao} />
            {/*<Item label="Distância" value={${manutencao.s}} />*/}
            <Item label="Status" value={<Badge>{manutencao.status}</Badge>} />
          </div>
        </Card>

        {/* DATAS */}
        <Card className="p-4 space-y-4 border">
          <h2 className="text-sm font-semibold text-muted-foreground uppercase">
            Datas
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Item
              label="Início"
              value={formatarData(manutencao.data_agendada)}
            />
            <Item
              label="Fim"
              value={
                manutencao.data_conclusao
                  ? formatarData(manutencao.data_conclusao)
                  : "—"
              }
            />
          </div>
        </Card>

        {/* CUSTOS */}
        <Card className="p-4 space-y-4 border">
          <h2 className="text-sm font-semibold text-muted-foreground uppercase">
            Responsavel e Custos
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Item label="Responsavel" value={`${manutencao.responsavel} `} />
            <Item label="Custo" value={formatarMoeda(manutencao.custo)} />
          </div>
        </Card>

        {/* OBS */}
        {manutencao.descricao && (
          <Card className="p-4 space-y-2 border">
            <h2 className="text-sm font-semibold text-muted-foreground uppercase">
              Observações
            </h2>
            <p className="text-sm">{manutencao.descricao}</p>
          </Card>
        )}
      </Card>

      {/* MODAL */}
      <AlertDialog
        open={mostrarConfirmacao}
        onOpenChange={setMostrarConfirmacao}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Deletar Viagem</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja deletar esta viagem?
            </AlertDialogDescription>
          </AlertDialogHeader>

          <div className="flex justify-end gap-2">
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction>Deletar</AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

/* COMPONENTE AUXILIAR */
function Item({ label, value }: any) {
  return (
    <div>
      <p className="text-xs text-muted-foreground">{label}</p>
      <div className="font-medium text-sm mt-1">{value || "—"}</div>
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
