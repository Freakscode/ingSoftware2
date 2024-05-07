"use client";
import React, {useState, useEffect} from 'react';
import Image from 'next/Image';
import "./usrCard.css";



function UsrCard() {
    let UserName = localStorage.getItem('User');
    let UserEmail = localStorage.getItem('Email')



    const user = "fin";
    const email = "prueba1@gmail.com";
    return(
        <div className={"card_user"}>
            <Image src={"/Usr/profile.webp"} alt={"Profile"} className={"profile"} width={300} height={300}/>
            <h1 className={"h1"}>Bienvenido {UserName}</h1>
            <h2 className={"h2"}>Correo: {UserEmail}</h2>
        </div>
    );
}

export default UsrCard;