'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

import { useDados } from '@/app/contexto/DadosContexto';

import { Despesa } from '@/app/tipos/indices';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

import {
  Plus,
  Trash2,
  Edit,
  Eye,
  Search
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

export default function PaginaDespesasVeiculo() {

  const params = useParams();
  const id = params.id as string;

  const {
    carregarDespesasPorVeiculo,
    deletarDespesa,
    obterVeiculo
  } = useDados();

  const [despesas, setDespesas] = useState<Despesa[]>([]);
  const [busca, setBusca] = useState('');
  const [idParaDeletar, setIdParaDeletar] = useState<string | null>(null);

  const veiculo = obterVeiculo(id);

  useEffect(() => {

    async function carregar() {
      try {
        const dados = await carregarDespesasPorVeiculo(id);
        setDespesas(dados);
      } catch (erro) {
        console.error('Erro ao carregar despesas:', erro);
      }
    }

    if (id) {
      carregar();
    }

  }, [id]);



  const despesasFiltradas = despesas.filter(d =>
    d.tipo.toLowerCase().includes(busca.toLowerCase())
  );



  const handleDeletar = async () => {

    if (!idParaDeletar) return;

    try {

      await deletarDespesa(idParaDeletar);

      setDespesas(prev =>
        prev.filter(d => d.id !== idParaDeletar)
      );

      setIdParaDeletar(null);

    } catch (erro) {
      console.error(erro);
    }
  };



  return (
    <div className="space-y-6">

      {/* Cabeçalho */}
      <div className="flex items-center justify-between">

        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Despesas do Veículo
          </h1>

          <p className="text-muted-foreground mt-2">
            {veiculo
              ? `${veiculo.marca} ${veiculo.modelo} - ${veiculo.matricula}`
              : 'Carregando veículo...'}
          </p>
        </div>

        <Link href="/despesas/adicionar">
          <Button className="gap-2">
            <Plus className="w-5 h-5" />
            Nova Despesa
          </Button>
        </Link>

      </div>



      {/* Busca */}
      <Card className="p-4">

        <div className="relative border-[0.5px] rounded-xl border-slate-200 bg-slate-50 text-sm shadow-none">

          <Search className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />

          <Input
            placeholder="Buscar despesa..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            className="pl-10"
          />

        </div>

      </Card>



      {/* Tabela */}
      <Card className="overflow-hidden">

        {despesasFiltradas.length === 0 ? (

          <div className="p-8 text-center">
            <p className="text-muted-foreground">
              Nenhuma despesa encontrada
            </p>
          </div>

        ) : (

          <div className="overflow-x-auto">

            <table className="w-full">

              <thead className="bg-muted border-b border-border">
                <tr>

                  <th className="px-6 py-3 text-left text-sm font-semibold">
                    Tipo
                  </th>

                  <th className="px-6 py-3 text-left text-sm font-semibold">
                    Valor
                  </th>

                  <th className="px-6 py-3 text-left text-sm font-semibold">
                    Data
                  </th>

                  <th className="px-6 py-3 text-center text-sm font-semibold">
                    Ações
                  </th>

                </tr>
              </thead>



              <tbody className="divide-y divide-border">

                {despesasFiltradas.map((despesa) => (

                  <tr
                    key={despesa.id}
                    className="hover:bg-muted/50 transition-colors"
                  >

                    <td className="px-6 py-4 text-sm">
                      <Badge
                        variant="outline"
                        className="capitalize"
                      >
                        {despesa.tipo}
                      </Badge>
                    </td>

                    <td className="px-6 py-4 text-sm text-muted-foreground">
                      {despesa.valor} Kz
                    </td>

                    <td className="px-6 py-4 text-sm text-muted-foreground">
                      {despesa.data}
                    </td>

                    <td className="px-6 py-4 text-center">

                      <div className="flex items-center justify-center gap-2">

                        <Link href={`/despesas/${despesa.id}`}>
                          <Button variant="ghost" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                        </Link>

                        <Link href={`/despesas/${despesa.id}/editar`}>
                          <Button variant="ghost" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                        </Link>

                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-destructive hover:text-destructive"
                          onClick={() => setIdParaDeletar(despesa.id)}
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



      {/* Dialog deletar */}
      <AlertDialog
        open={idParaDeletar !== null}
        onOpenChange={() => setIdParaDeletar(null)}
      >

        <AlertDialogContent>

          <AlertDialogHeader>

            <AlertDialogTitle>
              Deletar Despesa
            </AlertDialogTitle>

            <AlertDialogDescription>
              Tem certeza que deseja deletar esta despesa?
            </AlertDialogDescription>

          </AlertDialogHeader>

          <div className="flex gap-3 justify-end">

            <AlertDialogCancel>
              Cancelar
            </AlertDialogCancel>

            <AlertDialogAction
              onClick={handleDeletar}
              className="bg-destructive hover:bg-destructive/90"
            >
              Deletar
            </AlertDialogAction>

          </div>

        </AlertDialogContent>

      </AlertDialog>

    </div>
  );
}