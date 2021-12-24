import { useState } from 'react'
import Router from 'next/router'
import { useUser } from '../lib/hooks'
import Form from '../components/form'

const Login = () => {
    useUser({ redirectTo: '/', redirectIfFound: true })

    const [signupMsg, setSignupMsg] = useState('')
    const [loginMsg, setLoginMsg] = useState('')

    async function handleLogin(e) {
        e.preventDefault()

        if (loginMsg) setLoginMsg('')

        const body = {
            username: e.currentTarget.username.value,
            password: e.currentTarget.password.value,
        }

        try {
            const res = await fetch('/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            })
            if (res.status === 200) {
                setTimeout(() => {
                    Router.push('/learn')
                }, 1000)
            } else {
                throw new Error(await res.text())
            }
        } catch (error) {
            console.error('An unexpected error happened occurred:', error)
            setLoginMsg(error.message)
        }
    }

    async function handleSignup(e) {
        e.preventDefault()

        if (signupMsg) setSignupMsg('')

        const body = {
            username: e.currentTarget.username.value,
            password: e.currentTarget.password.value,
        }

        if (body.password !== e.currentTarget.rpassword.value) {
            setSignupMsg(`The passwords don't match`)
            return
        }

        try {
            const res = await fetch('/api/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            })
            if (res.status === 200) {
                Router.push('/learn')
            } else {
                throw new Error(await res.text())
            }
        } catch (error) {
            console.error('An unexpected error happened occurred:', error)
            setSignupMsg(error.message)
        }
    }

    return (
        <div className="loginContainer">
            <div className="login">
                <Form isLogin errorMessage={loginMsg} onSubmit={handleLogin} />
            </div>
            <div className="login border-left-none">
                <Form isLogin={false} errorMessage={signupMsg} onSubmit={handleSignup} />
            </div>
            <style jsx>{`
        .loginContainer {
            display: flex;

            margin: 10vh auto;

            width: fit-content;

            background-color: white;

        }

        .login {
          width: 300px;
          margin: 0;
          padding: 1rem;
          border: 1px solid #ccc;
          background-color: white;
        }

        .border-left-none {
            border-left: none;
        }
      `}</style>
        </div>
    )
}

export default Login
