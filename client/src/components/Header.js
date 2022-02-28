import { Link } from 'react-router-dom';
import styled from 'styled-components'
import logo from "../assets/logo.svg"
import avatar from "../assets/avatar.png"

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
            width: 37px;
            object-fit: cover;
            border-radius: 50%;
        }
    }
`

function Header({ user }) {

    return (
        <HeaderWrapper>
            <nav>
                <Link to="/thread">
                    <img className='logo'
                        src={logo}
                        alt="logo"
                    />
                </Link>
                {user ? <Link to="/profile">
                    <img className='profile'
                        src={user.userImg ? user.userImg : avatar}
                        alt="avatar"
                    />
                </Link> : null}
            </nav>
        </HeaderWrapper>
    );
}

export default Header;