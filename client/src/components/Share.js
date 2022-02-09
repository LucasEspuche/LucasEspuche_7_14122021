import { useState } from "react";
import styled from 'styled-components'
import upload from "../assets/upload.svg"
import avatar from "../assets/avatar.png"

const ShareWrapper = styled.section`
    h1 {
        margin-bottom: 20px;
    }
    form {
        display: flex;
        flex-direction: column;
        background-color: white;
        padding: 15px 15px;
        border-radius: 20px;
        box-shadow: 0px 0px 7px 0px rgba(17, 17, 17, 0.555);
        .user {
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
        input {
            all: unset;
            height: 35px;
        }
        .text-input {
            max-width: 100%;
            padding: 0px 15px;
            background-color: #F6F6F6;
            border: solid 1px #C0C0C0;
            border-radius: 20px;
            margin-bottom: 10px;
        }
        .buttons {
            display: flex;
            justify-content: space-between;
            .upload-button {
                &__input {
                    width: 0.1px;
                    height: 0.1px;
                    opacity: 0;
                    overflow: hidden;
                    position: absolute;
                    z-index: -1;
                }
                &__label {
                    height: 35px;
                    display: inline-flex;
                    align-items: center;
                    cursor: pointer;
                    img {
                        width: 25px;
                        margin-left: 7px;
                    }
                }
            }
            .submit-button {
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
`

function Share() {
    const [text, setText] = useState('');
    const [file, setFile] = useState('');

    async function handleShare(event) {
        event.preventDefault();

        const userId = JSON.parse(localStorage.getItem("user")).userId;
        console.log(userId);

        await fetch('http://localhost:4000/api/post/', {
            method: 'POST',
            body: JSON.stringify({
                "authorId": userId,
                "textContent": text,
                "imgContent": file
            }),
            headers: { 'Content-Type': 'application/json' },
        })
            .then(res => res.json())
            .then(res => {
                console.log(res);
            })
            .catch(error => {
                console.log("Erreur: " + error);
            });
    }

    return (
        <ShareWrapper>
            <h1>Bienvenue</h1>
            <form action="" onSubmit={handleShare} id="login-form">
                <div className="user">
                    <img className="user__avatar"
                        src={avatar}
                        alt="avatar"
                    />
                    <div className="user__status">
                        <h3>Utilisateur</h3>
                        <p>En ligne</p>
                    </div>
                </div>
                <input
                    className="text-input"
                    type="text"
                    placeholder="Partager quelque chose...?"
                    aria-label="partage"
                    name="partage"
                    id="share"
                    onChange={(event) => setText(event.target.value)}
                    value={text}
                />
                <div className="buttons">
                    <div className="upload-button">
                        <input
                            className="upload-button__input"
                            type="file"
                            aria-label="fichier"
                            name="fichier"
                            id="file"
                            onChange={(event) => setFile(event.target.value)}
                            value={file}
                        />
                        <label
                            className="upload-button__label"
                            htmlFor="file">
                            <span>Choisir un fichier</span>
                            <img src={upload} alt="upload file" />
                        </label>
                    </div>
                    <input
                        className="submit-button"
                        type="submit"
                        value="publier" />
                </div>
            </form>
        </ShareWrapper>
    );
}

export default Share;