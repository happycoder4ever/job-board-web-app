import { ReactNode } from "react";
import Header from "@/app/components/Header"
import Footer from "@/app/components/Footer"

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
        <Footer />
        </body>
    </html>
  );
}
