import "./Navbar.css";
import Link from 'next/link';


function Navbar() {
    return (
        <header className="header">
            <Link href={"/"}>
                <div className="logo">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/solo contorno.svg" alt="Logo"/>
                </div>
            </Link>
            <nav className="navbar">
                <ul className="nav-links">
                    <li>
                        <a href="/menuUsr">Perfil</a>
                    </li>
                    <li>
                        <a href="/contenidoUsr">Aprendizaje</a>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default Navbar;
