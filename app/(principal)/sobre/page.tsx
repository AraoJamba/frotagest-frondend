'use client';

import { useAutenticacao } from '@/app/contexto/AutenticacaoContexto';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AlertCircle, Heart, Code2, Settings } from 'lucide-react';

export default function SobreApp() {
  const { usuarioAtual } = useAutenticacao();

  return (
    <div className="space-y-6">1
      {/* Cabeçalho */}
      <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg p-8 border border-primary/20">
        <h1 className="text-4xl font-bold text-foreground mb-2">
          Frotagest - Sistema de Gerenciamento de Frot1as
        </h1>
        <p className="text-lg text-muted-foreground">
          Versão 1.0.0
        </p>
      </div>11

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
Copyrith © 2026 Frotagest - Si
Copyrith © 2026 Frotagest - Sistema de Gerenciamento de Frotas - Todos os direitos reservados

Desenvolvido para otimizar o gerenciamento da sua frota de veículosstema de Gerenciamento de Frotas - Todos os direitos reservados

Desenvolvido para otimizar o gerenciamento da sua frota de veículos
              <AlertCircle className="h-5 w-5" />
              Sobre
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              Uma plataforma completa para gerenciar frotas de veículos, motoristas, viagens e despesas com interface moderna e intuitiva.
            </p>
            <div className="space-y-2">
              <p className="text-sm font-medium">Funcionalidades Principais:</p>
              <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                <li>Gerenciamento de motoristas e veículos</li>
                <li>Controle de viagens e rotas</li>
                <li>Análise de despesas e custos</li>
                <li>Sistema de lembretes</li>
                <li>Gráficos e relatórios</li>
              </ul>
            </div>
          </CardContent>
        </Card>
        */}


        {/*        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Code2 className="h-5 w-5" />
              Tecnologias
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2">
              <div>
                <p className="font-medium text-sm mb-1">Frontend</p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">Next.js 16</Badge>
                  <Badge variant="secondary">React 19</Badge>
                  <Badge variant="secondary">TypeScript</Badge>
                </div>
              </div>
              <div>
                <p className="font-medium text-sm mb-1">Estilos</p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">Tailwind CSS</Badge>
                  <Badge variant="secondary">Shadcn/UI</Badge>
                </div>
              </div>
              <div>
                <p className="font-medium text-sm mb-1">Visualização</p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">Recharts</Badge>
                  <Badge variant="secondary">Lucide Icons</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        */}

        {/* 
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Seu Acesso
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <p className="text-sm text-muted-foreground">Nome</p>
              <p className="font-medium">{usuarioAtual?.nome || 'Usuário'}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Email</p>
              <p className="font-medium">{usuarioAtual?.email || 'Email não disponível'}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Nível de Acesso</p>
              <Badge className="mt-1">
                {usuarioAtual?.papel === 'admin' && 'Administrador'}
                {usuarioAtual?.papel === 'gerente' && 'Gerente'}
                {usuarioAtual?.papel === 'motorista' && 'Motorista'}
              </Badge>
            </div>
          </CardContent>
        </Card>
        */}

        {/* 
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="h-5 w-5" />
              Recursos Disponíveis
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="text-sm space-y-1 text-muted-foreground">
              <p>✓ Dashboard com estatísticas em tempo real</p>
              <p>✓ CRUD completo de motoristas e veículos</p>
              <p>✓ Gerenciamento de viagens</p>
              <p>✓ Controle de despesas e custos</p>
              <p>✓ Análises com gráficos interativos</p>
              <p>✓ Sistema de lembretes e tarefas</p>
              <p>✓ Gerenciamento de postos de combustível</p>
              <p>✓ Configurações personalizáveis</p>
            </div>
          </CardContent>
        </Card>
        */}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Heart className="h-5 w-5" />
            Sobre o Frotagest
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="text-sm space-y-1 text-muted-foreground">
            <p>✓ Dashboard com estatísticas</p>
            <p>✓ CRUD completo de motoristas e veículos</p>
            <p>✓ Gerenciamento de viagens</p>
            <p>✓ Controle de despesas e custos</p>
            <p>✓ Análises com gráficos interativos</p>
            <p>✓ Sistema de lembretes e tarefas</p>
            <p>✓ Gerenciamento de postos de combustível</p>
            <p>✓ Configurações personalizáveis</p>
          </div>
        </CardContent>
      </Card>

      {/* 
      <Card>
        <CardHeader>
          <CardTitle>Informações Adicionais</CardTitle>
          <CardDescription>
            Detalhes importantes sobre o sistema
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Versão</p>
              <p className="text-lg font-semibold">1.0.0</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Última Atualização</p>
              <p className="text-lg font-semibold">
                {new Date().toLocaleDateString('pt-AO')}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Status</p>
              <Badge className="mt-1">Produção</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
      */}


      <Card className="bg-muted/50 bottom-0">
        <CardContent className="pt-6">
          <p className="text-center text-sm text-muted-foreground">
            Copyrith &copy; {new Date().getFullYear()} Frotagest - Sistema de Gerenciamento de Frotas  - Todos os direitos reservados
          </p>
          <p className="text-center text-xs text-muted-foreground mt-2">
            Desenvolvido para otimizar o gerenciamento da sua frota de veículos
          </p>
        </CardContent>
      </Card>
    </div>

  );
}
