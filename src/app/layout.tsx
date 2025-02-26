import type { Metadata } from "next";
import QueryClientProvider from "@/components/QueryClientProvider";

import "./globals.css";

export const metadata: Metadata = {
  title: "The Photography Journey",
  description: "Photography of alanmoraales",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <QueryClientProvider>{children}</QueryClientProvider>
      </body>
    </html>
  );
}
