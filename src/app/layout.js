import "./globals.css";
import Header from "@/components/Header";

export const metadata = {
  title: "Week 8 Assignment",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`flex flex-col h-screen antialiased bg-teal-100`}>
        <Header />
        {children}
      </body>
    </html>
  );
}
