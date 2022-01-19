import styled from 'styled-components'
import Share from "../components/Share";
import Post from "../components/Post";

const ThreadWrapper = styled.main`
    padding: 25px 25px;
    max-width: 700px;
    margin: auto;
`

function Thread() {
    return (
        <ThreadWrapper>
            <Share />
            <Post />
        </ThreadWrapper>
    );
}

export default Thread;