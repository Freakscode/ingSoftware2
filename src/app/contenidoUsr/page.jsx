"use client";
import './contenidoUser.css'
import React, { useState } from 'react';

function Contenido () {
    const [data, setData] = useState('');
    const [chat, setChat] = useState([]);
    const [question, setQuestion] = useState('');

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
    };

    return (
        <div>
            <h1>Aprende sobre matemáticas</h1>

            <button onClick={() => handleClick('Básico')}>Básico</button>
            <button onClick={() => handleClick('Medio')}>Medio</button>
            <button onClick={() => handleClick('Alto')}>Alto</button>
            <br/>
            <div>
                {chat.map((item, index) => (
                    <div key={index}>
                        <p><strong>Tú:</strong> {item.question}</p>
                        <p><strong>Sistema:</strong> {item.answer}</p>
                    </div>
                ))}
            </div>
            <textarea value={question} onChange={e => setQuestion(e.target.value)} style={{width: '50%', height: 'auto', color: 'black'}} />
        </div>
    );
}

export default Contenido;