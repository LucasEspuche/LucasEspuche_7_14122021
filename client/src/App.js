import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createGlobalStyle } from 'styled-components';
import background from './assets/background.jpg'
import Header from "./components/Header";
import Home from './pages/Home';
import Thread from './pages/Thread';
import Profile from './pages/Profile';
import Error from "./pages/Error";

const GlobalStyle = createGlobalStyle`
    *,
    *::before,
    *::after {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    html {
        font-family: 'Roboto', sans-serif;
        font-size: 15px;
        height: 100%;
    }
    body {
        /* background-image: url(${background}); */
        background-color: #F6F6F6;
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
        min-height: 100vh;
    }
    h1 {
        font-family: 'Comfortaa', cursive;
        font-size: 24px;
        font-weight: bold;
    }
    li {
        list-style: none;
    }
    a {
        text-decoration: none;
        color: black;
    }
`

function App() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        if (localStorage.getItem("user")) {
            setUser(JSON.parse(localStorage.getItem("user")));
        }
    }, []);

    return (
        <BrowserRouter>
            <GlobalStyle />
            <Header />
            <Routes>
                <Route path="/"
                    exact element={<Home />}
                />
                <Route path="/thread"
                    exact element={<Thread user={user} />}
                />
                <Route path="/profile"
                    exact element={<Profile user={user}
                        setUser={setUser} />}
                />
                <Route path="*"
                    element={<Error />}
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;