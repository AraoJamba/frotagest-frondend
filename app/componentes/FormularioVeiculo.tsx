'use client';

import React, { useState } from "react";
import { useRouter } from 'next/navigation';
import { Veiculo } from '@/app/tipos/indices';

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

interface PropsFormularioVeiculo {
  veiculo?: Veiculo;
  onSubmit: (veiculo: Veiculo) => void;
  carregando?: boolean;
}

export function FormularioVeiculo({
  veiculo,
  onSubmit,
  carregando = false
}: PropsFormularioVeiculo) {

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

    if (!/^[A-HJ-NPR-Z0-9]{17}$/.test(dados.VIN)) novosErros.VIN = 'VIN inválido';
    if (!dados.modelo.trim()) novosErros.modelo = 'Modelo obrigatório';
    if (!dados.marca.trim()) novosErros.marca = 'Marca obrigatória';
    if (!dados.ano || dados.ano < 1900 || dados.ano > new Date().getFullYear()) novosErros.ano = 'Ano inválido';
    if (!/^[A-Z]{2,3}-\d{2}-\d{2}-[A-Z]{2}$/.test(dados.placa)) novosErros.placa = 'Placa inválida';
    if (dados.capacidadeCarga <= 0) novosErros.capacidadeCarga = 'Capacidade > 0';
    if (dados.consumoMedio <= 0) novosErros.consumoMedio = 'Consumo > 0';

    setErros(novosErros);
    return Object.keys(novosErros).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validarFormulario()) onSubmit(dados);
  };

  const handleChange = (campo: keyof Veiculo, valor: any) => {
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

          {/* Placa */}
          <div className="space-y-2">
            <Label className="text-xs font-bold uppercase text-slate-500">
              Placa
            </Label>

            <Input
              value={dados.placa ?? ""}
              onChange={(e) => handleChange('placa', e.target.value.toUpperCase())}
              disabled={carregando}
              placeholder="LD-00-00-XX"
              className={`${inputStyle} ${erros.placa && 'border-red-500'}`}
            />

            {erros.placa && <p className="text-xs text-red-500">{erros.placa}</p>}
          </div>

          {/* Marca */}
          <div className="space-y-2">
            <Label className="text-xs font-bold uppercase text-slate-500">
              Marca
            </Label>

            <Input
              value={dados.marca ?? ""}
              onChange={(e) => handleChange('marca', e.target.value)}
              disabled={carregando}
              className={`${inputStyle} ${erros.marca && 'border-red-500'}`}
            />

            {erros.marca && <p className="text-xs text-red-500">{erros.marca}</p>}
          </div>

          {/* Modelo */}
          <div className="space-y-2">
            <Label className="text-xs font-bold uppercase text-slate-500">
              Modelo
            </Label>

            <Input
              value={dados.modelo ?? ""}
              onChange={(e) => handleChange('modelo', e.target.value)}
              disabled={carregando}
              className={`${inputStyle} ${erros.modelo && 'border-red-500'}`}
            />

            {erros.modelo && <p className="text-xs text-red-500">{erros.modelo}</p>}
          </div>

          {/* Ano */}
          <div className="space-y-2">
            <Label className="text-xs font-bold uppercase text-slate-500">
              Ano
            </Label>

            <Input
              type="number"
              value={dados.ano ?? ""}
              onChange={(e) => handleChange('ano', parseInt(e.target.value) || 0)}
              disabled={carregando}
              className={`${inputStyle} ${erros.ano && 'border-red-500'}`}
            />

            {erros.ano && <p className="text-xs text-red-500">{erros.ano}</p>}
          </div>

          {/* VIN */}
          <div className="space-y-2 md:col-span-2">
            <Label className="text-xs font-bold uppercase text-slate-500">
              VIN
            </Label>

            <Input
              value={dados.VIN ?? ""}
              onChange={(e) => handleChange('VIN', e.target.value.toUpperCase())}
              disabled={carregando}
              className={`${inputStyle} ${erros.VIN && 'border-red-500'}`}
            />

            {erros.VIN && <p className="text-xs text-red-500">{erros.VIN}</p>}
          </div>

          {/* Tipo */}
          <div className="space-y-2">
            <Label className="text-xs font-bold uppercase text-slate-500">
              Tipo
            </Label>

            <Select value={dados.tipo} onValueChange={(v) => handleChange('tipo', v)}>
              <SelectTrigger className={inputStyle}>
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
          <div className="space-y-2">
            <Label className="text-xs font-bold uppercase text-slate-500">
              Combustível
            </Label>

            <Select value={dados.combustivel} onValueChange={(v) => handleChange('combustivel', v)}>
              <SelectTrigger className={inputStyle}>
                <SelectValue />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="gasolina">Gasolina</SelectItem>
                <SelectItem value="diesel">Diesel</SelectItem>
                <SelectItem value="etanol">Etanol</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Capacidade */}
          <div className="space-y-2">
            <Label className="text-xs font-bold uppercase text-slate-500">
              Capacidade (kg)
            </Label>

            <Input
              type="number"
              value={dados.capacidadeCarga ?? ""}
              onChange={(e) => handleChange('capacidadeCarga', parseInt(e.target.value) || 0)}
              disabled={carregando}
              className={`${inputStyle} ${erros.capacidadeCarga && 'border-red-500'}`}
            />

            {erros.capacidadeCarga && <p className="text-xs text-red-500">{erros.capacidadeCarga}</p>}
          </div>

          {/* Consumo */}
          <div className="space-y-2">
            <Label className="text-xs font-bold uppercase text-slate-500">
              Consumo (km/L)
            </Label>

            <Input
              type="number"
              step="0.1"
              value={dados.consumoMedio ?? ""}
              onChange={(e) => handleChange('consumoMedio', parseFloat(e.target.value) || 0)}
              disabled={carregando}
              className={`${inputStyle} ${erros.consumoMedio && 'border-red-500'}`}
            />

            {erros.consumoMedio && <p className="text-xs text-red-500">{erros.consumoMedio}</p>}
          </div>

          {/* Última revisão */}
          <div className="space-y-2">
            <Label className="text-xs font-bold uppercase text-slate-500">
              Última Revisão
            </Label>

            <Input
              type="date"
              value={dados.ultimaRevista ?? ""}
              onChange={(e) => handleChange('ultimaRevista', e.target.value)}
              disabled={carregando}
              className={inputStyle}
            />
          </div>

          {/* Status */}
          <div className="space-y-2">
            <Label className="text-xs font-bold uppercase text-slate-500">
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




