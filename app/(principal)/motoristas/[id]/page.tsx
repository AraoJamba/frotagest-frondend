"use client";

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { Motorista } from '@/app/tipos/indices';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

import {
  ArrowLeft,
  Edit,
  Trash2,
  Mail,
  Phone,
  MapPin,
  CreditCard,
  Calendar,
  User,
  ShieldCheck,
  Hash,
} from 'lucide-react';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
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

  useEffect(() => {
    const fetchMotorista = async () => {
      try {
        const data = await obterMotorista(params.id as string);
        setMotorista(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (params?.id) fetchMotorista();
  }, [params.id]);

  const handleDeletar = async () => {
    await api.delete(`/motoristas/${motorista?.id}`);
    router.push('/motoristas');
  };

  const calcularIdade = (data: string) => {
    const n = new Date(data);
    const h = new Date();
    let idade = h.getFullYear() - n.getFullYear();
    const m = h.getMonth() - n.getMonth();
    if (m < 0 || (m === 0 && h.getDate() < n.getDate())) idade--;
    return idade;
  };

  const formatarData = (data?: string | null) => {
    if (!data) return "-";
    const d = new Date(data);
    return isNaN(d.getTime()) ? "-" : d.toLocaleDateString("pt-AO");
  };

  if (loading) {
    return (
      <div className="flex h-75 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-blue-500" />
      </div>
    );
  }

  if (!motorista) {
    return (
      <Card className="p-8 text-center bg-white border-slate-200">
        <p className="text-slate-500">Motorista não encontrado</p>
      </Card>
    );
  }

  return (
    <div className="space-y-6">

      {/* HEADER PADRÃO */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="w-5 h-5" />
        </Button>

        <div className="flex-1">
          <h1 className="text-3xl font-bold text-foreground">
            Detalhes do motorista
          </h1>
          <p className="text-muted-foreground mt-1">
            {motorista.nome}
          </p>
        </div>

        <div className="flex gap-2">
          <Link href={`/motoristas/${motorista.id}/editar`}>
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
            <Item label="Nome" value={motorista.nome} />
            <Item label="Telefone" value={motorista.telefone} />
            <Item label="E-mail" value={motorista.email} />
            <Item label="Numero do BI" value={motorista.numeroBI} />
            <Item label="Data de Nascimento" value={formatarData(motorista.dataNascimento)} />
          </div>
        </Card>

        {/* LOCAIS */}
        <Card className="p-4 space-y-4 border">
          <h2 className="text-sm font-semibold text-muted-foreground uppercase">
            Carta de Condução
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Item label="Número da Carta" value={motorista.numeroCarta} />
            <Item label="Categoria da Carta" value={motorista.categoriaCarta} />
            <Item label="Data Validade" value={motorista.dataValidadeCarta} />
          </div>
        </Card>

        {/* LOCAIS */}
        <Card className="p-4 space-y-4 border">
          <h2 className="text-sm font-semibold text-muted-foreground uppercase">
            Status
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Badge>{ motorista.ativo}</Badge>
          </div>
        </Card>


        {/* CUSTOS */}
        <Card className="p-4 space-y-4 border">
          <h2 className="text-sm font-semibold text-muted-foreground uppercase">
            Localização
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Item label="Cidade" value={motorista.cidade} />
            <Item label="Provincia" value={motorista.provincia} />
          </div>
        </Card>

        {/* OBS */}
        {motorista.endereco && (
          <Card className="p-4 space-y-2 border">
            <h2 className="text-sm font-semibold text-muted-foreground uppercase">
              Endereço
            </h2>
            <p className="text-sm">{motorista.endereco}</p>
          </Card>
        )}

      </Card>

      {/* MODAL */}
      <AlertDialog open={mostrarConfirmacao} onOpenChange={setMostrarConfirmacao}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Deletar motorista</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja deletar esta motorista?
            </AlertDialogDescription>
          </AlertDialogHeader>

          <div className="flex justify-end gap-2">
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction>
              Deletar
            </AlertDialogAction>
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
      <div className="font-medium text-sm mt-1">{value || '—'}</div>
    </div>
  );
}