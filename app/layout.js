import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import { ThemeProvider } from "next-themes";
import "../styles/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "IT Days",
  description: "IT Days Attendance System",
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light">
          {children}
        </ThemeProvider>
        <Toaster
          duration={2500}
          toastOptions={{
            classNames: {
              error: 'bg-red-500 text-white',
              success: 'bg-green-500 text-white',
              warning: 'bg-yellow-400 text-black',
              info: 'bg-blue-400 text-white',
            },
          }}
        />
      </body>
    </html>
  );
}
