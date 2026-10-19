import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Avaliação de atendimento | Drogaria Nossa Senhora de Fátima",
  description: "Conte como foi sua experiência em nossa farmácia.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      className="h-full antialiased"
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
