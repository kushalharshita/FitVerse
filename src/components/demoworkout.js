import React from "react";
import {
  Container,
  Grid,
  Typography,
  Paper,
  Button
} from '@mui/material'

const DemoWorkout = () => {
  const exerciseList = [
    { id: 1, name: "Push-ups", sets: 3, reps: 10 },
    { id: 2, name: "Squats", sets: 3, reps: 12 },
    { id: 3, name: "Crunches", sets: 2, reps: 15 },
    { id: 4, name: "Jumping Jacks", sets: 2, reps: 20 },
  ];

  const startWorkout = () => {
    console.log("Workout started!");
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" align="center" gutterBottom>
        Demo Workout Environment
      </Typography>
      <Grid container spacing={2}>
        {exerciseList.map((exercise) => (
          <Grid item xs={12} key={exercise.id}>
            <Paper elevation={3}>
              <Typography variant="h5" align="center" gutterBottom>
                {exercise.name}
              </Typography>
              <Typography variant="body1" align="center" gutterBottom>
                Sets: {exercise.sets} | Reps: {exercise.reps}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={startWorkout}
        style={{ marginTop: "16px" }}
      >
        Start Workout
      </Button>
    </Container>
  );
};

export default DemoWorkout;
