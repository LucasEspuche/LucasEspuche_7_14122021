import { useState } from "react";
import styled from 'styled-components'
import LoginForm from "../components/Login";
import RegisterForm from "../components/Register";

const Wrapper = styled.section`
    position: absolute;
    width: 320px;
    top: 50%;
    left: 50%;
    background-color: white;
    padding: 0px 20px;
    border-radius: 20px;
    transform: translate(-50%, -50%);
    box-shadow: 0px 0px 7px 0px rgba(17, 17, 17, 0.555);
    ul {
        text-align: center;
        padding: 40px 0px;
        li {
            all: unset;
            font-family: 'Comfortaa', cursive;
            font-size: 20px;
            font-weight: bold;
            padding: 0px 10px;
            cursor: pointer;
        }
    }
    form {
        width: 100%;
        input {
            all: unset;
            width: 92%;
            height: 50px;
            border-radius: 20px;
            border: solid 2px #C0C0C0;
            padding: 0px 10px;
            margin: 5px 0px 20px 0px;
        }
        .button {
            text-align: center;
            text-transform: uppercase;
            font-weight: bold;
            color: white;
            background-color: #7093B2;
            margin-bottom: 40px;
            cursor: pointer;
        }
    }
`

function Home() {
    const [register, setRegister] = useState(false);
    const [login, setLogin] = useState(true);

    function handleClick(event) {
        if (event.target.id === "register") {
            setLogin(false);
            setRegister(true);
        }
        else if (event.target.id === "login") {
            setRegister(false);
            setLogin(true);
        };
    }

    return (
        <Wrapper>
            <ul>
                <li onClick={handleClick} id="register">
                    Inscription
                </li>
                <li onClick={handleClick} id="login">
                    Connexion
                </li>
            </ul>
                {register && <RegisterForm />}
                {login && <LoginForm />}
        </Wrapper>
    );
}

export default Home;