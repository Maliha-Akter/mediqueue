import { Josefin_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ToastContainer } from "react-toastify";
import { Providers } from "./providers"; // Import the Providers component

const josefin = Josefin_Sans({
  subsets: ["latin"],
});

// app/layout.js
export const metadata = {
  title: {
    default: "MediQueue", 
    template: "%s | MediQueue", 
  },
  description: "Manage your medical queues easily.",
};
export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${josefin.className} h-full antialiased`} suppressHydrationWarning>
      <body className="min-h-full flex flex-col">
        <Providers>
          <Navbar />
          <main className="grow">
            {children}
          </main>
          <Footer />
        </Providers>

        <ToastContainer
          position="bottom-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </body>
    </html>
  );
}