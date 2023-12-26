import "./Navigation.css"
import { FC } from "react"
import { useNavigate } from "react-router-dom"

export const Navigation: FC = () => {
  let navigate = useNavigate()

  return (
    <>
      <div className="nav-container">
        <div>
          <button onClick={() => navigate("/")}>📃</button>
        </div>
        <div className="home">
          <button onClick={() => navigate("/")}>Home</button>
        </div>
        <div className="auth">
          <button onClick={() => navigate("/login")}>Login</button>
          <button onClick={() => navigate("/register")}>Register</button>
        </div>
      </div>
    </>
  )
}
