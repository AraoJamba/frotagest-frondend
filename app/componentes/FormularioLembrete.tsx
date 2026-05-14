'use client';

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Lembrete } from "@/app/tipos/indices";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Textarea } from "@/components/ui/textarea";

interface PropsFormularioLembrete {
  lembrete?: Lembrete;
  onSubmit: (lembrete: Lembrete) => void;
  carregando?: boolean;
}

export function FormularioLembrete({
  lembrete,
  onSubmit,
  carregando = false,
}: PropsFormularioLembrete) {

  const router = useRouter();

  const [dados, setDados] = useState<Lembrete>(
    lembrete || {
      id: Date.now().toString(),
      titulo: "",
      descricao: "",
      tipo: "manutencao",
      dataAgendada: "",
      dataCriacao: "",
      completado: false,
      veiculoId: "",
      motoristaId: "",
      prioridade: "baixa",
    }
  );

  const [erros, setErros] = useState<Record<string, string>>({});

  const validarFormulario = () => {
    const novosErros: Record<string, string> = {};

    if (!dados.titulo) novosErros.titulo = "Título obrigatório";
    if (!dados.dataAgendada) novosErros.dataAgendada = "Data obrigatória";
    if (!dados.veiculoId) novosErros.veiculoId = "Veículo obrigatório";

    setErros(novosErros);
    return Object.keys(novosErros).length === 0;
  };

  const handleChange = (campo: keyof Lembrete, valor: any) => {
    setDados({ ...dados, [campo]: valor });

    if (erros[campo]) {
      setErros({ ...erros, [campo]: "" });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validarFormulario()) onSubmit(dados);
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
    <Card className="rounded-[28px] border border-slate-200 bg-white p-8 shadow-sm max-w-4xl mx-auto">

      <form onSubmit={handleSubmit} className="space-y-8">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* TITULO */}
          <div className="space-y-2 md:col-span-2">
            <Label className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Título
            </Label>

            <Input
              value={dados.titulo ?? ""}
              onChange={(e) => handleChange("titulo", e.target.value)}
              disabled={carregando}
              className={`${inputStyle} ${erros.titulo && "border-red-500"}`}
              placeholder="Ex: Troca de óleo do veículo"
            />

            {erros.titulo && (
              <p className="text-xs text-red-500">{erros.titulo}</p>
            )}
          </div>

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
                <SelectItem value="documentacao">Documentação</SelectItem>
                <SelectItem value="revisao">Revisão</SelectItem>
                <SelectItem value="outro">Outro</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* PRIORIDADE */}
          <div className="space-y-2">
            <Label className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Prioridade
            </Label>

            <Select
              value={dados.prioridade}
              onValueChange={(v) => handleChange("prioridade", v)}
            >
              <SelectTrigger className={inputStyle}>
                <SelectValue />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="baixa">Baixa</SelectItem>
                <SelectItem value="media">Média</SelectItem>
                <SelectItem value="alta">Alta</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* STATUS */}
          <div className="space-y-2">
            <Label className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Status
            </Label>

            <Select
              value={dados.completado ? "1" : "0"}
              onValueChange={(v) => handleChange("completado", v === "1")}
            >
              <SelectTrigger className={inputStyle}>
                <SelectValue />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="1">Concluído</SelectItem>
                <SelectItem value="0">Pendente</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* MOTORISTA */}
          <div className="space-y-2">
            <Label className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Motorista
            </Label>

            <Input
              value={dados.motoristaId ?? ""}
              onChange={(e) => handleChange("motoristaId", e.target.value)}
              disabled={carregando}
              className={inputStyle}
              placeholder="ID ou nome do motorista"
            />
          </div>

          {/* VEICULO */}
          <div className="space-y-2">
            <Label className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Veículo
            </Label>

            <Input
              value={dados.veiculoId ?? ""}
              onChange={(e) => handleChange("veiculoId", e.target.value)}
              disabled={carregando}
              className={`${inputStyle} ${erros.veiculoId && "border-red-500"}`}
              placeholder="ID ou matrícula"
            />

            {erros.veiculoId && (
              <p className="text-xs text-red-500">{erros.veiculoId}</p>
            )}
          </div>

          {/* DATA */}
          <div className="space-y-2 md:col-span-2">
            <Label className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Data Agendada
            </Label>

            <Input
              type="date"
              value={dados.dataAgendada ?? ""}
              onChange={(e) => handleChange("dataAgendada", e.target.value)}
              disabled={carregando}
              className={`${inputStyle} ${erros.dataAgendada && "border-red-500"}`}
            />

            {erros.dataAgendada && (
              <p className="text-xs text-red-500">{erros.dataAgendada}</p>
            )}
          </div>

        </div>

        {/* DESCRIÇÃO */}
        <div className="space-y-2">
          <Label className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Descrição
          </Label>

          <Textarea
            value={dados.descricao ?? ""}
            onChange={(e) => handleChange("descricao", e.target.value)}
            disabled={carregando}
            className="min-h-[120px] rounded-xl border-slate-200 bg-slate-50 text-sm"
            placeholder="Detalhes do lembrete..."
          />
        </div>

        {/* BOTÕES */}
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
            {carregando ? "Salvando..." : "Salvar"}
          </Button>

        </div>

      </form>
    </Card>
  );
}




