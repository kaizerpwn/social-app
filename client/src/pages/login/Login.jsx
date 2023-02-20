import "./login.scss"
import { Link } from "react-router-dom"
import { useContext } from "react"
import { AuthContext } from "../../context/authContext"
function Login() {

    const { login } = useContext(AuthContext);

    const handleLogin = () => {
        login();
    };

    return (
        <div className="login">
            <div className="card">
                <div className="left">
                    <h1>Social App</h1>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias odio ea placeat inventore sunt corrupti velit, autem iure a officia non eius blanditiis cupiditate veniam quis, aliquid sit delectus debitis?</p>
                    <span>Ne posjedujete račun ?</span>
                    <Link to="/register">
                        <button>Registrujte se</button>
                    </Link>
                </div>
                <div className="right">
                    <h1>Login</h1>
                    <form>
                        <input type="text" placeholder="Korisničko ime" />
                        <input type="password" placeholder="Lozinka" />
                        <button onClick={handleLogin}>Prijavite se</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login