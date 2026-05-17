"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

import { useDados } from "@/app/contexto/DadosContexto";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

import { Plus, Trash2, Edit, Eye, Search } from "lucide-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export default function PaginaMotoristas() {
  const { motoristas, deletarMotorista } = useDados();

  const [busca, setBusca] = useState("");
  const [idParaDeletar, setIdParaDeletar] = useState<string | null>(null);

  const motoristasFiltrados = useMemo(() => {
    return motoristas.filter(
      (m) =>
        m.nome.toLowerCase().includes(busca.toLowerCase()) ||
        m.email.toLowerCase().includes(busca.toLowerCase()) ||
        m.numeroCarta.includes(busca),
    );
  }, [motoristas, busca]);

  const ativos = motoristas.filter((m) => m.ativo).length;
  const inativos = motoristas.length - ativos;

  const handleDeletar = () => {
    if (idParaDeletar) {
      deletarMotorista(idParaDeletar);
      setIdParaDeletar(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Cabeçalho */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Motoristas</h1>
          <p className="text-muted-foreground mt-2">
            Gerencie todas as motoristas
          </p>
        </div>
        <Link href="/motoristas/adicionar">
          <Button className="gap-2">
            <Plus className="w-5 h-5" />
            Novo Motorista
          </Button>
        </Link>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-3 gap-4">
        <Card className="p-4 border border-slate-200">
          <p className="text-xs text-slate-500">Total</p>
          <p className="text-xl font-semibold text-slate-800">
            {motoristas.length}
          </p>
        </Card>

        <Card className="p-4 border border-slate-200">
          <p className="text-xs text-slate-500">Ativos</p>
          <p className="text-xl font-semibold text-green-600">{ativos}</p>
        </Card>

        <Card className="p-4 border border-slate-200">
          <p className="text-xs text-slate-500">Inativos</p>
          <p className="text-xl font-semibold text-slate-400">{inativos}</p>
        </Card>
      </div>

      {/* Barra de Busca */}
      <Card className="p-4">
        <div className="relative border-[0.5px] rounded-xl border-slate-200 bg-slate-50 text-sm shadow-none focus-visible:ring-2 focus-visible:ring-blue-500/20">
          <Search className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
          <Input
            placeholder="Buscar por origem, destino ou data..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            className="pl-10 rounded-2xl outline-[0.5px]"
          />
        </div>
      </Card>

      <Card className="overflow-hidden">
        {motoristasFiltrados.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-muted-foreground">Nenhum motorista cadastrad</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="text-white border-b border-border">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">
                    Nome
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">
                    Telefone
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">
                    Nº . da Carta
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">
                    Categoria
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">
                    Status
                  </th>
                  <th className="px-6 py-3 text-center text-sm font-semibold text-foreground">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {motoristasFiltrados.map((motorista) => (
                  <tr
                    key={motorista.id}
                    className="hover:bg-muted/50 transition-colors"
                  >
                    <td className="px-6 py-4 text-sm text-foreground font-medium">
                      {motorista.nome}
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">
                      {motorista.telefone}
                    </td>
                    <td className="px-6 py-4 text-sm text-foreground">
                      {motorista.numeroCarta} km
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">
                      {motorista.categoriaCarta}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <Badge variant={"outline"}>{motorista.ativo}</Badge>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <Link href={`/motoristas/${motorista.id}`}>
                          <Button variant="ghost" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                        </Link>
                        <Link href={`/motoristas/${motorista.id}/editar`}>
                          <Button variant="ghost" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                        </Link>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-destructive hover:text-destructive"
                          onClick={() => setIdParaDeletar(motorista.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      {/* DELETE DIALOG */}
      <AlertDialog
        open={idParaDeletar !== null}
        onOpenChange={() => setIdParaDeletar(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>

            <AlertDialogDescription>
              Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <div className="flex justify-end gap-2 mt-4">
            <AlertDialogCancel>Cancelar</AlertDialogCancel>

            <AlertDialogAction
              onClick={handleDeletar}
              className="bg-red-600 hover:bg-red-700"
            >
              Excluir
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