// import React, { useState } from "react";

// import { useRouter } from "next/navigation";

// import { Lembrete } from "@/app/tipos/indices";

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

// interface PropsFormularioLembrete {
//   lembrete?: Lembrete;
//   onSubmit: (lembrete: Lembrete) => void;
//   carregando?: boolean;
// }

// export function FormularioLembrete({
//   lembrete,
//   onSubmit,
//   carregando = false,
// }: PropsFormularioLembrete) {

//   const router = useRouter();

//   const [dados, setDados] = useState<Lembrete>(
//     lembrete || {
//       id: Date.now().toString(),
//       titulo: "",
//       descricao: "",
//       tipo: "manutencao",
//       dataAgendada: "",
//       dataCriacao: "",
//       completado: false,
//       veiculoId: "",
//       motoristaId: "",
//       prioridade: "baixa",
//     }
//   );

//   const [erros, setErros] = useState<Record<string, string>>({});

//   const validarFormulario = () => {

//     const novosErros: Record<string, string> = {};

//     if (!dados.titulo) {
//       novosErros.titulo = "Título obrigatório";
//     }

//     if (!dados.dataAgendada) {
//       novosErros.dataAgendada = "Data obrigatória";
//     }

//     if (!dados.veiculoId) {
//       novosErros.veiculoId = "Veículo obrigatório";
//     }

//     setErros(novosErros);

//     return Object.keys(novosErros).length === 0;
//   };

//   const handleChange = (campo: keyof Lembrete, valor: any) => {
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

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();

//     if (validarFormulario()) {
//       onSubmit(dados);
//     }
//   };

//   return (
//     <div className="bg-white border border-slate-200 rounded-2xl shadow-sm">

//       {/* HEADER */}
//       <div className="border-b border-slate-200 px-6 py-5">

//         <h2 className="text-xl font-bold text-slate-800">
//           Novo Lembrete
//         </h2>

//         <p className="text-sm text-slate-500 mt-1">
//           Crie um lembrete para manutenção, revisão ou documentos.
//         </p>
//       </div>

//       {/* FORM */}
//       <form onSubmit={handleSubmit} className="p-6 space-y-6">

//         {/* GRID */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

//           {/* TITULO */}
//           <div className="space-y-2 md:col-span-2">

//             <Label>Título</Label>

//             <Input
//               value={dados.titulo}
//               onChange={(e) =>
//                 handleChange("titulo", e.target.value)
//               }
//               disabled={carregando}
//               className="h-11"
//               placeholder="Ex: Troca de óleo do veículo"
//             />

