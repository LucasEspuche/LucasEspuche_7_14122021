import { useState } from 'react';
import styled from 'styled-components'
import Share from "../components/Share";
import Posts from "../components/Posts";

const ThreadWrapper = styled.main`
    padding: 25px 25px;
    max-width: 500px;
    margin: auto;
`

function Thread({ user }) {
    const [renderPost, setRenderPost] = useState(0);

    return (
        <ThreadWrapper>
            <Share user={user}
                renderPost={renderPost}
                setRenderPost={setRenderPost}
            />
            <Posts user={user}
                renderPost={renderPost}
                setRenderPost={setRenderPost}
            />
        </ThreadWrapper>
    );
}

export default Thread;