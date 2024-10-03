import "./globals.css";

export const metadata = {
  title: "Week 8 Assignment",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`antialiased`}>{children}</body>
    </html>
  );
}
