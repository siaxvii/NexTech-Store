import type { Metadata } from "next";
import { Urbanist } from "next/font/google";
import "./globals.css";
import { auth } from "@clerk/nextjs";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import ModalProvider from "@/providers/modal-provider"
import Modal from "@/components/ui/modal";
import { ClerkProvider } from "@clerk/nextjs";
import ToastProvider from "@/providers/toast-provider"
import { redirect } from "next/navigation";

const font = Urbanist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Store",
  description: "NexTech Store",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const { userId } = auth();
  if (!userId){ redirect('/sign-in')}
  
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={font.className}>
          <ToastProvider />
          <ModalProvider />
          <Navbar />
          {children}
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
