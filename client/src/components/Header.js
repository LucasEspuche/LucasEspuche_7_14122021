import { Link } from 'react-router-dom';
import styled from 'styled-components'
import logo from "../assets/logo.svg"

const Navbar = styled.header`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: white;
    box-shadow: 0px 0px 7px 0px rgba(17, 17, 17, 0.555);  
    img {
        height: 50px;
        padding: 10px 10px;
    }
`

function Header() {
    return (
        <Navbar>
            <nav>
                <Link to="/">
                    <img src={logo} alt="logo" />
                </Link>
            </nav>
        </Navbar>
    );
}

export default Header;