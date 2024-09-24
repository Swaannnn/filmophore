export default function Register() {
    // register form avec champs username email password passwordConfirmation
    return (
        <div >
            <h1>Register</h1>
            <form>
                <input type="text" name="username" placeholder="username" />
                <input type="email" name="email" placeholder="email" />
                <input type="password" name="password" placeholder="password" />
                <input type="password" name="passwordConfirmation" placeholder="password confirmation" />
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}