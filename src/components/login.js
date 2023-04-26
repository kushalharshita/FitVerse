// import React, { useState } from 'react'
// import { Grid,Paper, Avatar, TextField, Button, Typography, Box, IconButton, Divider, Chip } from '@mui/material'
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
// import CallIcon from '@mui/icons-material/Call';
// import GoogleIcon from '@mui/icons-material/Google';
// import { Link } from "react-router-dom";
// import { auth, provider } from "../firebase";
// import { signInWithPopup, signInWithEmailAndPassword } from "firebase/auth";
// import { useNavigate } from "react-router-dom";


// const Login=()=>{

//     const paperStyle={padding :20,height:'80vh',width:280, margin:"20px auto"}
//     const avatarStyle={backgroundColor:'#1bbd7e'}
//     const btnstyle={margin:'8px 0'}

//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const navigate = useNavigate();

//     const handleEmailChange = (e) => {
//         setEmail(e.target.value);
//     };
//     const handlePasswordChange = (e) => {
//         setPassword(e.target.value);
//     };

//     const handleGoogleSignIn = () => {
//         signInWithPopup(auth, provider)
//           .then((data) => {
//             // Handle successful authentication
//             localStorage.setItem("email", data.user.email)
//             navigate("/dashboard");
//           }).catch((error) => {
//             // Handle errors
//             console.log(error.message);
//         });
//     };

//     const handleEmailSignIn = (email, password) => {
//         signInWithEmailAndPassword(auth, email, password)
//           .then((userCredential) => {
//             // Handle successful authentication
//             const user = userCredential.user;
//             // localStorage.setItem("email", user.email);
//             console.log(user);
//             console.log("Signed In");
//             navigate("/dashboard");
//           })
//           .catch((error) => {
//             // Handle errors
//             console.log(error.message);
//         });
//     };


//     return(
//         <Grid>
//             <Paper elevation={10} style={paperStyle}>
//                 <Grid align='center'>
//                      <Avatar style={avatarStyle}><LockOutlinedIcon/></Avatar>
//                     <h2>Sign In</h2>
//                 </Grid>
//                 <TextField value={email} label='Username' placeholder='Enter email' type='email' fullWidth required onChange={handleEmailChange} />
//                 <TextField value={password} label='Password' placeholder='Enter password' type='password' fullWidth required onChange={handlePasswordChange} />
                
//                 <Button type='submit' color='primary' variant="contained" style={btnstyle} fullWidth onClick={() => handleEmailSignIn(email, password)}>Sign in</Button>
                
//                 <Divider>
//                 <Chip label="OR" />
//                 </Divider>
//                 <Box textAlign='center'>
//                 <IconButton>
//                 <Button variant="outlined" startIcon={<GoogleIcon />} onClick={handleGoogleSignIn}>
//                     Sign In with Google
//                 </Button>
//                 </IconButton>
//                 <Link to="/phoneauth">
//                 <IconButton>
//                 <Button variant="outlined" startIcon={<CallIcon />}>
//                     Sign In with Phone Number
//                 </Button>
//                 </IconButton>
//                 </Link>
//                 </Box>

//                 <Typography >
//                      <Link href="#" >
//                         Forgot password ?
//                 </Link>
//                 </Typography>
//                 <Typography > Do you have an account ? 
//                 <Link to="/signup">
//                     Sign Up
//                 </Link>
//                 </Typography>
//             </Paper>
//         </Grid>
//     )
// }

// export default Login

import React, { useState } from 'react';
import { Grid, Paper, Avatar, TextField, Button, Typography, Box, IconButton, Divider, Chip } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import CallIcon from '@mui/icons-material/Call';
import GoogleIcon from '@mui/icons-material/Google';
import { Link } from 'react-router-dom';
import { auth, provider } from '../firebase';
import { signInWithPopup, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const paperStyle = {
    padding: 20,
    height: 'auto',
    width: 350,
    margin: '20px auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  };
  const avatarStyle = { backgroundColor: '#1bbd7e' };
  const btnstyle = { margin: '8px 0' };

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleGoogleSignIn = () => {
    signInWithPopup(auth, provider)
      .then((data) => {
        // Handle successful authentication
        localStorage.setItem('email', data.user.email);
        navigate('/dashboard');
      })
      .catch((error) => {
        // Handle errors
        console.log(error.message);
      });
  };

  const handleEmailSignIn = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Handle successful authentication
        const user = userCredential.user;
        // localStorage.setItem("email", user.email);
        console.log(user);
        console.log('Signed In');
        navigate('/dashboard');
      })
      .catch((error) => {
        // Handle errors
        console.log(error.message);
      });
  };

  return (
    <Grid container justifyContent="center" alignItems="center" sx={{ height: '100vh' }}>
      <Paper elevation={10} style={paperStyle}>
        <Grid align="center">
          <Avatar style={avatarStyle}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography variant="h5" gutterBottom>
            Sign In
          </Typography>
        </Grid>
        <Box sx={{ width: '100%', marginBottom: 2 }}>
          <TextField
            value={email}
            label="Username"
            placeholder="Enter email"
            type="email"
            fullWidth
            required
            onChange={handleEmailChange}
          />
        </Box>
        <Box sx={{ width: '100%', marginBottom: 2 }}>
          <TextField
            value={password}
            label="Password"
            placeholder="Enter password"
            type="password"
            fullWidth
            required
            onChange={handlePasswordChange}
          />
        </Box>
        <Button
          type="submit"
          color="primary"
          variant="contained"
          style={btnstyle}
          fullWidth
          onClick={() => handleEmailSignIn(email, password)}
        >
          Sign In
        </Button>
        {/* <Typography variant="subtitle2" gutterBottom>
          Don't have an account?&nbsp;
          <Link to="/signup">Sign Up</Link>
        </Typography> */}

<Typography > Do you have an account ? 
                <Link to="/signup">
                    Sign Up
                 </Link>
                </Typography>
        <Divider sx={{ my: 2 }}>or</Divider>
        {/* <IconButton onClick={handleGoogleSignIn} sx={{ mx , 2 }> */}
        <IconButton onClick={handleGoogleSignIn} sx={{ marginLeft: 2, marginRight: 2 }}>
<GoogleIcon />
</IconButton>
<Typography variant="subtitle2" gutterBottom>
Sign In with Google
</Typography>
<Chip
icon={<CallIcon />}
label="Phone"
clickable
color="primary"
variant="outlined"
sx={{ mt: 2 }}
/>
</Paper>
</Grid>
);
};

export default Login;







