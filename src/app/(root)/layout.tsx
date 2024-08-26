// ** imports
import Image from "next/image";

// ** components
import MobileNavbar from "@/components/MobileNavbar";
import SideBar from "@/components/SideBar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = { firstName: "Hamdi", lastName: "Ahmed" };
  return (
    <main className="flex h-screen w-full font-inter">
      <SideBar user={user} />

      <div className="flex size-full flex-col">
        <div className="root-layout">
          <Image src="/icons/logo.svg" alt="Logo" width={30} height={30} />

          <div>
            <MobileNavbar user={user} />
          </div>
        </div>
        {children}
      </div>
    </main>
  );
}
