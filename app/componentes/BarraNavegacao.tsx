'use client';

import React, { useState } from "react";
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from "next/image";

import { useAutenticacao } from '@/app/contexto/AutenticacaoContexto';

import img1 from "@/public/frotagest-favicon.jpg";

import {
  LayoutDashboard,
  Users,
  Truck,
  Wrench,
  BadgeDollarSign,
  MapPin,
  BarChart3,
  Settings,
  LogOut,
  Fuel,
  Bell,
  User,
  Menu,
  Info,
  X
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
    nome: 'Manutenções',
    rota: '/manutencoes',
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
    nome: 'Postos',
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
    if (!papelRequired) return true;

    return papelRequired.includes(usuarioAtual?.papel || '');
  };

  return (
    <>
      {/* MOBILE BUTTON */}
      <button
        onClick={() => setAberto(!aberto)}
        className="fixed top-4 left-4 z-50 md:hidden p-3 rounded-xl bg-white border border-slate-200 shadow-md"
      >
        {aberto ? (
          <X className="w-5 h-5 text-slate-700" />
        ) : (
          <Menu className="w-5 h-5 text-slate-700" />
        )}
      </button>

      {/* OVERLAY */}
      {aberto && (
        <div
          className="fixed inset-0 bg-black/30 z-40 md:hidden"
          onClick={() => setAberto(false)}
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`
          fixed top-0 left-0 z-50 h-screen w-72
          bg-white border-r border-slate-200
          flex flex-col transition-all duration-300
          ${aberto ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}
      >

        {/* LOGO */}
        <div className="h-20 border-b border-slate-200 flex items-center px-6">

          <div className="flex items-center gap-3">

            <div className="h-11 w-11 rounded-xl overflow-hidden border border-slate-200">
              <Image
                src={img1}
                alt="Logo"
                className="object-cover"
              />
            </div>

            <div>
              <h1 className="text-lg font-bold text-slate-800">
                Frota<span className="text-blue-600">Gest</span>
              </h1>

              <p className="text-xs text-slate-500">
                Gestão de Frotas
              </p>
            </div>
          </div>
        </div>

        {/* NAVIGATION */}
        <nav className="flex-1 overflow-y-auto px-4 py-6">

          {/* MAIN */}
          <div className="mb-8">

            <p className="px-3 mb-3 text-xs font-semibold uppercase tracking-wide text-slate-400">
              Principal
            </p>

            <div className="space-y-1">

              {itensMenuPrincipal
                .filter(i => podeVer(i.papelRequired))
                .map((item) => {

                  const ativo =
                    pathname === item.rota ||
                    pathname.startsWith(item.rota + '/');

                  const Icone = item.icone;

                  return (
                    <Link
                      key={item.rota}
                      href={item.rota}
                      onClick={() => setAberto(false)}
                    >
                      <div
                        className={`
                          flex items-center gap-3 px-4 py-3 rounded-xl
                          transition-all duration-200
                          ${
                            ativo
                              ? 'bg-blue-50 text-blue-700 font-semibold'
                              : 'text-slate-600 hover:bg-slate-100'
                          }
                        `}
                      >

                        <Icone className="w-5 h-5" />

                        <span className="text-sm">
                          {item.nome}
                        </span>
                      </div>
                    </Link>
                  );
                })}
            </div>
          </div>

          {/* SECONDARY */}
          <div>

            <p className="px-3 mb-3 text-xs font-semibold uppercase tracking-wide text-slate-400">
              Sistema
            </p>

            <div className="space-y-1">

              {itensMenuSecundario
                .filter(i => podeVer(i.papelRequired))
                .map((item) => {

                  const ativo = pathname === item.rota;

                  const Icone = item.icone;

                  return (
                    <Link
                      key={item.rota}
                      href={item.rota}
                      onClick={() => setAberto(false)}
                    >
                      <div
                        className={`
                          flex items-center gap-3 px-4 py-3 rounded-xl
                          transition-all duration-200
                          ${
                            ativo
                              ? 'bg-blue-50 text-blue-700 font-semibold'
                              : 'text-slate-600 hover:bg-slate-100'
                          }
                        `}
                      >

                        <Icone className="w-4 h-4" />

                        <span className="text-sm">
                          {item.nome}
                        </span>
                      </div>
                    </Link>
                  );
                })}
            </div>
          </div>
        </nav>

        {/* FOOTER */}
        <div className="border-t border-slate-200 p-4">

          <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50">

            <div className="h-10 w-10 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold uppercase">
              {usuarioAtual?.nome?.[0]}
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-slate-700 truncate">
                {usuarioAtual?.nome}
              </p>

              <p className="text-xs text-slate-500 capitalize">
                {usuarioAtual?.papel}
              </p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="mt-3 w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-slate-200 text-slate-600 hover:bg-red-50 hover:text-red-600 transition-all"
          >
            <LogOut className="w-4 h-4" />

            <span className="text-sm font-medium">
              Terminar Sessão
            </span>
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
