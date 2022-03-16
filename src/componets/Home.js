import React from "react";
import TextField from "./TextField";
import logo from '../img/logo.png';

const Home = () => {


    return (
        <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: "#1CBFF9",
            height: "100vh"
        }}>
          
            <img src={logo} alt="logo" />
        </div>
    )

}

export default Home;