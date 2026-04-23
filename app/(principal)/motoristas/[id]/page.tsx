'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { Motorista } from '@/app/tipos/indices';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Edit, Trash2 } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

import { api } from '@/lib/api';
import { obterMotorista } from "@/lib/motoristas";


export default function PaginaDetalhesMotorista() {
  const router = useRouter();
  const params = useParams();

  const [motorista, setMotorista] = useState<Motorista | null>(null);
  const [loading, setLoading] = useState(true);
  const [mostrarConfirmacao, setMostrarConfirmacao] = useState(false);

  // 🔥 BUSCAR MOTORISTA NO BACKEND
useEffect(() => {
  const fetchMotorista = async () => {
    try {
      setLoading(true);

      const data = await obterMotorista(params.id as string);

      setMotorista({
        id: data.id,
        nome: data.nome,
        email: data.email,
        telefone: data.telefone,

        numeroCarta: data.numeroCarta,
        numeroBI: data.numeroBI,
        categoriaCarta: data.categoriaCarta,

        dataNascimento: data.dataNascimento,
        dataValidadeCarta: data.dataValidadeCarta,
        dataCadastro: data.dataCadastro,

        ativo: data.ativo,
        endereco: data.endereco,
        cidade: data.cidade,
        provincia: data.provincia,
      });

    } catch (err) {
      console.error("Erro ao buscar motorista:", err);
      setMotorista(null);
    } finally {
      setLoading(false);
    }
  };

  if (params?.id) {
    fetchMotorista();
  }
}, [params.id]);



  // 🔥 DELETE REAL
  const handleDeletar = async () => {
    try {
      await api.delete(`/motoristas/${motorista?.id}`);
      router.push('/motoristas');
    } catch (err) {
      console.error("Erro ao deletar:", err);
    }
  };

  const calcularIdade = (dataNascimento: string) => {
    const nascimento = new Date(dataNascimento);
    const hoje = new Date();

    let idade = hoje.getFullYear() - nascimento.getFullYear();
    const mes = hoje.getMonth() - nascimento.getMonth();

    if (mes < 0 || (mes === 0 && hoje.getDate() < nascimento.getDate())) {
      idade--;
    }

    return idade;
  };

  const formatarData = (data?: string | null) => {
    if (!data) return "-";

    const parsed = new Date(data);

    if (isNaN(parsed.getTime())) return "-";

    return parsed.toLocaleDateString("pt-AO");
  };


  if (loading) {
    return (
      <Card className="p-8 text-center">
        <p className="text-muted-foreground">Carregando motorista...</p>
      </Card>
    );
  }

  if (!motorista) {
    return (
      <Card className="p-8 text-center">
        <p className="text-muted-foreground">Motorista não encontrado</p>
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
            <h1 className="text-3xl font-bold">{motorista.nome}</h1>
            <p className="text-muted-foreground">Detalhes do motorista</p>
          </div>
        </div>

        <div className="flex gap-2">
          <Link href={`/motoristas/${motorista.id}/editar`}>
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

      {/* INFO BÁSICA */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-6">
          <p className="text-sm text-muted-foreground">Email</p>
          <p className="font-medium">{motorista.email}</p>
        </Card>

        <Card className="p-6">
          <p className="text-sm text-muted-foreground">Telefone</p>
          <p className="font-medium">{motorista.telefone}</p>
        </Card>

        <Card className="p-6">
          <p className="text-sm text-muted-foreground">Status</p>
          <Badge variant={motorista.ativo ? "default" : "secondary"}>
            {motorista.ativo ? "Ativo" : "Inativo"}
          </Badge>
        </Card>
      </div>

      {/* DOCUMENTOS */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Documentos</h2>

        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Carta</p>
            <p>{motorista.numeroCarta}</p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">Categoria</p>
            <Badge variant="outline">{motorista.categoriaCarta}</Badge>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">Validade</p>
            <p>{formatarData(motorista.dataValidadeCarta)}</p>
          </div>
        </div>
      </Card>

      {/* PESSOAL */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Pessoal</h2>

        <p>
          Nascimento: {formatarData(motorista.dataNascimento)} (
          {calcularIdade(motorista.dataNascimento)} anos)
        </p>

        <p>Cadastro: {formatarData(motorista.dataCadastro)}</p>
      </Card>

      {/* ENDEREÇO */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Endereço</h2>

        <p>{motorista.endereco}</p>
        <p>{motorista.cidade} - {motorista.provincia}</p>
      </Card>

      {/* DELETE CONFIRM */}
      <AlertDialog open={mostrarConfirmacao} onOpenChange={setMostrarConfirmacao}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Deletar Motorista</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja deletar {motorista.nome}?
            </AlertDialogDescription>
          </AlertDialogHeader>

          <div className="flex justify-end gap-3">
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
// import { Motorista } from '@/app/tipos/indices';
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

// export default function PaginaDetalhesMotorista() {
//   const router = useRouter();
//   const params = useParams();
//   const { obterMotorista, deletarMotorista } = useDados();
//   const [motorista, setMotorista] = useState<Motorista | null>(null);
//   const [mostrarConfirmacao, setMostrarConfirmacao] = useState(false);

//   useEffect(() => {
//     const id = params.id as string;
//     const motoristaEncontrado = obterMotorista(id);
//     if (motoristaEncontrado) {
//       setMotorista(motoristaEncontrado);
//     }
//   }, [params.id, obterMotorista]);

//   if (!motorista) {
//     return (
//       <Card className="p-8 text-center">
//         <p className="text-muted-foreground">Motorista não encontrado</p>
//       </Card>
//     );
//   }

//   const handleDeletar = () => {
//     deletarMotorista(motorista.id);
//     router.push('/motoristas');
//   };

//   const calcularIdade = (dataNascimento: string) => {
//     const nascimento = new Date(dataNascimento);
//     const hoje = new Date();
//     let idade = hoje.getFullYear() - nascimento.getFullYear();
//     const mes = hoje.getMonth() - nascimento.getMonth();
//     if (mes < 0 || (mes === 0 && hoje.getDate() < nascimento.getDate())) {
//       idade--;
//     }
//     return idade;
//   };

//   const formatarData = (data: string) => {
//     return new Date(data).toLocaleDateString('pt-AO');
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
//             <h1 className="text-3xl font-bold text-foreground">{motorista.nome}</h1>
//             <p className="text-muted-foreground mt-2">Detalhes do motorista</p>
//           </div>
//         </div>
//         <div className="flex gap-2">
//           <Link href={`/motoristas/${motorista.id}/editar`}>
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
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//         <Card className="p-6">
//           <p className="text-sm text-muted-foreground mb-2">Email</p>
//           <p className="text-lg font-medium text-foreground">{motorista.email}</p>
//         </Card>
//         <Card className="p-6">
//           <p className="text-sm text-muted-foreground mb-2">Telefone</p>
//           <p className="text-lg font-medium text-foreground">{motorista.telefone}</p>
//         </Card>
//         <Card className="p-6">
//           <p className="text-sm text-muted-foreground mb-2">Status</p>
//           <Badge variant={motorista.ativo ? 'default' : 'secondary'} className="text-base">
//             {motorista.ativo ? 'Ativo' : 'Inativo'}
//           </Badge>
//         </Card>
//       </div>

//       {/* Documentos */}
//       <Card className="p-6">
//         <h2 className="text-xl font-semibold text-foreground mb-4">Documentos</h2>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           <div>
//             <p className="text-sm text-muted-foreground mb-2">Número da Carta de Condução</p>
//             <p className="text-lg font-medium text-foreground">{motorista.numeroCarta}</p>
//           </div>
//           <div>
//             <p className="text-sm text-muted-foreground mb-2">Categoria da Carta</p>
//             <Badge variant="outline" className="text-base">{motorista.categoriaCarta}</Badge>
//           </div>
//           <div>
//             <p className="text-sm text-muted-foreground mb-2">Data de Expiração</p>
//             <Badge variant="outline" className="text-base">{formatarData(motorista.dataValidadeCarta)}</Badge>
//           </div>
//         </div>
//       </Card>

//       {/* Informações Pessoais */}
//       <Card className="p-6">
//         <h2 className="text-xl font-semibold text-foreground mb-4">Informações Pessoais</h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <div>
//             <p className="text-sm text-muted-foreground mb-2">Data de Nascimento</p>
//             <p className="text-lg font-medium text-foreground">
//               {formatarData(motorista.dataNascimento)} ({calcularIdade(motorista.dataNascimento)} anos)
//             </p>
//           </div>
//           <div>
//             <p className="text-sm text-muted-foreground mb-2">Data de Cadastro</p>
//             <p className="text-lg font-medium text-foreground">{formatarData(motorista.dataCadastro)}</p>
//           </div>
//         </div>
//       </Card>

//       {/* Endereço */}
//       <Card className="p-6">
//         <h2 className="text-xl font-semibold text-foreground mb-4">Endereço</h2>
//         <div className="space-y-4">
//           <div>
//             <p className="text-sm text-muted-foreground mb-1">Rua e Número</p>
//             <p className="text-foreground">{motorista.endereco}</p>
//           </div>
//           <div className="grid grid-cols-2 gap-4">
//             <div>
//               <p className="text-sm text-muted-foreground mb-1">Cidade</p>
//               <p className="text-foreground">{motorista.cidade}</p>
//             </div>
//             <div>
//               <p className="text-sm text-muted-foreground mb-1">Província</p>
//               <p className="text-foreground">{motorista.provincia}</p>
//             </div>
//           </div>
//         </div>
//       </Card>

//       {/* Diálogo de Confirmação */}
//       <AlertDialog open={mostrarConfirmacao} onOpenChange={setMostrarConfirmacao}>
//         <AlertDialogContent>
//           <AlertDialogHeader>
//             <AlertDialogTitle>Deletar Motorista</AlertDialogTitle>
//             <AlertDialogDescription>altaoutro01/04/2026
//               Tem certeza que deseja deletar {motorista.nome}? Esta ação não pode ser desfeita.
//             </AlertDialogDescription>
//           </AlertDialogHeader>
//           <div className="flex gap-3 justify-end">dataCadastro
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
