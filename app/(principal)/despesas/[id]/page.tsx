'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { useDados } from '@/app/contexto/DadosContexto';
import { Despesa } from '@/app/tipos/indices';
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

export default function PaginaDetalhesVeiculo() {
    const router = useRouter();
    const params = useParams();
    const { obterDespesa, deletarVeiculo } = useDados();
    const [despesa, setVeiculo] = useState<Despesa | null>(null);
    const [mostrarConfirmacao, setMostrarConfirmacao] = useState(false);

    useEffect(() => {
        const id = params.id as string;
        const despesaEncontrado = obterDespesa(id);
        if (despesaEncontrado) {
            setVeiculo(despesaEncontrado);
        }
    }, [params.id, obterDespesa]);

    if (!despesa) {
        return (
            <Card className="p-8 text-center">
                <p className="text-muted-foreground">Veículo não encontrado</p>
            </Card>
        );
    }

    const handleDeletar = () => {
        deletarVeiculo(despesa.id);
        router.push('/despesas');
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
                        <h1 className="text-3xl font-bold text-foreground">Despesa de {formatarData(despesa.data)}</h1>
                        <p className="text-muted-foreground mt-2">{despesa.tipo}</p>
                    </div>
                </div>
                <div className="flex gap-2">
                    <Link href={`/despesas/${despesa.id}/editar`}>
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
                    <p className="text-sm text-muted-foreground mb-2">Tipo de despesa</p>
                    <Badge variant="outline" className="text-base capitalize">{despesa.tipo}</Badge>
                </Card>
                <Card className="p-6">
                    <p className="text-sm text-muted-foreground mb-2">Custo da despesa</p>
                    <p className="text-lg font-normal text-foreground">
                        {new Intl.NumberFormat('pt-AO', { style: 'currency', currency: 'AOA' }).format(despesa.valor)}
                    </p>
                </Card>
                <Card className="p-6">
                    <p className="text-sm text-muted-foreground mb-2">Data</p>
                    <p className="text-lg font-normal text-foreground">{formatarData(despesa.data)}</p>
                </Card>
                <Card className="p-6">
                    <p className="text-sm text-muted-foreground mb-2">Pago</p>
                    <Badge variant={despesa.pago ? 'default' : 'secondary'} className="text-base">
                        {despesa.pago ? 'Sim' : 'Não'}
                    </Badge>
                </Card>
            </div>

            {/* Veiculo e Motorista */}
            <Card className="p-6">
                <h2 className="text-xl font-semibold text-foreground mb-4">Veiculo, Motorista e Recibo</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                        <p className="text-sm text-muted-foreground mb-2">Veiculo</p>
                        <p className="text-lg font-normal text-foreground">{despesa.veiculo_id}</p>
                    </div>
                    <div>
                        <p className="text-sm text-muted-foreground mb-2">Motorista</p>
                        <Badge variant="outline" className="text-base capitalize">{despesa.motorista_id}</Badge>
                    </div>
                    <div>
                        <p className="text-sm text-muted-foreground mb-2">Recibo</p>
                        <Badge variant="outline" className="text-base capitalize">{despesa.recibo}</Badge>
                    </div>
                </div>
            </Card>


            {/* Especificações */}
            <Card className="grid grid-cols-1 md:grid-cols-1 gap-4">
                <h2 className="text-xl font-semibold text-foreground mb-4 ml-2.5">Observação</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                        <Badge variant="outline" className="text-base capitalize">{despesa.descricao}</Badge>
                    </div>
                </div>
            </Card>

            {/* Diálogo de Confirmação */}
            <AlertDialog open={mostrarConfirmacao} onOpenChange={setMostrarConfirmacao}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Deletar Veículo</AlertDialogTitle>
                        <AlertDialogDescription>
                            Tem certeza que deseja deletar a despesa da data {formatarData(despesa.data)} cujo valor é {despesa.valor}? Esta ação não pode ser desfeita.
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
