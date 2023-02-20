import "./login.scss"
import { Link, useNavigate } from "react-router-dom"
import { useContext, useState } from "react"
import { AuthContext } from "../../context/authContext"
function Login() {

    const [inputs, setInputs] = useState({
        username: "",
        password: ""
    });

    const [error, setError] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setInputs(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const { login } = useContext(AuthContext);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await login(inputs);
            navigate('/');
        } catch (error) {
            setError(error.response.data);
        }
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
                        <input type="text" placeholder="Korisničko ime" name="username" onChange={handleChange} />
                        <input type="password" placeholder="Lozinka" name="password" onChange={handleChange} />
                        <button onClick={handleLogin}>Prijavite se</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login