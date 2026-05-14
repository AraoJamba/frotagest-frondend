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
      <div className="flex h-[300px] items-center justify-center">
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
    <div className="max-w-6xl mx-auto space-y-8">

      {/* HEADER */}
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={() => router.back()}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar
        </Button>

        <div className="flex gap-2">
          <Link href={`/motoristas/${motorista.id}/editar`}>
            <Button variant="outline" className="gap-2">
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

      {/* PERFIL */}
      <Card className="p-8 rounded-3xl border border-slate-200 bg-white">
        <div className="flex items-center gap-6">

          <div className="h-20 w-20 flex items-center justify-center rounded-2xl bg-blue-600 text-white text-xl font-bold">
            {motorista.nome.slice(0, 2).toUpperCase()}
          </div>

          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-slate-800">
                {motorista.nome}
              </h1>

              <Badge className={motorista.ativo
                ? "bg-green-50 text-green-700"
                : "bg-slate-100 text-slate-500"}>
                {motorista.ativo ? "Ativo" : "Inativo"}
              </Badge>
            </div>

            <div className="mt-2 flex gap-4 text-sm text-slate-500">
              <span className="flex items-center gap-1">
                <Mail className="w-4 h-4" /> {motorista.email}
              </span>
              <span className="flex items-center gap-1">
                <Phone className="w-4 h-4" /> {motorista.telefone}
              </span>
            </div>
          </div>

        </div>
      </Card>

      {/* GRID */}
      <div className="grid lg:grid-cols-3 gap-6">

        {/* DOCUMENTOS */}
        <Card className="lg:col-span-2 border border-slate-200 bg-white">
          <CardContent className="p-6 space-y-6">

            <h3 className="flex items-center gap-2 font-semibold text-slate-700">
              <ShieldCheck className="w-5 h-5 text-blue-600" />
              Documentação
            </h3>

            <div className="grid sm:grid-cols-2 gap-6">
              <Info label="Carta" value={motorista.numeroCarta} />
              <Info label="BI" value={motorista.numeroBI} />
              <Info label="Categoria" value={motorista.categoriaCarta} />
              <Info label="Validade" value={formatarData(motorista.dataValidadeCarta)} />
            </div>

          </CardContent>
        </Card>

        {/* LADO DIREITO */}
        <div className="space-y-6">

          <Card className="p-6 border border-slate-200 bg-white">
            <h3 className="text-sm font-bold text-slate-500 mb-4">
              Informações
            </h3>

            <div className="space-y-3 text-sm">
              <Row label="Idade" value={`${calcularIdade(motorista.dataNascimento)} anos`} />
              <Row label="Nascimento" value={formatarData(motorista.dataNascimento)} />
              <Row label="Cadastro" value={formatarData(motorista.dataCadastro)} />
            </div>
          </Card>

          <Card className="p-6 border border-slate-200 bg-white">
            <h3 className="flex items-center gap-2 text-sm font-bold text-slate-500 mb-3">
              <MapPin className="w-4 h-4" />
              Endereço
            </h3>

            <p className="text-slate-800">{motorista.endereco}</p>
            <p className="text-sm text-slate-500">
              {motorista.cidade}, {motorista.provincia}
            </p>
          </Card>

        </div>
      </div>

      {/* DIALOG */}
      <AlertDialog open={mostrarConfirmacao} onOpenChange={setMostrarConfirmacao}>
        <AlertDialogContent className="bg-white border-slate-200">
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
            <AlertDialogDescription>
              Deseja deletar {motorista.nome}?
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeletar}
              className="bg-red-600 hover:bg-red-700"
            >
              Deletar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

    </div>
  );
}

/* COMPONENTES */
function Info({ label, value }: any) {
  return (
    <div>
      <p className="text-xs text-slate-500">{label}</p>
      <p className="font-medium text-slate-800">{value}</p>
    </div>
  );
}

function Row({ label, value }: any) {
  return (
    <div className="flex justify-between">
      <span className="text-slate-500">{label}</span>
      <span className="font-medium text-slate-800">{value}</span>
    </div>
  );
}