"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { useDados } from "@/app/contexto/DadosContexto";
import { useState } from "react";
import { Viagem } from "@/app/tipos/indices";
import { FormularioViagem } from "@/app/componentes/FormularioViagem";
import { Card } from "@/components/ui/card";

export default function PaginaAdicionarViagem() {
  const router = useRouter();
  const { adicionarViagem } = useDados();
  const [carregando, setCarregando] = useState(false);

  const handleSubmit = async (viagem: Viagem) => {
    try {
      setCarregando(true);

      await adicionarViagem(viagem);

      router.push("/viagens");
    } catch (error) {
      console.error("Erro ao criar viagem:", error);
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={() => router.back()}
        >
          <ArrowLeft className="w-6 h-6" />
        </Button>

        <div>
          <h1 className="text-3xl font-bold text-foreground">Nova Viagem</h1>
          <p className="text-muted-foreground mt-2">Registre uma nova viagem</p>
        </div>
      </div>

      <Card className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <FormularioViagem onSubmit={handleSubmit} carregando={carregando} />
      </Card>
    </div>
  );
}

// 'use client';

// import { Button } from '@/components/ui/button';
// import Link from 'next/link';
// import { useRouter } from 'next/navigation';
// import { ArrowLeft } from 'lucide-react';
// import { useDados } from '@/app/contexto/DadosContexto';
// import { useState } from 'react';
// import { Viagem } from '@/app/tipos/indices';
// import { resolve } from 'path';
// import { FormularioViagem } from '@/app/componentes/FormularioViagem';

// export default function PaginaAdicionarViagem() {
//   const router = useRouter();
//   const { adicionarViagem } = useDados();
//   const [carregando, setCarregando] = useState(false);

//   const handleSubmit = async (viagem: Viagem) => {
//     setCarregando(carregando);
//     await new Promise(resolve => setTimeout(resolve, 500));
//     adicionarViagem(viagem);
//     router.push('/viagens');
//     setCarregando(false);
//   }

//   return (
//     <div className="space-y-6">
//       <div className="flex items-center gap-4">
//         <Link href="/viagens">
//           <Button variant="ghost" size="icon">
//             <ArrowLeft className="w-6 h-6" />
//           </Button>
//         </Link>
//         <div>
//           <h1 className="text-3xl font-bold text-foreground">Nova Viagem</h1>
//           <p className="text-muted-foreground mt-2">Registre uma nova viagem</p>
//         </div>
//       </div>

//       <FormularioViagem onSubmit={handleSubmit} carregando={carregando} />
//     </div>
//   );
// }
