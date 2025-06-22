"use client"

import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { UserProvider } from "@/contexts/user";


type ProvidersProps = Readonly<{
  children: React.ReactNode;
}>;

export function Providers({ children }: ProvidersProps) {

  return (
      <ThemeProvider
        attribute="class"
        defaultTheme="light"
        enableSystem
        disableTransitionOnChange
      >
        <UserProvider>
          {children}
          <Toaster />
        </UserProvider>
      </ThemeProvider>
  );
} 