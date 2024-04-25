import "./globals.css";
import { poppins } from "./ui/fonts";

export const metadata = {
  title: "IPASME",
  description: "Gestor de Citas del IPASME",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${poppins.className} antialiased bg-secondary text-terciary text-xl max-w-xs mx-auto sm:max-w-md`}>{children}</body>
    </html>
  );
}
