import "./css/globals.css";
import Navbar from "@/components/body/Navbar";

export const metadata = {
  title: "Create Next App",
  description: "Gadsdasenerated by create next app",
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
