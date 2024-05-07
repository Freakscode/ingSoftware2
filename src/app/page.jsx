import Image from "next/image";
import Login from "./login/page";
import Navbar from "./components/Navbar/Navbar"

export default function Home() {
  return (
    <>
    <Navbar/>
    <Login/>
    </>
  );
}
