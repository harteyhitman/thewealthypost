'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Navbar from '@/components/navbar/Navbar';
import Footer from '@/components/footer/Footer';
import Preloader from '@/components/Preloader/Preloader';

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [showPreloader, setShowPreloader] = useState(false);

  useEffect(() => {
    const hasShown = sessionStorage.getItem('preloaderShown');
    if (!hasShown) {
      setShowPreloader(true);
    }
  }, []);
  
  // Routes where navbar and footer should be hidden
  const hideNavAndFooter = pathname?.startsWith('/admin/login') || 
                           pathname?.startsWith('/admin/signup');

  return (
    <>
      <Preloader />
      {!hideNavAndFooter && <Navbar />}
      <main className={showPreloader ? "fade-in-content" : ""}>
        {children}
      </main>
      {!hideNavAndFooter && <Footer />}
    </>
  );
}

