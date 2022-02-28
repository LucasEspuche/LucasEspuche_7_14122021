import { useState } from "react";
import styled from 'styled-components'
import Login from "../components/Login";
import Register from "../components/Register";

const HomeWrapper = styled.main`
    display: flex;
    flex-direction: column;
    justify-content: center;
    min-height: calc(100vh - 66px);
    max-width: 500px;
    padding: 25px 25px;
    margin: auto;
    section {
        padding: 15px 15px;
        background-color: white;
        border-radius: 20px;
        box-shadow: 0px 0px 7px 0px rgba(17, 17, 17, 0.555);
        ul {
            text-align: center;
            padding: 30px 0px;
            li {
                all: unset;
                font-family: 'Comfortaa', cursive;
                font-size: 20px;
                font-weight: bold;
                padding: 0px 10px;
                cursor: pointer;
                &.active {
                    font-size: 28px;  
                }
                &:hover {
                    text-decoration: underline;
                }
            }
        }
        form {
            display: flex;
            flex-direction: column;
            input {
                all: unset;
                max-width: 100%;
                height: 50px;
                border-radius: 20px;
                border: solid 2px #C0C0C0;
                padding: 0px 10px;
                margin-bottom: 20px;
            }
            .button {
                height: 52px;
                text-align: center;
                text-transform: uppercase;
                font-weight: bold;
                color: white;
                background-color: #7093B2;
                border: unset;
                margin-bottom: 30px;
                box-shadow: 0 3px 8px rgba(0, 0, 0, 0.25);
                transform: scale(1);
                transition: 0.3s ease-in-out;
                cursor: pointer;
                &:hover {
                    transform: scale(1.02);
                    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.35);
                }
            }
        }
    }
`

function Home({ setUser }) {
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
        <HomeWrapper>
            <section>
                <ul>
                    <li className={register ? "active" : null}
                        onClick={handleClick} id="register">
                        Inscription
                    </li>
                    <li className={login ? "active" : null}
                        onClick={handleClick} id="login">
                        Connexion
                    </li>
                </ul>
                {register && <Register />}
                {login && <Login
                    setUser={setUser} />}
            </section>
        </HomeWrapper>
    );
}

export default Home;