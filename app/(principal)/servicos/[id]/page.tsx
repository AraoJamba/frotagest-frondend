'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { useDados } from '@/app/contexto/DadosContexto';
import { Servico } from '@/app/tipos/indices';
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

export default function PaginaDetalhesServico() {
  const router = useRouter();
  const params = useParams();
  const { obterServico, deletarServico } = useDados();
  const [servico, setServico] = useState<Servico | null>(null);
  const [mostrarConfirmacao, setMostrarConfirmacao] = useState(false);

  useEffect(() => {
    const id = params.id as string;
    const servicoEncontrado = obterServico(id);
    if (servicoEncontrado) {
      setServico(servicoEncontrado);
    }
  }, [params.id, obterServico]);

  if (!servico) {
    return (
      <Card className="p-8 text-center">
        <p className="text-muted-foreground">ServAAAAAAAiço não encontrado</p>
      </Card>
    );
  }

  const handleDeletar = () => {
    deletarServico(servico.id);
    router.push('/servicos');
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
            <h1 className="text-3xl font-bold text-foreground">{servico.nome}</h1>
            <p className="text-muted-foreground mt-2">Detalhes do serviço</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Link href={`/servicos/${servico.id}/editar`}>
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

      {/* Informações Principais */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="p-6">
          <p className="text-sm text-muted-foreground mb-2">Status</p>
          <Badge variant={servico.ativo ? 'default' : 'secondary'} className="text-base">
            {servico.ativo ? 'Ativo' : 'Inativo'}
          </Badge>
        </Card>
        <Card className="p-6">
          <p className="text-sm text-muted-foreground mb-2">Tipo</p>
          <Badge variant="outline" className="text-base capitalize">{servico.tipo}</Badge>
        </Card>
      </div>

      {/* Descrição */}
      <Card className="p-6">
        <h2 className="text-xl font-bold text-foreground mb-4">Descrição</h2>
        <p className="text-foreground">{servico.descricao}</p>
      </Card>

      {/* Custo */}
      <Card className="p-6">
        <h2 className="text-xl font-bold text-foreground mb-4">Informações Financeiras</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-sm text-muted-foreground mb-2">Custo Estimado</p>
            <p className="text-2xl font-normal text-foreground">
              {new Intl.NumberFormat('pt-AO', { style: 'currency', currency: 'AOA' }).format(servico.custo_estimado)}
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-2">Data de Cadastro</p>
            <p className="text-lg font-normal text-foreground">{formatarData(servico.data_cadastro)}</p>
          </div>
        </div>
      </Card>

      {/* Diálogo de Confirmação */}
      <AlertDialog open={mostrarConfirmacao} onOpenChange={setMostrarConfirmacao}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Deletar Serviço</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja deletar {servico.nome}? Esta ação não pode ser desfeita.
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
