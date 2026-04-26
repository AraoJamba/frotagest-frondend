import React from "react"

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Despesa } from '@/app/tipos/indices';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from "@/components/ui/textarea";

interface PropsFormularioDespesa {
    lembrete?: Despesa;
    onSubmit: (Despesa: Despesa) => void;
    carregando?: boolean;
}

export function FormularioDespesa({ lembrete, onSubmit, carregando = false }: PropsFormularioDespesa) {
    const router = useRouter();
    const [dados, setDados] = useState<Despesa>(
        lembrete || {
            id: Date.now().toString(),
            descricao: '',
            tipo: 'manutencao',
            data: '',
            veiculo_id: '',
            motorista_id: '',
            valor: 0,
            pago: '0',
            recibo: '',
        }
    );

    const [erros, setErros] = useState<Record<string, string>>({});

    const validarFormulario = () => {
        const novosErros: Record<string, string> = {};

        if (!dados.data || dados.data == '') novosErros.dataAgendada = 'Data obrigatório';
        if (!dados.tipo || dados.tipo == null) novosErros.titulo = 'Tipo invalido';
        if (!dados.veiculo_id || dados.veiculo_id == '') novosErros.veiculo_id = 'Veículo invalido';
        if (!dados.valor || dados.valor <= 0 ) novosErros.valor = 'Valor invalido';

        setErros(novosErros);
        return Object.keys(novosErros).length === 0;
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (validarFormulario()) {
            onSubmit(dados);
        }
    };

    const handleChange = (campo: keyof Despesa, valor: any) => {
        setDados({ ...dados, [campo]: valor });
        if (erros[campo]) {
            setErros({ ...erros, [campo]: '' });
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                {/* Tipo */}
                <div>
                    <Label htmlFor="status">Tipo</Label>
                    <Select value={dados.tipo} onValueChange={(valor) => handleChange('tipo', valor)} disabled={carregando}>
                        <SelectTrigger>
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="manutencao">Manutenção</SelectItem>
                            <SelectItem value="combustivel">Combustivel</SelectItem>
                            <SelectItem value="pneu">Pneu</SelectItem>
                            <SelectItem value="seguro">Seguro</SelectItem>
                            <SelectItem value="lavagem">Lavagem</SelectItem>
                            <SelectItem value="outro">Outro</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {/* Titulo */}
                <div>
                    <Label htmlFor="valor">Valor do custo da despesa (Kz)</Label>
                    <Input
                        id="valor"
                        type="number"
                        value={dados.valor}
                        onChange={(e) => handleChange('valor', e.target.value)}
                        disabled={carregando}
                        placeholder=""
                        className={erros.valor ? 'border-destructive' : ''}
                    />
                    {erros.valor && <p className="text-sm text-destructive mt-1">{erros.valor}</p>}
                </div>

                {/* Pago */}
                <div>
                    <Label htmlFor="status">Pago</Label>
                    <Select value={dados.pago} onValueChange={(valor) => handleChange('pago', valor)} disabled={carregando}>
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
                        value={dados.motorista_id}
                        onChange={(e) => handleChange('motorista_id', e.target.value)}
                        disabled={carregando}
                        className={erros.ano ? 'border-destructive' : ''}
                    />
                    {erros.motorista_id && <p className="text-sm text-destructive mt-1">{erros.motorista_id}</p>}
                </div>

                {/* veiculoId */}
                <div>
                    <Label htmlFor="veiculoId">Veiculo </Label>
                    <Input
                        id="veiculoId"
                        type="tel"
                        value={dados.veiculo_id}
                        onChange={(e) => handleChange('veiculo_id', e.target.value)}
                        disabled={carregando}
                        className={erros.ano ? 'border-destructive' : ''}
                    />
                    {erros.veiculo_id && <p className="text-sm text-destructive mt-1">{erros.veiculo_id}</p>}
                </div>

                {/* Data */}
                <div>
                    <Label htmlFor="data">Data da despesa</Label>
                    <Input
                        id="data"
                        type="date"
                        value={dados.data}
                        onChange={(e) => handleChange('data', e.target.value)}
                        disabled={carregando}
                        placeholder=""
                        className={erros.dataAgendada ? 'border-destructive' : ''}
                    />
                    {erros.data && <p className="text-sm text-destructive mt-1">{erros.data}</p>}
                </div>
            </div>

            {/* recibo */}
            <div>
                <Label htmlFor="recibo">Recibo</Label>
                <Input
                    id="recibo"
                    type="text"
                    value={dados.recibo}
                    onChange={(e) => handleChange('recibo', e.target.value)}
                    disabled={carregando}
                    placeholder=""
                    className={erros.recibo ? 'border-destructive' : ''}
                />
                {erros.recibo && <p className="text-sm text-destructive mt-1">{erros.recibo}</p>}
            </div>

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

      {/* Botões */ }
    < div className="w-[80%] flex gap-3 justify-end pt-4 bottom-5 fixed border-t border-border" >
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