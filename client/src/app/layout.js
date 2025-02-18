import "./css/globals.css";
import Navbar from "@/components/body/Navbar";

export const metadata = {
  title: "Article management system",
  description: "Visually CRUD Article",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
