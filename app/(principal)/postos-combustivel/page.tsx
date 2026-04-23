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


export default function PaginaPostosCombustivel() {
  const { postosCombustivel, deletarPostoCombustivel } = useDados();
  const [busca, setBusca] = useState('');
  const [idParaDeletar, setIdParaDeletar] = useState<string | null>(null);

  const postosFiltrados = postosCombustivel.filter(p =>
    p.nome.toLowerCase().includes(busca.toLowerCase()) ||
    p.cidade.toLowerCase().includes(busca.toLowerCase())
  );

  const handleDeletar = () => {
    if (idParaDeletar) {
      deletarPostoCombustivel(idParaDeletar);
      setIdParaDeletar(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Cabeçalho */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Postos de Combustível</h1>
          <p className="text-muted-foreground mt-2">Gerencie os postos de combustível parceiros</p>
        </div>
        <Link href="/postos-combustivel/adicionar">
          <Button className="gap-2">
            <Plus className="w-5 h-5" />
            Novo Posto
          </Button>
        </Link>
      </div>

      {/* Barra de Busca */}
      <Card className="p-4">
        <div className="relative">
          <Search className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
          <Input
            placeholder="Buscar por nome ou cidade..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            className="pl-10"
          />
        </div>
      </Card>

      {/* Cartões de Postos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {postosFiltrados.length === 0 ? (
          <div className="col-span-full text-center py-8">
            <p className="text-muted-foreground">Nenhum posto encontrado</p>
          </div>
        ) : (
          postosFiltrados.map((posto) => (
            <Card key={posto.id} className="p-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-foreground">{posto.nome}</h3>
                  <p className="text-sm text-muted-foreground">{posto.cidade}, {posto.provincia}</p>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">Gasóleo:</span>
                    <span className="font-semibold text-foreground">Kz {posto.gasoleo}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">Gasolina:</span>
                    <span className="font-semibold text-foreground">Kz {posto.gasolina}</span>
                  </div>
                </div>

                <Badge variant={posto.ativo ? 'default' : 'secondary'}>
                  {posto.ativo ? 'Ativo' : 'Inativo'}
                </Badge>

                <div className="flex gap-2 pt-2 border-t border-border">
                  <Link href={`/postos-combustivel/${posto.id}`} className="flex-1">
                    <Button variant="ghost" size="sm" className="w-full gap-2">
                      <Eye className="w-4 h-4" />
                    </Button>
                  </Link>
                  <Link href={`/postos-combustivel/${posto.id}/editar`} className="flex-1">
                    <Button variant="ghost" size="sm" className="w-full gap-2">
                      <Edit className="w-4 h-4" />
                    </Button>
                  </Link>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex-1 text-destructive hover:text-destructive"
                    onClick={() => setIdParaDeletar(posto.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>

      {/* Diálogo de Confirmação */}
      <AlertDialog open={idParaDeletar !== null} onOpenChange={() => setIdParaDeletar(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Deletar Posto de Combustivel</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja deletar este posto? Esta ação não pode ser desfeita.
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
