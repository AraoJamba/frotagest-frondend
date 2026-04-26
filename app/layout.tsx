import React from "react";
import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { Inter } from "next/font/google"; // Importando a Inter (padrão de dashboards modernos)
import Providers from "./providers";

import "@/app/globals.css";

// Configuração da fonte
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Frotagest - Sistema de Gerenciamento de Frotas",
  description: "Frotagest - Plataforma completa para gerenciamento de frotas",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-AO" className="dark" style={{ colorScheme: 'dark' }}>
      <body className={`${inter.variable} font-sans antialiased bg-[#09090b] text-zinc-100`}>
        <Providers>
          {children}
        </Providers>
        <Analytics />
      </body>
    </html>
  );
}






// import React from "react";
// import type { Metadata } from "next";
// import { Analytics } from "@vercel/analytics/next";
// import Providers from "./providers";

// import "@/app/globals.css";

// export const metadata: Metadata = {
//   title: "Frotagest - Sistema de Gerenciamento de Frotas",
//   description: "Frotagest - Plataforma completa para gerenciamento de frotas",
// };

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <html lang="pt-AO">
//       <body className="font-sans antialiased">
//         <Providers>
//           {children}
//         </Providers>
//         <Analytics />
//       </body>
//     </html>
//   );
// }
