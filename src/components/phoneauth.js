import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, Paper, Avatar, TextField, Button } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { auth } from '../firebase';
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth"

const PhoneAuth = () => {

    const paperStyle = { padding: 20, height: '80vh', width: 280, margin: '20px auto' };
    const avatarStyle = { backgroundColor: '#1bbd7e' };
    const btnstyle = { margin: '8px 0' };

    const [phoneNumber, setPhoneNumber] = useState('');
    const [verificationCode, setVerificationCode] = useState('');
    const navigate = useNavigate();

    useEffect( () => {
        window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {}, auth);
    },[]);

    const handlePhoneNumberChange = (e) => {
        setPhoneNumber(e.target.value);
    };
    const handleVerificationCodeChange = (e) => {
        setVerificationCode(e.target.value);
    };

    const handleSendVerificationCode = (e) => {
        e.preventDefault();
        const appVerifier = window.recaptchaVerifier;
        signInWithPhoneNumber(auth, phoneNumber, appVerifier).then((confirmationResult) => {
            window.confirmationResult = confirmationResult;
            console.log('🎮🌴 ~ signIn ~ confirmationResult:', confirmationResult)
            }).catch((error) => {
            // Error; SMS not sent
            // ...
            console.log('🎮🌴 ~ signIn ~ error:', error)
        })
    };

    const handleVerifyCode = async (e) => {
        //const code = window.prompt("Enter OTP");
        const code = verificationCode;
        window.confirmationResult.confirm(code).then((result) => {
          // User signed in successfully.
          const user = result.user;
          console.log("signed in");
          console.log(user);
          navigate("/");
          // ...
        }).catch((error) => {
          console.log(error.message);
        });
    }

    return (
        <Grid>
        <Paper elevation={10} style={paperStyle}>
            <Grid align='center'>
            <Avatar style={avatarStyle}>
                <LockOutlinedIcon />
            </Avatar>
            <h2>Sign In with Phone Number</h2>
            </Grid>
            <TextField
            value={phoneNumber}
            label='Phone Number'
            placeholder='Enter phone number'
            type='tel'
            fullWidth
            required
            onChange={handlePhoneNumberChange}
            />
            <div id='recaptcha-container' style={{ margin: '10px 0' }}></div>
            <Button
            type='submit'
            color='primary'
            variant='contained'
            style={btnstyle}
            fullWidth
            onClick={handleSendVerificationCode}
            >
            Send Verification Code
            </Button>
            <TextField
                value={verificationCode}
                label='Verification Code'
                placeholder='Enter verification code'
                type='number'
                fullWidth
                required
                onChange={handleVerificationCodeChange}
                style={{ margin: '10px 0' }}
                />
                <Button
                type='submit'
                color='primary'
                variant='contained'
                style={btnstyle}
                fullWidth
                onClick={handleVerifyCode}
                >
                Verify Code
                </Button>
            </Paper>
        </Grid>
    );
};

export default PhoneAuth;