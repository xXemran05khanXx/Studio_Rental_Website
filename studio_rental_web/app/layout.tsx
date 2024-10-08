import {Nunito} from "next/font/google"
import type { Metadata } from "next";

import "./globals.css";
import Navbar from "./components/navbar/Navbar";
import RegisterModal from "./components/modals/RegisterModal";
import ToasterProvider from "./providers/ToasterProvider";
import LoginModal from "./components/modals/LoginModal";
import getCurrentUser from "./actions/getCurrentUser";
import RentModal from "./components/modals/RentModal";
import { SearchModal } from "./components/modals/SearchModal";


export const metadata: Metadata = {
  title: "Studio Rental WebSite",
  description: "A studio rental website for emerging creators",
};

const font = Nunito({
  subsets : ["latin"],
})

export default async function RootLayout({
  children,
}:{
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();

  return (
    <html lang="en">
      <body className= {font.className}>
        <ToasterProvider/>
        <SearchModal/>
        <RentModal/>
        <LoginModal/>
        <RegisterModal/>
        <Navbar currentUser={currentUser}/>
        <div className="pb-20 pt-28">
          {children}
        </div>
      </body>
    </html>
  );
}
