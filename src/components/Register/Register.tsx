import "./Register.css"
import { FC, FormEvent } from "react"
import { useRef, useState, useEffect } from "react"

const MAIL_REGEX = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
const PASSWORD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/

export const Register: FC = () => {
    const userRef = useRef<HTMLInputElement | null>(null)
    const errRef = useRef<HTMLInputElement | null>(null)

    const [user, setUser] = useState('')
    const [validName, setValidName] = useState(false)
    const [userFocus, setUserFocus] = useState(false)

    const [usersList, setUsersList] = useState<string[]>([])

    const [password, setPassword] = useState('')
    const [validPassword, setValidPassword] = useState(false)
    const [passwordFocus, setPasswordFocus] = useState(false)

    const [errMsg, setErrMsg] = useState('')
    const [success, setSuccess] = useState(false)

    useEffect(() => {
        const storedUsers = localStorage.getItem('username');
        if (storedUsers) {
            setUsersList(JSON.parse(storedUsers));
        }

        if (userRef.current) {
            userRef.current.focus();
        }
    }, [])

    useEffect(() => {
        setValidName(MAIL_REGEX.test(user))
    }, [user])

    useEffect(() => {
        setValidPassword(PASSWORD_REGEX.test(password))
    }, [password])

    useEffect(() => {
        setErrMsg('')
    }, [user, usersList, password])

    useEffect(() => {
        localStorage.setItem('username', JSON.stringify(usersList))
    }, [usersList])

    const checkIfUsernameExists = (usernameEmail: string) => {
        if (!usersList.includes(usernameEmail)) {
            setUsersList(prevUsers => [...prevUsers, usernameEmail])
            setSuccess(true)
        } else {
            setErrMsg("User already exists")
            setSuccess(false)
        }
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        checkIfUsernameExists(user)
    }

    return (
        <>
            {success ? (
                <section>
                    <h1>Registration completed!</h1>
                </section>
            ) : (
                <section>
                    <p ref={errRef} className={errMsg ? "errmsg" : "hide"}>{errMsg}</p>
                    <h1>Register</h1>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="username">
                            Username:
                            <span className={validName ? "valid" : "hide"}>✔
                            </span>
                            <span className={validName || !user ? "hide" : "invalid"}>✘
                            </span>
                        </label>
                        <input
                            type="text"
                            id="username"
                            placeholder="someone@example.com"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setUser(e.target.value)}
                            required
                            onFocus={() => setUserFocus(true)}
                            onBlur={() => setUserFocus(false)}
                        />
                        <p className={userFocus && user && !validName ? "instructions" : "hide"}>
                            Valid Email only
                        </p>

                        <label htmlFor="password">
                            Password:
                            <span className={validPassword ? "valid" : "hide"}>✔
                            </span>
                            <span className={validPassword || !password ? "hide" : "invalid"}>✘
                            </span>
                        </label>
                        <input
                            type="password"
                            id="password"
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            onFocus={() => setPasswordFocus(true)}
                            onBlur={() => setPasswordFocus(false)}
                        />
                        <p className={passwordFocus && !validPassword ? "instructions" : "hide"}>
                            - at least 8 characters<br />
                            - must contain at least 1 uppercase, lowercase and number<br />
                            - Can contain special characters
                        </p>
                        <button disabled={!validName || !validPassword}>Sign Up</button>
                    </form>
                    <p>
                        Already have an account?
                        <span className="line">
                            <a href="/login">Login</a>
                        </span>
                    </p>
                </section>
            )}
        </>
    )
}