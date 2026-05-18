'use client';

import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'next/navigation';

import Link from 'next/link';

import { useDados } from '@/app/contexto/DadosContexto';

import { Button } from '@/components/ui/button';

import {Card } from '@/components/ui/card';

import {Input} from '@/components/ui/input';

import {Badge} from '@/components/ui/badge';

import {
  formatarMoeda } from '@/app/funcoes/funcoes';

import {ManutencaoVeiculo} from '@/app/tipos/indices';

import {
  Plus,Trash2,Edit,Eye,Search,} from 'lucide-react';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';



export default function PaginaManutencoesVeiculo() {

  const params = useParams();
  const id = params.id as string;

  const {
    carregarManutencoesPorVeiculo,
    deletarManutencao,
    obterVeiculo
  } = useDados();



  const [manutencoes, setManutencoes] = useState<ManutencaoVeiculo[]>([]);
  const [busca, setBusca] = useState('');
  const [idParaDeletar, setIdParaDeletar] = useState<string | null>(null);



  const veiculo = obterVeiculo(id);



  useEffect(() => {

    async function carregar() {

      try {

        const dados =
          await carregarManutencoesPorVeiculo(id);

        setManutencoes(dados);

      } catch (erro) {

        console.error('Erro ao carregar manutenções:',erro);
      }
    }

    if (id) {
      carregar();
    }

  }, [id]);



  const manutencoesFiltradas = useMemo(() => {

    return manutencoes.filter(
      (m) =>

        m.responsavel
          .toLowerCase()
          .includes(busca.toLowerCase())

        ||

        m.status
          .toLowerCase()
          .includes(busca.toLowerCase())

        ||

        m.tipo_manutencao
          .toLowerCase()
          .includes(busca.toLowerCase())

    );

  }, [manutencoes, busca]);



  const handleDeletar = async () => {

    if (!idParaDeletar) return;

    try {

      await deletarManutencao(idParaDeletar);

      setManutencoes(prev =>
        prev.filter(
          m => m.id !== idParaDeletar
        )
      );

      setIdParaDeletar(null);

    } catch (erro) {

      console.error(erro);

    }
  };



  return (

    <div className="space-y-8 pb-10 antialiased">

      {/* Cabeçalho */}
      <div className="flex items-center justify-between">

        <div>

          <h1 className="text-3xl font-bold text-foreground">
            Manutenções do Veículo
          </h1>

          <p className="text-muted-foreground mt-2">

            {veiculo
              ? `${veiculo.marca} ${veiculo.modelo} - ${veiculo.matricula}`
              : 'Carregando veículo...'}

          </p>

        </div>



        <Link href="/manutencoes/adicionar">

          <Button className="gap-2">

            <Plus className="w-5 h-5" />
            Nova Manutenção

          </Button>

        </Link>

      </div>



      {/* Busca */}
      <Card className="p-4">

        <div className="relative border-[0.5px] rounded-xl border-slate-200 bg-slate-50 text-sm shadow-none">

          <Search className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />

          <Input
            placeholder="Buscar manutenção..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            className="pl-10 rounded-2xl"
          />

        </div>

      </Card>



      {/* Tabela */}
      <Card className="overflow-hidden">

        {manutencoesFiltradas.length === 0 ? (

          <div className="p-8 text-center">

            <p className="text-muted-foreground">
              Nenhuma manutenção encontrada
            </p>

          </div>

        ) : (

          <div className="overflow-x-auto">

            <table className="w-full">

              <thead className="border-b border-border">

                <tr>

                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">
                    Tipo
                  </th>

                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">
                    Oficina
                  </th>

                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">
                    Custo
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

                {manutencoesFiltradas.map((manutencao) => (

                  <tr
                    key={manutencao.id}
                    className="hover:bg-muted/50 transition-colors"
                  >

                    <td className="px-6 py-4 text-sm text-muted-foreground">

                      {manutencao.tipo_manutencao}

                    </td>

                    <td className="px-6 py-4 text-sm text-foreground">

                      {manutencao.responsavel}

                    </td>

                    <td className="px-6 py-4 text-sm text-muted-foreground">

                      {formatarMoeda(manutencao.custo)}

                    </td>

                    <td className="px-6 py-4 text-sm">

                      <Badge variant="default">

                        {manutencao.status}

                      </Badge>

                    </td>

                    <td className="px-6 py-4 text-center">

                      <div className="flex items-center justify-center gap-2">

                        <Link href={`/manutencoes/${manutencao.id}`}>

                          <Button variant="ghost" size="sm">

                            <Eye className="w-4 h-4" />

                          </Button>

                        </Link>



                        <Link href={`/manutencoes/${manutencao.id}/editar`}>

                          <Button variant="ghost" size="sm">

                            <Edit className="w-4 h-4" />

                          </Button>

                        </Link>



                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-destructive hover:text-destructive"
                          onClick={() =>
                            setIdParaDeletar(manutencao.id)
                          }
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