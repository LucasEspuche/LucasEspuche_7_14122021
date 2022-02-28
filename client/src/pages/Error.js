import { Link } from 'react-router-dom';
import styled from 'styled-components';
import home from "../assets/home.svg";

const ErrorWrapper = styled.main`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: calc(100vh - 66px);
    padding: 25px 25px;
    margin: auto;
    h1 {
        margin-bottom: 30px;
    }
    section {
        padding: 15px 15px;
        background-color: white;
        border-radius: 20px;
        box-shadow: 0px 0px 7px 0px rgba(17, 17, 17, 0.555);
        transform: scale(1);
        transition: 0.3s ease-in-out;
        img {
            height: 45px;
        }
        &:hover {
            transform: scale(1.2);
        }
    }
`

function Error() {
    return (
        <ErrorWrapper>
            <h1>Vous êtes perdu ?</h1>
            <section>
                <Link to="/">
                    <img src={home}
                        alt="home"
                    />
                </Link>
            </section>
        </ErrorWrapper>
    );
}

export default Error;