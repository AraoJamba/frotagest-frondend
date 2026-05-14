'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';

import { useDados } from '@/app/contexto/DadosContexto';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

import {
  Plus,
  Trash2,
  Edit,
  Eye,
  Search,
} from 'lucide-react';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

export default function PaginaMotoristas() {
  const { motoristas, deletarMotorista } = useDados();

  const [busca, setBusca] = useState('');
  const [idParaDeletar, setIdParaDeletar] = useState<string | null>(null);

  const motoristasFiltrados = useMemo(() => {
    return motoristas.filter(
      (m) =>
        m.nome.toLowerCase().includes(busca.toLowerCase()) ||
        m.email.toLowerCase().includes(busca.toLowerCase()) ||
        m.numeroCarta.includes(busca)
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

      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-800">
            Motoristas
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Gerencie os motoristas da frota
          </p>
        </div>

        <Link href="/motoristas/adicionar">
          <Button className="h-10 rounded-lg bg-blue-600 px-4 text-sm hover:bg-blue-700">
            <Plus className="h-4 w-4 mr-2" />
            Novo
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
          <p className="text-xl font-semibold text-green-600">
            {ativos}
          </p>
        </Card>

        <Card className="p-4 border border-slate-200">
          <p className="text-xs text-slate-500">Inativos</p>
          <p className="text-xl font-semibold text-slate-400">
            {inativos}
          </p>
        </Card>

      </div>

      {/* SEARCH */}
      <Card className="p-3 border border-slate-200">

        <div className="relative">

          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />

          <Input
            placeholder="Buscar motorista..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            className="pl-9 h-9 text-sm bg-white"
          />

        </div>

      </Card>

      {/* TABLE */}
      <Card className="border border-slate-200">

        <div className="overflow-x-auto">

          <table className="w-full text-sm">

            <thead className="bg-slate-50 text-slate-500">
              <tr>
                <th className="px-4 py-3 text-left font-medium">Motorista</th>
                <th className="px-4 py-3 text-left font-medium">Carta</th>
                <th className="px-4 py-3 text-left font-medium">Status</th>
                <th className="px-4 py-3 text-center font-medium">Ações</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">

              {motoristasFiltrados.length === 0 ? (
                <tr>
                  <td colSpan={4} className="text-center py-10 text-slate-500">
                    Nenhum motorista encontrado
                  </td>
                </tr>
              ) : (
                motoristasFiltrados.map((m) => (
                  <tr key={m.id} className="hover:bg-slate-50">

                    <td className="px-4 py-3">
                      <div>
                        <p className="font-medium text-slate-800">
                          {m.nome}
                        </p>
                        <p className="text-xs text-slate-500">
                          {m.email}
                        </p>
                      </div>
                    </td>

                    <td className="px-4 py-3 text-slate-700">
                      {m.numero_carta}
                    </td>

                    <td className="px-4 py-3">
                      <Badge
                        className={
                          m.ativo
                            ? 'bg-green-100 text-green-700'
                            : 'bg-slate-100 text-slate-600'
                        }
                      >
                        {m.ativo ? 'Ativo' : 'Inativo'}
                      </Badge>
                    </td>

                    <td className="px-4 py-3">

                      <div className="flex justify-center gap-1">

                        <Link href={`/motoristas/${m.id}`}>
                          <Button size="icon" variant="ghost" className="h-8 w-8">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </Link>

                        <Link href={`/motoristas/${m.id}/editar`}>
                          <Button size="icon" variant="ghost" className="h-8 w-8">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </Link>

                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => setIdParaDeletar(m.id)}
                          className="h-8 w-8 text-red-600"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>

                      </div>

                    </td>

                  </tr>
                ))
              )}

            </tbody>

          </table>

        </div>

      </Card>

      {/* DELETE DIALOG */}
      <AlertDialog
        open={idParaDeletar !== null}
        onOpenChange={() => setIdParaDeletar(null)}
      >
        <AlertDialogContent>

          <AlertDialogHeader>
            <AlertDialogTitle>
              Confirmar exclusão
            </AlertDialogTitle>

            <AlertDialogDescription>
              Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <div className="flex justify-end gap-2 mt-4">

            <AlertDialogCancel>
              Cancelar
            </AlertDialogCancel>

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