//             {erros.titulo && (
//               <p className="text-sm text-red-500">
//                 {erros.titulo}
//               </p>
//             )}
//           </div>

//           {/* TIPO */}
//           <div className="space-y-2">

//             <Label>Tipo</Label>

//             <Select
//               value={dados.tipo}
//               onValueChange={(v) =>
//                 handleChange("tipo", v)
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

//                 <SelectItem value="documentacao">
//                   Documentação
//                 </SelectItem>

//                 <SelectItem value="revisao">
//                   Revisão
//                 </SelectItem>

//                 <SelectItem value="outro">
//                   Outro
//                 </SelectItem>
//               </SelectContent>
//             </Select>
//           </div>

//           {/* PRIORIDADE */}
//           <div className="space-y-2">

//             <Label>Prioridade</Label>

//             <Select
//               value={dados.prioridade}
//               onValueChange={(v) =>
//                 handleChange("prioridade", v)
//               }
//               disabled={carregando}
//             >
//               <SelectTrigger className="h-11">
//                 <SelectValue />
//               </SelectTrigger>

//               <SelectContent>
//                 <SelectItem value="baixa">
//                   Baixa
//                 </SelectItem>

//                 <SelectItem value="media">
//                   Média
//                 </SelectItem>

//                 <SelectItem value="alta">
//                   Alta
//                 </SelectItem>
//               </SelectContent>
//             </Select>
//           </div>

//           {/* COMPLETADO */}
//           <div className="space-y-2">

//             <Label>Concluído</Label>

//             <Select
//               value={dados.completado ? "1" : "0"}
//               onValueChange={(v) =>
//                 handleChange("completado", v === "1")
//               }
//               disabled={carregando}
//             >
//               <SelectTrigger className="h-11">
//                 <SelectValue />
//               </SelectTrigger>

//               <SelectContent>
//                 <SelectItem value="1">Sim</SelectItem>
//                 <SelectItem value="0">Não</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>

//           {/* MOTORISTA */}
//           <div className="space-y-2">

//             <Label>Motorista</Label>

//             <Input
//               value={dados.motoristaId}
//               onChange={(e) =>
//                 handleChange("motoristaId", e.target.value)
//               }
//               disabled={carregando}
//               className="h-11"
//               placeholder="ID do motorista"
//             />
//           </div>

//           {/* VEICULO */}
//           <div className="space-y-2">

//             <Label>Veículo</Label>

//             <Input
//               value={dados.veiculoId}
//               onChange={(e) =>
//                 handleChange("veiculoId", e.target.value)
//               }
//               disabled={carregando}
//               className="h-11"
//               placeholder="ID do veículo"
//             />

//             {erros.veiculoId && (
//               <p className="text-sm text-red-500">
//                 {erros.veiculoId}
//               </p>
//             )}
//           </div>

//           {/* DATA */}
//           <div className="space-y-2 md:col-span-2">

//             <Label>Data Agendada</Label>

//             <Input
//               type="date"
//               value={dados.dataAgendada}
//               onChange={(e) =>
//                 handleChange("dataAgendada", e.target.value)
//               }
//               disabled={carregando}
//               className="h-11"
//             />

//             {erros.dataAgendada && (
//               <p className="text-sm text-red-500">
//                 {erros.dataAgendada}
//               </p>
//             )}
//           </div>
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
//             className="min-h-[120px]"
//             placeholder="Detalhes do lembrete..."
//           />
//         </div>

//         {/* ACTIONS */}
//         <div className="flex justify-end gap-3 pt-6 border-t border-slate-200">

//           <Button
//             type="button"
//             variant="outline"
//             onClick={() => router.back()}
//           >
//             Cancelar
//           </Button>

//           <Button
//             type="submit"
//             className="bg-blue-600 hover:bg-blue-700"
//             disabled={carregando}
//           >
//             {carregando ? "Salvando..." : "Salvar"}
//           </Button>
//         </div>
//       </form>
//     </div>
//   );
// }































