import React, { useState, useRef } from 'react'
import styles from './Verify.module.css'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import { endpoint } from '../../utils/endpoint';
import Navbar from '../../layout/Navbar/Navbar'


const Verify = () => {

    const inputRef1 = useRef(null)
    const inputRef2 = useRef(null)
    const inputRef3 = useRef(null)
    const inputRef4 = useRef(null)


    const [loading, setLoading] = useState(false)
    const [email, ] = useState(localStorage.getItem('email-verification'))

    const navigate = useNavigate()

    const _verify = () => {

        const otp = inputRef1.current.value + inputRef2.current.value + inputRef3.current.value + inputRef4.current.value
        console.log(otp)

        setLoading(true)
        const xhr = new XMLHttpRequest()
        xhr.open('post', `${endpoint}/verify`)
        xhr.setRequestHeader('Content-Type', 'application/json')

        xhr.onload = function () {
            setLoading(false)
            const data = JSON.parse(xhr.response)
            if (data.error) {
                toast.error(data.error, {
                    position: toast.POSITION.TOP_RIGHT
                });
            } else {
                toast.success(data.success, {
                    position: toast.POSITION.TOP_RIGHT
                });
                navigate('/login')
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

        xhr.send(JSON.stringify({ otp, email }))

    }

    const verifyInput = (e) => {
        if (e.target.value !== "") {
            if (e.target.nextElementSibling) {
                e.target.nextElementSibling.focus()
            }
        }
    }

    return (
        <>
            <Navbar show={true} />
            <section className="max-wrapper">
                <div className="max-wrapper__content">
                    <div className={styles.verify}>
                        <header className={styles.header}>
                            <h1>Verify your account</h1>
                        </header>
                        <div>
                            <div className={styles.row}>
                                <div className={styles.verify__inputs}>
                                    <input type="text" className={styles.input} maxLength="1" onChange={verifyInput} ref={inputRef1} autoComplete="off" />
                                    <input type="text" className={styles.input} maxLength="1" onChange={verifyInput} ref={inputRef2} autoComplete="off" />
                                    <input type="text" className={styles.input} maxLength="1" onChange={verifyInput} ref={inputRef3} autoComplete="off" />
                                    <input type="text" className={styles.input} maxLength="1" onChange={verifyInput} ref={inputRef4} autoComplete="off" />
                                </div>
                            </div>
                            <div className={[styles.row, styles.center].join(' ')}>
                                {
                                    loading ? <button className={styles.btn__loading}>Loading...</button> : <button onClick={_verify}>Verify</button>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Verify