import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/login';
import WorkoutEnvironmentForm from './components/environment';
import Signup from './components/signup';
import Album from './components/album';
import Layout from './components/dashboard';
import FitPage from './components/fit';
import Workout from './components/workout';
import FitnessRoutine from './components/fitnessroutine';
import FitnessTable from './components/fitnesstable';
import DemoWorkout from './components/demoworkout';
import ProgressChart from './components/ProgressTracking';
function App() {
 
 

  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/workout-environment-form" element={<WorkoutEnvironmentForm />} />
          <Route path="/album" element={<Album />} />
          <Route path="/dashboard" element={<Layout/>}/>
          
          <Route path='/workouts' element={<Workout />} />
          <Route path='/fitnessroutine' element={<FitnessRoutine/>} />
          <Route path= '/fitnesstable' element={<FitnessTable/>} />
          <Route path ='/demoworkout' element={<DemoWorkout/>} />
          <Route path = '/fit' element ={<FitPage/>} />
          <Route path="/workout/:envId" element={<Workout />} />
          <Route path="/fitnessroutine/:wrkoutId" element={<FitnessRoutine />} />
         
         
        </Routes>
      </Router>
    </div>
  );
}

export default App;
