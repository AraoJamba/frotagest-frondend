'use client';

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Despesa } from "@/app/tipos/indices";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Textarea } from "@/components/ui/textarea";

interface PropsFormularioDespesa {
  lembrete?: Despesa;
  onSubmit: (despesa: Despesa) => void;
  carregando?: boolean;
}

export function FormularioDespesa({
  lembrete,
  onSubmit,
  carregando = false,
}: PropsFormularioDespesa) {

  const router = useRouter();

  const [dados, setDados] = useState<Despesa>(
    lembrete || {
      id: Date.now().toString(),
      descricao: "",
      tipo: "manutencao",
      data: "",
      veiculo_id: "",
      motorista_id: "",
      valor: 0,
      pago: "0",
      recibo: "",
    }
  );

  const [erros, setErros] = useState<Record<string, string>>({});

  const validarFormulario = () => {
    const novosErros: Record<string, string> = {};

    if (!dados.data) novosErros.data = "Data obrigatória";
    if (!dados.tipo) novosErros.tipo = "Tipo inválido";
    if (!dados.veiculo_id) novosErros.veiculo_id = "Veículo obrigatório";
    if (!dados.valor || Number(dados.valor) <= 0)
      novosErros.valor = "Valor inválido";

    setErros(novosErros);
    return Object.keys(novosErros).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validarFormulario()) onSubmit(dados);
  };

  const handleChange = (campo: keyof Despesa, valor: any) => {
    setDados({ ...dados, [campo]: valor });

    if (erros[campo]) {
      setErros({ ...erros, [campo]: "" });
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
    <div className="rounded-[28px] border border-slate-200 bg-white shadow-sm">

      {/* HEADER */}
      <div className="border-b border-slate-100 px-8 py-6">
        <h2 className="text-xl font-bold text-slate-800">
          Nova Despesa
        </h2>
        <p className="text-sm text-slate-500 mt-1">
          Registre uma despesa da frota
        </p>
      </div>

      {/* FORM */}
      <form onSubmit={handleSubmit} className="p-8 space-y-8">

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* TIPO */}
          <div className="space-y-2">
            <Label className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Tipo
            </Label>

            <Select
              value={dados.tipo}
              onValueChange={(v) => handleChange("tipo", v)}
            >
              <SelectTrigger className={inputStyle}>
                <SelectValue />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="manutencao">Manutenção</SelectItem>
                <SelectItem value="combustivel">Combustível</SelectItem>
                <SelectItem value="pneu">Pneu</SelectItem>
                <SelectItem value="seguro">Seguro</SelectItem>
                <SelectItem value="lavagem">Lavagem</SelectItem>
                <SelectItem value="outro">Outro</SelectItem>
              </SelectContent>
            </Select>

            {erros.tipo && <p className="text-xs text-red-500">{erros.tipo}</p>}
          </div>

          {/* VALOR */}
          <div className="space-y-2">
            <Label className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Valor (Kz)
            </Label>

            <Input
              type="number"
              value={dados.valor}
              onChange={(e) => handleChange("valor", e.target.value)}
              className={`${inputStyle} ${erros.valor && 'border-red-500'}`}
              placeholder="25000"
            />

            {erros.valor && <p className="text-xs text-red-500">{erros.valor}</p>}
          </div>

          {/* PAGO */}
          <div className="space-y-2">
            <Label className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Pago
            </Label>

            <Select
              value={dados.pago}
              onValueChange={(v) => handleChange("pago", v)}
            >
              <SelectTrigger className={inputStyle}>
                <SelectValue />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="1">Sim</SelectItem>
                <SelectItem value="0">Não</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* DATA */}
          <div className="space-y-2">
            <Label className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Data
            </Label>

            <Input
              type="date"
              value={dados.data}
              onChange={(e) => handleChange("data", e.target.value)}
              className={`${inputStyle} ${erros.data && 'border-red-500'}`}
            />

            {erros.data && <p className="text-xs text-red-500">{erros.data}</p>}
          </div>

          {/* MOTORISTA */}
          <div className="space-y-2">
            <Label className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Motorista
            </Label>

            <Input
              value={dados.motorista_id}
              onChange={(e) => handleChange("motorista_id", e.target.value)}
              className={inputStyle}
              placeholder="ID ou nome"
            />
          </div>

          {/* VEÍCULO */}
          <div className="space-y-2">
            <Label className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Veículo
            </Label>

            <Input
              value={dados.veiculo_id}
              onChange={(e) => handleChange("veiculo_id", e.target.value)}
              className={`${inputStyle} ${erros.veiculo_id && 'border-red-500'}`}
              placeholder="Matrícula ou ID"
            />

            {erros.veiculo_id && (
              <p className="text-xs text-red-500">{erros.veiculo_id}</p>
            )}
          </div>

        </div>

        {/* RECIBO */}
        <div className="space-y-2">
          <Label className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Recibo
          </Label>

          <Input
            value={dados.recibo}
            onChange={(e) => handleChange("recibo", e.target.value)}
            className={inputStyle}
            placeholder="Referência do recibo"
          />
        </div>

        {/* DESCRIÇÃO */}
        <div className="space-y-2">
          <Label className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Descrição
          </Label>

          <Textarea
            value={dados.descricao}
            onChange={(e) => handleChange("descricao", e.target.value)}
            className="min-h-[120px] rounded-xl border-slate-200 bg-slate-50 focus-visible:ring-blue-500/20"
            placeholder="Detalhes da despesa..."
          />
        </div>

        {/* ACTIONS */}
        <div className="flex justify-end gap-3 pt-6 border-t border-slate-100">

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
            {carregando ? "Salvando..." : "Salvar"}
          </Button>

        </div>

      </form>
    </div>
  );
}





