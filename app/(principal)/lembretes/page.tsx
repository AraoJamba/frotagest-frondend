'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useDados } from '@/app/contexto/DadosContexto';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Plus, Trash2, Edit, Search } from 'lucide-react';
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

export default function PaginaLembretes() {
  const { lembretes, deletarLembrete, atualizarLembrete } = useDados();
  const [idParaDeletar, setIdParaDeletar] = useState<string | null>(null);

  const [busca, setBusca] = useState('');

  const handleDeletar = () => {
    if (idParaDeletar) {
      deletarLembrete(idParaDeletar);
      setIdParaDeletar(null);
    }
  };

  const handleToggleCompleto = (lembrete: typeof lembretes[0]) => {
    atualizarLembrete(lembrete.id, { completado: !lembrete.completado });
  };

  const formatarData = (data: string) => {
    return new Date(data).toLocaleDateString('pt-AO');
  };

  const getPrioridadeColor = (prioridade: string) => {
    switch (prioridade) {
      case 'alta': return 'destructive';
      case 'media': return 'secondary';
      case 'baixa': return 'outline';
      default: return 'outline';
    }
  };

  const getTipoColor = (tipo: string) => {
    switch (tipo) {
      case 'manutencao': return 'bg-blue-100 text-blue-800';
      case 'documentacao': return 'bg-yellow-100 text-yellow-800';
      case 'revisao': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const lembretesOrdenados = [...lembretes].sort((a, b) => {
    if (a.completado === b.completado) {
      return new Date(a.dataAgendada).getTime() - new Date(b.dataAgendada).getTime();
    }
    return a.completado ? 1 : -1;
  });

  return (
    <div className="space-y-6">
      {/* Cabeçalho */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Lembretes</h1>
          <p className="text-muted-foreground mt-2">Gerencie todas as lembretes realizadas</p>
        </div>
        <Link href="/manutencoes/adicionar">
          <Button className="gap-2">
            <Plus className="w-5 h-5" />
            Nova Lembrete
          </Button>
        </Link>
      </div>

      {/* Barra de Busca */}
      <Card className="p-4">
        <div className="relative border-[0.5px] rounded-xl border-slate-200 bg-slate-50 text-sm shadow-none focus-visible:ring-2 focus-visible:ring-blue-500/20">
          <Search className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
          <Input
            placeholder=""
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            className="pl-10 rounded-2xl outline-[0.5px]"
          />
        </div>
      </Card>

      {/* Lista de Lembretes */}
      <div className="space-y-3">
        {lembretesOrdenados.length === 0 ? (
          <Card className="p-8 text-center">
            <p className="text-muted-foreground">Nenhum lembrete cadastrado</p>
          </Card>
        ) : (
          lembretesOrdenados.map((lembrete) => (
            <Card
              key={lembrete.id}
              className={`p-4 ${lembrete.completado ? 'opacity-60' : ''}`}
            >
              <div className="flex items-start gap-4">
                {/* Checkbox */}
                <Checkbox
                  checked={lembrete.completado}
                  onCheckedChange={() => handleToggleCompleto(lembrete)}
                  className="mt-1"
                />

                {/* Conteúdo */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h3 className={`font-semibold ${lembrete.completado ? 'line-through text-muted-foreground' : 'text-foreground'}`}>
                        {lembrete.titulo}
                      </h3>
                      <p className={`text-sm mt-1 ${lembrete.completado ? 'line-through text-muted-foreground' : 'text-muted-foreground'}`}>
                        {lembrete.descricao}
                      </p>

                      {/* Tags */}
                      <div className="flex gap-2 mt-3 flex-wrap">
                        <Badge variant={getPrioridadeColor(lembrete.prioridade)} className="capitalize">
                          {lembrete.prioridade}
                        </Badge>
                        <Badge className={`capitalize ${getTipoColor(lembrete.tipo)}`} >
                          {lembrete.tipo}
                        </Badge>
                        <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
                          {formatarData(lembrete.dataAgendada)}
                        </span>
                      </div>
                    </div>

                    {/* Ações */}
                    <div className="flex gap-2">
                      <Link href={`/lembretes/${lembrete.id}/editar`}>
                        <Button variant="ghost" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                      </Link>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-destructive hover:text-destructive"
                        onClick={() => setIdParaDeletar(lembrete.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
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
            <AlertDialogTitle>Deletar Lembrete</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja deletar este lembrete? Esta ação não pode ser desfeita.
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
