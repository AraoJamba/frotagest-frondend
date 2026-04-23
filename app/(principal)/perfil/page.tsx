'use client';

import { useState } from 'react';
import { useAutenticacao } from '@/app/contexto/AutenticacaoContexto';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Edit } from 'lucide-react';

export default function PaginaPerfil() {
  const { usuarioAtual } = useAutenticacao();
  const [editando, setEditando] = useState(false);
  const [dados, setDados] = useState({
    nome: usuarioAtual?.nome || '',
    email: usuarioAtual?.email || '',
  });

  const handleSalvar = () => {
    setEditando(false);
    
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Meu Perfil</h1>
        <p className="text-muted-foreground mt-2">Gerencie suas informações pessoais</p>
      </div>

      {/* Informações Básicas */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-foreground">Informações Pessoais</h2>
          <Button
            variant={editando ? 'default' : 'outline'}
            onClick={() => setEditando(!editando)}
            className="gap-2"
          >
            <Edit className="w-4 h-4" />
            {editando ? 'Salvar' : 'Editar'}
          </Button>
        </div>

        <div className="space-y-4">
          <div>
            <Label htmlFor="nome">Nome</Label>
            <Input
              id="nome"
              value={dados.nome}
              onChange={(e) => setDados({ ...dados, nome: e.target.value })}
              disabled={!editando}
            />
          </div>

          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={dados.email}
              onChange={(e) => setDados({ ...dados, email: e.target.value })}
              disabled={!editando}
            />
          </div>

          <div>
            <Label htmlFor="papel">Papel</Label>
            <Input
              id="papel"
              value={usuarioAtual?.papel || ''}
              disabled
              className="bg-muted"
            />
          </div>

          {editando && (
            <div className="flex gap-3 justify-end pt-4 border-t border-border">
              <Button
                variant="outline"
                onClick={() => setEditando(false)}
              >
                Cancelar
              </Button>
              <Button onClick={handleSalvar}>
                Salvar Mudanças
              </Button>
            </div>
          )}
        </div>
      </Card>

      {/* Segurança */}
      <Card className="p-6">
        <h2 className="text-xl font-bold text-foreground mb-4">Segurança</h2>
        <div className="space-y-4">
          <Button variant="outline" className="w-full justify-start bg-transparent">
            Alterar Senha
          </Button>
          <Button variant="outline" className="w-full justify-start bg-transparent">
            Atividade de Conta
          </Button>
        </div>
      </Card>
    </div>
  );
}
