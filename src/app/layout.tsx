import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { SubscriptionProvider } from '@/lib/SubscriptionContext';
import Shell from '@/components/Shell';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'TESSMA ONE — Enterprise Management Platform',
  description: 'A consolidated view of your business performance across all modules.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body style={{ margin: 0, padding: 0 }}>
        <SubscriptionProvider>
          <Shell>{children}</Shell>
        </SubscriptionProvider>
      </body>
    </html>
  );
}