// // import React from "react"

// // import { useState } from 'react';
// // import { useRouter } from 'next/navigation';
// // import { Lembrete, PostoCombustivel } from '@/app/tipos/indices';
// // import { Button } from '@/components/ui/button';
// // import { Input } from '@/components/ui/input';
// // import { Label } from '@/components/ui/label';
// // import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
// // import { Textarea } from "@/components/ui/textarea";

// // interface PropsFormularioLembrete {
// //   lembrete?: Lembrete;
// //   onSubmit: (Lembrete: Lembrete) => void;
// //   carregando?: boolean;
// // }

// // export function FormularioLembrete({ lembrete, onSubmit, carregando = false }: PropsFormularioLembrete) {
// //   const router = useRouter();
// //   const [dados, setDados] = useState<Lembrete>(
// //     lembrete || {
// //       id: Date.now().toString(),
// //       titulo: '',
// //       descricao: '',
// //       tipo: 'manutencao',
// //       dataAgendada: '',
// //       // dataCriacao: '',
// //       completado: false,
// //       veiculoId: '',
// //       motoristaId: '',
// //       prioridade: 'baixa',
// //     }
// //   );

// //   const [erros, setErros] = useState<Record<string, string>>({});

// //   const validarFormulario = () => {
// //     const novosErros: Record<string, string> = {};

// //     if (!dados.dataAgendada || dados.dataAgendada == '') novosErros.dataAgendada = 'Data Agendada obrigatório';
// //     if (!dados.titulo || dados.titulo == '') novosErros.titulo = 'Título invalido';
// //     if (!dados.veiculoId || dados.veiculoId == '') novosErros.veiculoId = 'Veículo invalido';
// //     if (!dados.veiculoId || dados.veiculoId == '') novosErros.veiculoId = 'Veículo invalido';

// //     setErros(novosErros);
// //     return Object.keys(novosErros).length === 0;
// //   }

// //   const handleSubmit = (e: React.FormEvent) => {
// //     e.preventDefault();

// //     if (validarFormulario()) {
// //       onSubmit(dados);
// //     }
// //   };

// //   const handleChange = (campo: keyof Lembrete, valor: any) => {
// //     setDados({ ...dados, [campo]: valor });
// //     if (erros[campo]) {
// //       setErros({ ...erros, [campo]: '' });
// //     }
// //   };

// //   return (
// //     <form onSubmit={handleSubmit} className="space-y-6">
// //       <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
// //         {/* Titulo */}
// //         <div>
// //           <Label htmlFor="titulo">Titulo</Label>
// //           <Input
// //             id="titulo"
// //             type="text"
// //             value={lembrete?.titulo}
// //             onChange={(e) => handleChange('titulo', e.target.value)}
// //             disabled={carregando}
// //             placeholder=""
// //             className={erros.motoristaId ? 'border-destructive' : ''}
// //           />
// //           {erros.titulo && <p className="text-sm text-destructive mt-1">{erros.titulo}</p>}
// //         </div>

// //         {/* Tipo - 'manutencao' | 'documentacao' | 'revisao' | 'outro'; */}
// //         <div>
// //           <Label htmlFor="tipo">Tipo</Label>
// //           <Select value={dados.tipo} onValueChange={(valor) => handleChange('tipo', valor)} disabled={carregando}>
// //             <SelectTrigger>
// //               <SelectValue placeholder="Selecione uma opção" />
// //             </SelectTrigger>
// //             <SelectContent>
// //               <SelectItem value="manutencao">Manutenção</SelectItem>
// //               <SelectItem value="documentacao">Documentação</SelectItem>
// //               <SelectItem value="revisao">Revisão</SelectItem>
// //               <SelectItem value="outro">Outro</SelectItem>
// //             </SelectContent>
// //           </Select>
// //         </div>

