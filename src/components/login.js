

import React, { useState } from 'react'
import { Grid,Paper, Avatar, TextField, Button, Typography, Box, IconButton, Divider, Chip } from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import CallIcon from '@mui/icons-material/Call';
import GoogleIcon from '@mui/icons-material/Google';
import { Link } from "react-router-dom";
import { auth, provider } from "../firebase";
import { signInWithPopup, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { getUser, getUserFailure , getUserSuccess } from './store/users/users';

import { useSelector, useDispatch} from 'react-redux';



const Login=()=>{

   
   const loading = useSelector(state=>state.user.loading)
   const error = useSelector(state=>state.user.error)


    const paperStyle={padding :20,height:'80vh',width:280, margin:"20px auto"}
    const avatarStyle={backgroundColor:'#1bbd7e'}
    const btnstyle={margin:'8px 0'}

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };
     
    const dispatch = useDispatch();
    // const handleGoogleSignIn = () => { 
    //     dispatch(getUser());
    //     signInWithPopup(auth, provider)
    //       .then((data) => { 
    //         console.log(data);
    //         dispatch(getUserSuccess(data.user));
    //         
    //         localStorage.setItem("email", data.user.email)
            
    //       }).catch((error) => { 
    //         dispatch(getUserFailure());
    //         
    //         console.log(error.message);

    //     });
    // };

    const handleGoogleSignIn = () => { 
        dispatch(getUser());
        signInWithPopup(auth, provider)
            .then((data) => { 
                console.log(data);
                const { user } = data;
                dispatch(getUserSuccess({
                    uid: user.uid,
                    displayName: user.displayName,
                    email: user.email,
                    photoURL: user.photoURL
                }));
                
                localStorage.setItem("email", user.email)
            })
            .catch((error) => { 
                dispatch(getUserFailure());
                
                console.log(error.message);
            });
    };
    

    const handleEmailSignIn = (email, password) => {
        dispatch(getUser());
        signInWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {  
            dispatch(getUserSuccess(userCredential.user));
            // Handle successful authentication
            const user = userCredential.user;
            // localStorage.setItem("email", user.email);
            console.log(user);
            console.log("Signed In");
            navigate("/dashboard");
          })
          .catch((error) => {
            // Handle errors
            dispatch(getUserFailure());
            console.log(error.message);
            console.log(error);
            console.log(loading);
        });
    };


    return(
        <Grid>
            <Paper elevation={10} style={paperStyle}>
            <Grid align='center'>
                     <h2>Loading:{loading}</h2>
                </Grid>
                <Grid>      
                      <h2>error:{error}</h2>
                </Grid>
                <Grid align='center'>
                     <Avatar style={avatarStyle}><LockOutlinedIcon/></Avatar>
                    <h2>Sign In</h2>
                </Grid>
                <TextField value={email} label='Username' placeholder='Enter email' type='email' fullWidth required onChange={handleEmailChange} />
                <TextField value={password} label='Password' placeholder='Enter password' type='password' fullWidth required onChange={handlePasswordChange} />
                
                <Button type='submit' color='primary' variant="contained" style={btnstyle} fullWidth onClick={() => handleEmailSignIn(email, password)}>Sign in</Button>
                
                <Divider>
                <Chip label="OR" />
                </Divider>
                <Box textAlign='center'>
                
                <Button variant="outlined" startIcon={<GoogleIcon />} onClick={handleGoogleSignIn}>
                    Sign In with Google
                </Button>
                
                <Link to="/phoneauth">
                
                <Button variant="outlined" startIcon={<CallIcon />}>
                    Sign In with Phone Number
                </Button>
                
                </Link>
                </Box>

                <Typography >
                     <Link href="#" >
                        Forgot password ?
                </Link>
                </Typography>
                <Typography > Do you have an account ? 
                <Link to="/signup">
                    Sign Up
                </Link>
                </Typography>
            </Paper>
        </Grid>
    )
}

export default Login