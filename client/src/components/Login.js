import { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    let navigate = useNavigate();

    async function handleLogin(event) {
        event.preventDefault();

        const emailError = document.querySelector(".email-error");
        const passwordError = document.querySelector(".password-error");

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
                if (res.emailError) {
                    emailError.innerHTML =
                        "Utilisateur non trouvé !";
                    passwordError.innerHTML = '';
                }
                else if (res.passwordError) {
                    passwordError.innerHTML =
                        "Mot de passe incorrect !";
                    emailError.innerHTML = '';
                }
                else {
                    localStorage.setItem("token", JSON.stringify(res));
                    alert("Vous êtes bien connecté");
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
            <p className="email-error"></p>
            <input
                type="password"
                placeholder="Mot de passe"
                aria-label="password"
                name="password"
                id="password"
                onChange={(event) => setPassword(event.target.value)}
                value={password}
            />
            <p className="password-error"></p>
            <input className="button"
                type="submit"
                value="suivant" />
        </form>
    );
}

export default LoginForm;