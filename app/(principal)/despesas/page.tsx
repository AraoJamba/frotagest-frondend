'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useDados } from '@/app/contexto/DadosContexto';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Plus, Trash2, Edit, Eye, Search } from 'lucide-react';
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
  const { despesas, deletarDespesa } = useDados();
  const [busca, setBusca] = useState('');
  const [idParaDeletar, setIdParaDeletar] = useState<string | null>(null);

  const despesasFiltrados = despesas.filter(d =>
    //d.data.toLowerCase().includes(busca.toLowerCase()) ||
    d.tipo.toLowerCase().includes(busca.toLowerCase()) ||
    d.tipo.includes(busca)
  );

  const handleDeletar = () => {
    if (idParaDeletar) {
      deletarDespesa(idParaDeletar);
      setIdParaDeletar(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Cabeçalho */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Despesas</h1>
          <p className="text-muted-foreground mt-2">Gerencie todos os despesas da frota</p>
        </div>
        <Link href="/despesas/adicionar">
          <Button className="gap-2">
            <Plus className="w-5 h-5" />
            Nova Despesa
          </Button>
        </Link>
      </div>

      {/* Barra de Busca */}
      <Card className="p-4">
        <div className="relative">
          <Search className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
          <Input
            placeholder="Buscar por nome, email ou Nº da Carta..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            className="pl-10"
          />
        </div>
      </Card>

      {/* Tabela de Despesas */}
      <Card className="overflow-hidden">
        {despesasFiltrados.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-muted-foreground">Nenhum despesa encontrado</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted border-b border-border">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Tipo</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Veiculo</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Motorista</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Data</th>
                  <th className="px-6 py-3 text-center text-sm font-semibold text-foreground">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {despesasFiltrados.map((despesa) => (
                  <tr key={despesa.id} className="hover:bg-muted/50 transition-colors">
                    <td className="px-6 py-4 text-sm"><Badge variant="outline" className='capitalize'>{despesa.tipo}</Badge></td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">{despesa.veiculo_id}</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">{despesa.motorista_id}</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">{despesa.data}</td>
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

      {/* Diálogo de Confirmação de Exclusão */}
      <AlertDialog open={idParaDeletar !== null} onOpenChange={() => setIdParaDeletar(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Deletar Despesa</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja deletar esta despesa? Esta ação não pode ser desfeita.
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
