import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppWidget from "@/components/WhatsAppWidget";
import EmergencyWidget from "@/components/EmergencyWidget";
import AISymptomDrawer from "@/components/AISymptomDrawer";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main className="flex-1 flex flex-col grid-backdrop">
        {children}
      </main>
      <Footer />
      
      {/* Floating Interactive Elements */}
      <WhatsAppWidget />
      <EmergencyWidget />
      <AISymptomDrawer />
    </>
  );
}
