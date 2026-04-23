'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useDados } from '@/app/contexto/DadosContexto';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, Eye, Edit, Trash2, Search } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Input } from '@/components/ui/input';

export default function PaginaViagens() {
  const { viagens, deletarViagem } = useDados();
  const [idParaDeletar, setIdParaDeletar] = useState<string | null>(null);
  const [busca, setBusca] = useState('');

const viagensFiltrados = (viagens || []).filter(v =>
  v.localPartida?.toLowerCase().includes(busca.toLowerCase()) ||
  v.localDestino?.toLowerCase().includes(busca.toLowerCase()) ||
  v.dataInicio?.toLowerCase().includes(busca.toLowerCase())
);


  const handleDeletar = () => {
    if (idParaDeletar) {
      deletarViagem(idParaDeletar);
      setIdParaDeletar(null);
    }
  };


  const formatarData = (data: string) => {
    return new Date(data).toLocaleDateString('pt-AO');
  };

  const obterStatusColor = (status: string) => {
    switch (status) {
      case 'concluida': return 'default';
      case 'emAndamento': return 'secondary';
      case 'planejada': return 'outline';
      case 'cancelada': return 'destructive';
      default: return 'outline';
    }
  };

  const obterStatusTexto = (status: string) => {
    const statusMap: Record<string, string> = {
      concluida: 'Concluída',
      emAndamento: 'Em Andamento',
      planejada: 'Planejada',
      cancelada: 'Cancelada',
    };
    return statusMap[status] || status;
  };

  return (
    <div className="space-y-6">
      {/* Cabeçalho */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Viagens</h1>
          <p className="text-muted-foreground mt-2">Gerencie todas as viagens realizadas</p>
        </div>
        <Link href="/viagens/adicionar">
          <Button className="gap-2">
            <Plus className="w-5 h-5" />
            Nova Viagem
          </Button>
        </Link>
      </div>

      {/* Barra de Busca */}
      <Card className="p-4">
        <div className="relative">
          <Search className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
          <Input
            placeholder="Buscar por origem, destino ou data..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            className="pl-10"
          />
        </div>
      </Card>

      {/* Tabela de Viagens */}
      <Card className="overflow-hidden">
        {viagensFiltrados.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-muted-foreground">Nenhuma viagem cadastrada</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="text-white border-b border-border">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Partida</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Destino</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Distância</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Data Início</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Status</th>
                  <th className="px-6 py-3 text-center text-sm font-semibold text-foreground">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {viagensFiltrados.map((viagem) => (
                  <tr key={viagem.id} className="hover:bg-muted/50 transition-colors">
                    <td className="px-6 py-4 text-sm text-foreground font-medium">{viagem.localPartida}</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">{viagem.localDestino}</td>
                    <td className="px-6 py-4 text-sm text-foreground">{viagem.distancia} km</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">{formatarData(viagem.dataInicio)}</td>
                    <td className="px-6 py-4 text-sm">
                      <Badge variant={obterStatusColor(viagem.status)}>
                        {obterStatusTexto(viagem.status)}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <Link href={`/viagens/${viagem.id}`}>
                          <Button variant="ghost" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                        </Link>
                        <Link href={`/viagens/${viagem.id}/editar`}>
                          <Button variant="ghost" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                        </Link>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-destructive hover:text-destructive"
                          onClick={() => setIdParaDeletar(viagem.id)}
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

      {/* Diálogo de Confirmação */}
      <AlertDialog open={idParaDeletar !== null} onOpenChange={() => setIdParaDeletar(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Deletar Viagem</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja deletar esta viagem? Esta ação não pode ser desfeita.
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
