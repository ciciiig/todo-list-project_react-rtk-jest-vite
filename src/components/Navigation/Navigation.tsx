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
          <button onClick={() => navigate("/")} style={{ color: "white" }}>
            Home
          </button>
        </div>
        <div className="auth">
          <button onClick={() => navigate("/login")} style={{ color: "white" }}>
            Login
          </button>
          <button
            onClick={() => navigate("/register")}
            style={{ color: "white" }}
          >
            Register
          </button>
        </div>
      </div>
    </>
  )
}
