import Drawer from "@/components/drawer";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Drawer />

      <main>
        {children}
      </main>
    </>
  );
}