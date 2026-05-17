"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDados } from "@/app/contexto/DadosContexto";
import { ManutencaoVeiculo } from "@/app/tipos/indices";
import { FormularioManutencao } from "@/app/componentes/FormularioManutencoes";

import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Card } from "@/components/ui/card";

export default function PaginaAdicionarManutencao() {
  const router = useRouter();
  const { adicionarManutencao } = useDados();
  const [carregando, setCarregando] = useState(false);

  const handleSubmit = async (manutencao: ManutencaoVeiculo) => {
    try {
      setCarregando(true);

      await adicionarManutencao(manutencao);

      router.push("/manutencoes");
    } catch (error) {
      console.error("Erro ao criar manutenção:", error);
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* HEADER PADRÃO */}
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
          <h1 className="text-3xl font-bold text-foreground">
            Nova Manutenção
          </h1>
          <p className="text-muted-foreground mt-2">
            Cadastre uma nova manutenção
          </p>
        </div>
      </div>

      {/* FORM */}
      <Card className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <FormularioManutencao onSubmit={handleSubmit} carregando={carregando} />
      </Card>
    </div>
  );
}

// 'use client';

// import { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { useDados } from '@/app/contexto/DadosContexto';
// import { ManutencaoVeiculo } from '@/app/tipos/indices';
// import { FormularioManutencao } from '@/app/componentes/FormularioManutencoes';

// export default function PaginaAdicionarManutencao() {
//   const router = useRouter();
//   const { adicionarManutencao } = useDados();
//   const [carregando, setCarregando] = useState(false);

//   const handleSubmit = async (manutencao: ManutencaoVeiculo) => {
//     setCarregando(true);
//     await new Promise(resolve => setTimeout(resolve, 500));
//     adicionarManutencao(manutencao);
//     router.push('/manutencoes');
//     setCarregando(false);
//   };

//   return (
//     <div className="space-y-6">
//       <div>
//         <h1 className="text-3xl font-bold text-foreground">Nova Manutenção</h1>
//         <p className="text-muted-foreground mt-2">Cadastre uma nova manutenção disponível</p>
//       </div>

//       <FormularioManutencao onSubmit={handleSubmit} carregando={carregando} />
//     </div>
//   );
// }
