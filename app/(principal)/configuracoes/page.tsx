'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function PaginaConfiguracoes() {
  const [carregando, setCarregando] = useState(false);
  const [empresa, setEmpresa] = useState({
    nome: 'Jamba Transportadora, Lda',
    NIF: '50000000000000',
    endereco: 'Rua das Quebras Molas, Estagem, Viana, Luanda',
    telefone: '(+244) 927 636 677',
    email: 'geral@jamba.com',
  });

  const [medidas, setMedidas] = useState({
    distancia: 'km',
    combustivel: 'kmL',
    peso: 'kg',
  });

  const [app, setApp] = useState({
    temaEscuro: false,
    notificacoes: true,
    emailNotificacoes: true,
  });

  const handleSalvarEmpresa = async () => {
    setCarregando(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    setCarregando(false);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Configurações</h1>
        <p className="text-muted-foreground mt-2">Personalize sua experiência e configuração do sistema</p>
      </div>

      <Tabs defaultValue="empresa" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="empresa">Empresa</TabsTrigger>
          <TabsTrigger value="medidas">Medidas</TabsTrigger>
          {/*<TabsTrigger value="app">Aplicação</TabsTrigger>*/}
        </TabsList>

        {/* Tab Empresa */}
        <TabsContent value="empresa" className="space-y-4">
          <Card className="p-6">
            <h2 className="text-xl font-bold text-foreground mb-6">Informações da Empresa</h2>
            <div className="space-y-4">
              <div>
                <Label htmlFor="nomeEmpresa">Nome da Empresa</Label>
                <Input
                  id="nomeEmpresa"
                  value={empresa.nome}
                  onChange={(e) => setEmpresa({ ...empresa, nome: e.target.value })}
                />
              </div>

              <div>
                <Label htmlFor="nif">NIF</Label>
                <Input
                  id="nif"
                  value={empresa.NIF}
                  onChange={(e) => setEmpresa({ ...empresa, NIF: e.target.value })}
                />
              </div>

              <div>
                <Label htmlFor="endereco">Endereço</Label>
                <Input
                  id="endereco"
                  value={empresa.endereco}
                  onChange={(e) => setEmpresa({ ...empresa, endereco: e.target.value })}
                />
              </div>

              <div>
                <Label htmlFor="telefone">Telefone</Label>
                <Input
                  id="telefone"
                  value={empresa.telefone}
                  onChange={(e) => setEmpresa({ ...empresa, telefone: e.target.value })}
                />
              </div>

              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={empresa.email}
                  onChange={(e) => setEmpresa({ ...empresa, email: e.target.value })}
                />
              </div>

              <Button onClick={handleSalvarEmpresa} disabled={carregando}>
                {carregando ? 'Salvando...' : 'Salvar Configurações'}
              </Button>
            </div>
          </Card>
        </TabsContent>

        {/* Tab Medidas */}
        <TabsContent value="medidas" className="space-y-4">
          <Card className="p-6">
            <h2 className="text-xl font-bold text-foreground mb-6">Unidades de Medida</h2>
            <div className="space-y-4">
              <div>
                <Label htmlFor="unidadeDistancia">Unidade de Distância</Label>
                <Select value={medidas.distancia} onValueChange={(value) => setMedidas({ ...medidas, distancia: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="km">Quilômetros (km)</SelectItem>
                    <SelectItem value="mi">Milhas (mi)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="unidadeCombustivel">Unidade de Consumo de Combustível</Label>
                <Select value={medidas.combustivel} onValueChange={(value) => setMedidas({ ...medidas, combustivel: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="kmL">km/L</SelectItem>
                    <SelectItem value="kmgal">km/gal</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="unidadePeso">Unidade de Peso</Label>
                <Select value={medidas.peso} onValueChange={(value) => setMedidas({ ...medidas, peso: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="kg">Quilogramas (kg)</SelectItem>
                    <SelectItem value="lb">Libras (lb)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button onClick={() => console.log('Salvar medidas')}>
                Salvar Configurações
              </Button>
            </div>
          </Card>
        </TabsContent>

        {/* Tab App 
        <TabsContent value="app" className="space-y-4">
          <Card className="p-6">
            <h2 className="text-xl font-bold text-foreground mb-6">Preferências da Aplicação</h2>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="temaEscuro">Tema Escuro</Label>
                  <p className="text-sm text-muted-foreground">Use tema escuro por padrão</p>
                </div>
                <Switch
                  id="temaEscuro"
                  checked={app.temaEscuro}
                  onCheckedChange={(checked) => setApp({ ...app, temaEscuro: checked })}
                />
              </div>

              <div className="flex items-center justify-between border-t border-border pt-6">
                <div>
                  <Label htmlFor="notificacoes">Notificações</Label>
                  <p className="text-sm text-muted-foreground">Ativar notificações do sistema</p>
                </div>
                <Switch
                  id="notificacoes"
                  checked={app.notificacoes}
                  onCheckedChange={(checked) => setApp({ ...app, notificacoes: checked })}
                />
              </div>

              <div className="flex items-center justify-between border-t border-border pt-6">
                <div>
                  <Label htmlFor="emailNotificacoes">Notificações por Email</Label>
                  <p className="text-sm text-muted-foreground">Receber atualizações por email</p>
                </div>
                <Switch
                  id="emailNotificacoes"
                  checked={app.emailNotificacoes}
                  onCheckedChange={(checked) => setApp({ ...app, emailNotificacoes: checked })}
                />
              </div>

              

              <Button onClick={() => console.log('Salvar app')} className="mt-4">
                Salvar Configurações
              </Button>
            </div>
          </Card>
        </TabsContent>
        */}
      </Tabs>
    </div>
  );
}
