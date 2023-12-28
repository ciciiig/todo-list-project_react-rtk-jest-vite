import "./App.css"
import { FC } from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Register } from "./components/Register/Register"
import { Login } from "./components/Login/Login"
import { Todos } from "./components/Todos/Todos"
import { Navigation } from "./components/Navigation/Navigation"

export const App: FC = () => {
  return (
    <Router>
      <main className="app">
        <Navigation />
        <Routes>
          <Route path="/" element={<Todos />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </main>
    </Router>
  )
}
