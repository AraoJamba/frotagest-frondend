import React from "react"

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lembrete, PostoCombustivel } from '@/app/tipos/indices';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from "@/components/ui/textarea";

interface PropsFormularioLembrete {
  lembrete?: Lembrete;
  onSubmit: (Lembrete: Lembrete) => void;
  carregando?: boolean;
}

export function FormularioLembrete({ lembrete, onSubmit, carregando = false }: PropsFormularioLembrete) {
  const router = useRouter();
  const [dados, setDados] = useState<Lembrete>(
    lembrete || {
      id: Date.now().toString(),
      titulo: '',
      descricao: '',
      tipo: 'manutencao',
      dataAgendada: '',
      dataCriacao: '',
      completado: false,
      veiculoId: '',
      motoristaId: '',
      prioridade: 'baixa',
    }
  );

  const [erros, setErros] = useState<Record<string, string>>({});

  const validarFormulario = () => {
    const novosErros: Record<string, string> = {};

    if (!dados.dataAgendada || dados.dataAgendada == '') novosErros.dataAgendada = 'Data Agendada obrigatório';
    if (!dados.titulo || dados.titulo == '') novosErros.titulo = 'Título invalido';
    if (!dados.veiculoId || dados.veiculoId == '') novosErros.veiculoId = 'Veículo invalido';
    if (!dados.veiculoId || dados.veiculoId == '') novosErros.veiculoId = 'Veículo invalido';

    setErros(novosErros);
    return Object.keys(novosErros).length === 0;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validarFormulario()) {
      onSubmit(dados);
    }
  };

  const handleChange = (campo: keyof Lembrete, valor: any) => {
    setDados({ ...dados, [campo]: valor });
    if (erros[campo]) {
      setErros({ ...erros, [campo]: '' });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Titulo */}
        <div>
          <Label htmlFor="titulo">Titulo</Label>
          <Input
            id="titulo"
            type="text"
            value={lembrete?.titulo}
            onChange={(e) => handleChange('titulo', e.target.value)}
            disabled={carregando}
            placeholder=""
            className={erros.motoristaId ? 'border-destructive' : ''}
          />
          {erros.titulo && <p className="text-sm text-destructive mt-1">{erros.titulo}</p>}
        </div>

        {/* Tipo - 'manutencao' | 'documentacao' | 'revisao' | 'outro'; */}
        <div>
          <Label htmlFor="tipo">Tipo</Label>
          <Select value={dados.tipo} onValueChange={(valor) => handleChange('tipo', valor)} disabled={carregando}>
            <SelectTrigger>
              <SelectValue placeholder="Selecione uma opção" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="manutencao">Manutenção</SelectItem>
              <SelectItem value="documentacao">Documentação</SelectItem>
              <SelectItem value="revisao">Revisão</SelectItem>
              <SelectItem value="outro">Outro</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Prioridade - prioridade: 'baixa' | 'media' | 'alta'; */}
        <div>
          <Label htmlFor="prioridade">Prioridade</Label>
          <Select value={dados.prioridade} onValueChange={(valor) => handleChange('prioridade', valor)} disabled={carregando}>
            <SelectTrigger>
              <SelectValue placeholder="Selecione uma opção" />
    
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="baixa">Baixa</SelectItem>
              <SelectItem value="media">Média</SelectItem>
              <SelectItem value="alta">Alta</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Completado */}
        <div>
          <Label htmlFor="completado">Completado</Label>

          <Select value={dados.completado.toString()} onValueChange={(valor) => handleChange('completado', parseInt(valor))} disabled={carregando}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">Sim</SelectItem>
              <SelectItem value="0">Não</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* motoristaId */}
        <div>
          <Label htmlFor="motoristaId">Motorista </Label>
          <Input
            id="motoristaId"
            type="tel"
            value={dados.motoristaId}
            onChange={(e) => handleChange('motoristaId', e.target.value)}
            disabled={carregando}
            className={erros.ano ? 'border-destructive' : ''}
          />
          {erros.motoristaId && <p className="text-sm text-destructive mt-1">{erros.motoristaId}</p>}
        </div>

        {/* veiculoId */}
        <div>
          <Label htmlFor="veiculoId">Veiculo </Label>
          <Input
            id="veiculoId"
            type="tel"
            value={dados.veiculoId}
            onChange={(e) => handleChange('veiculoId', e.target.value)}
            disabled={carregando}
            className={erros.ano ? 'border-destructive' : ''}
          />
          {erros.veiculoId && <p className="text-sm text-destructive mt-1">{erros.veiculoId}</p>}
        </div>

        {/* Data Agendada */}
        <div>
          <Label htmlFor="diesel">Data Agendada</Label>
          <Input
            id="diesel"
            type="date"
            value={dados.dataAgendada}
            onChange={(e) => handleChange('dataAgendada', e.target.value)}
            disabled={carregando}
            placeholder=""
            className={erros.dataAgendada ? 'border-destructive' : ''}
          />
          {erros.dataAgendada && <p className="text-sm text-destructive mt-1">{erros.dataAgendada}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
        {/* descricao */}
        <div>
          <Label htmlFor="descricao">Descrição</Label>
          <Textarea
            id="descricao"

            onChange={(e) => handleChange('descricao', e.target.value)}
            disabled={carregando}
            placeholder=""
            className={erros.diesel ? 'border-destructive' : ''}
          />
          {erros.descricao && <p className="text-sm text-destructive mt-1">{erros.descricao}</p>}
        </div>
      </div>

      {/* Botões */}
      < div className="flex gap-3 justify-end pt-4 bottom-4 border-t border-border" >
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
      </div >
    </form >
  )
}