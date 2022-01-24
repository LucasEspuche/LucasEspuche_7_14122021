import styled from 'styled-components'
import Share from "../components/Share";
import Posts from "../components/Posts";

const ThreadWrapper = styled.main`
    padding: 25px 25px;
    max-width: 500px;
    margin: auto;
`

function Thread() {
    return (
        <ThreadWrapper>
            <Share />
            <Posts />
        </ThreadWrapper>
    );
}

export default Thread;