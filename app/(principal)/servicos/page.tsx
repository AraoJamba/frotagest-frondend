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


export default function PaginaServicos() {
  const { servicos, deletarServico } = useDados();
  const [busca, setBusca] = useState('');
  const [idParaDeletar, setIdParaDeletar] = useState<string | null>(null);

  const servicosFiltrados = servicos.filter(s =>
    s.nome.toLowerCase().includes(busca.toLowerCase()) ||
    s.descricao.toLowerCase().includes(busca.toLowerCase())
  );

  console.log(servicos)

  const handleDeletar = () => {
    if (idParaDeletar) {
      deletarServico(idParaDeletar);
      setIdParaDeletar(null);
    }
  };


  

  return (
    
    <div className="space-y-6">

      {/* Cabeçalho */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Serviços</h1>
          <p className="text-muted-foreground mt-2">Gerencie os serviços disponíveis</p>
        </div>
        <Link href="/servicos/adicionar">
          <Button className="gap-2">
            <Plus className="w-5 h-5" />
            Novo Serviço
          </Button>
        </Link>
      </div>

      {/* Barra de Busca */}
      <Card className="p-4">
        <div className="relative">
          <Search className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
          <Input
            placeholder="Buscar por nome ou descrição..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            className="pl-10"
          />
        </div>
      </Card>

      {/* Tabela de Serviços */}
      <Card className="overflow-hidden">
        {servicosFiltrados.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-muted-foreground">Nenhum serviço encontrado</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted border-b border-border">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Nome</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Descrição</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Tipo</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Custo Estimado</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Status</th>
                  <th className="px-6 py-3 text-center text-sm font-semibold text-foreground">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {servicosFiltrados.map((servico) => (
                  <tr key={servico.id} className="hover:bg-muted/50 transition-colors">
                    <td className="px-6 py-4 text-sm text-foreground font-medium">{servico.nome}</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">{servico.descricao}</td>
                    <td className="px-6 py-4 text-sm">
                      <Badge variant="outline" className="capitalize">{servico.tipo}</Badge>
                      
                    </td>
                    <td className="px-6 py-4 text-sm text-foreground font-medium">
                      {new Intl.NumberFormat('pt-AO', { style: 'currency', currency: 'AOA' }).format(servico.custo_estimado)}
                      
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <Badge variant={servico.ativo ? 'default' : 'secondary'}>
                        {servico.ativo ? 'Ativo' : 'Inativo'}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <Link href={`/servicos/${servico.id}`}>
                          <Button variant="ghost" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                        </Link>
                        <Link href={`/servicos/${servico.id}/editar`}>
                          <Button variant="ghost" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                        </Link>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-destructive hover:text-destructive"
                          onClick={() => setIdParaDeletar(servico.id)}
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
            <AlertDialogTitle>Deletar Serviço</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja deletar este serviço? Esta ação não pode ser desfeita.
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
