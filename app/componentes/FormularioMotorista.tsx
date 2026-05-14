'use client';

import React, { useState } from "react";
import { useRouter } from 'next/navigation';
import { Motorista } from '@/app/tipos/indices';

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

interface PropsFormularioMotorista {
  motorista?: Motorista;
  onSubmit: (motorista: Motorista) => void;
  carregando?: boolean;
}

export function FormularioMotorista({
  motorista,
  onSubmit,
  carregando = false
}: PropsFormularioMotorista) {

  const router = useRouter();

  const [dados, setDados] = useState<Motorista>(
    motorista || {
      id: Date.now().toString(),
      nome: '',
      email: '',
      telefone: '',
      numeroCarta: '',
      numeroBI: '',
      categoriaCarta: 'A',
      dataNascimento: '',
      dataCadastro: new Date().toISOString().split('T')[0],
      ativo: true,
      endereco: '',
      cidade: '',
      provincia: '',
      dataValidadeCarta: '',
    }
  );

  const [erros, setErros] = useState<Record<string, string>>({});

  const validarFormulario = () => {
    const novosErros: Record<string, string> = {};

    if (!dados.nome.trim()) novosErros.nome = 'Nome é obrigatório';
    if (!/^[A-Za-zÀ-ÿ\s]+$/.test(dados.nome)) novosErros.nome = 'Nome inválido';

    if (!dados.email.trim()) novosErros.email = 'Email é obrigatório';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(dados.email)) novosErros.email = 'Email inválido';

    if (!/^\d{9}$/.test(dados.telefone)) novosErros.telefone = 'Telefone inválido';

    if (!/^[A-Z]{2}-\d{6}$/.test(dados.numeroCarta))
      novosErros.numeroCarta = 'Formato: AA-123456';

    if (!/^\d{9}[A-Z]{2}\d{3}$/.test(dados.numeroBI))
      novosErros.numeroBI = 'BI inválido';

    if (!dados.dataNascimento) novosErros.dataNascimento = 'Obrigatório';
    if (!dados.dataValidadeCarta) novosErros.dataValidadeCarta = 'Obrigatório';

    if (!dados.endereco.trim()) novosErros.endereco = 'Obrigatório';
    if (!dados.cidade.trim()) novosErros.cidade = 'Obrigatório';
    if (!dados.provincia.trim()) novosErros.provincia = 'Obrigatório';

    setErros(novosErros);
    return Object.keys(novosErros).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validarFormulario()) onSubmit(dados);
  };

  const handleChange = (campo: keyof Motorista, valor: any) => {
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

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* NOME */}
          <div className="space-y-2">
            <Label className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Nome Completo
            </Label>

            <Input
              value={dados.nome}
              onChange={(e) => handleChange('nome', e.target.value)}
              className={`${inputStyle} ${erros.nome && 'border-red-500'}`}
            />

            {erros.nome && <p className="text-xs text-red-500">{erros.nome}</p>}
          </div>

          {/* EMAIL */}
          <div className="space-y-2">
            <Label className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Email
            </Label>

            <Input
              type="email"
              value={dados.email}
              onChange={(e) => handleChange('email', e.target.value)}
              className={`${inputStyle} ${erros.email && 'border-red-500'}`}
            />

            {erros.email && <p className="text-xs text-red-500">{erros.email}</p>}
          </div>

          {/* TELEFONE */}
          <div className="space-y-2">
            <Label className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Telefone
            </Label>

            <Input
              value={dados.telefone}
              onChange={(e) => handleChange('telefone', e.target.value)}
              className={`${inputStyle} ${erros.telefone && 'border-red-500'}`}
            />

            {erros.telefone && <p className="text-xs text-red-500">{erros.telefone}</p>}
          </div>

          {/* CARTA */}
          <div className="space-y-2">
            <Label className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Carta de Condução
            </Label>

            <Input
              value={dados.numeroCarta}
              onChange={(e) => handleChange('numeroCarta', e.target.value)}
              className={`${inputStyle} ${erros.numeroCarta && 'border-red-500'}`}
            />

            {erros.numeroCarta && <p className="text-xs text-red-500">{erros.numeroCarta}</p>}
          </div>

          {/* CATEGORIA */}
          <div className="space-y-2">
            <Label className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Categoria
            </Label>

            <Select
              value={dados.categoriaCarta}
              onValueChange={(v) => handleChange('categoriaCarta', v)}
            >
              <SelectTrigger className={inputStyle}>
                <SelectValue />
              </SelectTrigger>

              <SelectContent>
                {['A','A1','B','C','C1','EB','EC','EC1'].map((c) => (
                  <SelectItem key={c} value={c}>{c}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* BI */}
          <div className="space-y-2">
            <Label className="text-xs font-bold uppercase tracking-wider text-slate-500">
              BI
            </Label>

            <Input
              value={dados.numeroBI}
              onChange={(e) => handleChange('numeroBI', e.target.value)}
              className={`${inputStyle} ${erros.numeroBI && 'border-red-500'}`}
            />

            {erros.numeroBI && <p className="text-xs text-red-500">{erros.numeroBI}</p>}
          </div>

          {/* NASCIMENTO */}
          <div className="space-y-2">
            <Label className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Nascimento
            </Label>

            <Input
              type="date"
              value={dados.dataNascimento}
              onChange={(e) => handleChange('dataNascimento', e.target.value)}
              className={`${inputStyle} ${erros.dataNascimento && 'border-red-500'}`}
            />
          </div>

          {/* VALIDADE */}
          <div className="space-y-2">
            <Label className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Validade da Carta
            </Label>

            <Input
              type="date"
              value={dados.dataValidadeCarta}
              onChange={(e) => handleChange('dataValidadeCarta', e.target.value)}
              className={`${inputStyle} ${erros.dataValidadeCarta && 'border-red-500'}`}
            />
          </div>

          {/* ENDEREÇO */}
          <div className="space-y-2 md:col-span-2">
            <Label className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Endereço
            </Label>

            <Input
              value={dados.endereco}
              onChange={(e) => handleChange('endereco', e.target.value)}
              className={`${inputStyle} ${erros.endereco && 'border-red-500'}`}
            />
          </div>

          {/* CIDADE */}
          <div className="space-y-2">
            <Label className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Cidade
            </Label>

            <Input
              value={dados.cidade}
              onChange={(e) => handleChange('cidade', e.target.value)}
              className={`${inputStyle} ${erros.cidade && 'border-red-500'}`}
            />
          </div>

          {/* PROVINCIA */}
          <div className="space-y-2">
            <Label className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Província
            </Label>

            <Input
              value={dados.provincia}
              onChange={(e) => handleChange('provincia', e.target.value)}
              className={`${inputStyle} ${erros.provincia && 'border-red-500'}`}
            />
          </div>

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
            className="
              rounded-xl
              bg-blue-600
              hover:bg-blue-700
              px-6
            "
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
// import { Motorista } from '@/app/tipos/indices';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { Card } from '@/components/ui/card';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
// import { AlertCircle } from 'lucide-react';

// interface PropsFormularioMotorista {
//   motorista?: Motorista;
//   onSubmit: (motorista: Motorista) => void;
//   carregando?: boolean;
// }

// export function FormularioMotorista({ motorista, onSubmit, carregando = false }: PropsFormularioMotorista) {
//   const router = useRouter();
//   const [dados, setDados] = useState<Motorista>(
//     motorista || {
//       id: Date.now().toString(),
//       nome: '',
//       email: '',
//       telefone: '',
//       numeroCarta: '',
//       numeroBI: '',
//       categoriaCarta: 'A',
//       dataNascimento: '',
//       dataCadastro: new Date().toISOString().split('T')[0],
//       ativo: true,
//       endereco: '',
//       cidade: '',
//       provincia: '',
//       dataValidadeCarta: new Date().getDate().toString().split('T')[0],
//     }
//   );

//   const [erros, setErros] = useState<Record<string, string>>({});

//   const validarFormulario = () => {
//     const novosErros: Record<string, string> = {};

//     //if (!dados.nome.trim()) novosErros.nome = 'Nome é obrigatório';
//     if (!/^[A-Za-zÀ-ÿ\s]+$/.test(dados.nome)) novosErros.nome = 'Nome inválido';
//     if (!dados.email.trim()) novosErros.email = 'Email é obrigatório';
//     if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(dados.email)) novosErros.email = 'Email inválido';
//     if (!/^[A-Z]{2}-\d{6}$/.test(dados.numeroCarta)) novosErros.numeroCarta = 'Nº de Carta de condução inválido';
//     if (!/^\d{9}$/.test(dados.telefone.trim())) novosErros.telefone = 'Nº de telefone inválido';
//     if (!dados.numeroCarta.trim()) novosErros.cnh = 'CNH é obrigatória';
//     if (!/^\d{9}[A-Z]{2}\d{3}$/.test(dados.numeroBI)) novosErros.numeroBI = 'Número de B.I. inválido';
//     if (!dados.dataNascimento) novosErros.dataNascimento = 'Data de nascimento é obrigatória';
//     if (!dados.dataValidadeCarta) novosErros.dataValidadeCarta = 'Data de Validade da Carta é obrigatória';
//     if (!dados.endereco.trim()) novosErros.endereco = 'Endereço é obrigatório';
//     if (!/^[A-Za-zÀ-ÿ\s]+$/.test(dados.cidade)) novosErros.cidade = 'Cidade inválido';
//     if (!dados.provincia.trim()) novosErros.estado = 'Estado é obrigatório';

//     setErros(novosErros);
//     return Object.keys(novosErros).length === 0;
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();

//     if (validarFormulario()) {
//       onSubmit(dados);
//     }
//   };

//   const handleChange = (campo: keyof Motorista, valor: any) => {
//     setDados({ ...dados, [campo]: valor });
//     if (erros[campo]) {
//       setErros({ ...erros, [campo]: '' });
//     }
//   };

//   return (
//     <Card className="p-6">
//       <form onSubmit={handleSubmit} className="space-y-6">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           {/* Nome */}
//           <div>
//             <Label htmlFor="nome">Nome Completo</Label>
//             <Input
//               id="nome"
//               value={dados.nome}
//               onChange={(e) => handleChange('nome', e.target.value)}
//               disabled={carregando}
//               className={erros.nome ? 'border-destructive' : ''}
//             />
//             {erros.nome && <p className="text-sm text-destructive mt-1">{erros.nome}</p>}
//           </div>

//           {/* Email */}
//           <div>
//             <Label htmlFor="email">Email</Label>
//             <Input
//               id="email"
//               type="email"
//               value={dados.email}
//               onChange={(e) => handleChange('email', e.target.value)}
//               disabled={carregando}
//               className={erros.email ? 'border-destructive' : ''}
//             />
//             {erros.email && <p className="text-sm text-destructive mt-1">{erros.email}</p>}
//           </div>

//           {/* Telefone */}
//           <div>
//             <Label htmlFor="telefone">Telefone</Label>
//             <Input
//               id="telefone"
//               value={dados.telefone}
//               onChange={(e) => handleChange('telefone', e.target.value)}
//               disabled={carregando}
//               placeholder=""
//               className={erros.telefone ? 'border-destructive' : ''}
//             />
//             {erros.telefone && <p className="text-sm text-destructive mt-1">{erros.telefone}</p>}
//           </div>

//           {/* Carta de Condução */}
//           <div>
//             <Label htmlFor="numeroCarta">Nº de Carta de Condução</Label>
//             <Input
//               id="numeroCarta"
//               value={dados.numeroCarta}
//               onChange={(e) => handleChange('numeroCarta', e.target.value)}
//               disabled={carregando}
//               className={erros.numeroCarta ? 'border-destructive' : ''}
//             />
//             {erros.numeroCarta && <p className="text-sm text-destructive mt-1">{erros.numeroCarta}</p>}
//           </div>

//           {/* Categoria carta de condução */}
//           <div>
//             <Label htmlFor="categoriaCarta">Categoria da carta de condução</Label>
//             <Select value={dados.categoriaCarta} onValueChange={(valor) => handleChange('categoriaCarta', valor)} disabled={carregando}>
//               <SelectTrigger>
//                 <SelectValue />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="A">A</SelectItem>
//                 <SelectItem value="A1">A1</SelectItem>
//                 <SelectItem value="B">B</SelectItem>
//                 <SelectItem value="C">C</SelectItem>
//                 <SelectItem value="C1">C1</SelectItem>
//                 <SelectItem value="EB">EB</SelectItem>
//                 <SelectItem value="EC">EC</SelectItem>
//                 <SelectItem value="EC1">EC1</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>

//           {/* Data de Nascimento */}
//           <div>
//             <Label htmlFor="dataNascimento">Data de Nascimento</Label>
//             <Input
//               id="dataNascimento"
//               type="date"
//               value={dados.dataNascimento}
//               onChange={(e) => handleChange('dataNascimento', e.target.value)}
//               disabled={carregando}
//               className={erros.dataNascimento ? 'border-destructive' : ''}
//             />
//             {erros.dataNascimento && <p className="text-sm text-destructive mt-1">{erros.dataNascimento}</p>}
//           </div>

//           {/* BI */}
//           <div>
//             <Label htmlFor="numeroBI">Número de BI</Label>
//             <Input
//               id="numeroBI"
//               value={dados.numeroBI}
//               onChange={(e) => handleChange('numeroBI', e.target.value)}
//               disabled={carregando}
//               className={erros.numeroBI ? 'border-destructive' : ''}
//             />
//             {erros.numeroBI && <p className="text-sm text-destructive mt-1">{erros.numeroBI}</p>}
//           </div>

//           {/* Data de Nascimento */}
//           <div>
//             <Label htmlFor="dataValidadeCarta">Data de Validade da Carta de Condução</Label>
//             <Input
//               id="dataValidadeCarta"
//               type="date"
//               value={dados.dataValidadeCarta}
//               onChange={(e) => handleChange('dataValidadeCarta', e.target.value)}
//               disabled={carregando}
//               className={erros.dataValidadeCarta ? 'border-destructive' : ''}
//             />
//             {erros.dataValidadeCarta && <p className="text-sm text-destructive mt-1">{erros.dataValidadeCarta}</p>}
//           </div>

//           {/* Endereço */}
//           <div>
//             <Label htmlFor="endereco">Endereço</Label>
//             <Input
//               id="endereco"
//               value={dados.endereco}
//               onChange={(e) => handleChange('endereco', e.target.value)}
//               disabled={carregando}
//               className={erros.endereco ? 'border-destructive' : ''}
//             />
//             {erros.endereco && <p className="text-sm text-destructive mt-1">{erros.endereco}</p>}
//           </div>

//           {/* Cidade */}
//           <div>
//             <Label htmlFor="cidade">Cidade</Label>
//             <Input
//               id="cidade"
//               value={dados.cidade}
//               onChange={(e) => handleChange('cidade', e.target.value)}
//               disabled={carregando}
//               className={erros.cidade ? 'border-destructive' : ''}
//             />
//             {erros.cidade && <p className="text-sm text-destructive mt-1">{erros.cidade}</p>}
//           </div>

//           {/* Estado */}
//           <div>
//             <Label htmlFor="provincia">Estado</Label>
//             <Input
//               id="provincia"
//               value={dados.provincia}
//               onChange={(e) => handleChange('provincia', e.target.value)}
//               disabled={carregando}
//               className={erros.estado ? 'border-destructive' : ''}
//               placeholder="SP, RJ, MG..."
//             />
//             {erros.provincia && <p className="text-sm text-destructive mt-1">{erros.provincia}</p>}
//           </div>

//           {/* Ativo */}
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
