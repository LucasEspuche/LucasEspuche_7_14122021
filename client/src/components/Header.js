import { Link } from 'react-router-dom';
import styled from 'styled-components'
import logo from "../assets/logo.svg"

const HeaderWrapper = styled.header`
    background-color: white;
    box-shadow: 0px 0px 7px 0px rgba(17, 17, 17, 0.555);
    nav {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 15px 15px;
        img {
        height: 32px;
        }
    }
`

function Header() {
    return (
        <HeaderWrapper>
            <nav>
                <Link to="/">
                    <img src={logo} alt="logo" />
                </Link>
            </nav>
        </HeaderWrapper>
    );
}

export default Header;