import { Link } from 'react-router-dom';
import styled from 'styled-components'
import logo from "../assets/logo.svg"

const HeaderWrapper = styled.header`
    background-color: white;
    box-shadow: 0px 0px 7px 0px rgba(17, 17, 17, 0.555);
    nav {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 15px 15px;
        .logo {
            height: 32px;
        }
        .profile {
            height: 37px;
            border-radius: 50%;
        }
    }
`

function Header() {
    const userImg = JSON.parse(localStorage.getItem("user")).userImg;

    return (
        <HeaderWrapper>
            <nav>
                <Link to="/thread">
                    <img className='logo'
                        src={logo}
                        alt="logo"
                    />
                </Link>
                {userImg &&
                    <Link to="/profile">
                        <img className='profile'
                            src={userImg}
                            alt="avatar"
                        />
                    </Link>}
            </nav>
        </HeaderWrapper>
    );
}

export default Header;