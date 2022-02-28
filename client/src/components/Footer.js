import { Link } from 'react-router-dom';
import styled from 'styled-components'
import logo from "../assets/logo.svg"

const FooterWrapper = styled.footer`
    background-color: white;
    padding: 15px 15px;
    box-shadow: 0px 0px 7px 0px rgba(17, 17, 17, 0.555);
    img {
        height: 32px;
    }
    p {
        font-weight: 500;
        padding-block: 5px;
    }
`

function Footer() {
    return (
        <FooterWrapper>
            <Link to="/">
                <img className='logo'
                    src={logo}
                    alt="logo"
                />
            </Link>
            <p>Copyright 2022</p>
            <p>Lucas</p>
        </FooterWrapper>
    );
}

export default Footer;