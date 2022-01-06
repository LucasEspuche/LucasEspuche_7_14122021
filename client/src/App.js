import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createGlobalStyle } from 'styled-components';
import background from './assets/background.jpg'
import Header from "./components/Header";
import Home from './pages/Home';
import Feed from './pages/Feed';
import Profile from './pages/Profile';

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
        background-image: url(${background});
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
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
    return (
        <BrowserRouter>
            <GlobalStyle />
            <Header />
            <Routes>
                <Route path="/" exact element={<Home />} />
                <Route path="/feed" exact element={<Feed />} />
                <Route path="/profile" exact element={<Profile />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;