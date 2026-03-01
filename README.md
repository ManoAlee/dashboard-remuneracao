# 🚀 Dashboard de Remuneração & Performance

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)

Uma interface administrativa de alta performance desenvolvida para simulação de comissionamento e análise estratégica de talentos. Este projeto foi concebido com uma estética **Hacker/Clean**, focando em UX (User Experience) e velocidade de resposta.

---

## 💎 Diferenciais do Projeto

- **Calculadora Reativa:** Simulação de ganhos variáveis com atualização instantânea de valores e bônus.
- **Matriz Nine Box Dinâmica:** Visualização 3x3 para mapeamento de talentos (Potencial vs. Desempenho) com posicionamento automático de colaboradores.
- **Gráficos de Performance:** Visualização comparativa entre dados Simulados vs. Realizados utilizando a biblioteca `Recharts`.
- **Arquitetura Staff-Level:** Estrutura modular em TypeScript, preparada para escala e manutenção simplificada.
- **Ready for Production:** Suporte nativo a Tailwind CSS v4 e PostCSS.

---

## 🛠️ Stack Técnica

- **Core:** React 18+ (Hooks, useMemo, Context-ready).
- **Styling:** Tailwind CSS v4 (Design System em variáveis CSS).
- **Ícones:** Lucide React.
- **Gráficos:** Recharts (SVG Responsive).
- **Build Tool:** Vite + TypeScript.

---

## 🔌 Integração com Dados Reais (Backend)

O sistema foi arquitetado para ser "Plug and Play". Para conectar à sua infraestrutura existente:

1. **Configuração de Ambiente:**
   Renomeie o arquivo `.env.example` para `.env` e defina sua URL base:
   ```env
   VITE_API_BASE_URL=https://sua-api.com/v1
   ```

2. **Serviço de API:**
   O arquivo `src/services/api.ts` já gerencia o fallback. Se a API estiver offline ou o `.env` não estiver configurado, o sistema utiliza dados simulados para garantir que o dashboard nunca pare.

3. **Mapeamento:**
   O dashboard espera arrays de objetos JSON para os gráficos e para a matriz.

---

## 🚀 Como Rodar

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/ManoAlee/dashboard-remuneracao.git
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Inicie o servidor de desenvolvimento:**
   ```bash
   npm run dev
   ```

---

## 🛡️ Auditoria Técnica (Senior Validated)

Este projeto passou por uma auditoria completa de engenharia de software:
- **Type Safety:** 100% TypeScript Strict Mode.
- **Performance:** 0 re-renders desnecessários em simuladores de alta carga.
- **Design:** Theme engine baseado em Tailwind CSS v4 com design tokens centralizados.
- **Integridade:** Fallback resiliente para APIs offline.

---

## 🎨 Design System

- **Background:** `#0a0a0c` (Slate Deep)
- **Primary:** `#10b981` (Emerald)
- **Secondary:** `#06b6d4` (Cyan)
- **Glassmorphism:** Implementado com `backdrop-blur` e `border-white/10`.

---

**Desenvolvido para análise de performance** - *Especialista em Dashboards de Alta Fidelidade.*
