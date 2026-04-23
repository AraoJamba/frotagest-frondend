'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useDados } from '@/app/contexto/DadosContexto';
import { useState } from 'react';
import { Despesa } from '@/app/tipos/indices';
import { FormularioDespesa } from '@/app/componentes/FormularioDespesa';

export default function PaginaAdicionarDespesa() {
    const router = useRouter();
    const { adicionarDespesa } = useDados();
    const [carregando, setCarregando] = useState(false);

    const handleSubmit = async (despesa: Despesa) => {
      setCarregando(carregando);
      await new Promise(resolve => setTimeout(resolve, 500));
      adicionarDespesa(despesa);
      router.push('/despesas');
      setCarregando(false);
    }
  
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Link href="/despesas">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="w-6 h-6" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Novo Despesa</h1>
            <p className="text-muted-foreground mt-2">Crie um novo despesa</p>
          </div>
        </div>

        <FormularioDespesa onSubmit={handleSubmit} carregando={carregando} />
      </div>
    );
  }
