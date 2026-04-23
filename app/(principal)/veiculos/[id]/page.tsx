'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { Veiculo } from '@/app/tipos/indices';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Edit, Trash2 } from 'lucide-react';

import { formatarData, formatarNumeros } from "@/app/funcoes/funcoes";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

import { obterVeiculo, deletarVeiculo } from '@/lib/veiculos';

export default function PaginaDetalhesVeiculo() {
  const router = useRouter();
  const params = useParams();

  const [veiculo, setVeiculo] = useState<Veiculo | null>(null);
  const [mostrarConfirmacao, setMostrarConfirmacao] = useState(false);

  // 🔥 GET BACKEND
  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await obterVeiculo(params.id as string);
        console.log("🔥 VEICULO RAW:", data)

        setVeiculo({
          id: data.id,
          placa: data.placa,
          marca: data.marca,
          modelo: data.modelo,
          ano: data.ano,
          tipo: data.tipo,
          ativo: data.ativo,

          VIN: data.VIN, // ⚠️ cuidado com nome do backend
          combustivel: data.combustivel,
          consumoMedio: data.consumoMedio,
          capacidadeCarga: data.capacidadeCarga,

          ultimaRevista: data.ultimaRevista,
          dataCadastro: data.dataCadastro,

        });

      } catch (err) {
        console.error("Erro ao buscar veículo:", err);
        setVeiculo(null);
      }
    };

    if (params?.id) fetch();
  }, [params.id]);

  // 🔥 DELETE REAL
  const handleDeletar = async () => {
    try {
      await deletarVeiculo(veiculo!.id);
      router.push('/veiculos');
    } catch (err) {
      console.error("Erro ao deletar veículo:", err);
    }
  };

  if (!veiculo) {
    return (
      <Card className="p-8 text-center">
        <p className="text-muted-foreground">Carregando veículo...</p>
      </Card>
    );
  }

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="w-6 h-6" />
          </Button>

          <div>
            <h1 className="text-3xl font-bold">{veiculo.placa}</h1>
            <p className="text-muted-foreground">
              {veiculo.marca} {veiculo.modelo} - {veiculo.ano}
            </p>
          </div>
        </div>

        <div className="flex gap-2">
          <Link href={`/veiculos/${veiculo.id}/editar`}>
            <Button className="gap-2">
              <Edit className="w-5 h-5" />
              Editar
            </Button>
          </Link>

          <Button
            variant="destructive"
            className="gap-2"
            onClick={() => setMostrarConfirmacao(true)}
          >
            <Trash2 className="w-5 h-5" />
            Deletar
          </Button>
        </div>
      </div>

      {/* INFO */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-6">
          <p>Marca</p>
          <p>{veiculo.marca}</p>
        </Card>

        <Card className="p-6">
          <p>Modelo</p>
          <p>{veiculo.modelo}</p>
        </Card>

        <Card className="p-6">
          <p>Ano</p>
          <p>{veiculo.ano}</p>
        </Card>

        <Card className="p-6">
          <p>Status</p>
          <Badge variant={veiculo.ativo ? 'default' : 'secondary'}>
            {veiculo.ativo ? 'Ativo' : 'Inativo'}
          </Badge>
        </Card>
      </div>

      {/* VIN */}
      <Card className="p-6">
        <p>VIN</p>
        <p>{veiculo.VIN}</p>
      </Card>

      {/* ESPEC */}
      <Card className="p-6">
        <p>Combustível: {veiculo.combustivel}</p>
        <p>Consumo: {veiculo.consumoMedio} km/L</p>
        <p>Carga: {formatarNumeros(veiculo.capacidadeCarga)} kg</p>
      </Card>

      {/* DATAS */}
      <Card className="p-6">
        <p>Última revisão: {formatarData(veiculo.ultimaRevista)}</p>
        <p>Cadastro: {formatarData(veiculo.dataCadastro)}</p>
      </Card>

      {/* DELETE */}
      <AlertDialog open={mostrarConfirmacao} onOpenChange={setMostrarConfirmacao}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Deletar Veículo</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja deletar {veiculo.placa}?
            </AlertDialogDescription>
          </AlertDialogHeader>

          <div className="flex gap-3 justify-end">
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeletar}>
              Deletar
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>

    </div>
  );
}







// 'use client';

// import { useEffect, useState } from 'react';
// import { useRouter, useParams } from 'next/navigation';
// import Link from 'next/link';
// import { useDados } from '@/app/contexto/DadosContexto';
// import { Veiculo } from '@/app/tipos/indices';
// import { Card } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Badge } from '@/components/ui/badge';
// import { ArrowLeft, Edit, Trash2 } from 'lucide-react';
// import {formatarData, formatarNumeros} from "@/app/funcoes/funcoes"
// import {
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogHeader,
//   AlertDialogTitle,
// } from '@/components/ui/alert-dialog';