// import React, { useState } from "react";

// import { useRouter } from "next/navigation";

// import { Despesa } from "@/app/tipos/indices";

// import { Button } from "@/components/ui/button";

// import { Input } from "@/components/ui/input";

// import { Label } from "@/components/ui/label";

// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";

// import { Textarea } from "@/components/ui/textarea";

// interface PropsFormularioDespesa {
//   lembrete?: Despesa;
//   onSubmit: (despesa: Despesa) => void;
//   carregando?: boolean;
// }

// export function FormularioDespesa({
//   lembrete,
//   onSubmit,
//   carregando = false,
// }: PropsFormularioDespesa) {

//   const router = useRouter();

//   const [dados, setDados] = useState<Despesa>(
//     lembrete || {
//       id: Date.now().toString(),
//       descricao: "",
//       tipo: "manutencao",
//       data: "",
//       veiculo_id: "",
//       motorista_id: "",
//       valor: 0,
//       pago: "0",
//       recibo: "",
//     }
//   );

//   const [erros, setErros] = useState<Record<string, string>>({});

//   const validarFormulario = () => {

//     const novosErros: Record<string, string> = {};

//     if (!dados.data) {
//       novosErros.data = "Data obrigatória";
//     }

//     if (!dados.tipo) {
//       novosErros.tipo = "Tipo inválido";
//     }

//     if (!dados.veiculo_id) {
//       novosErros.veiculo_id = "Veículo obrigatório";
//     }

//     if (!dados.valor || Number(dados.valor) <= 0) {
//       novosErros.valor = "Valor inválido";
//     }

//     setErros(novosErros);

//     return Object.keys(novosErros).length === 0;
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();

//     if (validarFormulario()) {
//       onSubmit(dados);
//     }
//   };

//   const handleChange = (campo: keyof Despesa, valor: any) => {
//     setDados({
//       ...dados,
//       [campo]: valor,
//     });

//     if (erros[campo]) {
//       setErros({
//         ...erros,
//         [campo]: "",
//       });
//     }
//   };

//   return (
//     <div className="bg-white border border-slate-200 rounded-2xl shadow-sm">

//       {/* HEADER */}
//       <div className="border-b border-slate-200 px-6 py-5">

//         <h2 className="text-xl font-bold text-slate-800">
//           Cadastro de Despesa
//         </h2>

//         <p className="text-sm text-slate-500 mt-1">
//           Preencha as informações da despesa da frota.
//         </p>
//       </div>

//       {/* FORM */}
//       <form onSubmit={handleSubmit} className="p-6 space-y-8">

//         {/* GRID */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

//           {/* TIPO */}
//           <div className="space-y-2">

//             <Label>Tipo de Despesa</Label>

