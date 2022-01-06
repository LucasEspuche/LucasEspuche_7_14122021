import { useState } from "react";

function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handleLogin(event) {
        event.preventDefault();
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

export default LoginForm;