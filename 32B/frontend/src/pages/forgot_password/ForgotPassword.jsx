import React, { useState } from 'react';
import { forgotPasswordApi, verifyOtpApi } from '../../apis/Api';
import { toast } from 'react-toastify';
import './ForgotPassword.css'; // Import the CSS file

const ForgotPassword = () => {
    const [phone, setPhone] = useState('');
    const [isSent, setIsSent] = useState(false);
    const [otp, setOtp] = useState('');
    const [password, setPassword] = useState('');

    const handleForgotPassword = (e) => {
        e.preventDefault();
        forgotPasswordApi({ phone }).then((res) => {
            if (res.status === 200) {
                toast.success(res.data.message);
                setIsSent(true);
            }
        }).catch((error) => {
            if (error.response.status === 400) {
                toast.error(error.response.data.message);
            }
        });
    };

    const handleVerify = (e) => {
        e.preventDefault();
        const data = { phone, otp, password };
        verifyOtpApi(data).then((res) => {
            if (res.status === 200) {
                toast.success(res.data.message);
            }
        }).catch((error) => {
            if (error.response.status === 400) {
                toast.error(error.response.data.message);
            }
        });
    };

    return (
        <div className='forgot-password-container'>
            <div className='forgot-password-wrapper'>
                <h3>Forgot Password</h3>
                <form className='forgot-password-form'>
                    <div className='phone-input'>
                        <h4>+977</h4>
                        <input
                            disabled={isSent}
                            onChange={(e) => setPhone(e.target.value)}
                            className='form-control'
                            type='number'
                            placeholder='Enter your valid number'
                        />
                    </div>
                    <button
                        disabled={isSent}
                        onClick={handleForgotPassword}
                        className='btn btn-dark w-100 mt-2'
                    >
                        Send OTP
                    </button>
                    {isSent && (
                        <>
                            <hr />
                            <span>OTP has been sent to {phone} ✅</span>
                            <input
                                onChange={(e) => setOtp(e.target.value)}
                                type='number'
                                className='form-control mt-2'
                                placeholder='Enter valid OTP'
                            />
                            <input
                                onChange={(e) => setPassword(e.target.value)}
                                type='password'
                                className='form-control mt-2'
                                placeholder='Set new password'
                            />
                            <button
                                onClick={handleVerify}
                                className='btn btn-primary mt-2 w-100'
                            >
                                Verify OTP & Set Password
                            </button>
                        </>
                    )}
                </form>
            </div>
        </div>
    );
};

export default ForgotPassword;