//             <Select
//               value={dados.tipo}
//               onValueChange={(valor) =>
//                 handleChange("tipo", valor)
//               }
//               disabled={carregando}
//             >
//               <SelectTrigger className="h-11">
//                 <SelectValue />
//               </SelectTrigger>

//               <SelectContent>
//                 <SelectItem value="manutencao">
//                   Manutenção
//                 </SelectItem>

//                 <SelectItem value="combustivel">
//                   Combustível
//                 </SelectItem>

//                 <SelectItem value="pneu">
//                   Pneu
//                 </SelectItem>

//                 <SelectItem value="seguro">
//                   Seguro
//                 </SelectItem>

//                 <SelectItem value="lavagem">
//                   Lavagem
//                 </SelectItem>

//                 <SelectItem value="outro">
//                   Outro
//                 </SelectItem>
//               </SelectContent>
//             </Select>

//             {erros.tipo && (
//               <p className="text-sm text-red-500">
//                 {erros.tipo}
//               </p>
//             )}
//           </div>

//           {/* VALOR */}
//           <div className="space-y-2">

//             <Label>Valor da Despesa (Kz)</Label>

//             <Input
//               type="number"
//               value={dados.valor}
//               onChange={(e) =>
//                 handleChange("valor", e.target.value)
//               }
//               disabled={carregando}
//               placeholder="Ex: 25000"
//               className="h-11"
//             />

//             {erros.valor && (
//               <p className="text-sm text-red-500">
//                 {erros.valor}
//               </p>
//             )}
//           </div>

//           {/* PAGO */}
//           <div className="space-y-2">

//             <Label>Despesa Paga?</Label>

//             <Select
//               value={dados.pago}
//               onValueChange={(valor) =>
//                 handleChange("pago", valor)
//               }
//               disabled={carregando}
//             >
//               <SelectTrigger className="h-11">
//                 <SelectValue />
//               </SelectTrigger>

//               <SelectContent>
//                 <SelectItem value="1">
//                   Sim
//                 </SelectItem>

//                 <SelectItem value="0">
//                   Não
//                 </SelectItem>
//               </SelectContent>
//             </Select>
//           </div>

//           {/* MOTORISTA */}
//           <div className="space-y-2">

//             <Label>Motorista</Label>

//             <Input
//               type="text"
//               value={dados.motorista_id}
//               onChange={(e) =>
//                 handleChange("motorista_id", e.target.value)
//               }
//               disabled={carregando}
//               placeholder="ID ou nome do motorista"
//               className="h-11"
//             />

//             {erros.motorista_id && (
//               <p className="text-sm text-red-500">
//                 {erros.motorista_id}
//               </p>
//             )}
//           </div>

//           {/* VEÍCULO */}
//           <div className="space-y-2">

//             <Label>Veículo</Label>

//             <Input
//               type="text"
//               value={dados.veiculo_id}
//               onChange={(e) =>
//                 handleChange("veiculo_id", e.target.value)
//               }
//               disabled={carregando}
//               placeholder="ID ou matrícula do veículo"
//               className="h-11"
//             />

//             {erros.veiculo_id && (
//               <p className="text-sm text-red-500">
//                 {erros.veiculo_id}
//               </p>
//             )}
//           </div>

//           {/* DATA */}
//           <div className="space-y-2">

//             <Label>Data da Despesa</Label>

//             <Input
//               type="date"
//               value={dados.data}
//               onChange={(e) =>
//                 handleChange("data", e.target.value)
//               }
//               disabled={carregando}
//               className="h-11"
//             />

//             {erros.data && (
//               <p className="text-sm text-red-500">
//                 {erros.data}
//               </p>
//             )}
//           </div>
//         </div>

//         {/* RECIBO */}
//         <div className="space-y-2">

//           <Label>Recibo</Label>

//           <Input
//             type="text"
//             value={dados.recibo}
//             onChange={(e) =>
//               handleChange("recibo", e.target.value)
//             }
//             disabled={carregando}
//             placeholder="Número ou referência do recibo"
//             className="h-11"
//           />
//         </div>

//         {/* DESCRIÇÃO */}
//         <div className="space-y-2">

//           <Label>Descrição</Label>

