import { useState } from "react"
import "./register.scss"
import { Link } from "react-router-dom"
import axios from "axios"

function Register() {

    const [inputs, setInputs] = useState({
        username: "",
        email: "",
        password: "",
        name: ""
    });

    const [error, setError] = useState(false);

    const handleChange = (e) => {
        setInputs(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleClick = async (e) => {
        e.preventDefault();

        try {
            await axios.post("http://localhost:8800/api/auth/register", inputs);
        }
        catch (error) {
            setError(error)
        }
    }
    console.log(error)

    return (
        <div className="register">
            <div className="card">
                <div className="right">
                    <h1>Registracija</h1>
                    <form>
                        <input type="text" placeholder="Korisničko ime" name="username" onChange={handleChange} />
                        <input type="email" placeholder="Email" name="email" onChange={handleChange} />
                        <input type="password" placeholder="Lozinka" name="password" onChange={handleChange} />
                        <input type="text" placeholder="Ime" name="name" onChange={handleChange} />
                        {/* {err && err} */}
                        <button onClick={handleClick}>Registrujte se</button>
                    </form>
                </div>
                <div className="left">
                    <h1>Social App</h1>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias odio ea placeat inventore sunt corrupti velit, autem iure a officia non eius blanditiis cupiditate veniam quis, aliquid sit delectus debitis?</p>
                    <span>Već posjedujete račun ?</span>
                    <Link to="/login">
                        <button>Prijavite se</button>
                    </Link>
                </div>

            </div>
        </div>
    )
}

export default Register