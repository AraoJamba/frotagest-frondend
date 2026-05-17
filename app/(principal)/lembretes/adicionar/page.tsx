'use client';

import { useRouter } from 'next/navigation';
import { useDados } from '@/app/contexto/DadosContexto';
import { useState } from 'react';

import { Lembrete } from '@/app/tipos/indices';
import { FormularioLembrete } from '@/app/componentes/FormularioLembrete';
import { Card } from '@/components/ui/card';

export default function PaginaAdicionarLembrete() {
  const router = useRouter();
  const { adicionarLembrete } = useDados();

  const [carregando, setCarregando] = useState(false);

  const handleSubmit = async (lembrete: Lembrete) => {
    try {
      setCarregando(true);

      await adicionarLembrete(lembrete);

      router.push('/lembretes');
    } catch (error) {
      console.error('Erro ao criar lembrete:', error);
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className="space-y-6">

      {/* HEADER PADRÃO */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">
          Novo Lembrete
        </h1>
        <p className="text-muted-foreground mt-2">
          Preencha os dados para cadastrar um novo lembrete
        </p>
      </div>

      {/* FORMULÁRIO */}
      <Card className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <FormularioLembrete onSubmit={handleSubmit} carregando={carregando} />
      </Card>
      

    </div>
  );
}





// 'use client';

// import { Card } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import Link from 'next/link';
// import { ArrowLeft } from 'lucide-react';
// import { useRouter } from 'next/navigation';
// import { useDados } from '@/app/contexto/DadosContexto';
// import { useState } from 'react';
// import { Lembrete } from '@/app/tipos/indices';
// import { FormularioLembrete } from '@/app/componentes/FormularioLembrete';

// export default function PaginaAdicionarLembrete() {
//     const router = useRouter();
//     const { adicionarLembrete } = useDados();
//     const [carregando, setCarregando] = useState(false);

//     const handleSubmit = async (lembrete: Lembrete) => {
//       setCarregando(carregando);
//       await new Promise(resolve => setTimeout(resolve, 500));
//       adicionarLembrete(lembrete);
//       router.push('/lembretes');
//       setCarregando(false);
//     }
  
//     return (
//       <div className="space-y-6">
//         <div className="flex items-center gap-4">
//           <Link href="/lembretes">
//             <Button variant="ghost" size="icon">
//               <ArrowLeft className="w-6 h-6" />
//             </Button>
//           </Link>
//           <div>
//             <h1 className="text-3xl font-bold text-foreground">Novo Lembrete</h1>
//             <p className="text-muted-foreground mt-2">Crie um novo lembrete</p>
//           </div>
//         </div>

//         <FormularioLembrete onSubmit={handleSubmit} carregando={carregando} />
//       </div>
//     );
//   }
