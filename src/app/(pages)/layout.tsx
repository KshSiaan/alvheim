import Footer from "@/components/ui/sub-ui/footer";
import Navbar from "@/components/ui/sub-ui/navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
