export default function LoginForm() {
    return (
        <div className="w-[25vw] bg-black-primary p-4 rounded-lg">
            <h1>Welcome back !</h1>
            <form className="flex flex-col gap-4">
                <input type="email" name="email" placeholder="email"/>
                <input type="password" name="password" placeholder="password"/>
                <button type="submit">Connexion</button>
            </form>
            <p>Don&apos;t have an account ? <a href="/register">Create one</a></p>
        </div>
    )
}