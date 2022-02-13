import { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState({});
    const navigate = useNavigate();

    async function handleLogin(event) {
        event.preventDefault();

        await fetch('http://localhost:4000/api/user/login', {
            method: 'POST',
            body: JSON.stringify({
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
                    localStorage.setItem("user", JSON.stringify(res));
                    navigate("/thread");
                };
            })
            .catch(error => {
                console.log("Erreur: " + error);
            });
    }

    return (
        <form action="" onSubmit={handleLogin} id="login-form">
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
            {(error.type === "password") && <p>{error.message}</p>}
            <input className="button"
                type="submit"
                value="suivant"
            />
        </form>
    );
}

export default LoginForm;