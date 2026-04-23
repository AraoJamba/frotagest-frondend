'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FormularioVeiculo } from '@/app/componentes/FormularioVeiculo';
import { Veiculo } from '@/app/tipos/indices';

import { criarVeiculo } from '@/lib/veiculos';

export default function PaginaAdicionarVeiculo() {
  const router = useRouter();
  const [carregando, setCarregando] = useState(false);

  const handleSubmit = async (veiculo: Veiculo) => {
    try {
      setCarregando(true);

      await criarVeiculo({
        placa: veiculo.placa,
        marca: veiculo.marca,
        modelo: veiculo.modelo,
        tipo: veiculo.tipo,
        ano: veiculo.ano,
        combustivel: veiculo.combustivel,
        capacidadeCarga: veiculo.capacidadeCarga,
        consumoMedio:veiculo.consumoMedio,
        VIN: veiculo.VIN,
        ultimaRevista: veiculo.ultimaRevista,
        dataCadastro: veiculo.dataCadastro,
        ativo: veiculo.ativo,
      });

      router.push('/veiculos');

    } catch (err) {
      console.error("Erro ao criar veículo:", err);
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Novo Veículo</h1>
        <p className="text-muted-foreground">
          Preencha os dados do veículo
        </p>
      </div>

      <FormularioVeiculo
        onSubmit={handleSubmit}
        carregando={carregando}
      />
    </div>
  );
}







// 'use client';

// import { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { useDados } from '@/app/contexto/DadosContexto';
// import { FormularioVeiculo } from '@/app/componentes/FormularioVeiculo';
// import { Veiculo } from '@/app/tipos/indices';

// export default function PaginaAdicionarVeiculo() {
//   const router = useRouter();
//   const { adicionarVeiculo } = useDados();
//   const [carregando, setCarregando] = useState(false);

//   const handleSubmit = async (veiculo: Veiculo) => {
//     setCarregando(true);
//     await new Promise(resolve => setTimeout(resolve, 500));
//     adicionarVeiculo(veiculo);
//     router.push('/veiculos');
//     setCarregando(false);
//   };

//   return (
//     <div className="space-y-6">
//       <div>
//         <h1 className="text-3xl font-bold text-foreground">Novo Veículo</h1>
//         <p className="text-muted-foreground mt-2">Preencha os dados para cadastrar um novo veículo</p>
//       </div>

//       <FormularioVeiculo onSubmit={handleSubmit} carregando={carregando} />
//     </div>
//   );
// }