//           <Textarea
//             value={dados.descricao}
//             onChange={(e) =>
//               handleChange("descricao", e.target.value)
//             }
//             disabled={carregando}
//             placeholder="Descreva os detalhes da despesa..."
//             className="min-h-[120px]"
//           />
//         </div>

//         {/* ACTIONS */}
//         <div className="flex flex-col sm:flex-row justify-end gap-3 pt-6 border-t border-slate-200">

//           <Button
//             type="button"
//             variant="outline"
//             onClick={() => router.back()}
//             disabled={carregando}
//             className="h-11 px-6"
//           >
//             Cancelar
//           </Button>

//           <Button
//             type="submit"
//             disabled={carregando}
//             className="h-11 px-6 bg-blue-600 hover:bg-blue-700"
//           >
//             {carregando
//               ? "Salvando..."
//               : "Salvar Despesa"}
//           </Button>
//         </div>
//       </form>
//     </div>
//   );
// }











// // import React from "react"

// // import { useState } from 'react';
// // import { useRouter } from 'next/navigation';
// // import { Despesa } from '@/app/tipos/indices';
// // import { Button } from '@/components/ui/button';
// // import { Input } from '@/components/ui/input';
// // import { Label } from '@/components/ui/label';
// // import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
// // import { Textarea } from "@/components/ui/textarea";

// // interface PropsFormularioDespesa {
// //     lembrete?: Despesa;
// //     onSubmit: (Despesa: Despesa) => void;
// //     carregando?: boolean;
// // }

// // export function FormularioDespesa({ lembrete, onSubmit, carregando = false }: PropsFormularioDespesa) {
// //     const router = useRouter();
// //     const [dados, setDados] = useState<Despesa>(
// //         lembrete || {
// //             id: Date.now().toString(),
// //             descricao: '',
// //             tipo: 'manutencao',
// //             data: '',
// //             veiculo_id: '',
// //             motorista_id: '',
// //             valor: 0,
// //             pago: '0',
// //             recibo: '',
// //         }
// //     );

// //     const [erros, setErros] = useState<Record<string, string>>({});

// //     const validarFormulario = () => {
// //         const novosErros: Record<string, string> = {};

// //         if (!dados.data || dados.data == '') novosErros.dataAgendada = 'Data obrigatório';
// //         if (!dados.tipo || dados.tipo == null) novosErros.titulo = 'Tipo invalido';
// //         if (!dados.veiculo_id || dados.veiculo_id == '') novosErros.veiculo_id = 'Veículo invalido';
// //         if (!dados.valor || dados.valor <= 0 ) novosErros.valor = 'Valor invalido';

// //         setErros(novosErros);
// //         return Object.keys(novosErros).length === 0;
// //     }

// //     const handleSubmit = (e: React.FormEvent) => {
// //         e.preventDefault();

// //         if (validarFormulario()) {
// //             onSubmit(dados);
// //         }
// //     };

// //     const handleChange = (campo: keyof Despesa, valor: any) => {
// //         setDados({ ...dados, [campo]: valor });
// //         if (erros[campo]) {
// //             setErros({ ...erros, [campo]: '' });
// //         }
// //     };

// //     return (
// //         <form onSubmit={handleSubmit} className="space-y-6">
// //             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

// //                 {/* Tipo */}
// //                 <div>
// //                     <Label htmlFor="status">Tipo</Label>
// //                     <Select value={dados.tipo} onValueChange={(valor) => handleChange('tipo', valor)} disabled={carregando}>
// //                         <SelectTrigger>
// //                             <SelectValue />
// //                         </SelectTrigger>
// //                         <SelectContent>
// //                             <SelectItem value="manutencao">Manutenção</SelectItem>
// //                             <SelectItem value="combustivel">Combustivel</SelectItem>
// //                             <SelectItem value="pneu">Pneu</SelectItem>
// //                             <SelectItem value="seguro">Seguro</SelectItem>
// //                             <SelectItem value="lavagem">Lavagem</SelectItem>
// //                             <SelectItem value="outro">Outro</SelectItem>
// //                         </SelectContent>
// //                     </Select>
// //                 </div>

