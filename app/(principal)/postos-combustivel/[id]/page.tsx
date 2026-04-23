'use client';
import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Edit, Trash2 } from 'lucide-react';
import { PostoCombustivel } from '@/app/tipos/indices';
import { useDados } from '@/app/contexto/DadosContexto';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { AlertDialogCancel, AlertDialog, AlertDialogTitle, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogHeader } from '@/components/ui/alert-dialog';

export default function PaginaDetalhesPostoCombustivel() {
  const router = useRouter();
  const params = useParams();
  const { obterPostoCombustivel, deletarPostoCombustivel } = useDados();
  const [postosCombustivel, setPostosCombustivel] = useState<PostoCombustivel | null>(null);
  const [mostrarConfirmacao, setMostrarConfirmacao] = useState(false);

  useEffect(() => {
    const id = params.id as string;
    const postosCombustivelEncontrado = obterPostoCombustivel(id);
    if (postosCombustivelEncontrado) {
      setPostosCombustivel(postosCombustivelEncontrado);
    }
  }, [params.id, obterPostoCombustivel]);

  if (!postosCombustivel) {
    return (
      <Card className="p-8 text-center">
        <p className="text-muted-foreground">Viagem não encontrado</p>
      </Card>
    );
  }

  const handleDeletar = () => {
    deletarPostoCombustivel(postosCombustivel.id);
    router.push('/viagens');
  };

  const formatarData = (data: string) => {
    return new Date(data).toLocaleDateString('pt-AO');
  };

  return (
    <div className="space-y-6">
      {/* Cabeçalho */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.back()}
          >
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Detalhes da Viagem</h1>
            <p className="text-muted-foreground mt-2">{postosCombustivel.endereco} | {postosCombustivel.cidade} | {postosCombustivel.provincia}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Link href={`/postos-combustivel/${postosCombustivel.id}/editar`}>
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

      {/* Informações Básicas */}
      {/* <h2 className="text-xl font-bold text-foreground mb-4">Locais e Distância</h2> */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <p className="text-sm text-muted-foreground mb-1">Nome</p>
          <p className="text-lg font-semibold text-foreground">{postosCombustivel.nome}</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-muted-foreground mb-1">Cidade</p>
          <p className="text-lg font-semibold text-foreground">{postosCombustivel.cidade}</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-muted-foreground mb-1">Província</p>
          <p className="text-lg font-semibold text-foreground">{postosCombustivel.provincia}</p>
        </Card>
        <Card className="p-6">
          <p className="text-sm text-muted-foreground mb-1">Endereço</p>
          <p className="text-md font-normal text-foreground">{postosCombustivel.endereco}</p>
        </Card>
      </div>

      {/* Preços de Combustivel */}
      <h2 className="text-xl font-bold text-foreground mb-4">Preços de Combustivel</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="p-6">
          <p className="text-sm text-muted-foreground mb-2">Gasolina</p>
          <p className="text-lg font-semibold text-foreground">{postosCombustivel.gasolina} Kz</p>
        </Card>
        <Card className="p-6">
          <p className="text-sm text-muted-foreground mb-2">Gasóleo</p>
          <p className="text-lg font-semibold text-foreground">{postosCombustivel.gasoleo} Kz</p>
        </Card>
        {/* <Card className="p-6">
          <p className="text-sm text-muted-foreground mb-2">Status</p>
          <Badge variant={viagem.status ? 'default' : 'secondary'} className="text-base">
            {viagem.status}
          </Badge>
        </Card> */}
      </div>

      {/* Preços de Combustivel */}
      <h2 className="text-xl font-bold text-foreground mb-4">Informação Adicional</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-6">
          <p className="text-sm text-muted-foreground mb-2">Status</p>
          <Badge variant={postosCombustivel.ativo ? 'default' : 'secondary'} className="text-base">
            {postosCombustivel.ativo ? 'Ativo' : 'Inativo'}
          </Badge>
        </Card>
        <Card className="p-6">
          <p className="text-sm text-muted-foreground mb-2">Telefone</p>
          <p className="text-lg font-semibold text-foreground">{postosCombustivel.telefone}</p>
        </Card>
        <Card className="p-6">
          <p className="text-sm text-muted-foreground mb-2">Data de Cadastro</p>
          <p className="text-lg font-semibold text-foreground">{postosCombustivel.dataCadastro}</p>
        </Card>
      </div>

      {/* Diálogo de Confirmação */}
      <AlertDialog open={mostrarConfirmacao} onOpenChange={setMostrarConfirmacao}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Deletar Posto de Combustivel</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja deletar {postosCombustivel.nome}? Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="flex gap-3 justify-end">
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeletar} className="bg-destructive hover:bg-destructive/90">
              Deletar
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>

    </div>
  );
}
