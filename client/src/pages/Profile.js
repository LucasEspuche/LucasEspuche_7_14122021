import { useState, useEffect } from "react";
import styled from 'styled-components'
import camera from "../assets/camera.svg"
import trash from "../assets/trash.svg"
import avatar from "../assets/avatar.png"

const ProfileWrapper = styled.main`
    padding: 25px 25px;
    max-width: 500px;
    margin: auto;
    h1 {
        margin-bottom: 10px;
    }
    .avatar-display {
        display: block;
        margin: auto;
        height: 150px;
        width: 150px;
        object-fit: cover;
        border-radius: 50%;
        margin-bottom: -75px;
    }
    form {
        display: flex;
        flex-direction: column;
        padding: 15px 15px;
        background-color: white;
        border-radius: 20px;
        box-shadow: 0px 0px 7px 0px rgba(17, 17, 17, 0.555);
        input {
            all: unset;
            max-width: 100%;
            height: 50px;
            border-radius: 20px;
            border: solid 2px #C0C0C0;
            padding: 0px 10px;
            margin-bottom: 20px;
        }
        .avatar {
            margin-top: 50px;
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
                font-size: 20px;
                display: flex;
                justify-content: center;
                align-items: center;
                margin: 20px 0px;
                cursor: pointer;
                img {
                    width: 25px;
                    margin-left: 7px;
                }
            }
        }
        .submit-button {
            width: 50%;
            margin-inline: auto;
            text-align: center;
            text-transform: uppercase;
            font-weight: bold;
            color: white;
            background-color: #7093B2;
            margin-bottom: 20px;
            cursor: pointer;
        }
        .delete-button {
            all: unset;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 20px;
            cursor: pointer;
            span {
                font-size: 20px;
            }
            img {
                width: 25px;
                margin-left: 7px;
            }
        }
    }
`

function Profile() {
    const [photo, setPhoto] = useState('');
    const [photoPreview, setPhotoPreview] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        const url = `http://localhost:4000/api/profile/${user.userId}`;

        const getUser = async () => {
            try {
                const response = await fetch(url, {
                    headers:
                        { 'Authorization': `Bearer ${user.token}` }
                });
                const res = await response.json();
                setPhoto(res.userImg);
                setFirstName(res.firstname);
                setLastName(res.lastname);
                setEmail(res.email);
                setPassword(res.password);
            } catch (error) {
                console.log("error", error);
            }
        };
        getUser();
    }, []);

    function loadPreview(file) {
        if (file) {
            setPhotoPreview(URL.createObjectURL(file))
        }
    }

    function handleChanges(event) {
        event.preventDefault();
    }

    return (
        <ProfileWrapper>
            <h1>Profil</h1>
            <img className="avatar-display"
                src={photoPreview ?
                    photoPreview : photo || avatar}
                alt="avatar"
            />
            <form action="" onSubmit={handleChanges} id="profile-form">
                <div className="avatar">
                    <input
                        className="avatar__input"
                        type="file"
                        aria-label="avatar"
                        name="avatar"
                        id="avatar"
                        onChange={(event) => {
                            setPhoto(event.target.files[0])
                            loadPreview(event.target.files[0])
                        }}
                    />
                    <label
                        className="avatar__label"
                        htmlFor="avatar">
                        <span>Modifier ma photo</span>
                        <img src={camera} alt="avatar upload" />
                    </label>
                </div>
                <input
                    type="text"
                    placeholder="Prénom"
                    aria-label="firstname"
                    name="firstname"
                    id="firstname"
                    onChange={(event) => setFirstName(event.target.value)}
                    value={firstName}
                />
                <input
                    type="text"
                    placeholder="Nom"
                    aria-label="lastname"
                    name="lastname"
                    id="lastname"
                    onChange={(event) => setLastName(event.target.value)}
                    value={lastName}
                />
                <input
                    type="text"
                    placeholder="Email"
                    aria-label="email"
                    name="email"
                    id="email"
                    onChange={(event) => setEmail(event.target.value)}
                    value={email}
                />
                <input
                    type="password"
                    placeholder="Mot de passe"
                    aria-label="password"
                    name="password"
                    id="password"
                    onChange={(event) => setPassword(event.target.value)}
                    value={password}
                />
                <input
                    className="submit-button"
                    type="submit"
                    value="enregistrer"
                />
                <button className="delete-button">
                    <span>Supprimer le profil</span>
                    <img src={trash} alt="delete profile" />
                </button>
            </form>
        </ProfileWrapper>
    );
}

export default Profile;