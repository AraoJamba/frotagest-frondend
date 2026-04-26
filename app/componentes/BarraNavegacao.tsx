'use client';

import React, { useState } from "react"
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from "next/image";
import { useAutenticacao } from '@/app/contexto/AutenticacaoContexto';
import { Button } from '@/components/ui/button';
import img1 from "@/public/frotagest-favicon.jpg"
import {
  LayoutDashboard, Users, Truck, Wrench, BadgeDollarSign,
  MapPin, BarChart3, Settings, LogOut, Fuel, Bell,
  User, Menu, Info, X
} from 'lucide-react';


interface ItemMenuNavegacao {
  nome: string;
  rota: string;
  icone: React.ComponentType<{ className?: string }>;
  papelRequired?: string[];
}

const itensMenuPrincipal: ItemMenuNavegacao[] = [
  {
    nome: 'Dashboard',
    rota: '/dashboard',
    icone: LayoutDashboard,
  },
  {
    nome: 'Motoristas',
    rota: '/motoristas',
    icone: Users,
    papelRequired: ['admin', 'gerente'],
  },
  {
    nome: 'Veículos',
    rota: '/veiculos',
    icone: Truck,
    papelRequired: ['admin', 'gerente'],
  },
  {
    nome: 'Despesas',
    rota: '/despesas',
    icone: BadgeDollarSign,
    papelRequired: ['admin', 'gerente'],
  },
  {
    nome: 'Serviços',
    rota: '/servicos',
    icone: Wrench,
    papelRequired: ['admin', 'gerente'],
  },
  {
    nome: 'Viagens',
    rota: '/viagens',
    icone: MapPin,
  },
  {
    nome: 'Análises',
    rota: '/analises',
    icone: BarChart3,
    papelRequired: ['admin', 'gerente'],
  },
];

const itensMenuSecundario: ItemMenuNavegacao[] = [
  {
    nome: 'Postos de Combustível',
    rota: '/postos-combustivel',
    icone: Fuel,
  },
  {
    nome: 'Lembretes',
    rota: '/lembretes',
    icone: Bell,
  },
  {
    nome: 'Perfil',
    rota: '/perfil',
    icone: User,
  },
  {
    nome: 'Configurações',
    rota: '/configuracoes',
    icone: Settings,
    papelRequired: ['admin'],
  },
  {
    nome: 'Sobre',
    rota: '/sobre',
    icone: Info,
  },
];


