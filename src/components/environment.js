import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
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
import {
  addEnvironment,
  loadEnvironments,
  selectEnvironments,
  selectEnvironmentStatus,
} from '../components/environments/environmentSlice';
import { db, auth } from '../firebase';
import { signOut } from 'firebase/auth';
import { collection, addDoc, onSnapshot, query, where } from "firebase/firestore";
import { Link, useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

const WorkoutEnvironmentForm = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [time, setTime] = useState('');
  const [weekDay, setWeekDay] = useState('');
  const [restTime, setRestTime] = useState('');
 
  const [user, setUser] = useState(null);
  const [todoArray, setTodoArray] = useState([]);

  const environments = useSelector(selectEnvironments);
  const environmentStatus = useSelector(selectEnvironmentStatus);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (!user) {
        navigate('/');
      }
    });
  }, []);

  useEffect(() => {
    // getENvironmemnts();
    const q = query(collection(db, "environments") );
    const unsub = onSnapshot(q, (querySnapshot) => {
      let todosArray = [];
      console.log(querySnapshot);
      querySnapshot.forEach((doc) => {
        const envDetail = { ...doc.data(), id: doc.id };
        todosArray.push(envDetail);
        dispatch(addEnvironment(envDetail));
      });
    });
    renderEnvironments();
  },[]);

  // const getENvironmemnts = () => {
  //   const q = query(collection(db, "environments"));
  //   const unsub = onSnapshot(q, (querySnapshot) => {
  //     let todosArray = [];
  //     console.log(querySnapshot);
  //     querySnapshot.forEach((doc) => {
  //       const envDetail = { ...doc.data(), id: doc.id };
  //       todosArray.push(envDetail);
  //       dispatch(addEnvironment(envDetail));
  //     });
   
  //   });
  // }

  // const getENvironmemnts = () => {
  //   const q = query(collection(db, "environments"), where("userId", "==", user.uid));
  //   const unsub = onSnapshot(q, (querySnapshot) => {
  //     let todosArray = [];
  //     console.log(querySnapshot);
  //     querySnapshot.forEach((doc) => {
  //       const envDetail = { ...doc.data(), id: doc.id };
  //       todosArray.push(envDetail);
  //       dispatch(addEnvironment(envDetail));
  //     });
  //   });
  // };

  // const getENvironmemnts = () => {
    
  // };

  

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
     
      const docRef = await addDoc(collection(db, "environments"), {
        userId: user.uid,
        name,
        description,
        time,
        weekDay,
        restTime,
      });

      
      console.log("Document written with ID: ", docRef.id);
      navigate("/dashboard");
      const newEnvironment = {
        name,
        description,
        time,
        weekDay,
        restTime,
        createdBy: user.uid,
      };

      
      setName('');
      setDescription('');
      setTime('');
      setWeekDay('');
      setRestTime('');
      onSubmit();
    } catch (error) {
      console.error(error);
    }
  };

  

  const renderEnvironments = () => {
   

    if (environments.length === 0) {
      return <Typography variant="subtitle1">No environments to display</Typography>;
    }

    return environments.map((environment) => (
      <Box key={environment.id} sx={{ border: '1px solid grey', borderRadius: '5px', p: 2, mb: 2 }}>
        <Grid container justifyContent="space-between">
          <Grid item xs={8}>
            <Typography variant="h6">{environment.name}</Typography>
            <Link to={`/workout/${environment.id}`}>Go to workout</Link>
          </Grid>
        
        </Grid>
        <Typography variant="body1" sx={{ my: 1 }}>{environment.description}</Typography>
        <Grid container justifyContent="space-between">
          <Grid item xs={3}>
            <Typography variant="body2">Time</Typography>
            <Typography variant="body1">{environment.time}</Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography variant="body2">Weekday</Typography>
            <Typography variant="body1">{environment.weekDay}</Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography variant="body2">Rest Time</Typography>
            <Typography variant="body1">{environment.restTime}</Typography>
          </Grid>
          <Grid item xs={3} container justifyContent="flex-end" alignItems="center">
            <FitnessCenterIcon sx={{ fontSize: 40, color: 'grey' }} />
          </Grid>
        </Grid>
        <Box sx={{ border: '1px solid grey', borderRadius: '5px', p: 2, mb: 2 }}>
    
  <Link to="/fit">Explore me</Link>
</Box>
    
      </Box>
    ));
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

  return (

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
          }} borderRadius={8} p={3}>
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
                  <Button type="submit" variant="contained" color="primary" fullWidth>
                    Create
                  </Button>
                </Grid>
               
                <Grid item xs={12}>
                  <Button type="submit" variant="contained" hidden="true" color="primary" fullWidth >
                    All Environments
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <Button type="submit" hidden="true" variant="contained" color="primary" fullWidth onClick={handleSignOut}>
                    Sign Out
                  </Button>
                </Grid>
              </Grid>
            </form>
          {renderEnvironments()}

          </Box>
        </Grid>
      </Grid>
    </Box>
  )
};
export default WorkoutEnvironmentForm;

