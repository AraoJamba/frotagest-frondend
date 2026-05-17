"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { FormularioVeiculo } from "@/app/componentes/FormularioVeiculo";
import { Veiculo } from "@/app/tipos/indices";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

import { obterVeiculo, atualizarVeiculo } from "@/lib/veiculos";
import { Card } from "@/components/ui/card";

export default function PaginaEditarVeiculo() {
  const router = useRouter();
  const params = useParams();

  const [veiculo, setVeiculo] = useState<Veiculo | null>(null);
  const [carregando, setCarregando] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await obterVeiculo(params.id as string);

        setVeiculo({
          id: data.id,
          placa: data.placa,
          marca: data.marca,
          modelo: data.modelo,
          tipo: data.tipo,
          ano: data.ano,
          ativo: data.ativo,
          combustivel: data.combustivel,
          capacidadeCarga: data.capacidadeCarga,
          consumoMedio: data.consumoMedio,
          VIN: data.VIN,
          ultimaRevista: data.ultimaRevista,
          dataCadastro: data.dataCadastro,
        });
      } catch (err) {
        console.error("Erro ao buscar veículo:", err);
        setVeiculo(null);
      }
    };

    if (params?.id) fetch();
  }, [params.id]);

  const handleSubmit = async (dadosAtualizados: Veiculo) => {
    try {
      setCarregando(true);

      await atualizarVeiculo(veiculo!.id, dadosAtualizados);

      router.push("/veiculos");
    } catch (err) {
      console.error("Erro ao atualizar veículo:", err);
    } finally {
      setCarregando(false);
    }
  };

  if (!veiculo) {
    return (
      <div className="text-center py-10">
        <p className="text-muted-foreground">Carregando veículo...</p>
      </div>
    );
  }

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
          <h1 className="text-3xl font-bold text-foreground">Editar Veículo</h1>
          <p className="text-muted-foreground mt-2">
            Atualize os dados do veículo
          </p>
        </div>
      </div>

      {/* FORM */}
      <Card className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <FormularioVeiculo
          veiculo={veiculo}
          onSubmit={handleSubmit}
          carregando={carregando}
        />
      </Card>
    </div>
  );
}

// 'use client';

// import { useState, useEffect } from 'react';
// import { useRouter, useParams } from 'next/navigation';
// import { FormularioVeiculo } from '@/app/componentes/FormularioVeiculo';
// import { Veiculo } from '@/app/tipos/indices';
// import { Card } from '@/components/ui/card';

// import { obterVeiculo, atualizarVeiculo } from '@/lib/veiculos';

// export default function PaginaEditarVeiculo() {
//   const router = useRouter();
//   const params = useParams();

//   const [veiculo, setVeiculo] = useState<Veiculo | null>(null);
//   const [carregando, setCarregando] = useState(false);

//   // 🔥 BUSCAR DO BACKEND
//   useEffect(() => {
//     const fetch = async () => {
//       try {
//         const data = await obterVeiculo(params.id as string);

//         setVeiculo({
//           id: data.id,
//           placa: data.placa,
//           marca: data.marca,
//           modelo: data.modelo,
//           tipo: data.tipo,
//           ano: data.ano,
//           ativo: data.ativo,
//           combustivel: data.combustivel,
//           capacidadeCarga: data.capacidadeCarga,
//           consumoMedio: data.consumoMedio,
//           VIN: data.VIN,
//           ultimaRevista: data.ultimaRevista,
//           dataCadastro: data.dataCadastro,

//         });

//       } catch (err) {
//         console.error("Erro ao buscar veículo:", err);
//         setVeiculo(null);
//       }
//     };

//     if (params?.id) fetch();
//   }, [params.id]);

//   // 🔥 UPDATE REAL
//   const handleSubmit = async (dadosAtualizados: Veiculo) => {
//     try {
//       setCarregando(true);

//       await atualizarVeiculo(veiculo!.id, {
//         placa: dadosAtualizados.placa,
//         marca: dadosAtualizados.marca,
//         modelo: dadosAtualizados.modelo,
//         tipo: dadosAtualizados.tipo,
//         ano: dadosAtualizados.ano,
//         ativo: dadosAtualizados.ativo,
//         combustivel: dadosAtualizados.combustivel,
//         capacidadeCarga: dadosAtualizados.capacidadeCarga,
//         consumoMedio: dadosAtualizados.consumoMedio,
//         VIN: dadosAtualizados.VIN,
//         ultimaRevista: dadosAtualizados.ultimaRevista,
//         dataCadastro: dadosAtualizados.dataCadastro,
//       });

//       router.push('/veiculos');

//     } catch (err) {
//       console.error("Erro ao atualizar veículo:", err);
//     } finally {
//       setCarregando(false);
//     }
//   };

//   if (!veiculo) {
//     return (
//       <Card className="p-8 text-center">
//         <p className="text-muted-foreground">Carregando veículo...</p>
//       </Card>
//     );
//   }

//   return (
//     <div className="space-y-6">
//       <div>
//         <h1 className="text-3xl font-bold">Editar Veículo</h1>
//         <p className="text-muted-foreground">Atualize os dados</p>
//       </div>

//       <FormularioVeiculo
//         veiculo={veiculo}
//         onSubmit={handleSubmit}
//         carregando={carregando}
//       />
//     </div>
//   );
// }

// 'use client';

// import { useState, useEffect } from 'react';
// import { useRouter, useParams } from 'next/navigation';
// import { useDados } from '@/app/contexto/DadosContexto';
// import { FormularioVeiculo } from '@/app/componentes/FormularioVeiculo';
// import { Veiculo } from '@/app/tipos/indices';
// import { Card } from '@/components/ui/card';

// export default function PaginaEditarVeiculo() {
//   const router = useRouter();
//   const params = useParams();
//   const { obterVeiculo, atualizarVeiculo } = useDados();
//   const [veiculo, setVeiculo] = useState<Veiculo | null>(null);
//   const [carregando, setCarregando] = useState(false);

//   useEffect(() => {
//     const id = params.id as string;
//     const veiculoEncontrado = obterVeiculo(id);
//     if (veiculoEncontrado) {
//       setVeiculo(veiculoEncontrado);
//     }
//   }, [params.id, obterVeiculo]);

//   if (!veiculo) {
//     return (
//       <Card className="p-8 text-center">
//         <p className="text-muted-foreground">Veículo não encontrado</p>
//       </Card>
//     );
//   }

//   const handleSubmit = async (dadosAtualizados: Veiculo) => {
//     setCarregando(true);
//     await new Promise(resolve => setTimeout(resolve, 500));
//     atualizarVeiculo(veiculo.id, dadosAtualizados);
//     router.push('/veiculos');
//     setCarregando(false);
//   };

//   return (
//     <div className="space-y-6">
//       <div>
//         <h1 className="text-3xl font-bold text-foreground">Editar Veículo</h1>
//         <p className="text-muted-foreground mt-2">Atualize os dados do veículo</p>
//       </div>

//       <FormularioVeiculo veiculo={veiculo} onSubmit={handleSubmit} carregando={carregando} />
//     </div>
//   );
// }