// export default function PaginaDetalhesVeiculo() {
//   const router = useRouter();
//   const params = useParams();
//   const { obterVeiculo, deletarVeiculo } = useDados();
//   const [veiculo, setVeiculo] = useState<Veiculo | null>(null);
//   const [mostrarConfirmacao, setMostrarConfirmacao] = useState(false);

//   useEffect(() => {
//     const id = params.id as string;
//     const veiculoEncontrado = obterVeiculo(id);
//     if (veiculoEncontrado) {
//       setVeiculo(veiculoEncontrado);
//     }
//   }, [params.id, obterVeiculo]);

//   if (!veiculo) {
//     return (
//       <Card className="p-8 text-center">
//         <p className="text-muted-foreground">Veículo não encontrado</p>
//       </Card>
//     );
//   }

//   const handleDeletar = () => {
//     deletarVeiculo(veiculo.id);
//     router.push('/veiculos');
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
//             <h1 className="text-3xl font-bold text-foreground">{veiculo.placa}</h1>
//             <p className="text-muted-foreground mt-2">{veiculo.marca} {veiculo.modelo} - {veiculo.ano}</p>
//           </div>
//         </div>
//         <div className="flex gap-2">
//           <Link href={`/veiculos/${veiculo.id}/editar`}>
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
//           <p className="text-sm text-muted-foreground mb-2">Marca</p>
//           <p className="text-lg font-normal text-foreground">{veiculo.marca}</p>
//         </Card>
//         <Card className="p-6">
//           <p className="text-sm text-muted-foreground mb-2">Modelo</p>
//           <p className="text-lg font-normal text-foreground">{veiculo.modelo}</p>
//         </Card>
//         <Card className="p-6">
//           <p className="text-sm text-muted-foreground mb-2">Ano</p>
//           <p className="text-lg font-normal text-foreground">{veiculo.ano}</p>
//         </Card>
//         <Card className="p-6">
//           <p className="text-sm text-muted-foreground mb-2">Status</p>
//           <Badge variant={veiculo.ativo ? 'default' : 'secondary'} className="text-base">
//             {veiculo.ativo ? 'Ativo' : 'Inativo'}
//           </Badge>
//         </Card>
//       </div>

//       {/* Documentos e Identificação */}
//       <Card className="p-6">
//         <h2 className="text-xl font-semibold text-foreground mb-4">Documentos e Identificação</h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <div>
//             <p className="text-sm text-muted-foreground mb-2">Chassi/VIN</p>
//             <p className="text-lg font-normal text-foreground">{veiculo.VIN}</p>
//           </div>
//           <div>
//             <p className="text-sm text-muted-foreground mb-2">Tipo</p>
//             <Badge variant="outline" className="text-base capitalize">{veiculo.tipo}</Badge>
//           </div>
//         </div>
//       </Card>

//       {/* Especificações */}
//       <Card className="p-6">
//         <h2 className="text-xl font-semibold text-foreground mb-4">Especificações</h2>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           <div>
//             <p className="text-sm text-muted-foreground mb-2">Combustível</p>
//             <Badge variant="outline" className="text-base capitalize">{veiculo.combustivel}</Badge>
//           </div>
//           <div>
//             <p className="text-sm text-muted-foreground mb-2">Consumo Médio</p>
//             <p className="text-lg font-normal text-foreground">{veiculo.consumoMedio} km/L</p>
//           </div>
//           <div>
//             <p className="text-sm text-muted-foreground mb-2">Capacidade de Carga</p>
//             <p className="text-lg font-normal text-foreground">{formatarNumeros(veiculo.capacidadeCarga)} kg</p>
//           </div>
//         </div>
//       </Card>

//       {/* Manutenção */}
//       <Card className="p-6">
//         <h2 className="text-xl font-semibold text-foreground mb-4">Manutenção</h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <div>
//             <p className="text-sm text-muted-foreground mb-2">Última Revista</p>
//             <p className="text-lg font-normal text-foreground">{formatarData(veiculo.ultimaRevista)}</p>
//           </div>
//           <div>
//             <p className="text-sm text-muted-foreground mb-2">Data de Cadastro</p>
//             <p className="text-lg font-normal text-foreground">{formatarData(veiculo.dataCadastro)}</p>
//           </div>
//         </div>
//       </Card>

//       {/* Diálogo de Confirmação */}
//       <AlertDialog open={mostrarConfirmacao} onOpenChange={setMostrarConfirmacao}>
//         <AlertDialogContent>
//           <AlertDialogHeader>
//             <AlertDialogTitle>Deletar Veículo</AlertDialogTitle>
//             <AlertDialogDescription>
//               Tem certeza que deseja deletar {veiculo.placa}? Esta ação não pode ser desfeita.
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
