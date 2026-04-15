import { useState } from 'react'
import { signUp, signIn, signOut, getUser } from '@/src/shared/api/auth'

export const AuthTest = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [status, setStatus] = useState('')

  const handleSignUp = async () => {
    const { data, error } = await signUp(email, password)
    setStatus(error ? `Ошибка: ${error.message}` : 'Зарегистрирован!')
    console.log(data, error)
  }

  const handleSignIn = async () => {
    const { data, error } = await signIn(email, password)
    setStatus(error ? `Ошибка: ${error.message}` : 'Вошёл!')
    console.log(data, error)
  }

  const handleSignOut = async () => {
    const { error } = await signOut()
    setStatus(error ? `Ошибка: ${error.message}` : 'Вышел!')
    console.log(error)
  }

  const handleGetUser = async () => {
    const user = await getUser()
    setStatus(user ? `Ты: ${user.email}` : 'Не авторизован')
    console.log(user)
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '420px', background: 'linear-gradient(135deg,#0d1117 0%,#0f1923 100%)', borderRadius: '12px', padding: '2rem' }}>
      <div style={{ background: 'rgba(255,255,255,0.04)', border: '0.5px solid rgba(255,255,255,0.1)', borderRadius: '12px', padding: '2rem 2.5rem', width: '100%', maxWidth: '380px' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <span style={{ fontSize: '22px', fontWeight: 500, color: '#fff' }}>Dev</span>
          <span style={{ fontSize: '22px', fontWeight: 500, color: '#4da6ff' }}>Rank</span>
          <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.45)', margin: '6px 0 0' }}>Sign in to your account</p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <input
            type="email"
            placeholder="Email"
            onChange={e => setEmail(e.target.value)}
            style={{ background: 'rgba(255,255,255,0.06)', border: '0.5px solid rgba(255,255,255,0.15)', borderRadius: '8px', padding: '10px 14px', color: '#fff', fontSize: '14px', outline: 'none', width: '100%', boxSizing: 'border-box' }}
          />
          <input
            type="password"
            placeholder="Password"
            onChange={e => setPassword(e.target.value)}
            style={{ background: 'rgba(255,255,255,0.06)', border: '0.5px solid rgba(255,255,255,0.15)', borderRadius: '8px', padding: '10px 14px', color: '#fff', fontSize: '14px', outline: 'none', width: '100%', boxSizing: 'border-box' }}
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '1.25rem' }}>
          <button onClick={handleSignUp} style={{ background: '#2f6de8', border: 'none', borderRadius: '8px', padding: '10px', color: '#fff', fontSize: '14px', fontWeight: 500, cursor: 'pointer', width: '100%' }}>
            Create account
          </button>
          <button onClick={handleSignIn} style={{ background: 'rgba(255,255,255,0.06)', border: '0.5px solid rgba(255,255,255,0.15)', borderRadius: '8px', padding: '10px', color: '#fff', fontSize: '14px', cursor: 'pointer', width: '100%' }}>
            Sign in
          </button>
        </div>

        <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
          <button onClick={handleSignOut} style={{ flex: 1, background: 'rgba(255,255,255,0.04)', border: '0.5px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '9px', color: 'rgba(255,255,255,0.5)', fontSize: '13px', cursor: 'pointer' }}>
            Sign out
          </button>
          <button onClick={handleGetUser} style={{ flex: 1, background: 'rgba(255,255,255,0.04)', border: '0.5px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '9px', color: 'rgba(255,255,255,0.5)', fontSize: '13px', cursor: 'pointer' }}>
            Who am I?
          </button>
        </div>

        {status && (
          <p style={{ marginTop: '1rem', fontSize: '12px', color: '#4da6ff', textAlign: 'center' }}>
            {status}
          </p>
        )}
      </div>
    </div>
  )
}