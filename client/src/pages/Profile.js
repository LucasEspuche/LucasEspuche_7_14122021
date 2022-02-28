import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from 'styled-components'
import camera from "../assets/camera.svg"
import logout from "../assets/logout.svg"
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
        .email-input {
            background-color: #EBEBEB;
            cursor: default;
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
                &:hover {
                    text-decoration: underline;
                }
            }
        }
        .submit-button {
            width: 50%;
            height: 52px;
            margin-inline: auto;
            text-align: center;
            text-transform: uppercase;
            font-weight: bold;
            color: white;
            background-color: #7093B2;
            border: unset;
            margin-bottom: 20px;
            box-shadow: 0 3px 8px rgba(0, 0, 0, 0.25);
            transform: scale(1);
            transition: 0.3s ease-in-out;
            cursor: pointer;
            &:hover {
                transform: scale(1.05);
                box-shadow: 0 5px 15px rgba(0, 0, 0, 0.35);
            }
        }
        .logout-button {
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
            &:hover {
                text-decoration: underline;
            }
        }
    }
    .delete-button {
            all: unset;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 40px 40px;
            margin: auto;
            cursor: pointer;
            span {
                font-size: 20px;
            }
            img {
                width: 25px;
                margin-left: 7px;
            }
            &:hover {
                text-decoration: underline;
            }
        }
`

function Profile({ user, setUser }) {
    const [photoPreview, setPhotoPreview] = useState('');
    const [photo, setPhoto] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const getProfile = async () => {
            try {
                const response = await fetch(
                    `http://localhost:4000/api/profile/${user?.userId}`, {
                    headers: {
                        'Authorization': `Bearer ${user?.token}`
                    }
                });
                const res = await response.json();
                setPhoto(res.userImg);
                setFirstName(res.firstname);
                setLastName(res.lastname);
                setEmail(res.email);
            } catch (error) {
                console.log("error", error);
            }
        };
        if (user) {
            getProfile();
        }
    }, [user]);

    function loadPreview(file) {
        if (file) {
            setPhotoPreview(URL.createObjectURL(file))
        }
    }

    async function handleChanges(event) {
        event.preventDefault();

        const data = new FormData()
        data.append("file", photo)
        data.append("upload_preset", "user_avatars")

        await fetch("https://api.cloudinary.com/v1_1/desjoxkzn/image/upload", {
            method: "POST",
            body: data
        })
            .then(res => res.json())
            .then(async data => {

                await fetch(`http://localhost:4000/api/profile/${user?.userId}`, {
                    method: 'PUT',
                    body: JSON.stringify({
                        "userImg": data.url || null,
                        "firstname": firstName,
                        "lastname": lastName
                    }),
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${user?.token}`
                    },
                })
                    .then(res => res.json())
                    .then(res => {
                        console.log(res);
                        localStorage.setItem("user", JSON.stringify({
                            "userId": res.userId,
                            "firstname": res.firstname,
                            "lastname": res.lastname,
                            "userImg": res.userImg,
                            "token": user?.token
                        }));
                        setUser(JSON.parse(localStorage.getItem("user")))
                        alert('Votre profil à bien été modifié');
                    })
            })
        setPhotoPreview('');
    }

    async function deleteProfile() {
        await fetch(`http://localhost:4000/api/profile/${user?.userId}`, {
            method: 'DELETE',
            body: null,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user?.token}`
            },
        })
            .then(res => res.json())
            .then(res => {
                console.log(res);
                localStorage.clear();
                setUser(null);
                alert('Votre profil à bien été supprimé');
                navigate("/");
            })
    }

    function logoutProfile() {
        localStorage.clear();
        setUser(null);
        alert('Vous êtes bien déconnecté');
        navigate("/");
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
                    className="email-input"
                    type="text"
                    placeholder="Email"
                    aria-label="email"
                    name="email"
                    id="email"
                    onChange={(event) => setEmail(event.target.value)}
                    value={email}
                    readOnly
                />
                <input
                    className="submit-button"
                    type="submit"
                    value="enregistrer"
                />
                <button
                    className="logout-button"
                    onClick={logoutProfile}>
                    <span>Me déconnecter</span>
                    <img src={logout} alt="logout profile" />
                </button>
            </form>
            <button
                className="delete-button"
                onClick={deleteProfile}>
                <span>Supprimer le compte</span>
                <img src={trash} alt="delete profile" />
            </button>
        </ProfileWrapper>
    );
}

export default Profile;