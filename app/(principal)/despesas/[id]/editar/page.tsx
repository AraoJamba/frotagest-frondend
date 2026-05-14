'use client';

import { Card } from '@/components/ui/card';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { Despesa } from '@/app/tipos/indices';
import { useDados } from '@/app/contexto/DadosContexto';
import { FormularioDespesa } from '@/app/componentes/FormularioDespesa';

export default function PaginaEditarDespesa() {
  const router = useRouter();
  const params = useParams();

  const { obterDespesa, atualizarDespesa } = useDados();

  const [despesa, setDespesa] = useState<Despesa | null>(null);
  const [carregando, setCarregando] = useState(false);

  useEffect(() => {
    const id = params.id as string;

    const despesaEncontrada = obterDespesa(id);

    if (despesaEncontrada) {
      setDespesa(despesaEncontrada);
    }
  }, [params.id, obterDespesa]);

  if (!despesa) {
    return (
      <Card className="p-8 text-center">
        <p className="text-muted-foreground">
          Despesa não encontrada
        </p>
      </Card>
    );
  }

  const handleSubmit = async (dadosAtualizados: Despesa) => {
    try {
      setCarregando(true);

      await atualizarDespesa(despesa.id, dadosAtualizados);

      router.push('/despesas');
    } catch (error) {
      console.error('Erro ao atualizar despesa:', error);
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className="space-y-6">

      {/* HEADER IGUAL AO MOTORISTA */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">
          Editar Despesa
        </h1>
        <p className="text-muted-foreground mt-2">
          Atualize os dados da despesa
        </p>
      </div>

      {/* FORMULÁRIO */}
      <Card className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <FormularioDespesa
        despesa={despesa}
        onSubmit={handleSubmit}
        carregando={carregando}
      />
      </Card>

    </div>
  );
}



// 'use client';

// import { Card } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { useParams, useRouter } from 'next/navigation';
// import { ArrowLeft } from 'lucide-react';
// import { useEffect, useState } from 'react';
// import { Despesa, Lembrete } from '@/app/tipos/indices';
// import { useDados } from '@/app/contexto/DadosContexto';
// import { FormularioDespesa } from '@/app/componentes/FormularioDespesa';

// export default function PaginaEditarLembrete() {
//   const router = useRouter();
//   const params = useParams();
//   const { obterDespesa, atualizarDespesa } = useDados();
//   const [despesa, setDespesa] = useState<Despesa | null>(null);
//   const [carregando, setCarregando] = useState(false);

//   useEffect(() => {
//     const id = params.id as string;
//     const despesaEncontrado = obterDespesa(id);
//     if (despesaEncontrado) {
//       setDespesa(despesaEncontrado);
//     }
//   }, [params.id, obterDespesa]);

//   if (!despesa) {
//     return (
//       <Card className="p-8 text-center">
//         <p className="text-muted-foreground">Despesa não encontrado</p>
//       </Card>
//     );
//   }

//   const handleSubmit = async (dadosAtualizados: Despesa) => {
//     setCarregando(true);
//     await new Promise(resolve => setTimeout(resolve, 500));
//     atualizarDespesa(despesa.id, dadosAtualizados);
//     router.push('/despesas');
//     setCarregando(false);
//   }

//   return (
//     <div className="space-y-6">
//       <div className="flex items-center gap-4">
//         <Button
//           variant="ghost"
//           size="icon"
//           onClick={() => router.back()}
//         >
//           <ArrowLeft className="w-6 h-6" />
//         </Button>
//         <div>
//           <h1 className="text-3xl font-bold text-foreground">Editar Despesa</h1>
//           <p className="text-muted-foreground mt-2">Atualize a despesa</p>
//         </div>
//       </div>

//       <FormularioDespesa onSubmit={handleSubmit} carregando={carregando} />
//     </div>
//   );
// }
