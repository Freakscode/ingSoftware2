//"use client";
//import React, { useState } from 'react';
import axios from 'axios';
//import { useRouter } from 'next/navigation';
import Navbar from '../components/Navbar/Navbar';
import UsrCard from '../components/UsrCard/page';
import "./menuUsr.css"
import Image from 'next/Image';


function MenuUsr() {
    return(
        <body className={"body"}>
            <Navbar/>
            <div className={"card"}>
                <UsrCard/>
            </div>
        </body>
    );
}

export default MenuUsr;