// 'use client';

// import React from "react"

// import { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { Veiculo } from '@/app/tipos/indices';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { Card } from '@/components/ui/card';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// interface PropsFormularioVeiculo {
//   veiculo?: Veiculo;
//   onSubmit: (veiculo: Veiculo) => void;
//   carregando?: boolean;
// }

// export function FormularioVeiculo({ veiculo, onSubmit, carregando = false }: PropsFormularioVeiculo) {
//   const router = useRouter();
//   const [dados, setDados] = useState<Veiculo>(
//     veiculo || {
//       id: Date.now().toString(),
//       placa: '',
//       modelo: '',
//       marca: '',
//       ano: new Date().getFullYear(),
//       VIN: '',
//       tipo: 'leve',
//       capacidadeCarga: 0,
//       dataCadastro: new Date().toISOString().split('T')[0],
//       ativo: true,
//       combustivel: 'diesel',
//       consumoMedio: 0,
//       ultimaRevista: new Date().toISOString().split('T')[0],
//     }
//   );

//   const [erros, setErros] = useState<Record<string, string>>({});

//   const validarFormulario = () => {
//     const novosErros: Record<string, string> = {};

//     if (!/^[A-HJ-NPR-Z0-9]{17}$/.test(dados.VIN)) novosErros.VIN = 'VIN (Número de Identificação de Veículo) inválido';
//     if (!dados.modelo.trim()) novosErros.modelo = 'Modelo é obrigatório';
//     if (!dados.marca.trim()) novosErros.marca = 'Marca é obrigatória';
//     if (!dados.ano || dados.ano < 1900 || dados.ano > new Date().getFullYear()) novosErros.ano = 'Ano inválido';
//     if (!/^[A-Z]{2,3}-\d{2}-\d{2}-[A-Z]{2}$/.test(dados.placa)) novosErros.placa = 'Nº da Placa inválida';
//     if (dados.capacidadeCarga <= 0) novosErros.capacidadeCarga = 'Capacidade deve ser maior que 0';
//     if (dados.consumoMedio <= 0) novosErros.consumoMedio = 'Consumo deve ser maior que 0';

//     setErros(novosErros);
//     return Object.keys(novosErros).length === 0;
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();

//     if (validarFormulario()) {
//       onSubmit(dados);
//     }
//   };

//   const handleChange = (campo: keyof Veiculo, valor: any) => {
//     setDados({ ...dados, [campo]: valor });
//     if (erros[campo]) {
//       setErros({ ...erros, [campo]: '' });
//     }
//   };

//   return (
//     <Card className="p-6">
//       <form onSubmit={handleSubmit} className="space-y-6">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           {/* Placa */}
//           <div>
//             <Label htmlFor="placa">Placa</Label>
//             <Input
//               id="placa"
//               value={dados.placa.toUpperCase()}
//               onChange={(e) => handleChange('placa', e.target.value)}
//               disabled={carregando}
//               placeholder="LD-00-00-XX"
//               className={erros.placa ? 'border-destructive' : ''}
//             />
//             {erros.placa && <p className="text-sm text-destructive mt-1">{erros.placa}</p>}
//           </div>

//           {/* Marca */}
//           <div>
//             <Label htmlFor="marca">Marca</Label>
//             <Input
//               id="marca"
//               value={dados.marca}
//               onChange={(e) => handleChange('marca', e.target.value)}
//               disabled={carregando}
//               className={erros.marca ? 'border-destructive' : ''}
//             />
//             {erros.marca && <p className="text-sm text-destructive mt-1">{erros.marca}</p>}
//           </div>

