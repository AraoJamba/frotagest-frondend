'use client';

import React from "react"

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Servico } from '@/app/tipos/indices';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface PropsFormularioServico {
  servico?: Servico;
  onSubmit: (servico: Servico) => void;
  carregando?: boolean;
}

export function FormularioServico({ servico, onSubmit, carregando = false }: PropsFormularioServico) {
  const router = useRouter();
  const [dados, setDados] = useState<Servico>(
    servico || {
      id: Date.now().toString(),
      nome: '',
      descricao: '',
      tipo: 'manutencao',
      custoEstimado: 0,
      dataCadastro: new Date().toISOString().split('T')[0],
      ativo: true,
    }
  );

  const [erros, setErros] = useState<Record<string, string>>({});

  const validarFormulario = () => {
    const novosErros: Record<string, string> = {};

    if (!dados.nome.trim()) novosErros.nome = 'Nome é obrigatório';
    if (!dados.descricao.trim()) novosErros.descricao = 'Descrição é obrigatória';
    if (dados.custoEstimado <= 0) novosErros.custoEstimado = 'Custo deve ser maior que 0';

    setErros(novosErros);
    return Object.keys(novosErros).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validarFormulario()) {
      onSubmit(dados);
    }
  };

  const handleChange = (campo: keyof Servico, valor: any) => {
    setDados({ ...dados, [campo]: valor });
    if (erros[campo]) {
      setErros({ ...erros, [campo]: '' });
    }
  };

  return (
    <Card className="p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          {/* Nome */}
          <div>
            <Label htmlFor="nome">Nome do Serviço</Label>
            <Input
              id="nome"
              value={dados.nome}
              onChange={(e) => handleChange('nome', e.target.value)}
              disabled={carregando}
              className={erros.nome ? 'border-destructive' : ''}
            />
            {erros.nome && <p className="text-sm text-destructive mt-1">{erros.nome}</p>}
          </div>

          {/* Descrição */}
          <div>
            <Label htmlFor="descricao">Descrição</Label>
            <Textarea
              id="descricao"
              value={dados.descricao}
              onChange={(e) => handleChange('descricao', e.target.value)}
              disabled={carregando}
              rows={4}
              className={erros.descricao ? 'border-destructive' : ''}
            />
            {erros.descricao && <p className="text-sm text-destructive mt-1">{erros.descricao}</p>}
          </div>

          {/* Tipo */}
          <div>
            <Label htmlFor="tipo">Tipo de Serviço</Label>
            <Select value={dados.tipo} onValueChange={(valor) => handleChange('tipo', valor)} disabled={carregando}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="manutencao">Manutenção</SelectItem>
                <SelectItem value="reparo">Reparo</SelectItem>
                <SelectItem value="inspecao">Inspeção</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Custo Estimado */}
          <div>
            <Label htmlFor="custoEstimado">Custo Estimado (Kz)</Label>
            <Input
              id="custoEstimado"
              type="number"
              step="0.01"
              value={dados.custoEstimado}
              onChange={(e) => handleChange('custoEstimado', parseFloat(e.target.value))}
              disabled={carregando}
              className={erros.custoEstimado ? 'border-destructive' : ''}
            />
            {erros.custoEstimado && <p className="text-sm text-destructive mt-1">{erros.custoEstimado}</p>}
          </div>

          {/* Status */}
          <div>
            <Label htmlFor="ativo">Status</Label>
            <Select value={dados.ativo ? 'ativo' : 'inativo'} onValueChange={(valor) => handleChange('ativo', valor === 'ativo')} disabled={carregando}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ativo">Ativo</SelectItem>
                <SelectItem value="inativo">Inativo</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Botões */}
        <div className="flex gap-3 justify-end pt-4 border-t border-border">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.back()}
            disabled={carregando}
          >
            Cancelar
          </Button>
          <Button type="submit" disabled={carregando}>
            {carregando ? 'Salvando...' : 'Salvar'}
          </Button>
        </div>
      </form>
    </Card>
  );
}
