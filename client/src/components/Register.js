import { useState } from "react";

function RegisterForm() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

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
                alert("Vous êtes bien enregistré");
                console.log(res);
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
                value="suivant" />
        </form>
    );
}

export default RegisterForm;