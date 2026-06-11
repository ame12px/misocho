import { useState } from "react"

interface LoginProps {
  onLogin: (email: string, password: string) => Promise<boolean>
}

function Login({ onLogin }: LoginProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = async () => {
    const success = await onLogin(email, password)
    if (!success) setError("メールアドレスまたはパスワードが違います")
  }

  return (
    <div className="login">
      <h1 className="login__title">misocho</h1>
      <div className="login__form">
        <input
          className="login__input"
          type="email"
          placeholder="メールアドレス"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="login__input"
          type="password"
          placeholder="パスワード"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p className="login__error">{error}</p>}
        <button className="login__button" onClick={handleSubmit}>
          ログイン
        </button>
      </div>
    </div>
  )
}

export default Login
