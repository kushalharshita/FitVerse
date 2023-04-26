import { useState , useEffect } from 'react';
import {
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Box,
  Typography,
  Grid,
  
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { addWorkout , selectWorkouts } from './workouts/workoutSlice';
import { db, auth } from '../firebase';

import { collection, addDoc, onSnapshot, query, where } from "firebase/firestore";
import { Link } from 'react-router-dom';



const Workout = () => {
  const [form, setForm] = useState({
    eid: '',
    name: '',
    description: '',
    duration: '',
    category: '',
    rest_time: '',
  });

  const workouts = useSelector(selectWorkouts);
  const dispatch = useDispatch();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };



  // useEffect(() => {
    
  //   const q = query(collection(db, "workouts") );
  //   const unsub = onSnapshot(q, (querySnapshot) => {
  //     let todosArray = [];
  //     console.log(querySnapshot);
  //     querySnapshot.forEach((doc) => {
  //       const envDetail = { ...doc.data(), id: doc.id };
  //       todosArray.push(envDetail);
  //       dispatch(addWorkout(envDetail));
  //     });
  //   });
  //   renderEnvironments();
  // },[]);


  useEffect(() => {
    const q = query(collection(db, "workouts"));
    const unsub = onSnapshot(q, (querySnapshot) => {
      let todosArray = [];
      console.log(querySnapshot);
      querySnapshot.forEach((doc) => {
        const envDetail = { ...doc.data(), id: doc.id };
        todosArray.push(envDetail);
      });
      dispatch(addWorkout(todosArray));
    });
    return unsub;
  }, []);
  


  const handleSubmit = async(event) => {
    event.preventDefault();
    console.log('Form data:', form);
    // TODO: Submit form data to backend
    try {
      const docRef = await addDoc(collection(db, 'workouts'), form);
      console.log('Document written with ID: ', docRef.id);
      setForm({
        eid: '',
        name: '',
        description: '',
        duration: '',
        category: '',
        rest_time: '',
      });
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  };

  const renderEnvironments = () => {
   

    if (workouts.length === 0) {
      return <Typography variant="subtitle1">No environments to display</Typography>;
    }

    return workouts.map((environment) => (
      <Box key={environment.id} sx={{ border: '1px solid grey', borderRadius: '5px', p: 2, mb: 2 }}>
        <Grid container justifyContent="space-between">
          <Grid item xs={8}>
            <Typography variant="h6">{environment.name}</Typography>
            <Link to={`/fitnessroutine/${environment.id}`}>Go to Fitness Routine</Link>
          </Grid>
        
        </Grid>
        <Typography variant="body1" sx={{ my: 1 }}>{environment.description}</Typography>
        <Grid container justifyContent="space-between">
          <Grid item xs={3}>
            <Typography variant="body2">Duration</Typography>
            <Typography variant="body1">{environment.duration}</Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography variant="body2">Category</Typography>
            <Typography variant="body1">{environment.category}</Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography variant="body2">Rest Time</Typography>
            <Typography variant="body1">{environment.rest_time}</Typography>
          </Grid>
          
        </Grid>
       
    
      </Box>
    ));
  };

  return (
    <Box
      sx={{
        padding: '2rem',
        backgroundImage: `url('https://images.unsplash.com/photo-1535743686920-55e4145369b9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1032&q=80')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
      }}
    >
      <Box
        sx={{
          
          borderRadius: '1rem',
          padding: '2rem',
          maxWidth: '800px',
          width: '100%',
          justifyContent: 'center',
          color: 'white',
        }}
      >
        <Typography variant="h4" sx={{ mb: '1rem', textAlign: 'center' }}>
          Create a Workout
        </Typography>
        <Box component="form" onSubmit={handleSubmit} >
          <Grid container spacing={3}>
            <Grid item xs={12} >
              <TextField
                name="name"
                label="Name"
                variant="outlined"

                fullWidth
                value={form.name}
                onChange={handleChange}
                sx={{
                  '& .MuiInputLabel-root': {
                    color: 'white',
                  },
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'white',
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'white',
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'white',
                  },
                  '&.Mui-focused .MuiInputLabel-root': {
                    color: 'white',
                  },
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="description"
                label="Description"
                variant="outlined"
                fullWidth
                multiline
                rows={4}
                value={form.description}
                onChange={handleChange}
                sx={{
                  '& .MuiInputLabel-root': {
                    color: 'white',
                  },
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'white',
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'white',
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'white',
                  },
                  '&.Mui-focused .MuiInputLabel-root': {
                    color: 'white',
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="duration"
                label="Duration"
                variant="outlined"
                fullWidth
                value={form.duration}
                onChange={handleChange}
                sx={{
                  '& .MuiInputLabel-root': {
                    color: 'white',
                  },
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'white',
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'white',
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'white',
                  },
                  '&.Mui-focused .MuiInputLabel-root': {
                    color: 'white',
                  },
                }}
              />
            </Grid>


            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel sx={{ color: 'white' }} id="category-label">
                  Category
                </InputLabel>
                <Select
                  name="category"
                  labelId="category-label"
                  value={form.category}
                  onChange={handleChange}
                  label="Category"
                  sx={{
                    '& .MuiInputLabel-root': {
                      color: 'white',
                    },
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'white',
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'white',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'white',
                    },
                    '&.Mui-focused .MuiInputLabel-root': {
                      color: 'white',
                    },
                    '& .MuiSelect-icon': {
                      color: 'white',
                    },
                    '&:after': {
                      borderBottomColor: 'white',
                    },
                  }}
                >
                  <MenuItem value="cardio">Cardio</MenuItem>
                  <MenuItem value="strength">Strength</MenuItem>
                  <MenuItem value="flexibility">Flexibility</MenuItem>
                  <MenuItem value="balance">Balance</MenuItem>
                </Select>
              </FormControl>
            </Grid>



            <Grid item xs={12}>
              <TextField
                name="rest_time"
                label="Rest Time"
                variant="outlined"
                fullWidth
                value={form.rest_time}
                onChange={handleChange}
                sx={{
                  '& .MuiInputLabel-root': {
                    color: 'white',
                  },
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'white',
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'white',
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'white',
                  },
                  '&.Mui-focused .MuiInputLabel-root': {
                    color: 'white',
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button variant="contained" color="primary" fullWidth type="submit">
                Create Workout
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button variant="contained" color="secondary" fullWidth>
                Cancel
              </Button>
            </Grid>
          </Grid>
        </Box>
        {
        renderEnvironments()
      }
      </Box>
     
    </Box>

  );
};

export default Workout;




        
        
        
        
        
        
        
