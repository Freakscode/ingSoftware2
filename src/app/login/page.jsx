"use client";
import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import './Login.css';

function Login() {
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [loginError, setLoginError] = useState('');

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log("Enviado", username + " " + email );
        try {
            const response = await axios.post('http://localhost:8000/login', { username, email });
            if (response.status === 201 || response.status === 200) {
                // Inicio de sesión exitoso
                console.log('Inicio de sesión exitoso');
                router.push('/menuUsr');

                localStorage.setItem("User",username);
                localStorage.setItem("Email",email);
            } else {
                // Error de inicio de sesión
                setLoginError('Error de inicio de sesión');
                console.log('Error de inicio de sesión -- Formulario');
            }
        } catch (error) {
            // Error de inicio de sesión
            setLoginError('Error de inicio de sesión');
            console.log('Error de inicio de sesión');
            console.log(error);
        }
    };

    return (
        <main className="main">
        <div className="form">
            <form onSubmit={handleSubmit}>
                <label className="label">
                    Nombre de usuario:
                    <input type="text" value={username} onChange={handleUsernameChange} className="input" />
                </label>
                <label className={"label"}>
                    Correo electrónico:
                    <input type="text" value={email} onChange={handleEmailChange} className={"input"} />
                </label>
                <button type="submit" className={"button"}>Iniciar sesión</button>
            </form>
            {loginError && <p className={"error"}>{loginError}</p>}
        </div>
        </main>
    );
}

export default Login;