
import { Metadata } from "next"
import Footer from "./_components/footer";
import Header from "./_components/header";

import "../globals.css";
import { AuthProvider } from "../contexts/AuthContext";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Teste",
  description: "Welcome to our website!",
  keywords: ["Teste", "products", "shopping"],
  robots: "index, follow",
}


export default function dashLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='pt-BR'>
      <body >
          <Header></Header>
          <div className="flex items-center justify-center  text-center">
            <Suspense fallback={<div>Loading...</div>}>
              <AuthProvider>
                {children}
              </AuthProvider>
            </Suspense>
          </div>
          <Footer></Footer>
      </body>
    </html>
  );
}
