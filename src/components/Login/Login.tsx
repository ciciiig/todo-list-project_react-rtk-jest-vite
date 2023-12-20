import "./Login.css"
import { FC, FormEvent, useEffect, useRef, useState } from "react"

export const Login: FC = () => {
    const userRef = useRef<HTMLInputElement | null>(null)
    const errRef = useRef<HTMLInputElement | null>(null)
    const storedUsers = localStorage.getItem('username')

    const [user, setUser] = useState('')
    const [password, setPassword] = useState('')
    const [errMsg, setErrMsg] = useState('')
    const [success, setSuccess] = useState(false)

    useEffect(() => {
        if (userRef.current) {
            userRef.current.focus();
        }
    }, [])

    useEffect(() => {
        setErrMsg('')
    }, [user, password])

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()

        if (storedUsers) {
            const users = JSON.parse(storedUsers)
            if (users.includes(user)) {
                setUser('')
                setPassword('')
                setSuccess(true)
            } else {
                setErrMsg('User or Password is incorrect')
            }
        }
    }

    return (
        <>
            {success ? (
                <section>
                    <h1>You are logged in!</h1>
                </section>) : (
                <section>
                    <p ref={errRef} className={errMsg ? "errmsg" : "hide"}>{errMsg}</p>
                    <h1>Sign In</h1>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="username">Username:</label>
                        <input
                            type="text"
                            id="username"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setUser(e.target.value)}
                            value={user}
                            required
                        />

                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            required
                        />
                        <button>Sign In</button>
                    </form>
                    <p>
                        Need an account?
                        <span className="line">
                            <a href="/register">Sign Up</a>
                        </span>
                    </p>
                </section>
            )}

        </>
    )
}