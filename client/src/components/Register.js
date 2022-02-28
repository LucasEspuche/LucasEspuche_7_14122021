import { useState } from "react";

function RegisterForm() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState({});

    async function handleRegister(event) {
        event.preventDefault();

        await fetch('http://localhost:4000/api/user/signup', {
            method: 'POST',
            body: JSON.stringify({
                "firstname": firstName,
                "lastname": lastName,
                "email": email,
                "password": password
            }),
            headers: { 'Content-Type': 'application/json' },
        })
            .then(res => res.json())
            .then(res => {
                if (res.error) {
                    setError(res.error);
                }
                else {
                    alert("Vous êtes bien enregistré");
                }
            })
            .catch(error => {
                console.log("Erreur: " + error);
            });
    }

    return (
        <form action="" onSubmit={handleRegister} id="register-form">
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
            {(error.type === "email") && <p>{error.message}</p>}
            <input
                type="password"
                placeholder="Mot de passe"
                aria-label="password"
                name="password"
                id="password"
                onChange={(event) => setPassword(event.target.value)}
                value={password}
            />
            <input className="button"
                type="submit"
                value="suivant"
            />
            {(error.type === "form") && <p>{error.message}</p>}
        </form>
    );
}

export default RegisterForm;