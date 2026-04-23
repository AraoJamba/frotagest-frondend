'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { FormularioMotorista } from '@/app/componentes/FormularioMotorista';
import { Motorista } from '@/app/tipos/indices';
import { Card } from '@/components/ui/card';

import { obterMotorista, atualizarMotorista } from '@/lib/motoristas';

export default function PaginaEditarMotorista() {
  const router = useRouter();
  const params = useParams();

  const [motorista, setMotorista] = useState<Motorista | null>(null);
  const [carregando, setCarregando] = useState(false);

  // 🔥 BUSCAR DO BACKEND
  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await obterMotorista(params.id as string);

        setMotorista({
          id: data.id,
          nome: data.nome,
          email: data.email,
          telefone: data.telefone,

          numeroCarta: data.numeroCarta,
          numeroBI: data.numeroBI,
          categoriaCarta: data.categoriaCarta,

          dataNascimento: data.dataNascimento,
          dataValidadeCarta: data.dataValidadeCarta,
          dataCadastro: data.dataCadastro,

          ativo: data.ativo,
          endereco: data.endereco,
          cidade: data.cidade,
          provincia: data.provincia,
        });

      } catch (err) {
        console.error(err);
        setMotorista(null);
      }
    };

    if (params?.id) fetch();
  }, [params.id]);

  // 🔥 SUBMIT REAL (PUT BACKEND)
  const handleSubmit = async (dadosAtualizados: Motorista) => {
    try {
      setCarregando(true);

      await atualizarMotorista(motorista!.id, {
        nome: dadosAtualizados.nome,
        email: dadosAtualizados.email,
        telefone: dadosAtualizados.telefone,

        numero_carta: dadosAtualizados.numeroCarta,
        numero_bi: dadosAtualizados.numeroBI,
        categoria_carta: dadosAtualizados.categoriaCarta,

        data_nascimento: dadosAtualizados.dataNascimento,
        data_validade_carta: dadosAtualizados.dataValidadeCarta,
        data_cadastro: dadosAtualizados.dataCadastro,

        ativo: dadosAtualizados.ativo,
        endereco: dadosAtualizados.endereco,
        cidade: dadosAtualizados.cidade,
        provincia: dadosAtualizados.provincia,
      });

      router.push('/motoristas');

    } catch (err) {
      console.error("Erro ao atualizar motorista:", err);
    } finally {
      setCarregando(false);
    }
  };

  if (!motorista) {
    return (
      <Card className="p-8 text-center">
        <p className="text-muted-foreground">Carregando motorista...</p>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Editar Motorista</h1>
        <p className="text-muted-foreground">Atualize os dados do motorista</p>
      </div>

      <FormularioMotorista
        motorista={motorista}
        onSubmit={handleSubmit}
        carregando={carregando}
      />
    </div>
  );
}





// 'use client';

// import { useState, useEffect } from 'react';
// import { useRouter, useParams } from 'next/navigation';
// import { useDados } from '@/app/contexto/DadosContexto';
// import { FormularioMotorista } from '@/app/componentes/FormularioMotorista';
// import { Motorista } from '@/app/tipos/indices';
// import { Card } from '@/components/ui/card';

// export default function PaginaEditarMotorista() {
//   const router = useRouter();
//   const params = useParams();
//   const { obterMotorista, atualizarMotorista } = useDados();
//   const [motorista, setMotorista] = useState<Motorista | null>(null);
//   const [carregando, setCarregando] = useState(false);

//   useEffect(() => {
//     const id = params.id as string;
//     const motoristaEncontrado = obterMotorista(id);
//     if (motoristaEncontrado) {
//       setMotorista(motoristaEncontrado);
//     }
//   }, [params.id, obterMotorista]);

//   if (!motorista) {
//     return (
//       <Card className="p-8 text-center">
//         <p className="text-muted-foreground">Motorista não encontrado</p>
//       </Card>
//     );
//   }

//   const handleSubmit = async (dadosAtualizados: Motorista) => {
//     setCarregando(true);
//     await new Promise(resolve => setTimeout(resolve, 500));
//     atualizarMotorista(motorista.id, dadosAtualizados);
//     router.push('/motoristas');
//     setCarregando(false);
//   };

//   return (
//     <div className="space-y-6">
//       <div>
//         <h1 className="text-3xl font-bold text-foreground">Editar Motorista</h1>
//         <p className="text-muted-foreground mt-2">Atualize os dados do motorista</p>
//       </div>

//       <FormularioMotorista motorista={motorista} onSubmit={handleSubmit} carregando={carregando} />
//     </div>
//   );
// }
