"use client";
import './contenidoUser.css'
import React, { useState } from 'react';

function Contenido () {
    const [data, setData] = useState('');
    const [chat, setChat] = useState([]);
    const [question, setQuestion] = useState('');
    const [showTextbox, setShowTextbox] = useState(false);
    const [showButton, setShowButton] = useState(true);
    const initialTexts = {
        'Básico': 'Quiero aprender sobre matemáticas básicas. ¿Cómo puedo comenzar?',
        'Medio': 'Quiero aprender sobre matemáticas de nivel medio. ¿Cómo puedo avanzar?',
        'Alto': 'Quiero aprender sobre matemáticas avanzadas. ¿Cómo puedo profundizar?',
    };

    const handleClick = async (level) => {
        const initialText = initialTexts[level];

        const response = await fetch('http://localhost:8000/content/generate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                initial_text: initialText,
                max_length: 1500,
            }),
        });

        if (!response.ok) {
            console.error('Error en la solicitud:', response);
            return;
        }

        const content = await response.json();
        setData(content.text);

        // Agregar la pregunta y la respuesta al chat
        setChat([...chat, { question: initialText, answer: content.text }]);

        // Limpiar el cuadro de texto de la pregunta
        setQuestion('');

        // Mostrar el cuadro de texto de la pregunta
        setShowTextbox(true);
    };

    return (
        <main className='main'>
            <div className='divPrincipal'>
            <h1>Aprende sobre matemáticas</h1>
            <button className="btnBsc" onClick={() => handleClick('Básico')}>Básico</button>
            <button className="btnMd" onClick={() => handleClick('Medio')}>Medio</button>
            <button className="btnAlt" onClick={() => handleClick('Alto')}>Alto</button>
            <br/>
            <div>
                {chat.map((item, index) => (
                    <div key={index} className='respuesta'>
                        <p><strong>Tú:</strong> {item.question}</p>
                        <p><strong>Sistema:</strong> {item.answer}</p>
                    </div>
                ))}
            </div>
            {/* Renderizar el cuadro de texto solo si showTextbox es verdadero */}
            {showTextbox && (
                <textarea value={question} onChange={e => setQuestion(e.target.value)} style={{width: '50%', height: 'auto', color: 'black'}} />
            )}
            {/*Renderizar el botón para enviar la información del Textbox (textarea) al servidor y obtener respuesta */}
            
        </div>
        </main>
    );
}

export default Contenido;