'use client';

import React, { useState } from "react";
import { useRouter } from 'next/navigation';
import { PostoCombustivel } from '@/app/tipos/indices';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';

interface PropsFormularioPostoCombustivel {
  postoCombustivel?: PostoCombustivel;
  onSubmit: (postoCombustivel: PostoCombustivel) => void;
  carregando?: boolean;
}

export function FormularioPostoCombustivel({
  postoCombustivel,
  onSubmit,
  carregando = false
}: PropsFormularioPostoCombustivel) {

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

    if (!dados.gasolina || dados.gasolina <= 0) novosErros.gasolina = 'Preço inválido';
    if (!dados.gasoleo || dados.gasoleo <= 0) novosErros.gasoleo = 'Preço inválido';

    setErros(novosErros);
    return Object.keys(novosErros).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validarFormulario()) onSubmit(dados);
  };

  const handleChange = (campo: keyof PostoCombustivel, valor: any) => {
    setDados({ ...dados, [campo]: valor });

    if (erros[campo]) {
      setErros({ ...erros, [campo]: '' });
    }
  };

  const inputStyle = `
    h-12
    rounded-xl
    border-slate-200
    bg-slate-50
    text-sm
    shadow-none
    focus-visible:ring-2
    focus-visible:ring-blue-500/20
  `;

  return (
    <Card className="rounded-[28px] border border-slate-200 bg-white p-8 shadow-sm">

      <form onSubmit={handleSubmit} className="space-y-8">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Nome */}
          <div className="space-y-2">
            <Label className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Nome
            </Label>

            <Input
              value={dados.nome ?? ""}
              onChange={(e) => handleChange('nome', e.target.value)}
              disabled={carregando}
              className={inputStyle}
              placeholder="Ex: Sonangol"
            />
          </div>

          {/* Cidade */}
          <div className="space-y-2">
            <Label className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Cidade
            </Label>

            <Input
              value={dados.cidade ?? ""}
              onChange={(e) => handleChange('cidade', e.target.value)}
              disabled={carregando}
              className={inputStyle}
            />
          </div>

          {/* Província */}
          <div className="space-y-2">
            <Label className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Província
            </Label>

            <Input
              value={dados.provincia ?? ""}
              onChange={(e) => handleChange('provincia', e.target.value)}
              disabled={carregando}
              className={inputStyle}
            />
          </div>

          {/* Endereço */}
          <div className="space-y-2">
            <Label className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Endereço
            </Label>

            <Input
              value={dados.endereco ?? ""}
              onChange={(e) => handleChange('endereco', e.target.value)}
              disabled={carregando}
              className={inputStyle}
            />
          </div>

          {/* Gasolina */}
          <div className="space-y-2">
            <Label className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Gasolina (Kz)
            </Label>

            <Input
              type="number"
              value={dados.gasolina ?? ""}
              onChange={(e) => handleChange('gasolina', parseFloat(e.target.value))}
              disabled={carregando}
              className={`${inputStyle} ${erros.gasolina && 'border-red-500'}`}
            />

            {erros.gasolina && (
              <p className="text-xs text-red-500">{erros.gasolina}</p>
            )}
          </div>

          {/* Gasóleo */}
          <div className="space-y-2">
            <Label className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Gasóleo (Kz)
            </Label>

            <Input
              type="number"
              value={dados.gasoleo ?? ""}
              onChange={(e) => handleChange('gasoleo', parseFloat(e.target.value))}
              disabled={carregando}
              className={`${inputStyle} ${erros.gasoleo && 'border-red-500'}`}
            />

            {erros.gasoleo && (
              <p className="text-xs text-red-500">{erros.gasoleo}</p>
            )}
          </div>

          {/* Status */}
          <div className="space-y-2">
            <Label className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Status
            </Label>

            <Select
              value={dados.ativo ? "1" : "0"}
              onValueChange={(v) => handleChange('ativo', v === "1")}
            >
              <SelectTrigger className={inputStyle}>
                <SelectValue />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="1">Ativo</SelectItem>
                <SelectItem value="0">Inativo</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Telefone */}
          <div className="space-y-2">
            <Label className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Telefone
            </Label>

            <Input
              value={dados.telefone ?? ""}
              onChange={(e) => handleChange('telefone', e.target.value)}
              disabled={carregando}
              className={inputStyle}
            />
          </div>

        </div>

        {/* Botões */}
        <div className="flex justify-end gap-3 border-t border-slate-100 pt-6">

          <Button
            type="button"
            variant="outline"
            onClick={() => router.back()}
            className="rounded-xl"
          >
            Cancelar
          </Button>

          <Button
            type="submit"
            disabled={carregando}
            className="rounded-xl bg-blue-600 hover:bg-blue-700 px-6"
          >
            {carregando ? 'Salvando...' : 'Salvar'}
          </Button>

        </div>

      </form>
    </Card>
  );
}



// import React from "react"

// import { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { PostoCombustivel } from '@/app/tipos/indices';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// interface PropsFormularioPostoCombustivel {
//     postoCombustivel?: PostoCombustivel;
//     onSubmit: (postoCombustivel: PostoCombustivel) => void;
//     carregando?: boolean;
// }

// export function FormularioPostoCombustivel({ postoCombustivel, onSubmit, carregando = false }: PropsFormularioPostoCombustivel) {
//     const router = useRouter();
//     const [dados, setDados] = useState<PostoCombustivel>(
//         postoCombustivel || {
//             id: Date.now().toString(),
//             nome: '',
//             endereco: '',
//             cidade: '',
//             provincia: '',
//             telefone: '',
//             precoCombustivel: 0,
//             gasolina: 0,
//             gasoleo: 0,
//             dataCadastro: '',
//             ativo: true,
//         }
//     );

