import React, {useState} from 'react'
import styles from './Login.module.css'
import Input from '../../components/Input/Input'
import {Link, useNavigate} from 'react-router-dom'
import { toast } from 'react-toastify';
import { endpoint } from '../../utils/endpoint';
import Navbar from '../../layout/Navbar/Navbar'
import { validateEmail } from '../../utils/validateEmail';


const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(false)
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const login = () => {

    if (!validateEmail(email)){
      return toast.error("Invalid email", {
        position: toast.POSITION.TOP_RIGHT
      });
    }

    setLoading(true)
    const xhr = new XMLHttpRequest()
    xhr.open('post', `${endpoint}/login`)
    xhr.setRequestHeader('Content-Type', 'application/json')

    xhr.onload = function () {
      setLoading(false)
      const data = JSON.parse(xhr.response)
      localStorage.setItem('_tk', data.token)
      if (data.error) {
        toast.error(data.error, {
          position: toast.POSITION.TOP_RIGHT
        });
      } else {
        toast.success('Logged in Successfully', {
          position: toast.POSITION.TOP_RIGHT
        });
        navigate('/bootcamp')
      }
    }
    xhr.onerror = function () {
      setLoading(false)
      toast.error("An error occurred!", {
        position: toast.POSITION.TOP_RIGHT
      });
    }
    xhr.ontimeout = function () {
      setLoading(false)
      toast.error("An error occurred!", {
        position: toast.POSITION.TOP_RIGHT
      });
    }

    xhr.send(JSON.stringify({ email, password }))

  }

  return (
    <>
      <Navbar show={true}/>
      <section className="max-wrapper">
        <div className="max-wrapper__content">
            <div className={styles.login}>
                <header className={styles.header}>
                    <h1>Sign in</h1>
                </header>
                <div>
                    <div className={styles.row}>
                        <p>Email</p>
                        <Input value={email} onChange={(e) => setEmail(e.target.value)}/>
                    </div>
                    <div className={styles.row}>
                        <p>Password</p>
                        <Input value={password} type="password" onChange={(e) => setPassword(e.target.value)}/>
                    </div>
                    <div className={[styles.row, styles.remember].join(' ')}>
                        <div className={styles.flex}>
                            <div className={styles.checkbox} onClick={() => setRemember(!remember)}>{remember ? '✔️' : ''}</div>
                            <p>Remember Me</p>
                        </div>
                        <p>Forgot Password?</p>
                    </div>
                    <div className={styles.row}>
                        {
                            loading ? <button className={styles.btn__loading}>Loading...</button> : <button onClick={login}>Sign in</button>
                        }
                    </div>
                    <div className={styles.row}>
                        <span>Don't have an account?</span><Link to='/signup'>Sign up</Link>
                    </div>
                </div>
            </div>
        </div>
    </section>
    </>
  )
}

export default Login