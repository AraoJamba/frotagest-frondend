import React from "react"

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { PostoCombustivel } from '@/app/tipos/indices';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface PropsFormularioPostoCombustivel {
    postoCombustivel?: PostoCombustivel;
    onSubmit: (postoCombustivel: PostoCombustivel) => void;
    carregando?: boolean;
}

export function FormularioPostoCombustivel({ postoCombustivel, onSubmit, carregando = false }: PropsFormularioPostoCombustivel) {
    const router = useRouter();
    const [dados, setDados] = useState<PostoCombustivel>(
        postoCombustivel || {
            id: Date.now().toString(),
            nome: '',
            endereco: '',
            cidade: '',
            provincia: '',
            telefone: '',
            precoCombustivel: 0,
            gasolina: 0,
            gasoleo: 0,
            dataCadastro: '',
            ativo: true,
        }
    );

    const [erros, setErros] = useState<Record<string, string>>({});

    const validarFormulario = () => {
        const novosErros: Record<string, string> = {};

        if (!dados.gasolina || dados.gasolina <= 0) novosErros.gasolina = 'Preço invalido';
        if (!dados.gasoleo || dados.gasoleo <= 0) novosErros.diesel = 'Preço invalido';
        

        setErros(novosErros);
        return Object.keys(novosErros).length === 0;
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (validarFormulario()) {
            onSubmit(dados);
        }
    };

    const handleChange = (campo: keyof PostoCombustivel, valor: any) => {
        setDados({ ...dados, [campo]: valor });
        if (erros[campo]) {
            setErros({ ...erros, [campo]: '' });
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Motorsta */}
                <div>
                    <Label htmlFor="nome">Nome</Label>
                    <Input
                        id="nome"
                        type="text"
                        value={dados.nome}
                        onChange={(e) => handleChange('nome', e.target.value)}
                        disabled={carregando}
                        placeholder="Ex: Sonangol"
                        className={erros.motoristaId ? 'border-destructive' : ''}
                    />
                    {erros.placa && <p className="text-sm text-destructive mt-1">{erros.nome}</p>}
                </div>

                {/* Veiculo */}
                <div>
                    <Label htmlFor="cidade">Cidade</Label>
                    <Input
                        id="cidade"
                        type="text"
                        value={dados.cidade}
                        onChange={(e) => handleChange('cidade', e.target.value)}
                        disabled={carregando}
                        className={erros.marca ? 'border-destructive' : ''}
                    />
                    {erros.marca && <p className="text-sm text-destructive mt-1">{erros.cidade}</p>}
                </div>
                {/* Data de Início */}
                <div>
                    <Label htmlFor="provincia">Provincia</Label>
                    <Input
                        id="provincia"
                        type="text"
                        value={dados.provincia}
                        onChange={(e) => handleChange('precoCombustivel', e.target.value)}
                        disabled={carregando}
                    />
                </div>

                {/* Data de Início */}
                <div>
                    <Label htmlFor="endereco">Endereço</Label>
                    <Input
                        id="endereco"
                        type="text"
                        value={dados.endereco}
                        onChange={(e) => handleChange('endereco', e.target.value)}
                        disabled={carregando}
                    />
                </div>

                <div>
                    <Label htmlFor="gasolina">Gasolina (Kz)</Label>
                    <Input
                    type="number"
                        id="gasolina"
                        min={1}
                        value={dados.gasolina}
                        onChange={(e) => handleChange('gasolina', e.target.value)}
                        disabled={carregando}
                        placeholder="Ex: Cabinda"
                        className={erros.gasolina ? 'border-destructive' : ''}
                    />
                    {erros.placa && <p className="text-sm text-destructive mt-1">{erros.gasolina}</p>}
                </div>

                <div>
                    <Label htmlFor="etanol">Gasóleo (Kz)</Label>
                    <Input
                    type="number"
                        id="gasoleo"
                        min={1}
                        value={dados.gasoleo}
                        onChange={(e) => handleChange('gasoleo', e.target.value)}
                        disabled={carregando}
                        placeholder=""
                        className={erros.gasoleo ? 'border-destructive' : ''}
                    />
                    {erros.etanol && <p className="text-sm text-destructive mt-1">{erros.gasoleo}</p>}
                </div>

                <div>
                    <Label htmlFor="status">Status</Label>
                    <Select value={dados.ativo.toString()} onValueChange={(valor) => handleChange('ativo', parseInt(valor))} disabled={carregando}>
                        <SelectTrigger>
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="1">Ativo</SelectItem>
                            <SelectItem value="0">Inativo</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div>
                    <Label htmlFor="telefone">Telefone </Label>
                    <Input
                        id="telefone"
                        type="tel"
                        value={dados.telefone}
                        onChange={(e) => handleChange('telefone', e.target.value)}
                        disabled={carregando}
                        className={erros.ano ? 'border-destructive' : ''}
                    />
                    {erros.telefone && <p className="text-sm text-destructive mt-1">{erros.telefone}</p>}
                </div>
            </div>

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
    )
}