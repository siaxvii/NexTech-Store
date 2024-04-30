import Navbar from "@/components/navbar";

export const revalidate = 0;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
    <>
        <Navbar />
        {children}
    </>
  );
}
