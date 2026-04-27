'use client';

import React from "react"

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ManutencaoVeiculo } from '@/app/tipos/indices';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface PropsFormularioManutencao {
    manutencao?: ManutencaoVeiculo;
    onSubmit: (manutencao: ManutencaoVeiculo) => void;
    carregando?: boolean;
}

export function FormularioManutencao({ manutencao, onSubmit, carregando = false }: PropsFormularioManutencao) {
    const router = useRouter();
    const [dados, setDados] = useState<ManutencaoVeiculo>(
        manutencao || {
            id: Date.now().toString(),
            veiculo_id: '',
            tipo_manutencao: 'preventiva',
            descricao: '',
            data_agendada: new Date().toISOString().split('T')[0],
            data_conclusao: '',
            responsavel: '',
            custo: 0,
            status: 'agendada',
        }
    );

    const [erros, setErros] = useState<Record<string, string>>({});

    const validarFormulario = () => {
        const novosErros: Record<string, string> = {};

        if (!dados.descricao.trim()) novosErros.descricao = 'Nome é obrigatório';
        //if (!dados..trim()) novosErros.descricao = 'Descrição é obrigatória';
        if (dados.custo <= 0) novosErros.custo = 'Custo deve ser maior que 0';

        setErros(novosErros);
        return Object.keys(novosErros).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (validarFormulario()) {
            onSubmit(dados);
        }
    };

    const handleChange = (campo: keyof ManutencaoVeiculo, valor: any) => {
        setDados({ ...dados, [campo]: valor });
        if (erros[campo]) {
            setErros({ ...erros, [campo]: '' });
        }
    };

    return (
        <Card className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                    {/* Tipo */}
                    <div>
                        <Label htmlFor="tipo">Tipo de Serviço</Label>
                        <Select value={dados.tipo_manutencao} onValueChange={(valor) => handleChange('tipo_manutencao', valor)} disabled={carregando}>
                            <SelectTrigger>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="preventiva">preventiva</SelectItem>
                                <SelectItem value="corretiva">corretiva</SelectItem>
                                <SelectItem value="inspecao">Inspeção</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Tipo */}
                    <div>
                        <Label htmlFor="tipo">v id</Label>
                        <Select value={dados.veiculo_id} onValueChange={(valor) => handleChange('veiculo_id', valor)} disabled={carregando}>
                            <SelectTrigger>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="preventiva">preventiva</SelectItem>
                                <SelectItem value="corretiva">corretiva</SelectItem>
                                <SelectItem value="inspecao">Inspeção</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Nome */}
                    <div>
                        <Label htmlFor="responsavel">Nome do Oficina</Label>
                        <Input
                            id="responsavel"
                            value={dados.responsavel}
                            onChange={(e) => handleChange('responsavel', e.target.value)}
                            disabled={carregando}
                            className={erros.nome ? 'border-destructive' : ''}
                        />
                        {erros.responsavel && <p className="text-sm text-destructive mt-1">{erros.responsavel}</p>}
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

                    {/* Custo Estimado */}
                    <div>
                        <Label htmlFor="custo">Custo Estimado (Kz)</Label>
                        <Input
                            id="custo"
                            type="number"
                            step="0.01"
                            value={dados.custo}
                            onChange={(e) => handleChange('custo', parseFloat(e.target.value))}
                            disabled={carregando}
                            className={erros.custoEstimado ? 'border-destructive' : ''}
                        />
                        {erros.custo && <p className="text-sm text-destructive mt-1">{erros.custo}</p>}
                    </div>

                    {/* Status */}
                    <div>
                        <Label htmlFor="ativo">Status</Label>
                        <Select value={dados.status} onValueChange={(valor) => handleChange('status', valor === 'status')} disabled={carregando}>
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

                <div>
                    <Label htmlFor="dataValidadeCarta">Data agendada</Label>
                    <Input
                        id="dataValidadeCarta"
                        type="date"
                        value={dados.data_agendada}
                        onChange={(e) => handleChange('data_agendada', e.target.value)}
                        disabled={carregando}
                        className={erros.dataValidadeCarta ? 'border-destructive' : ''}
                    />
                    {erros.data_agendada && <p className="text-sm text-destructive mt-1">{erros.data_agendada}</p>}
                </div>

                <div>
                    <Label htmlFor="data_conclusao">Data de conclusao</Label>
                    <Input
                        id="data_conclusao"
                        type="date"
                        value={dados.data_conclusao}
                        onChange={(e) => handleChange('data_conclusao', e.target.value)}
                        disabled={carregando}
                        className={erros.dataValidadeCarta ? 'border-destructive' : ''}
                    />
                    {erros.data_conclusao && <p className="text-sm text-destructive mt-1">{erros.data_conclusao}</p>}
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
