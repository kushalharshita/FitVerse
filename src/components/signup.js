
import React, { useState } from 'react'
import { Grid, Paper, Avatar, Typography, TextField, Button } from '@mui/material'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { AddCircleOutlineOutlined } from '@mui/icons-material';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from "react-router-dom"

const Signup = () => {
    const paperStyle = { padding: '30px 20px', width: 300, margin: "20px auto" }
    const headerStyle = { margin: 0 }
    const avatarStyle = { backgroundColor: '#1bbd7e' }
    const marginTop = { marginTop: 5 }

    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [gender, setGender] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [age, setAge] = useState('');
    const [weight, setWeight] = useState('');
    const [height, setHeight] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSignup = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            alert("Please confirm that password are the same");
            return;
        }

        createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
            navigate("/");
        })
        .catch((err) => alert(err.message));
      };

    return (
        <Grid>
            <Paper elevation={20} style={paperStyle}>
                <Grid align='center'>
                    <Avatar style={avatarStyle}>
                        <AddCircleOutlineOutlined />
                    </Avatar>
                    <h2 style={headerStyle}>Sign Up</h2>
                    <Typography variant='caption' gutterBottom>Please fill this form to create an account !</Typography>
                </Grid>
                <form onSubmit={handleSignup}>
                    <TextField
                        fullWidth
                        label="Name"
                        placeholder="Enter your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />

                    <TextField
                    fullWidth
                    label="Email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    />

                    <RadioGroup
                    aria-label="gender"
                    name="gender"
                    style={{ display: 'initial' }}
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    >
                    <FormControlLabel value="female" control={<Radio />} label="Female" />
                    <FormControlLabel value="male" control={<Radio />} label="Male" />
                    </RadioGroup>

                    <TextField
                    fullWidth
                    label="Phone Number"
                    placeholder="Enter your phone number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    />

                    <div className="side-by-side">
                    <TextField
                        fullWidth
                        label="Age"
                        placeholder="Age"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                    />
                    <TextField
                        fullWidth
                        label="Weight"
                        placeholder="Weight"
                        value={weight}
                        onChange={(e) => setWeight(e.target.value)}
                    />
                    <TextField
                        fullWidth
                        label="Height"
                        placeholder="Height"
                        value={height}
                        onChange={(e) => setHeight(e.target.value)}
                    />
                    </div>

                    <TextField
                    fullWidth
                    label="Password"
                    placeholder="Enter your password"
                    value={password}
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    />

                    <TextField
                    fullWidth
                    label="Confirm Password"
                    placeholder="Confirm your password"
                    value={confirmPassword}
                    type="password"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    {/* <TextField fullWidth label='Name' placeholder="Enter your name" />
                    <TextField fullWidth label='Email' placeholder="Enter your email" value={email} />
                    <FormControl component="fieldset" style={marginTop}>
                        <FormLabel component="legend">Gender</FormLabel>
                        <RadioGroup aria-label="gender" name="gender" style={{ display: 'initial' }}>
                            <FormControlLabel value="female" control={<Radio />} label="Female" />
                            <FormControlLabel value="male" control={<Radio />} label="Male" />
                        </RadioGroup>
                    </FormControl>
                    <TextField fullWidth label='Phone Number' placeholder="Enter your phone number" />
                    <div className="side-by-side">
                    <TextField fullWidth label='Age' placeholder="Age" />
                    <TextField fullWidth label='Weight' placeholder="Weight" />
                    <TextField fullWidth label='Height' placeholder="Height" />
                    </div>
                    
                    <TextField fullWidth label='Password' placeholder="Enter your password" value={password} />
                    <TextField fullWidth label='Confirm Password' placeholder="Confirm your password"/> */}
                    {/* <FormControlLabel
                        control={<Checkbox name="checkedA" />}
                        label="I accept the terms and conditions."
                    /> */}
                    <Button type='submit' variant='contained' color='primary'>Sign up</Button>
                </form>
            </Paper>
        </Grid>
    )
}

export default Signup;