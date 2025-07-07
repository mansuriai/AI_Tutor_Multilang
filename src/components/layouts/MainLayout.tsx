
import { ReactNode } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface MainLayoutProps {
  children: ReactNode;
  className?: string;
  containerClassName?: string;
  showFooter?: boolean;
  bgColor?: string;
}

/**
 * A reusable layout component that includes Navbar and Footer
 * Use this for most pages to maintain consistent layout
 */
const MainLayout = ({
  children,
  className = "",
  containerClassName = "container mx-auto px-6 max-w-6xl",
  showFooter = true,
  bgColor = "bg-gray-50",
}: MainLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className={`flex-1 ${bgColor} ${className}`}>
        <div className={containerClassName}>
          {children}
        </div>
      </main>
      
      {showFooter && <Footer />}
    </div>
  );
};

export default MainLayout;
