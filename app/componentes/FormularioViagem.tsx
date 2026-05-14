'use client';

import React, { useState } from "react";
import { useRouter } from 'next/navigation';
import { useDados } from "../contexto/DadosContexto";
import { Viagem } from '@/app/tipos/indices';

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

interface PropsFormularioViagem {
  viagem?: Viagem;
  onSubmit: (viagem: Viagem) => void;
  carregando?: boolean;
}

export function FormularioViagem({
  viagem,
  onSubmit,
  carregando = false
}: PropsFormularioViagem) {

  const { motoristas, veiculos } = useDados();
  const router = useRouter();

  const [dados, setDados] = useState<Viagem>(
    viagem || {
      id: Date.now().toString(),
      motoristaId: '',
      veiculoId: '',
      dataInicio: '',
      dataFim: '',
      localPartida: '',
      localDestino: '',
      distancia: 0,
      status: 'planejada',
      combustivelGasto: 0,
      custoViagem: 0,
      observacoes: '',
    }
  );

  const [erros, setErros] = useState<Record<string, string>>({});

  const validarFormulario = () => {
    const novosErros: Record<string, string> = {};

    if (!dados.dataInicio) novosErros.dataInicio = 'Data obrigatória';
    if (!dados.localPartida.trim()) novosErros.localPartida = 'Obrigatório';
    if (!dados.localDestino.trim()) novosErros.localDestino = 'Obrigatório';
    if (dados.distancia <= 0) novosErros.distancia = 'Inválido';
    if (!dados.motoristaId) novosErros.motoristaId = 'Obrigatório';
    if (!dados.veiculoId) novosErros.veiculoId = 'Obrigatório';

    setErros(novosErros);
    return Object.keys(novosErros).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validarFormulario()) onSubmit(dados);
  };

  const handleChange = (campo: keyof Viagem, valor: any) => {
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

          {/* Motorista */}
          <div className="space-y-2">
            <Label className="text-xs font-bold uppercase text-slate-500">
              Motorista
            </Label>

            <Select
              value={dados.motoristaId || ""}
              onValueChange={(v) => handleChange('motoristaId', v)}
            >
              <SelectTrigger className={inputStyle}>
                <SelectValue placeholder="Selecionar motorista" />
              </SelectTrigger>

              <SelectContent>
                {motoristas.map((m) => (
                  <SelectItem key={m.id} value={m.id}>
                    {m.nome}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {erros.motoristaId && <p className="text-xs text-red-500">{erros.motoristaId}</p>}
          </div>

          {/* Veículo */}
          <div className="space-y-2">
            <Label className="text-xs font-bold uppercase text-slate-500">
              Veículo
            </Label>

            <Select
              value={dados.veiculoId || ""}
              onValueChange={(v) => handleChange('veiculoId', v)}
            >
              <SelectTrigger className={inputStyle}>
                <SelectValue placeholder="Selecionar veículo" />
              </SelectTrigger>

              <SelectContent>
                {veiculos.map((v) => (
                  <SelectItem key={v.id} value={v.id}>
                    {v.marca} {v.modelo} ({v.placa})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {erros.veiculoId && <p className="text-xs text-red-500">{erros.veiculoId}</p>}
          </div>

          {/* Data início */}
          <div className="space-y-2">
            <Label className="text-xs font-bold uppercase text-slate-500">
              Data Início
            </Label>

            <Input
              type="date"
              value={dados.dataInicio ?? ""}
              onChange={(e) => handleChange('dataInicio', e.target.value)}
              className={`${inputStyle} ${erros.dataInicio && 'border-red-500'}`}
            />

            {erros.dataInicio && <p className="text-xs text-red-500">{erros.dataInicio}</p>}
          </div>

          {/* Data fim */}
          <div className="space-y-2">
            <Label className="text-xs font-bold uppercase text-slate-500">
              Data Fim
            </Label>

            <Input
              type="date"
              value={dados.dataFim ?? ""}
              onChange={(e) => handleChange('dataFim', e.target.value)}
              className={inputStyle}
            />
          </div>

          {/* Partida */}
          <div className="space-y-2">
            <Label className="text-xs font-bold uppercase text-slate-500">
              Local de Partida
            </Label>

            <Input
              value={dados.localPartida ?? ""}
              onChange={(e) => handleChange('localPartida', e.target.value)}
              className={`${inputStyle} ${erros.localPartida && 'border-red-500'}`}
            />

            {erros.localPartida && <p className="text-xs text-red-500">{erros.localPartida}</p>}
          </div>

          {/* Destino */}
          <div className="space-y-2">
            <Label className="text-xs font-bold uppercase text-slate-500">
              Local de Destino
            </Label>

            <Input
              value={dados.localDestino ?? ""}
              onChange={(e) => handleChange('localDestino', e.target.value)}
              className={`${inputStyle} ${erros.localDestino && 'border-red-500'}`}
            />

            {erros.localDestino && <p className="text-xs text-red-500">{erros.localDestino}</p>}
          </div>

          {/* Distância */}
          <div className="space-y-2">
            <Label className="text-xs font-bold uppercase text-slate-500">
              Distância (km)
            </Label>

            <Input
              type="number"
              value={dados.distancia ?? ""}
              onChange={(e) => handleChange('distancia', parseFloat(e.target.value) || 0)}
              className={`${inputStyle} ${erros.distancia && 'border-red-500'}`}
            />

            {erros.distancia && <p className="text-xs text-red-500">{erros.distancia}</p>}
          </div>

          {/* Status */}
          <div className="space-y-2">
            <Label className="text-xs font-bold uppercase text-slate-500">
              Status
            </Label>

            <Select
              value={dados.status}
              onValueChange={(v) => handleChange('status', v)}
            >
              <SelectTrigger className={inputStyle}>
                <SelectValue />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="planejada">Planejada</SelectItem>
                <SelectItem value="em_andamento">Em andamento</SelectItem>
                <SelectItem value="concluida">Concluída</SelectItem>
                <SelectItem value="cancelada">Cancelada</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Combustível */}
          <div className="space-y-2">
            <Label className="text-xs font-bold uppercase text-slate-500">
              Combustível (L)
            </Label>

            <Input
              type="number"
              value={dados.combustivelGasto ?? ""}
              onChange={(e) => handleChange('combustivelGasto', parseFloat(e.target.value) || 0)}
              className={inputStyle}
            />
          </div>

          {/* Custo */}
          <div className="space-y-2">
            <Label className="text-xs font-bold uppercase text-slate-500">
              Custo (Kz)
            </Label>

            <Input
              type="number"
              value={dados.custoViagem ?? ""}
              onChange={(e) => handleChange('custoViagem', parseFloat(e.target.value) || 0)}
              className={inputStyle}
            />
          </div>

          {/* Observações */}
          <div className="space-y-2 md:col-span-2">
            <Label className="text-xs font-bold uppercase text-slate-500">
              Observações
            </Label>

            <Input
              value={dados.observacoes ?? ""}
              onChange={(e) => handleChange('observacoes', e.target.value)}
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






// 'use client';

// import React from "react"

// import { useDados } from "../contexto/DadosContexto";

// import { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { Viagem } from '@/app/tipos/indices';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { Card } from '@/components/ui/card';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// interface PropsFormularioViagem {
//     viagem?: Viagem;
//     onSubmit: (viagem: Viagem) => void;
//     carregando?: boolean;
// }

// export function FormularioViagem({ viagem, onSubmit, carregando = false }: PropsFormularioViagem) {

//     const { motoristas, deletarMotorista } = useDados();
//     const { veiculos, deletarVeiculo } = useDados();

//     const motoristasFiltrados = motoristas.filter(m =>
//         m.nome.toLowerCase() ||
//         m.email.toLowerCase() ||
//         m.numeroCarta
//     );

//     const veiculosFiltrados = veiculos?.filter(v =>
//         v.marca.toLowerCase().includes('') ||
//         v.modelo.toLowerCase().includes('') ||
//         v.placa.toLowerCase().includes('')
//     ) || [];



//     const router = useRouter();
//     const [dados, setDados] = useState<Viagem>(
//         viagem || {
//             id: Date.now().toString(),
//             motoristaId: '',
//             veiculoId: '',
//             dataInicio: '',
//             dataFim: '',
//             localPartida: '',
//             localDestino: '',
//             distancia: 0, // km
//             status: 'planejada',
//             combustivelGasto: 0,
//             custoViagem: 0,
//             observacoes: '',
//         }
//     );

//     const [erros, setErros] = useState<Record<string, string>>({});

//     const validarFormulario = () => {
//         const novosErros: Record<string, string> = {};

//         if (!/^\d{4}-\d{2}-\d{2}$/.test(dados.dataInicio)) novosErros.dataInicio = 'Data de Inicio inválido';

//         if (!/^[A-Za-zÀ-ÿ\s]+$/.test(dados.localDestino)) novosErros.localDestino = 'Local de Destino inválido';
//         if (!/^[A-Za-zÀ-ÿ\s]+$/.test(dados.localPartida)) novosErros.localPartida = 'Local de Partida inválido';

//         if (!dados.distancia || dados.distancia < 0) novosErros.distancia = 'Distancia inválida';
//         if (!dados.motoristaId || dados.motoristaId == '') novosErros.motoristaId = 'Motorista obrigatório';
//         if (!dados.veiculoId || dados.veiculoId == '') novosErros.veiculoId = 'Veículo obrigatório';

//         setErros(novosErros);
//         return Object.keys(novosErros).length === 0;
//     }

//     const handleSubmit = (e: React.FormEvent) => {
//         e.preventDefault();

//         if (validarFormulario()) {
//             onSubmit(dados);
//         }
//     };

//     const handleChange = (campo: keyof Viagem, valor: any) => {
//         setDados({ ...dados, [campo]: valor });
//         if (erros[campo]) {
//             setErros({ ...erros, [campo]: '' });
//         }
//     };

//     return (
//         <Card className="p-6">
//             <form onSubmit={handleSubmit} className="space-y-6">
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     {/* Motorsta */}
//                     <div>
//                         <Label htmlFor="motorista">Status</Label>
//                         <Select value={dados.motoristaId} onValueChange={(valor) => handleChange('motoristaId', valor)} disabled={carregando}>
//                             <SelectTrigger>
//                                 <SelectValue />
//                             </SelectTrigger>
//                             <SelectContent>
//                                 <SelectItem disabled value="Selecione">Selecione um motorista</SelectItem>
//                                 {motoristasFiltrados.map((motorista) => (
//                                     <SelectItem key={motorista.id} value={motorista.id}>{motorista.nome}</SelectItem>
//                                 ))}
//                             </SelectContent>
//                         </Select>
//                         {erros.motoristaId && <p className="text-sm text-destructive mt-1">{erros.motoristaId}</p>}
//                     </div>

//                     {/* Veiculo */}
//                     <div>
//                         <Label htmlFor="veiculoId">Veiculo</Label>
//                         <Select value={dados.veiculoId} onValueChange={(valor) => handleChange('veiculoId', valor)} disabled={carregando}>
//                             <SelectTrigger>
//                                 <SelectValue />
//                             </SelectTrigger>
//                             <SelectContent>
//                                 <SelectItem disabled value="0">Selecione um veículo</SelectItem>
//                                 {veiculosFiltrados.map((veiculo) => (
//                                     <SelectItem key={veiculo.id} value={veiculo.id}>{veiculo.marca} {veiculo.modelo} ({veiculo.placa})</SelectItem>
//                                 ))}
//                             </SelectContent>
//                         </Select>
//                         {erros.veiculoId && <p className="text-sm text-destructive mt-1">{erros.veiculoId}</p>}
//                     </div>

//                     {/* Data de Início */}
//                     <div>
//                         <Label htmlFor="dataInicio">Data de Início</Label>
//                         <Input
//                             id="dataInicio"
//                             type="date"
//                             value={dados.dataInicio}
//                             onChange={(e) => handleChange('dataInicio', e.target.value)}
//                             disabled={carregando}
//                         />

//                         {erros.dataInicio && <p className="text-sm text-destructive mt-1">{erros.dataInicio}</p>}
//                     </div>

//                     {/* Data de Início */}
//                     <div>
//                         <Label htmlFor="dataFim">Data de Chegada</Label>
//                         <Input
//                             id="dataFim"
//                             type="date"
//                             value={dados.dataFim}
//                             onChange={(e) => handleChange('dataFim', e.target.value)}
//                             disabled={carregando}
//                         />
//                     </div>

//                     {/* local Partida */}
//                     <div>
//                         <Label htmlFor="localPartida">Local de Partida</Label>
//                         <Input
//                             id="localPartida"
//                             value={dados.localPartida}
//                             onChange={(e) => handleChange('localPartida', e.target.value)}
//                             disabled={carregando}
//                             placeholder="Ex: Cabinda"
//                             className={erros.localPartida ? 'border-destructive' : ''}
//                         />
//                         {erros.localPartida && <p className="text-sm text-destructive mt-1">{erros.localPartida}</p>}
//                     </div>

//                     {/* local Destino */}
//                     <div>
//                         <Label htmlFor="localDestino">Local de Destino</Label>
//                         <Input
//                             id="localDestino"
//                             value={dados.localDestino}
//                             onChange={(e) => handleChange('localDestino', e.target.value)}
//                             disabled={carregando}
//                             placeholder="Ex: Cunene"
//                             className={erros.localDestino ? 'border-destructive' : ''}
//                         />
//                         {erros.localDestino && <p className="text-sm text-destructive mt-1">{erros.localDestino}</p>}
//                     </div>

//                     {/* distancia */}
//                     <div>
//                         <Label htmlFor="distancia">Distância (Km)</Label>
//                         <Input
//                             id="distancia"
//                             type="number"
//                             value={dados.distancia}
//                             onChange={(e) => handleChange('distancia', parseInt(e.target.value))}
//                             disabled={carregando}
//                             className={erros.ano ? 'border-destructive' : ''}
//                         />
//                         {erros.distancia && <p className="text-sm text-destructive mt-1">{erros.distancia}</p>}
//                     </div>

//                     {/* Status */}
//                     <div>
//                         <Label htmlFor="status">Status</Label>
//                         <Select value={dados.status} onValueChange={(valor) => handleChange('status', valor)} disabled={carregando}>
//                             <SelectTrigger>
//                                 <SelectValue />
//                             </SelectTrigger>
//                             <SelectContent>
//                                 <SelectItem value="planejada">Planejada</SelectItem>
//                                 <SelectItem value="emAndamento">Em Andamento</SelectItem>
//                                 <SelectItem value="pesado">Concluída</SelectItem>
//                                 <SelectItem value="cancelada">Cancelada</SelectItem>
//                             </SelectContent>
//                         </Select>
//                     </div>

//                     {/* combustivelGasto */}
//                     <div>
//                         <Label htmlFor="distancia">Combustivel Gasto (Litros)</Label>
//                         <Input
//                             id="combustivelGasto"
//                             type="number"
//                             value={dados.combustivelGasto}
//                             onChange={(e) => handleChange('combustivelGasto', parseInt(e.target.value))}
//                             disabled={carregando}
//                             className={erros.ano ? 'border-destructive' : ''}
//                         />
//                         {erros.combustivelGasto && <p className="text-sm text-destructive mt-1">{erros.combustivelGasto}</p>}
//                     </div>

//                     {/* combustivelGasto */}
//                     <div>
//                         <Label htmlFor="custoViagem">Custo da Viagem (Kz)</Label>
//                         <Input
//                             id="custoViagem"
//                             type="number"
//                             value={dados.custoViagem}   // ✅ CERTO
//                             onChange={(e) => handleChange('custoViagem', parseInt(e.target.value))}
//                             disabled={carregando}
//                             className={erros.custoViagem ? 'border-destructive' : ''}
//                         />

//                         {erros.custoViagem && <p className="text-sm text-destructive mt-1">{erros.custoViagem}</p>}
//                     </div>

//                     {/* observacoes */}
//                     <div>
//                         <Label htmlFor="observacoes">Observações</Label>
//                         <Input
//                             id="observacoes"
//                             type="text"
//                             value={dados.observacoes}
//                             onChange={(e) => handleChange('observacoes', e.target.value)}
//                             disabled={carregando}
//                             className={erros.observacoes ? 'border-destructive' : ''}
//                         />
//                         {erros.observacoes && <p className="text-sm text-destructive mt-1">{erros.observacoes}</p>}
//                     </div>
//                 </div>

//                 {/* Botões */}
//                 <div className="flex gap-3 justify-end pt-4 border-t border-border">
//                     <Button
//                         type="button"
//                         variant="outline"
//                         onClick={() => router.back()}
//                         disabled={carregando}
//                     >
//                         Cancelar
//                     </Button>
//                     <Button type="submit" disabled={carregando}>
//                         {carregando ? 'Salvando...' : 'Salvar'}
//                     </Button>
//                 </div>
//             </form>
//         </Card>
//     )

// }