//     const [erros, setErros] = useState<Record<string, string>>({});

//     const validarFormulario = () => {
//         const novosErros: Record<string, string> = {};

//         if (!dados.gasolina || dados.gasolina <= 0) novosErros.gasolina = 'Preço invalido';
//         if (!dados.gasoleo || dados.gasoleo <= 0) novosErros.diesel = 'Preço invalido';
        

//         setErros(novosErros);
//         return Object.keys(novosErros).length === 0;
//     }

//     const handleSubmit = (e: React.FormEvent) => {
//         e.preventDefault();

//         if (validarFormulario()) {
//             onSubmit(dados);
//         }
//     };

//     const handleChange = (campo: keyof PostoCombustivel, valor: any) => {
//         setDados({ ...dados, [campo]: valor });
//         if (erros[campo]) {
//             setErros({ ...erros, [campo]: '' });
//         }
//     };

//     return (
//         <form onSubmit={handleSubmit} className="space-y-6">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 {/* Motorsta */}
//                 <div>
//                     <Label htmlFor="nome">Nome</Label>
//                     <Input
//                         id="nome"
//                         type="text"
//                         value={dados.nome}
//                         onChange={(e) => handleChange('nome', e.target.value)}
//                         disabled={carregando}
//                         placeholder="Ex: Sonangol"
//                         className={erros.motoristaId ? 'border-destructive' : ''}
//                     />
//                     {erros.placa && <p className="text-sm text-destructive mt-1">{erros.nome}</p>}
//                 </div>

//                 {/* Veiculo */}
//                 <div>
//                     <Label htmlFor="cidade">Cidade</Label>
//                     <Input
//                         id="cidade"
//                         type="text"
//                         value={dados.cidade}
//                         onChange={(e) => handleChange('cidade', e.target.value)}
//                         disabled={carregando}
//                         className={erros.marca ? 'border-destructive' : ''}
//                     />
//                     {erros.marca && <p className="text-sm text-destructive mt-1">{erros.cidade}</p>}
//                 </div>
//                 {/* Data de Início */}
//                 <div>
//                     <Label htmlFor="provincia">Provincia</Label>
//                     <Input
//                         id="provincia"
//                         type="text"
//                         value={dados.provincia}
//                         onChange={(e) => handleChange('precoCombustivel', e.target.value)}
//                         disabled={carregando}
//                     />
//                 </div>

//                 {/* Data de Início */}
//                 <div>
//                     <Label htmlFor="endereco">Endereço</Label>
//                     <Input
//                         id="endereco"
//                         type="text"
//                         value={dados.endereco}
//                         onChange={(e) => handleChange('endereco', e.target.value)}
//                         disabled={carregando}
//                     />
//                 </div>

//                 <div>
//                     <Label htmlFor="gasolina">Gasolina (Kz)</Label>
//                     <Input
//                     type="number"
//                         id="gasolina"
//                         min={1}
//                         value={dados.gasolina}
//                         onChange={(e) => handleChange('gasolina', e.target.value)}
//                         disabled={carregando}
//                         placeholder="Ex: Cabinda"
//                         className={erros.gasolina ? 'border-destructive' : ''}
//                     />
//                     {erros.placa && <p className="text-sm text-destructive mt-1">{erros.gasolina}</p>}
//                 </div>

//                 <div>
//                     <Label htmlFor="etanol">Gasóleo (Kz)</Label>
//                     <Input
//                     type="number"
//                         id="gasoleo"
//                         min={1}
//                         value={dados.gasoleo}
//                         onChange={(e) => handleChange('gasoleo', e.target.value)}
//                         disabled={carregando}
//                         placeholder=""
//                         className={erros.gasoleo ? 'border-destructive' : ''}
//                     />
//                     {erros.etanol && <p className="text-sm text-destructive mt-1">{erros.gasoleo}</p>}
//                 </div>

//                 <div>
//                     <Label htmlFor="status">Status</Label>
//                     <Select value={dados.ativo.toString()} onValueChange={(valor) => handleChange('ativo', parseInt(valor))} disabled={carregando}>
//                         <SelectTrigger>
//                             <SelectValue />
//                         </SelectTrigger>
//                         <SelectContent>
//                             <SelectItem value="1">Ativo</SelectItem>
//                             <SelectItem value="0">Inativo</SelectItem>
//                         </SelectContent>
//                     </Select>
//                 </div>

//                 <div>
//                     <Label htmlFor="telefone">Telefone </Label>
//                     <Input
//                         id="telefone"
//                         type="tel"
//                         value={dados.telefone}
//                         onChange={(e) => handleChange('telefone', e.target.value)}
//                         disabled={carregando}
//                         className={erros.ano ? 'border-destructive' : ''}
//                     />
//                     {erros.telefone && <p className="text-sm text-destructive mt-1">{erros.telefone}</p>}
//                 </div>
//             </div>

//             <div className="flex gap-3 justify-end pt-4 border-t border-border">
//                 <Button
//                     type="button"
//                     variant="outline"
//                     onClick={() => router.back()}
//                     disabled={carregando}
//                 >
//                     Cancelar
//                 </Button>
//                 <Button type="submit" disabled={carregando}>
//                     {carregando ? 'Salvando...' : 'Salvar'}
//                 </Button>
//             </div>
//         </form>
//     )
// }