export function BarraNavegacao() {
  const pathname = usePathname();
  const router = useRouter();
  const { usuarioAtual, realizarLogout } = useAutenticacao();
  const [aberto, setAberto] = useState(false);

  const handleLogout = () => {
    realizarLogout();
    router.push('/login');
  };

  const podeVer = (papelRequired?: string[]) => {
    if (!papelRequired || papelRequired.length === 0) return true;
    return papelRequired.includes(usuarioAtual?.papel || '');
  };

  return (
    <>
      {/* Gatilho Mobile - Estilizado como Floating Action Button */}
      <div className="fixed top-5 left-5 z-50 md:hidden">
        <button
          onClick={() => setAberto(!aberto)}
          className="p-3 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-100 shadow-2xl active:scale-95 transition-all"
        >
          {aberto ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Overlay com Blur Progressivo */}
      {aberto && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-md z-40 md:hidden animate-in fade-in duration-300"
          onClick={() => setAberto(false)}
        />
      )}

      {/* Sidebar - Estrutura Dark Premium */}
      <aside className={`
        fixed top-0 left-0 h-screen w-72 z-50 transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]
        bg-[#09090b] border-r border-zinc-800/50 flex flex-col
        ${aberto ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        
        {/* Header - Branding */}
        <div className="p-8 relative">
          <div className="flex items-center gap-4 group">
            <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl border border-zinc-700 bg-zinc-900 p-1">
              <Image src={img1} alt="Logo" className="object-cover transition-transform group-hover:scale-110 duration-500" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-black tracking-tighter text-zinc-100 italic uppercase leading-none">
                Frota<span className="text-blue-500">gest</span>
              </span>
              <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mt-1">Management</span>
            </div>
          </div>
          {/* Linha decorativa com gradiente */}
          <div className="absolute bottom-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent" />
        </div>

        {/* Navegação - Itens com Efeito Glossy */}
        <nav className="flex-1 overflow-y-auto px-4 py-6 space-y-8 custom-scrollbar">
          
          {/* Seção Principal */}
          <div className="space-y-1">
            <p className="px-4 text-[10px] font-bold text-zinc-600 uppercase tracking-[0.2em] mb-4">Menu Principal</p>
            {itensMenuPrincipal.filter(i => podeVer(i.papelRequired)).map((item) => {
              const ativo = pathname === item.rota || pathname.startsWith(item.rota + '/');
              const Icone = item.icone;
              return (
                <Link key={item.rota} href={item.rota} onClick={() => setAberto(false)}>
                  <div className={`
                    flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group
                    ${ativo 
                      ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' 
                      : 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/40 border border-transparent'}
                  `}>
                    <Icone className={`w-5 h-5 ${ativo ? 'text-blue-400' : 'group-hover:text-zinc-100'}`} />
                    <span className="text-sm font-semibold tracking-tight">{item.nome}</span>
                    {ativo && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_10px_#3b82f6]" />}
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Seção Suporte */}
          <div className="space-y-1">
            <p className="px-4 text-[10px] font-bold text-zinc-600 uppercase tracking-[0.2em] mb-4">Configurações</p>
            {itensMenuSecundario.filter(i => podeVer(i.papelRequired)).map((item) => {
              const ativo = pathname === item.rota;
              const Icone = item.icone;
              return (
                <Link key={item.rota} href={item.rota} onClick={() => setAberto(false)}>
                  <div className={`
                    flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all
                    ${ativo ? 'text-blue-400 bg-blue-500/5' : 'text-zinc-500 hover:text-zinc-200'}
                  `}>
                    <Icone className="w-4 h-4" />
                    <span className="text-sm font-medium">{item.nome}</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Footer - Perfil do Usuário */}
        <div className="p-4 mt-auto border-t border-zinc-800/50 bg-zinc-950/20">
          <div className="flex items-center gap-3 p-3 rounded-2xl border border-zinc-800/50 bg-zinc-900/30">
            <div className="h-9 w-9 rounded-full bg-gradient-to-tr from-zinc-800 to-zinc-700 flex items-center justify-center text-zinc-400 border border-white/5 uppercase font-bold text-xs">
              {usuarioAtual?.nome?.[0]}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-zinc-100 truncate uppercase">{usuarioAtual?.nome}</p>
              <p className="text-[10px] text-zinc-500 font-medium capitalize">{usuarioAtual?.papel}</p>
            </div>
          </div>
          
          <button
            onClick={handleLogout}
            className="w-full mt-3 flex items-center justify-center gap-2 py-2 text-xs font-bold text-zinc-500 hover:text-red-400 hover:bg-red-400/10 rounded-xl transition-all"
          >
            <LogOut className="w-4 h-4" />
            ENCERRAR SESSÃO
          </button>
        </div>
      </aside>
    </>
  );
}





// 'use client';

// import React from "react"

// import { usePathname, useRouter } from 'next/navigation';
// import Link from 'next/link';
// import { useAutenticacao } from '@/app/contexto/AutenticacaoContexto';
// import { Button } from '@/components/ui/button';
// import img1 from "@/public/frotagest-favicon.jpg"
// import Image from "next/image";
// import {
//   LayoutDashboard,
//   Users,
//   Truck,
//   Wrench,
//   BadgeDollarSign,
//   MapPin,
//   BarChart3,
//   Settings,
//   LogOut,
//   Fuel,
//   Bell,
//   User,
//   Menu,
//   Info,
//   X,
// } from 'lucide-react';
// import { useState } from 'react';

// interface ItemMenuNavegacao {
//   nome: string;
//   rota: string;
//   icone: React.ComponentType<{ className?: string }>;
//   papelRequired?: string[];
// }

// const itensMenuPrincipal: ItemMenuNavegacao[] = [
//   {
//     nome: 'Dashboard',
//     rota: '/dashboard',
//     icone: LayoutDashboard,
//   },
//   {
//     nome: 'Motoristas',
//     rota: '/motoristas',
//     icone: Users,
//     papelRequired: ['admin', 'gerente'],
//   },
//   {
//     nome: 'Veículos',
//     rota: '/veiculos',
//     icone: Truck,
//     papelRequired: ['admin', 'gerente'],
//   },
//   {
//     nome: 'Despesas',
//     rota: '/despesas',
//     icone: BadgeDollarSign,
//     papelRequired: ['admin', 'gerente'],
//   },
//   {
//     nome: 'Serviços',
//     rota: '/servicos',
//     icone: Wrench,
//     papelRequired: ['admin', 'gerente'],
//   },
//   {
//     nome: 'Viagens',
//     rota: '/viagens',
//     icone: MapPin,
//   },
//   {
//     nome: 'Análises',
//     rota: '/analises',
//     icone: BarChart3,
//     papelRequired: ['admin', 'gerente'],
//   },
// ];

// const itensMenuSecundario: ItemMenuNavegacao[] = [
//   {
//     nome: 'Postos de Combustível',
//     rota: '/postos-combustivel',
//     icone: Fuel,
//   },
//   {
//     nome: 'Lembretes',
//     rota: '/lembretes',
//     icone: Bell,
//   },
//   {
//     nome: 'Perfil',
//     rota: '/perfil',
//     icone: User,
//   },
//   {
//     nome: 'Configurações',
//     rota: '/configuracoes',
//     icone: Settings,
//     papelRequired: ['admin'],
//   },
//   {
//     nome: 'Sobre',
//     rota: '/sobre',
//     icone: Info,
//   },
// ];

// export function BarraNavegacao() {
//   const pathname = usePathname();
//   const router = useRouter();
//   const { usuarioAtual, realizarLogout } = useAutenticacao();
//   const [aberto, setAberto] = useState(false);

//   const handleLogout = () => {
//     realizarLogout();
//     router.push('/login');
//   };

//   const podeVer = (papelRequired?: string[]) => {
//     if (!papelRequired || papelRequired.length === 0) return true;
//     return papelRequired.includes(usuarioAtual?.papel || '');
//   };

//   const itensVisiveis = itensMenuPrincipal.filter(item => podeVer(item.papelRequired));
//   const itensSecundariosVisiveis = itensMenuSecundario.filter(item => podeVer(item.papelRequired));

//   return (
//     <>
//       {/* Botão mobile */}
//       <div className="fixed top-4 left-4 z-40 md:hidden">
//         <Button
//           variant="outline"
//           size="icon"
//           onClick={() => setAberto(!aberto)}
//         >
//           {aberto ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
//         </Button>
//       </div>

//       {/* Overlay mobile */}
//       {aberto && (
//         <div
//           className="fixed inset-0 bg-black/50 z-30 md:hidden"
//           onClick={() => setAberto(false)}
//         />
//       )}

//       {/* Sidebar */}
//       <aside className={`
//         fixed top-0 left-0 h-screen bg-sidebar border-r border-sidebar-border
//         w-64 z-40 transition-transform duration-300
//         md:translate-x-0
//         ${aberto ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
//       `}>
//         <div className="flex flex-col h-full">
//           {/* Logo */}
//           <div className="p-6 border-b flex flex-col items-center border-sidebar-border">
//             <Image src={img1} alt="" className="w-20 h-20" />
//             <h1 className="text-2xl font-bold text-sidebar-primary">Frotagest</h1>
//             <p className="text-sm text-sidebar-accent-foreground mt-1">Gestão de Frotas
//               {/* <span className="text-black font-semibold">
//                 {new Date().getHours()}:{new Date().getMinutes()}:{new Date().getSeconds()}
//               </span> */}
//             </p>
//           </div>

//           {/* Menu Principal */}
//           <nav className="flex-1 overflow-y-auto p-4">
//             <div className="space-y-2">
//               {itensVisiveis.map((item) => {
//                 const ativo = pathname === item.rota || pathname.startsWith(item.rota + '/');
//                 const IconeItem = item.icone;

//                 return (
//                   <Link key={item.rota} href={item.rota}>
//                     <Button
//                       variant={ativo ? 'default' : 'ghost'}
//                       className="w-full justify-start gap-3"
//                       onClick={() => setAberto(false)}
//                     >
//                       <IconeItem className="w-5 h-5" />
//                       <span>{item.nome}</span>
//                     </Button>
//                   </Link>
//                 );
//               })}
//             </div>

//             {/* Separador */}
//             <div className="my-4 border-t border-sidebar-border" />

//             {/* Menu Secundário */}
//             <div className="space-y-2">
//               {itensSecundariosVisiveis.map((item) => {
//                 const ativo = pathname === item.rota || pathname.startsWith(item.rota + '/');
//                 const IconeItem = item.icone;

//                 return (
//                   <Link key={item.rota} href={item.rota}>
//                     <Button
//                       variant={ativo ? 'default' : 'ghost'}
//                       className="w-full justify-start gap-3"
//                       onClick={() => setAberto(false)}
//                     >
//                       <IconeItem className="w-5 h-5" />
//                       <span>{item.nome}</span>
//                     </Button>
//                   </Link>
//                 );
//               })}
//             </div>
//           </nav>

//           {/* Rodapé */}
//           <div className="border-t border-sidebar-border p-4 space-y-2">
//             <div className="px-2 py-3 bg-sidebar-accent rounded-lg">
//               <p className="text-sm font-semibold text-sidebar-foreground">{usuarioAtual?.nome}</p>
//               <p className="text-xs text-sidebar-accent-foreground capitalize">{usuarioAtual?.papel}</p>
//             </div>
//             <Button
//               variant="ghost"
//               className="w-full justify-start gap-3 text-destructive hover:text-destructive"
//               onClick={handleLogout}
//             >
//               <LogOut className="w-5 h-5" />
//               <span>Sair</span>
//             </Button>
//           </div>
//         </div>
//       </aside>
//     </>
//   );
// }
