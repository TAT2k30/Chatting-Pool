import React, { useState } from 'react';
import Modal from '../components/Modal/Modal';
import useClient from '../hook/useClient';

type LoginCredential = {
    email: string,
    password: string
}

type SignUpForm = { 
    name: string,
    email: string,
    password: string,
}

const Header = () => {
    const {user, isLoggedIn, login, signup, logout } = useClient();
    const [isLoginModalOpen, setLoginModalOpen] = useState(false);
    const [isSignupModalOpen, setSignupModalOpen] = useState(false);
    const [loginForm, setLoginForm] = useState<LoginCredential>({ email: '', password: '' });
    const [signUpForm, setSignUpForm] = useState<SignUpForm>({ name: '', email: '', password: '' });

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await login(loginForm.email, loginForm.password);
            setLoginModalOpen(false);
        } catch (error) {
            console.error('Login failed:', error);
        }
    }

    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await signup(signUpForm.name, signUpForm.email, signUpForm.password);
            setSignupModalOpen(false);
        } catch (error) {
            console.error('Signup failed:', error);
        }
    }

    const handleLoginFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.currentTarget;
        setLoginForm(prevState => ({ ...prevState, [name]: value }));
    }

    const handleSignUpFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setSignUpForm(prevState => ({ ...prevState, [name]: value }));
    }

    const handleLoginForm = () => {
        setLoginModalOpen(true);
    };

    const handleSignupForm = () => {
        setSignupModalOpen(true);
    };

    return (
        <header className="bg-primary text-white">
            <div className="container">
                <div className="d-flex justify-content-between align-items-center">
                    <h1 className="mb-0">Chat pool</h1>
                    <nav>
                        {isLoggedIn() ? (
                            <ul className="nav">
                                <li className="nav-item">
                                    <a className="nav-link text-white" href="#">Hello {user?.name}</a>
                                    <a className='nav-link text-white btn btn-danger' onClick={() => {logout()}} >Logout</a>
                                </li>
                            </ul>
                        ) : (
                            <>
                                <button className='btn btn-warning' style={{ marginRight: "20px" }} onClick={handleLoginForm}><b>Log in</b></button>
                                <button className='btn btn-danger' onClick={handleSignupForm}><b>Sign up</b></button>
                            </>
                        )}
                    </nav>
                </div>
            </div>

            {isLoginModalOpen && (
                <Modal onClose={() => setLoginModalOpen(false)}>
                    <div className="modal-content">
                        <div className="modal-header text-dark" style={{ width: "70%", alignItems: "center" }}>
                            <h2 className="modal-title">Log In Form</h2>
                        </div>
                        <hr />
                        <div className="modal-body">
                            <form onSubmit={handleLogin} method='post'>
                                <div className="form-group">
                                    <label htmlFor="email" className='text-dark' style={{ fontSize: "larger", fontWeight: "bolder" }}>Email :</label>
                                    <input type="email" id="email" name="email" required className='form-control' style={{ width: '80%' }} onChange={handleLoginFormChange} value={loginForm.email} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password" className='text-dark' style={{ fontSize: "larger", fontWeight: "bolder" }}>Password :</label>
                                    <input type="password" id="password" name="password" required className='form-control' style={{ width: '80%' }} onChange={handleLoginFormChange} value={loginForm.password} />
                                </div>

                                <button type="submit" className="btn btn-primary" style={{ marginTop: "20px" }}>Log In</button>
                            </form>
                        </div>
                    </div>
                </Modal>
            )}

            {isSignupModalOpen && (
                <Modal onClose={() => setSignupModalOpen(false)}>
                    <div className="modal-content">
                        <div className="modal-header text-dark" style={{ width: "70%", alignItems: "center" }}>
                            <h2 className="modal-title">Sign Up Form</h2>
                        </div>
                        <hr />
                        <div className="modal-body">
                            <form onSubmit={handleSignUp}>
                                <div className="form-group">
                                    <label htmlFor="name" className='text-dark' style={{ fontSize: "larger", fontWeight: "bolder" }}>User name :</label>
                                    <input type="text" id="name" name="name" required className='form-control' style={{ width: '80%' }} onChange={handleSignUpFormChange} value={signUpForm.name} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email" className='text-dark' style={{ fontSize: "larger", fontWeight: "bolder" }}>Email :</label>
                                    <input type="email" id="email" name="email" required className='form-control' style={{ width: '80%' }} onChange={handleSignUpFormChange} value={signUpForm.email} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password" className='text-dark' style={{ fontSize: "larger", fontWeight: "bolder" }}>Password :</label>
                                    <input type="password" id="password" name="password" required className='form-control' style={{ width: '80%' }} onChange={handleSignUpFormChange} value={signUpForm.password} />
                                </div>

                                <button type="submit" className="btn btn-primary" style={{ marginTop: "20px" }}>Sign Up</button>
                            </form>
                        </div>
                    </div>
                </Modal>
            )}
        </header>
    );
};

export default Header;
