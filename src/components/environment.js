import React, { useState, useEffect } from 'react';
import {
  Grid,
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Typography,
} from '@mui/material';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import { db, auth } from '../firebase';
import { collection, addDoc } from "firebase/firestore";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";





const WorkoutEnvironmentForm = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [time, setTime] = useState('');
  const [weekDay, setWeekDay] = useState('');
  // const [userId, setUserId] = useState('');
  // const [image, setImage] = useState('');
  const [restTime, setRestTime] = useState('');
  const [user, setUser] = useState(null);

  

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
        if(!user){
            navigate("/");
        }
    })
  }, [])
  
  const navigate = useNavigate();


  const handleSubmit = async (event) => {
    event.preventDefault();
  
    try {
      // Add a new document with the form data
      const docRef = await addDoc(collection(db, "environments"), {
        userId:user.uid,
        name,
        description,
        time,
        weekDay,
        restTime,
      });
  
      
      console.log("Document written with ID: ", docRef.id);
      navigate("/dashboard");
      
      if (onSubmit) {
        onSubmit();
        
      }
      

    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };
  

  const handleAlbum = () => {
    navigate("/album");
};

const handleEnvironments = () => {
  navigate("/displayEnvironments");
};


const handleSignOut = () => {
  signOut(auth)
  .then(() => {
      navigate("/");
  })
  .catch((err) => {
      alert(err.message);
  });
};

  
return (
    // <Box p={2} 
    // // bgcolor="#f5f5f5"
    
    // >

    <Box
    p={2}
    bgcolor="white"
    style={{
    //   backgroundImage: "url('https://completewellbeing.com/wp-content/uploads/2016/09/mind-your-own-fitness-1.jpg')",
      backgroundSize: 'cover',
    }}
  >
      <Grid container spacing={2} justifyContent="center" >
        <Grid item xs={12} md={8}>
          <Box style={{
      backgroundImage: "url('https://t4.ftcdn.net/jpg/05/27/14/91/360_F_527149176_ywgMPpNrKBNRJz1fBoDf306eMnOhn0JC.jpg')",
      backgroundSize: 'cover',
    }}   borderRadius={8} p={3}>
          {/* bgcolor="white" */}
            <Box mb={3}>
              <Typography variant="h4" component="h1" align="center">
                <FitnessCenterIcon fontSize="large" />
                Workout Environment
              </Typography>
            </Box>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    label="Name"
                    variant="outlined"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    required
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Description"
                    variant="outlined"
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                    required
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Time"
                    type="time"
                    variant="outlined"
                    value={time}
                    onChange={(event) => setTime(event.target.value)}
                    required
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth variant="outlined">
                    <InputLabel id="week-day-label">Week Day</InputLabel>
                    <Select
                      labelId="week-day-label"
                      value={weekDay}
                      onChange={(event) => setWeekDay(event.target.value)}
                      required
                      label="Week Day"
                    >
                      <MenuItem value="Monday">Monday</MenuItem>
                      <MenuItem value="Tuesday">Tuesday</MenuItem>
                      <MenuItem value="Wednesday">Wednesday</MenuItem>
                      <MenuItem value="Thursday">Thursday</MenuItem>
                      <MenuItem value="Friday">Friday</MenuItem>
                      <MenuItem value="Saturday">Saturday</MenuItem>
                      <MenuItem value="Sunday">Sunday</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Rest Time"
                    type="time"
                    variant="outlined"
                    value={restTime}
                    onChange={(event) => setRestTime(event.target.value)}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button type="submit" variant="contained" color="primary" fullWidth >
                    Create
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <Button type="submit" variant="contained" color="primary" fullWidth onClick={handleAlbum}>
                    Check out our Media
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <Button type="submit" variant="contained" color="primary" fullWidth onClick={handleEnvironments}>
                    All Environments
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <Button type="submit" variant="contained" color="primary" fullWidth onClick={handleSignOut}>
                    Sign Out
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
  };

export default WorkoutEnvironmentForm;

