'use client';

import React from "react"

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Veiculo } from '@/app/tipos/indices';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface PropsFormularioVeiculo {
  veiculo?: Veiculo;
  onSubmit: (veiculo: Veiculo) => void;
  carregando?: boolean;
}

export function FormularioVeiculo({ veiculo, onSubmit, carregando = false }: PropsFormularioVeiculo) {
  const router = useRouter();
  const [dados, setDados] = useState<Veiculo>(
    veiculo || {
      id: Date.now().toString(),
      placa: '',
      modelo: '',
      marca: '',
      ano: new Date().getFullYear(),
      VIN: '',
      tipo: 'leve',
      capacidadeCarga: 0,
      dataCadastro: new Date().toISOString().split('T')[0],
      ativo: true,
      combustivel: 'diesel',
      consumoMedio: 0,
      ultimaRevista: new Date().toISOString().split('T')[0],
    }
  );

  const [erros, setErros] = useState<Record<string, string>>({});

  const validarFormulario = () => {
    const novosErros: Record<string, string> = {};

    if (!/^[A-HJ-NPR-Z0-9]{17}$/.test(dados.VIN)) novosErros.VIN = 'VIN (Número de Identificação de Veículo) inválido';
    if (!dados.modelo.trim()) novosErros.modelo = 'Modelo é obrigatório';
    if (!dados.marca.trim()) novosErros.marca = 'Marca é obrigatória';
    if (!dados.ano || dados.ano < 1900 || dados.ano > new Date().getFullYear()) novosErros.ano = 'Ano inválido';
    if (!/^[A-Z]{2,3}-\d{2}-\d{2}-[A-Z]{2}$/.test(dados.placa)) novosErros.placa = 'Nº da Placa inválida';
    if (dados.capacidadeCarga <= 0) novosErros.capacidadeCarga = 'Capacidade deve ser maior que 0';
    if (dados.consumoMedio <= 0) novosErros.consumoMedio = 'Consumo deve ser maior que 0';

    setErros(novosErros);
    return Object.keys(novosErros).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validarFormulario()) {
      onSubmit(dados);
    }
  };

  const handleChange = (campo: keyof Veiculo, valor: any) => {
    setDados({ ...dados, [campo]: valor });
    if (erros[campo]) {
      setErros({ ...erros, [campo]: '' });
    }
  };

  return (
    <Card className="p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Placa */}
          <div>
            <Label htmlFor="placa">Placa</Label>
            <Input
              id="placa"
              value={dados.placa.toUpperCase()}
              onChange={(e) => handleChange('placa', e.target.value)}
              disabled={carregando}
              placeholder="LD-00-00-XX"
              className={erros.placa ? 'border-destructive' : ''}
            />
            {erros.placa && <p className="text-sm text-destructive mt-1">{erros.placa}</p>}
          </div>

          {/* Marca */}
          <div>
            <Label htmlFor="marca">Marca</Label>
            <Input
              id="marca"
              value={dados.marca}
              onChange={(e) => handleChange('marca', e.target.value)}
              disabled={carregando}
              className={erros.marca ? 'border-destructive' : ''}
            />
            {erros.marca && <p className="text-sm text-destructive mt-1">{erros.marca}</p>}
          </div>

          {/* Modelo */}
          <div>
            <Label htmlFor="modelo">Modelo</Label>
            <Input
              id="modelo"
              value={dados.modelo}
              onChange={(e) => handleChange('modelo', e.target.value)}
              disabled={carregando}
              className={erros.modelo ? 'border-destructive' : ''}
            />
            {erros.modelo && <p className="text-sm text-destructive mt-1">{erros.modelo}</p>}
          </div>

          {/* Ano */}
          <div>
            <Label htmlFor="ano">Ano</Label>
            <Input
              id="ano"
              type="number"
              value={dados.ano}
              onChange={(e) => handleChange('ano', parseInt(e.target.value))}
              disabled={carregando}
              className={erros.ano ? 'border-destructive' : ''}
            />
            {erros.ano && <p className="text-sm text-destructive mt-1">{erros.ano}</p>}
          </div>

          {/* VIN (Número de Identificação de Veículo) */}
          <div>
            <Label htmlFor="vin">VIN (Número de Identificação de Veículo)</Label>
            <Input
              id="vin"
              value={dados.VIN}
              onChange={(e) => handleChange('VIN', e.target.value)}
              disabled={carregando}
              className={erros.vin ? 'border-destructive' : ''}
            />
            {erros.VIN && <p className="text-sm text-destructive mt-1">{erros.VIN}</p>}
          </div>

          {/* Tipo */}
          <div>
            <Label htmlFor="tipo">Tipo de Veículo</Label>
            <Select value={dados.tipo} onValueChange={(valor) => handleChange('tipo', valor)} disabled={carregando}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="leve">Leve</SelectItem>
                <SelectItem value="medio">Médio</SelectItem>
                <SelectItem value="pesado">Pesado</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Combustível */}
          <div>
            <Label htmlFor="combustivel">Combustível</Label>
            <Select value={dados.combustivel} onValueChange={(valor) => handleChange('combustivel', valor)} disabled={carregando}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="gasolina">Gasolina</SelectItem>
                <SelectItem value="diesel">Diesel</SelectItem>
                <SelectItem value="etanol">Etanol</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Capacidade de Carga */}
          <div>
            <Label htmlFor="capacidadeCarga">Capacidade de Carga (kg)</Label>
            <Input
              id="capacidadeCarga"
              type="number"
              value={dados.capacidadeCarga}
              onChange={(e) => handleChange('capacidadeCarga', parseInt(e.target.value))}
              disabled={carregando}
              className={erros.capacidadeCarga ? 'border-destructive' : ''}
            />
            {erros.capacidadeCarga && <p className="text-sm text-destructive mt-1">{erros.capacidadeCarga}</p>}
          </div>

          {/* Consumo Médio */}
          <div>
            <Label htmlFor="consumoMedio">Consumo Médio (km/L)</Label>
            <Input
              id="consumoMedio"
              type="number"
              step="0.1"
              value={dados.consumoMedio}
              onChange={(e) => handleChange('consumoMedio', parseFloat(e.target.value))}
              disabled={carregando}
              className={erros.consumoMedio ? 'border-destructive' : ''}
            />
            {erros.consumoMedio && <p className="text-sm text-destructive mt-1">{erros.consumoMedio}</p>}
          </div>

          {/* Última Revista */}
          <div>
            <Label htmlFor="ultimaRevista">Última Revista</Label>
            <Input
              id="ultimaRevista"
              type="date"
              value={dados.ultimaRevista}
              onChange={(e) => handleChange('ultimaRevista', e.target.value)}
              disabled={carregando}
            />
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
