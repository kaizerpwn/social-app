import "./register.scss"
import { Link } from "react-router-dom"
function Register() {
    return (
        <div className="register">
            <div className="card">
                <div className="right">
                    <h1>Register</h1>
                    <form>
                        <input type="text" placeholder="Korisničko ime" />
                        <input type="email" placeholder="Email" />
                        <input type="password" placeholder="Lozinka" />
                        <input type="text" placeholder="Ime" />
                        <button>Registrujte se</button>
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