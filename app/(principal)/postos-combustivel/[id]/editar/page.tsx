'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { FormularioPostoCombustivel } from '@/app/componentes/FormularioPostoCombustivel';
import { useEffect, useState } from 'react';
import { useDados } from '@/app/contexto/DadosContexto';
import { PostoCombustivel } from '@/app/tipos/indices';

export default function PaginaEditarPostoCombustivel() {
  const router = useRouter();
  const params = useParams();
  const { obterPostoCombustivel, atualizarPostoCombustivel } = useDados();
  const [postoCombustivel, setPostoCombustivel] = useState<PostoCombustivel | null>(null);
  const [carregando, setCarregando] = useState(false);

  useEffect(() => {
    const id = params.id as string;
    const postoCombustivelEncontrado = obterPostoCombustivel(id);
    if (postoCombustivelEncontrado) {
      setPostoCombustivel(postoCombustivelEncontrado);
    }
  }, [params.id, obterPostoCombustivel]);

  if (!postoCombustivel) {
    return (
      <Card className="p-8 text-center">
        <p className="text-muted-foreground">Posto de Combustivel não encontrado</p>
      </Card>
    );
  }

  const handleSubmit = async (dadosAtualizados: PostoCombustivel) => {
    setCarregando(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    atualizarPostoCombustivel(postoCombustivel.id, dadosAtualizados);
    router.push('/postos-combustivel');
    setCarregando(false);
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.back()}
        >
          <ArrowLeft className="w-6 h-6" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-foreground">Editar Posto</h1>
          <p className="text-muted-foreground mt-2">Atualize os dados do posto</p>
        </div>
      </div>

      <FormularioPostoCombustivel postoCombustivel={postoCombustivel} onSubmit={handleSubmit} carregando={carregando}  />
    </div>
  );
}
