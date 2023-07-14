import React, { useRef, useState, useEffect, useContext } from 'react';
import axiosClient from '../../api/axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';

export default function Login() {
    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    // useEffect(() => {
    //     userRef.current.focus();
    // }, [])

    
    useEffect(() => {
        setErrMsg('');
    }, [user, pwd])

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email('Invalid email address')
                .required('Email is required'),
            password: Yup.string()
                .required('Password is required'),
        }),
    })
    
    const onSubmit = async (e) => {
        e.preventDefault();

        const url = '/admin/employees/login';

        try {
            // Promise
            const res = await axiosClient.post(url, { email: user, password: pwd })

            const { token } = res;
            console.log('Login thành công');
        } catch (error) {
            console.log("error", error)
        }
        }
    ;

    return (
        <>
            {success ? (
                <section>
                    <h1>You are logged in!</h1>
                    <br />
                    <p>
                        <a href="#">Go to Home</a>
                    </p>
                </section>
            ) : (
                <section>
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>

                    <div className="container">
                        <h1>Login</h1>
                        <form onSubmit={formik.handleSubmit} ></form>
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="email"
                                    autoComplete="off"
                                    onChange={(e) => setUser(e.target.value)}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.user}
                                    required
                                />
                                {formik.touched.email && formik.errors.email ? (
                                    <div className="errmsg" aria-live="assertive">
                                        {formik.errors.email}
                                    </div>
                                ) : null}
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="password"
                                    onChange={(e) => setPwd(e.target.value)}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.pwd}
                                    required
                                />
                                {formik.touched.password && formik.errors.password ? (
                                    <div className="errmsg" aria-live="assertive">
                                        {formik.errors.password}
                                    </div>
                                ) : null}
                            </div>
                            <button onClick={onSubmit} className="btn btn-primary">Submit</button>
                            
                    </div>
                    
                </section>

            )}
        </>
    )
}
