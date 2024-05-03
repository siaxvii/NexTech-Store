import type { Metadata } from "next";
import { Urbanist } from "next/font/google";
import "./globals.css";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import ModalProvider from "@/providers/modal-provider"
import { ClerkProvider } from "@clerk/nextjs";
import ToastProvider from "@/providers/toast-provider"
import { ThemeProvider } from "@/components/theme-provider"

const font = Urbanist({ subsets: ["latin"] });

export const revalidate = 0;

export const metadata: Metadata = {
  title: "Store",
  description: "NexTech Store",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={font.className}>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            disableTransitionOnChange
          >
            <ToastProvider />
            <ModalProvider />
            <Navbar/>
            {children}
            <Footer />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
