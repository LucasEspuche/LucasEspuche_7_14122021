import { useState, useEffect } from "react";
import styled from 'styled-components'
import Card from '../components/Card';

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

function Posts() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const token = JSON.parse(localStorage.getItem("user")).token;
        const url = "http://localhost:4000/api/post/";

        const getAllPosts = async () => {
            try {
                const response = await fetch(url, {
                    headers:
                        { 'Authorization': `Bearer ${token}` }
                });
                const res = await response.json();
                if (response.status === 200) {
                    setPosts(res);
                }
            } catch (error) {
                console.log("error", error);
            }
        };
        getAllPosts();
    }, []);

    return (
        <PostsWrapper>
            <h2>Derniers ajouts</h2>
            <ul>
                {posts.length > 0 ? posts.map((post) => {
                    return (
                        <Card post={post} key={post.id} />
                    )
                }) : "Aucun post à afficher !"}
            </ul>
        </PostsWrapper>
    );
}

export default Posts;