import { Toaster } from "sonner";
import { Inter, Dosis } from 'next/font/google'
import type { Metadata } from 'next'

import { ThemeProvider } from '@/components/providers/theme-provider'
import { ConvexClientProvider } from '@/components/providers/convex-provider'
import { ModalProvider } from "@/components/providers/modal-provider";
import { EdgeStoreProvider } from "@/lib/edgestore";

import './globals.css'


const inter = Inter({ subsets: ['latin'] })
const dosis = Dosis({ subsets: ['latin'] });


export const metadata: Metadata = {//网站标题和描述
  title: 'MCITotion',
  description: 'The connected workspace where better, faster work happens.',
  icons: {//切换dark and light mode
    icon: [
      {
        media: "(prefers-color-scheme: light)",
        url: "/logo-black-new.png",
        href: "/logo-black-new.png",
      },
      {
        media: "(prefers-color-scheme: dark)",
        url: "/logo-white-new.png",
        href: "/logo-white-new.png",
      }
    ]
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={dosis.className}>
        <ConvexClientProvider>
          <EdgeStoreProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
              storageKey="motion-theme-2"
            >
              <Toaster position="bottom-center" />
              <ModalProvider />
              {children}
            </ThemeProvider>
          </EdgeStoreProvider>
        </ConvexClientProvider>
      </body>
    </html>
  )
}