//           {/* Modelo */}
//           <div>
//             <Label htmlFor="modelo">Modelo</Label>
//             <Input
//               id="modelo"
//               value={dados.modelo}
//               onChange={(e) => handleChange('modelo', e.target.value)}
//               disabled={carregando}
//               className={erros.modelo ? 'border-destructive' : ''}
//             />
//             {erros.modelo && <p className="text-sm text-destructive mt-1">{erros.modelo}</p>}
//           </div>

//           {/* Ano */}
//           <div>
//             <Label htmlFor="ano">Ano</Label>
//             <Input
//               id="ano"
//               type="number"
//               value={dados.ano}
//               onChange={(e) => handleChange('ano', parseInt(e.target.value))}
//               disabled={carregando}
//               className={erros.ano ? 'border-destructive' : ''}
//             />
//             {erros.ano && <p className="text-sm text-destructive mt-1">{erros.ano}</p>}
//           </div>

//           {/* VIN (Número de Identificação de Veículo) */}
//           <div>
//             <Label htmlFor="vin">VIN (Número de Identificação de Veículo)</Label>
//             <Input
//               id="vin"
//               value={dados.VIN}
//               onChange={(e) => handleChange('VIN', e.target.value)}
//               disabled={carregando}
//               className={erros.vin ? 'border-destructive' : ''}
//             />
//             {erros.VIN && <p className="text-sm text-destructive mt-1">{erros.VIN}</p>}
//           </div>

//           {/* Tipo */}
//           <div>
//             <Label htmlFor="tipo">Tipo de Veículo</Label>
//             <Select value={dados.tipo} onValueChange={(valor) => handleChange('tipo', valor)} disabled={carregando}>
//               <SelectTrigger>
//                 <SelectValue />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="leve">Leve</SelectItem>
//                 <SelectItem value="medio">Médio</SelectItem>
//                 <SelectItem value="pesado">Pesado</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>

//           {/* Combustível */}
//           <div>
//             <Label htmlFor="combustivel">Combustível</Label>
//             <Select value={dados.combustivel} onValueChange={(valor) => handleChange('combustivel', valor)} disabled={carregando}>
//               <SelectTrigger>
//                 <SelectValue />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="gasolina">Gasolina</SelectItem>
//                 <SelectItem value="diesel">Diesel</SelectItem>
//                 <SelectItem value="etanol">Etanol</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>

//           {/* Capacidade de Carga */}
//           <div>
//             <Label htmlFor="capacidadeCarga">Capacidade de Carga (kg)</Label>
//             <Input
//               id="capacidadeCarga"
//               type="number"
//               value={dados.capacidadeCarga}
//               onChange={(e) => handleChange('capacidadeCarga', parseInt(e.target.value))}
//               disabled={carregando}
//               className={erros.capacidadeCarga ? 'border-destructive' : ''}
//             />
//             {erros.capacidadeCarga && <p className="text-sm text-destructive mt-1">{erros.capacidadeCarga}</p>}
//           </div>

//           {/* Consumo Médio */}
//           <div>
//             <Label htmlFor="consumoMedio">Consumo Médio (km/L)</Label>
//             <Input
//               id="consumoMedio"
//               type="number"
//               step="0.1"
//               value={dados.consumoMedio}
//               onChange={(e) => handleChange('consumoMedio', parseFloat(e.target.value))}
//               disabled={carregando}
//               className={erros.consumoMedio ? 'border-destructive' : ''}
//             />
//             {erros.consumoMedio && <p className="text-sm text-destructive mt-1">{erros.consumoMedio}</p>}
//           </div>

//           {/* Última Revista */}
//           <div>
//             <Label htmlFor="ultimaRevista">Última Revista</Label>
//             <Input
//               id="ultimaRevista"
//               type="date"
//               value={dados.ultimaRevista}
//               onChange={(e) => handleChange('ultimaRevista', e.target.value)}
//               disabled={carregando}
//             />
//           </div>

//           {/* Status */}
//           <div>
//             <Label htmlFor="ativo">Status</Label>
//             <Select value={dados.ativo ? 'ativo' : 'inativo'} onValueChange={(valor) => handleChange('ativo', valor === 'ativo')} disabled={carregando}>
//               <SelectTrigger>
//                 <SelectValue />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="ativo">Ativo</SelectItem>
//                 <SelectItem value="inativo">Inativo</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>
//         </div>

//         {/* Botões */}
//         <div className="flex gap-3 justify-end pt-4 border-t border-border">
//           <Button
//             type="button"
//             variant="outline"
//             onClick={() => router.back()}
//             disabled={carregando}
//           >
//             Cancelar
//           </Button>
//           <Button type="submit" disabled={carregando}>
//             {carregando ? 'Salvando...' : 'Salvar'}
//           </Button>
//         </div>
//       </form>
//     </Card>
//   );
// }
