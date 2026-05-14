'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { useDados } from '@/app/contexto/DadosContexto';
import { FormularioMotorista } from '@/app/componentes/FormularioMotorista';
import { Motorista } from '@/app/tipos/indices';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

import { ArrowLeft } from 'lucide-react';

export default function PaginaAdicionarMotorista() {
  const router = useRouter();
  const { adicionarMotorista } = useDados();
  const [carregando, setCarregando] = useState(false);

  const handleSubmit = async (motorista: Motorista) => {
    try {
      setCarregando(true);

      await adicionarMotorista(motorista);

      router.push('/motoristas');
    } catch (error) {
      console.error("Erro ao criar motorista:", error);
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className="space-y-8">

      {/* HEADER */}
      <div className="flex items-center justify-between">

        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="rounded-xl"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>

          <div>
            <h1 className="text-3xl font-bold text-slate-800">
              Novo Motorista
            </h1>
            <p className="text-slate-500 mt-1">
              Preencha os dados para cadastrar um novo motorista
            </p>
          </div>
        </div>

      </div>

      {/* FORM CARD */}
      <Card className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

        <FormularioMotorista
          onSubmit={handleSubmit}
          carregando={carregando}
        />

      </Card>

    </div>
  );
}



// 'use client';

// import { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { useDados } from '@/app/contexto/DadosContexto';
// import { FormularioMotorista } from '@/app/componentes/FormularioMotorista';
// import { Motorista } from '@/app/tipos/indices';

// export default function PaginaAdicionarMotorista() {
//   const router = useRouter();
//   const { adicionarMotorista } = useDados();
//   const [carregando, setCarregando] = useState(false);

//   const handleSubmit = async (motorista: Motorista) => {
//     try {
//       setCarregando(true);

//       await adicionarMotorista(motorista); // 🔥 agora é backend real

//       router.push('/motoristas');
//     } catch (error) {
//       console.error("Erro ao criar motorista:", error);
//     } finally {
//       setCarregando(false);
//     }
//   };

//   return (
//     <div className="space-y-6">
//       <div>
//         <h1 className="text-3xl font-bold text-foreground">Novo Motorista</h1>
//         <p className="text-muted-foreground mt-2">
//           Preencha os dados para cadastrar um novo motorista
//         </p>
//       </div>

//       <FormularioMotorista onSubmit={handleSubmit} carregando={carregando} />
//     </div>
//   );
// }





// /*
// 'use client';

// import { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { useDados } from '@/app/contexto/DadosContexto';
// import { FormularioMotorista } from '@/app/componentes/FormularioMotorista';
// import { Motorista } from '@/app/tipos/indices';

// export default function PaginaAdicionarMotorista() {
//   const router = useRouter();
//   const { adicionarMotorista } = useDados();
//   const [carregando, setCarregando] = useState(false);

//   const handleSubmit = async (motorista: Motorista) => {
//     setCarregando(true);
//     await new Promise(resolve => setTimeout(resolve, 500));
//     adicionarMotorista(motorista);
//     router.push('/motoristas');
//     setCarregando(false);
//   };

//   return (
//     <div className="space-y-6">
//       <div>
//         <h1 className="text-3xl font-bold text-foreground">Novo Motorista</h1>
//         <p className="text-muted-foreground mt-2">Preencha os dados para cadastrar um novo motorista</p>
//       </div>

//       <FormularioMotorista onSubmit={handleSubmit} carregando={carregando} />
//     </div>
//   );
// }

// */