// //                 {/* Titulo */}
// //                 <div>
// //                     <Label htmlFor="valor">Valor do custo da despesa (Kz)</Label>
// //                     <Input
// //                         id="valor"
// //                         type="number"
// //                         value={dados.valor}
// //                         onChange={(e) => handleChange('valor', e.target.value)}
// //                         disabled={carregando}
// //                         placeholder=""
// //                         className={erros.valor ? 'border-destructive' : ''}
// //                     />
// //                     {erros.valor && <p className="text-sm text-destructive mt-1">{erros.valor}</p>}
// //                 </div>

// //                 {/* Pago */}
// //                 <div>
// //                     <Label htmlFor="status">Pago</Label>
// //                     <Select value={dados.pago} onValueChange={(valor) => handleChange('pago', valor)} disabled={carregando}>
// //                         <SelectTrigger>
// //                             <SelectValue />
// //                         </SelectTrigger>
// //                         <SelectContent>
// //                             <SelectItem value="1">Sim</SelectItem>
// //                             <SelectItem value="0">Não</SelectItem>
// //                         </SelectContent>
// //                     </Select>
// //                 </div>

// //                 {/* motoristaId */}
// //                 <div>
// //                     <Label htmlFor="motoristaId">Motorista </Label>
// //                     <Input
// //                         id="motoristaId"
// //                         type="tel"
// //                         value={dados.motorista_id}
// //                         onChange={(e) => handleChange('motorista_id', e.target.value)}
// //                         disabled={carregando}
// //                         className={erros.ano ? 'border-destructive' : ''}
// //                     />
// //                     {erros.motorista_id && <p className="text-sm text-destructive mt-1">{erros.motorista_id}</p>}
// //                 </div>

// //                 {/* veiculoId */}
// //                 <div>
// //                     <Label htmlFor="veiculoId">Veiculo </Label>
// //                     <Input
// //                         id="veiculoId"
// //                         type="tel"
// //                         value={dados.veiculo_id}
// //                         onChange={(e) => handleChange('veiculo_id', e.target.value)}
// //                         disabled={carregando}
// //                         className={erros.ano ? 'border-destructive' : ''}
// //                     />
// //                     {erros.veiculo_id && <p className="text-sm text-destructive mt-1">{erros.veiculo_id}</p>}
// //                 </div>

// //                 {/* Data */}
// //                 <div>
// //                     <Label htmlFor="data">Data da despesa</Label>
// //                     <Input
// //                         id="data"
// //                         type="date"
// //                         value={dados.data}
// //                         onChange={(e) => handleChange('data', e.target.value)}
// //                         disabled={carregando}
// //                         placeholder=""
// //                         className={erros.dataAgendada ? 'border-destructive' : ''}
// //                     />
// //                     {erros.data && <p className="text-sm text-destructive mt-1">{erros.data}</p>}
// //                 </div>
// //             </div>

// //             {/* recibo */}
// //             <div>
// //                 <Label htmlFor="recibo">Recibo</Label>
// //                 <Input
// //                     id="recibo"
// //                     type="text"
// //                     value={dados.recibo}
// //                     onChange={(e) => handleChange('recibo', e.target.value)}
// //                     disabled={carregando}
// //                     placeholder=""
// //                     className={erros.recibo ? 'border-destructive' : ''}
// //                 />
// //                 {erros.recibo && <p className="text-sm text-destructive mt-1">{erros.recibo}</p>}
// //             </div>

// //             {/* descricao */}
// //             <div>
// //                 <Label htmlFor="descricao">Descrição</Label>
// //                 <Textarea
// //                     id="descricao"

// //                     onChange={(e) => handleChange('descricao', e.target.value)}
// //                     disabled={carregando}
// //                     placeholder=""
// //                     className={erros.diesel ? 'border-destructive' : ''}
// //                 />
// //                 {erros.descricao && <p className="text-sm text-destructive mt-1">{erros.descricao}</p>}
// //             </div>

// //       {/* Botões */ }
// //     < div className="w-[80%] flex gap-3 justify-end pt-4 bottom-5 fixed border-t border-border" >
// //         <Button
// //             type="button"
// //             variant="outline"
// //             onClick={() => router.back()}
// //             disabled={carregando}
// //         >
// //             Cancelar
// //         </Button>
// //         <Button type="submit" disabled={carregando}>
// //             {carregando ? 'Salvando...' : 'Salvar'}
// //         </Button>
// //     </div >
// //     </form >
// //   )
// // }