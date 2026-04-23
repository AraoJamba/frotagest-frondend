'use client';
import {formatarData, formatarMoeda, calcularDias} from '@/app/funcoes/funcoes'
import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { useDados } from '@/app/contexto/DadosContexto';
import { Veiculo, Viagem } from '@/app/tipos/indices';
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


export default function PaginaDetalhesViagem() {
  const router = useRouter();
  const params = useParams();
  const { obterViagem, deletarViagem } = useDados();
  const [viagem, setViagem] = useState<Viagem | null>(null);
  const [mostrarConfirmacao, setMostrarConfirmacao] = useState(false);

  useEffect(() => {
    const id = params.id as string;
    const viagemEncontrado = obterViagem(id);
    if (viagemEncontrado) {
      setViagem(viagemEncontrado);
    }
  }, [params.id, obterViagem]);

  if (!viagem) {
    return (
      <Card className="p-8 text-center">
        <p className="text-muted-foreground">Viagem não encontrado</p>
      </Card>
    );
  }

  const handleDeletar = () => {
    deletarViagem(viagem.id);
    router.push('/viagens');
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
            <p className="text-muted-foreground mt-2">{viagem.localPartida} para {viagem.localDestino} - {viagem.distancia} Km</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Link href={`/veiculos/${viagem.id}/editar`}>
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
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-6">
          <p className="text-sm text-muted-foreground mb-2">Motorista</p>
          <p className="text-lg font-semibold text-foreground">{viagem.motoristaId}</p>
        </Card>
        <Card className="p-6">
          <p className="text-sm text-muted-foreground mb-2">Veículo</p>
          <p className="text-lg font-semibold text-foreground">{viagem.veiculoId}</p>
        </Card>
        <Card className="p-6">
          <p className="text-sm text-muted-foreground mb-2">Distância</p>
          <p className="text-lg font-semibold text-foreground">{viagem.distancia} Km</p>
        </Card>
        <Card className="p-6">
          <p className="text-sm text-muted-foreground mb-2">Status</p>
          <Badge variant={viagem.status ? 'default' : 'secondary'} className="text-base">
            {viagem.status}
          </Badge>
        </Card>
      </div>

      {/* Local de Partida, Local de Destino e Distância */}
      <Card className="p-6">
        <h2 className="text-xl font-bold text-foreground mb-4">Locais e Distância</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <p className="text-sm text-muted-foreground mb-2">Local de Partida</p>
            <p className="text-lg font-semibold text-foreground">{viagem.localPartida}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-2">Local de Destino</p>
            <p className="text-lg font-semibold text-foreground">{viagem.localDestino}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-2">Distância</p>
            <Badge variant="outline" className="text-base capitalize">{viagem.distancia} Km</Badge>
          </div>
        </div>
      </Card>

      {/* Especificações */}
      <Card className="p-6">
        <h2 className="text-xl font-bold text-foreground mb-4">Datas e Tempo Estimado</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <p className="text-sm text-muted-foreground mb-2">Data Inicio</p>
            <Badge variant="outline" className="text-base capitalize">{formatarData(viagem.dataInicio)}</Badge>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-2">Data Fim</p>
            <p className="text-lg font-semibold text-foreground">{viagem.dataFim === undefined ? 'Sem data final.' : formatarData(viagem.dataFim)}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-2">Tempo</p>
            <p className="text-lg font-semibold text-foreground">{0}</p>
          </div>
        </div>
      </Card>

      {/* Especificações */}
      <Card className="p-6">
        <h2 className="text-xl font-bold text-foreground mb-4">Datas e Tempo Estimado</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-sm text-muted-foreground mb-2">Combustivel Gasto</p>
            <Badge variant="outline" className="text-base capitalize">{viagem.combustivelGasto} Litros</Badge>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-2">Custo Viagem</p>
            <p className="text-lg font-semibold text-foreground">{formatarMoeda(viagem.custoViagem)}</p>
          </div>
        </div>
      </Card>

      {/* Observações */}
      <Card className="p-6">
        <h2 className="text-xl font-bold text-foreground mb-4">Observações</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-sm text-muted-foreground mb-2">{viagem.observacoes}</p>
          </div>
        </div>
      </Card>

      {/* Diálogo de Confirmação */}
      <AlertDialog open={mostrarConfirmacao} onOpenChange={setMostrarConfirmacao}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Deletar Veículo</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja deletar {viagem.localPartida}? Esta ação não pode ser desfeita.
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
