import { useState } from "react";
import styled from 'styled-components'
import avatar from "../assets/avatar.png"

const PostsWrapper = styled.section`
    h2 {
        font-size: 13px;
        font-weight: bold;
        text-transform: uppercase;
        margin: 20px 0px;
    }
    ul {
        li {
            background-color: white;
            padding: 15px 15px;
            border-radius: 20px;
            box-shadow: 0px 0px 7px 0px rgba(17, 17, 17, 0.555);
            margin-bottom: 25px;
            .contact {
                display: flex;
                align-items: center;
                margin-bottom: 10px;
                &__avatar {
                    height: 37px;
                    width: 37px;
                    border-radius: 50%;
                    object-fit: cover;
                }
                &__status {
                    padding: 0px 10px;
                    font-weight: 300;
                }
            }
            p {
                margin-bottom: 10px;
            }
            img {
                height: 300px;
                width: 100%;
                object-fit: cover;
                border-radius: 20px;
                margin-bottom: 10px;
            }
            form {
                display: flex;
                img {
                    height: 37px;
                    width: 37px;
                    border-radius: 50%;
                    object-fit: cover;
                    margin-bottom: inherit;
                }
                input {
                    all: unset;
                    height: 35px;
                }
                .comment-input {
                    width: 100%;
                    padding: 0px 15px;
                    background-color: #F6F6F6;
                    border: solid 1px #C0C0C0;
                    border-radius: 20px;
                    margin-inline: 7px;
                }
                .submit-input {
                    text-transform: uppercase;
                    font-weight: 500;
                    color: white;
                    background-color: #7093B2;
                    padding: 0px 15px;
                    border-radius: 20px;
                    cursor: pointer;
                }
            }
        }
    }
`

function Post() {
    const posts = [
        {
            _id: "076b47656h8Ot758h54",
            userImg: "https://images.unsplash.com/photo-1517805686688-47dd930554b2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1527&q=80",
            userName: "Alicia Fox",
            userText: "Vivement les vacances d’été !",
            userFile: "https://images.unsplash.com/photo-1569263976975-26204014b84c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2338&q=80"
        },
        {
            _id: "0260t647h8Ox858h65",
            userImg: "https://images.unsplash.com/photo-1520295187453-cd239786490c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1888&q=80",
            userName: "Elisa Rodriguez",
            userText: "Un nouveau café vient d’ouvrir juste à coté !",
            userFile: "https://images.unsplash.com/photo-1512105427172-b1fa70cf1274?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1887&q=80"
        }
    ];

    const [comment, setComment] = useState('');

    function handleComment(event) {
        event.preventDefault();
    }

    return (
        <PostsWrapper>
            <h2>Derniers ajouts</h2>
            <ul>
                {posts.map((post) => {
                    return (
                        <li key={post._id}>
                            <div className="contact">
                                <img className="contact__avatar"
                                    src={post.userImg}
                                    alt="avatar contact"
                                />
                                <div className="contact__status">
                                    <h3>{post.userName}</h3>
                                    <p>Il y a 1h</p>
                                </div>
                            </div>
                            <p>{post.userText}</p>
                            <img src={post.userFile} alt="illustration du post" />
                            <form action="" onSubmit={handleComment} id="comment-form">
                                <img src={avatar} alt="avatar" />
                                <input
                                    className="comment-input"
                                    type="text"
                                    placeholder="Ecrire un commentaire..."
                                    aria-label="commentaire"
                                    name="commentaire"
                                    id="comment"
                                    onChange={(event) => setComment(event.target.value)}
                                    value={comment}
                                />
                                <input
                                    className="submit-input"
                                    type="submit"
                                    value="publier"
                                />
                            </form>
                        </li>
                    )
                })}
            </ul>
        </PostsWrapper>
    );
}

export default Post;