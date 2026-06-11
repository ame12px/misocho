import { useState } from "react"

export function useAuth() {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  )

  const login = async (email: string, password: string) => {
    const res = await fetch("http://localhost:3000/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })
    const data = await res.json()
    if (data.token) {
      localStorage.setItem("token", data.token)
      setToken(data.token)
      return true
    }
    return false
  }

  const logout = () => {
    localStorage.removeItem("token")
    setToken(null)
  }

  return { token, login, logout }
}