// //         {/* Prioridade - prioridade: 'baixa' | 'media' | 'alta'; */}
// //         <div>
// //           <Label htmlFor="prioridade">Prioridade</Label>
// //           <Select value={dados.prioridade} onValueChange={(valor) => handleChange('prioridade', valor)} disabled={carregando}>
// //             <SelectTrigger>
// //               <SelectValue placeholder="Selecione uma opção" />
    
// //             </SelectTrigger>
// //             <SelectContent>
// //               <SelectItem value="baixa">Baixa</SelectItem>
// //               <SelectItem value="media">Média</SelectItem>
// //               <SelectItem value="alta">Alta</SelectItem>
// //             </SelectContent>
// //           </Select>
// //         </div>

// //         {/* Completado */}
// //         <div>
// //           <Label htmlFor="completado">Completado</Label>

// //           <Select value={dados.completado.toString()} onValueChange={(valor) => handleChange('completado', parseInt(valor))} disabled={carregando}>
// //             <SelectTrigger>
// //               <SelectValue />
// //             </SelectTrigger>
// //             <SelectContent>
// //               <SelectItem value="1">Sim</SelectItem>
// //               <SelectItem value="0">Não</SelectItem>
// //             </SelectContent>
// //           </Select>
// //         </div>

// //         {/* motoristaId */}
// //         <div>
// //           <Label htmlFor="motoristaId">Motorista </Label>
// //           <Input
// //             id="motoristaId"
// //             type="tel"
// //             value={dados.motoristaId}
// //             onChange={(e) => handleChange('motoristaId', e.target.value)}
// //             disabled={carregando}
// //             className={erros.ano ? 'border-destructive' : ''}
// //           />
// //           {erros.motoristaId && <p className="text-sm text-destructive mt-1">{erros.motoristaId}</p>}
// //         </div>

// //         {/* veiculoId */}
// //         <div>
// //           <Label htmlFor="veiculoId">Veiculo </Label>
// //           <Input
// //             id="veiculoId"
// //             type="tel"
// //             value={dados.veiculoId}
// //             onChange={(e) => handleChange('veiculoId', e.target.value)}
// //             disabled={carregando}
// //             className={erros.ano ? 'border-destructive' : ''}
// //           />
// //           {erros.veiculoId && <p className="text-sm text-destructive mt-1">{erros.veiculoId}</p>}
// //         </div>

// //         {/* Data Agendada */}
// //         <div>
// //           <Label htmlFor="diesel">Data Agendada</Label>
// //           <Input
// //             id="diesel"
// //             type="date"
// //             value={dados.dataAgendada}
// //             onChange={(e) => handleChange('dataAgendada', e.target.value)}
// //             disabled={carregando}
// //             placeholder=""
// //             className={erros.dataAgendada ? 'border-destructive' : ''}
// //           />
// //           {erros.dataAgendada && <p className="text-sm text-destructive mt-1">{erros.dataAgendada}</p>}
// //         </div>
// //       </div>

// //       <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
// //         {/* descricao */}
// //         <div>
// //           <Label htmlFor="descricao">Descrição</Label>
// //           <Textarea
// //             id="descricao"

// //             onChange={(e) => handleChange('descricao', e.target.value)}
// //             disabled={carregando}
// //             placeholder=""
// //             className={erros.diesel ? 'border-destructive' : ''}
// //           />
// //           {erros.descricao && <p className="text-sm text-destructive mt-1">{erros.descricao}</p>}
// //         </div>
// //       </div>

// //       {/* Botões */}
// //       < div className="flex gap-3 justify-end pt-4 bottom-4 border-t border-border" >
// //         <Button
// //           type="button"
// //           variant="outline"
// //           onClick={() => router.back()}
// //           disabled={carregando}
// //         >
// //           Cancelar
// //         </Button>
// //         <Button type="submit" disabled={carregando}>
// //           {carregando ? 'Salvando...' : 'Salvar'}
// //         </Button>
// //       </div >
// //     </form >
// //   )
// // }