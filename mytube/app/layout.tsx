import type { Metadata } from "next";
import {  Noto_Sans, Nunito_Sans } from "next/font/google";
import "@/styles/globals.css";
import { ThemeProvider } from "next-themes";
import { cn } from "@/lib/utils";
import { AuthProvider } from "../lib/AuthContext";
import { Analytics } from "@vercel/analytics/next";
const nunitoSansHeading = Nunito_Sans({subsets:['latin'],variable:'--font-heading'});

const notoSans = Noto_Sans({subsets:['latin'],variable:'--font-sans'});

 

// export const metadata: Metadata = {
//   title: {
//     default: "MyTube",
//     template: "%s | MyTube",
//   },
//   description: "Watch, share and discover videos on MyTube.",
//   icons: {
//     icon: "/icon.jpg",
//     shortcut: "/icon.jpg",
//     apple: "/icon.jpg",
//   },
// };
export const metadata: Metadata = {
  title: "MyTube",
  description: "Watch, share and discover videos on MyTube.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode; 
}>) {
  return (
   <html
  lang="en"
  suppressHydrationWarning
  className={cn(
    "h-full",
    "antialiased",
    notoSans.variable,
    nunitoSansHeading.variable
  )}
>
      <body className="min-h-full flex flex-col">
 <ThemeProvider
  attribute="class"
  defaultTheme="system"
  enableSystem
  disableTransitionOnChange
>
  <AuthProvider>
    {children}
  </AuthProvider>
</ThemeProvider>
</body>
    </html>
  );
}
