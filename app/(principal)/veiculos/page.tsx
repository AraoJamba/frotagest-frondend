
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

export default function PaginaVeiculos() {
  const { veiculos, deletarVeiculo } = useDados();
  const [busca, setBusca] = useState('');
  const [idParaDeletar, setIdParaDeletar] = useState<string | null>(null);

  const veiculosFiltrados = veiculos.filter(v =>
    v.placa.toLowerCase().includes(busca.toLowerCase()) ||
    v.modelo.toLowerCase().includes(busca.toLowerCase()) ||
    v.marca.toLowerCase().includes(busca.toLowerCase())
  );

  const handleDeletar = () => {
    if (idParaDeletar) {
      deletarVeiculo(idParaDeletar);
      setIdParaDeletar(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Cabeçalho */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Veículos</h1>
          <p className="text-muted-foreground mt-2">Gerencie todos os veículos da frota</p>
        </div>
        <Link href="/veiculos/adicionar">
          <Button className="gap-2">
            <Plus className="w-5 h-5" />
            Novo Veículo
          </Button>
        </Link>
      </div>

      {/* Barra de Busca */}
      <Card className="p-4">
        <div className="relative">
          <Search className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
          <Input
            placeholder="Buscar por placa, modelo ou marca..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            className="pl-10"
          />
        </div>
      </Card>

      {/* Tabela de Veículos */}
      <Card className="overflow-hidden">
        {veiculosFiltrados.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-muted-foreground">Nenhum veículo encontrado</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted border-b border-border">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Placa</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Modelo</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Marca</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Tipo</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Status</th>
                  <th className="px-6 py-3 text-center text-sm font-semibold text-foreground">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {veiculosFiltrados.map((veiculo) => (
                  <tr key={veiculo.id} className="hover:bg-muted/50 transition-colors">
                    <td className="px-6 py-4 text-sm text-foreground font-medium">{veiculo.placa}</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">{veiculo.modelo}</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">{veiculo.marca}</td>
                    <td className="px-6 py-4 text-sm">
                      <Badge variant="outline" className="capitalize">{veiculo.tipo}</Badge>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <Badge variant={veiculo.ativo ? 'default' : 'secondary'}>
                        {veiculo.ativo ? 'Ativo' : 'Inativo'}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <Link href={`/veiculos/${veiculo.id}`}>
                          <Button variant="ghost" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                        </Link>
                        <Link href={`/veiculos/${veiculo.id}/editar`}>
                          <Button variant="ghost" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                        </Link>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-destructive hover:text-destructive"
                          onClick={() => setIdParaDeletar(veiculo.id)}
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
            <AlertDialogTitle>Deletar Veículo</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja deletar este veículo? Esta ação não pode ser desfeita.
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
