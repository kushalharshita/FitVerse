

import React, { useState } from 'react';
import {
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
  Button,
  Grid,
  Paper,
  Box,
} from '@mui/material';



const yogaNames = [
  'Hatha Yoga',
  'Ashtanga Yoga',
  'Iyengar Yoga',
  'Bikram Yoga',
  'Kundalini Yoga',
  'Jivamukti Yoga',
  'Vinyasa Yoga',
  'Yin Yoga',
  'Restorative Yoga',
  'Power Yoga',
];




const exerciseNames = [
  'Push-ups',
  'Squats',
  'Lunges',
  'Plank',
  'Burpees',
  'Jumping jacks',
  'Crunches',
  'Leg press',
  'Deadlifts',
  'Bench press',
];

const FitnessRoutine = () => {
  const [type, setType] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState('');
  const [sequence, setSequence] = useState('');
  const [image, setImage] = useState('');
  const [sets, setSets] = useState('');
  const [repsOrMin, setRepsOrMin] = useState('');
  const [restTime, setRestTime] = useState('');
  const [yogaChecked, setYogaChecked] = useState([]);
  const [exerciseChecked, setExerciseChecked] = useState([]);

  const handleTypeChange = (event) => {
    setType(event.target.value);
  };

  const handleYogaChange = (event) => {
    const checkedYoga = [...yogaChecked];
    if (event.target.checked) {
      checkedYoga.push(event.target.value);
    } else {
      const index = checkedYoga.indexOf(event.target.value);
      checkedYoga.splice(index, 1);
    }
    setYogaChecked(checkedYoga);
  };

  const handleExerciseChange = (event) => {
    const checkedExercise = [...exerciseChecked];
    if (event.target.checked) {
      checkedExercise.push(event.target.value);
    } else {
      const index = checkedExercise.indexOf(event.target.value);
      checkedExercise.splice(index, 1);
    }
    setExerciseChecked(checkedExercise);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log({
      type,
      name,
      description,
      duration,
      sequence,
      image,
      sets,
      repsOrMin,
      restTime,
      yogaChecked,
      exerciseChecked,
    });
  };

  return (
    <div style={{ backgroundSize: 'cover', height: '100vh'}}>
      <Box p={4} clone>
        <Paper>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h4" component="h1" gutterBottom>
                Create a Fitness Routine
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Type</InputLabel>
                <Select value={type} onChange={handleTypeChange}>
                  <MenuItem value="yoga">Yoga</MenuItem>
                  <MenuItem value="exercise">Exercise</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
<TextField fullWidth label="Name" value={name} onChange={(event) => setName(event.target.value)} />
</Grid>
<Grid item xs={12}>
<TextField fullWidth label="Description" value={description} onChange={(event) => setDescription(event.target.value)} />
</Grid>
<Grid item xs={6}>
<TextField fullWidth label="Duration" value={duration} onChange={(event) => setDuration(event.target.value)} />
</Grid>
<Grid item xs={6}>
<TextField fullWidth label="Sequence" value={sequence} onChange={(event) => setSequence(event.target.value)} />
</Grid>
{/* <Grid item xs={12}>
<TextField fullWidth label="Image URL" value={image} onChange={(event) => setImage(event.target.value)} />
</Grid> */}
{type === 'exercise' && (
<>
<Grid item xs={4}>
<TextField fullWidth label="Sets" value={sets} onChange={(event) => setSets(event.target.value)} />
</Grid>
<Grid item xs={4}>
<TextField fullWidth label="Reps" value={repsOrMin} onChange={(event) => setRepsOrMin(event.target.value)} />
</Grid>
<Grid item xs={4}>
<TextField fullWidth label="Rest Time" value={restTime} onChange={(event) => setRestTime(event.target.value)} />
</Grid>
<Grid item xs={12}>
<Typography variant="subtitle1">Choose Exercises:</Typography>
{exerciseNames.map((exercise) => (
<FormControlLabel
key={exercise}
control={<Checkbox checked={exerciseChecked.indexOf(exercise) !== -1} onChange={handleExerciseChange} value={exercise} />}
label={exercise}
/>
))}
</Grid>
</>
)}
{type === 'yoga' && (
<Grid item xs={12}>
<Typography variant="subtitle1">Choose Yoga Styles:</Typography>
{yogaNames.map((yoga) => (
<FormControlLabel
key={yoga}
control={<Checkbox checked={yogaChecked.indexOf(yoga) !== -1} onChange={handleYogaChange} value={yoga} />}
label={yoga}
/>
))}
</Grid>
)}
<Grid item xs={12}>
<Button variant="contained" color="primary" onClick={handleSubmit}>
Create Routine
</Button>
</Grid>
</Grid>
</Paper>
</Box>
</div>
);
};

export default FitnessRoutine;

