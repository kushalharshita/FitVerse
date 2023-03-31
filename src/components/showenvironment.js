
// import { useState, useEffect } from 'react';
// import { collection, query, where, getDocs } from 'firebase/firestore';
// import { db, auth } from '../firebase';
// import {
//   TableContainer,
//   Table,
//   TableHead,
//   TableRow,
//   TableCell,
//   TableBody,
//   Typography,
// } from '@mui/material';

// export default function WorkoutEnvironmentList() {
//   const [environments, setEnvironments] = useState([]);
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const unsubscribe = auth.onAuthStateChanged((user) => {
//       setUser(user);
//     });

//     return unsubscribe;
//   }, []);


//   useEffect(() => {
//     const fetchEnvironments = async () => {
//       const q = query(collection(db, 'environments'), where('userId', '==', user.uid));
//       const querySnapshot = await getDocs(q);
//       const docs = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
//       setEnvironments(docs);
//     };
//     fetchEnvironments();
//   }, [user]);

//   return (
//     <TableContainer>
//       <Table>
//         <TableHead>
//           <TableRow>
//             <TableCell>Name</TableCell>
//             <TableCell>Description</TableCell>
//             <TableCell>Time</TableCell>
//             <TableCell>Week Day</TableCell>
//             <TableCell>Rest Time</TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {environments.map((environment) => (
//             <TableRow key={environment.id}>
//               <TableCell>{environment.name}</TableCell>
//               <TableCell>{environment.description}</TableCell>
//               <TableCell>{environment.time}</TableCell>
//               <TableCell>{environment.weekDay}</TableCell>
//               <TableCell>{environment.restTime}</TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </TableContainer>
//   );
// };

// import { useState, useEffect } from 'react';
// import { collection, query, where, getDocs } from 'firebase/firestore';
// import { db, auth } from '../firebase';
// import {
//   TableContainer,
//   Table,
//   TableHead,
//   TableRow,
//   TableCell,
//   TableBody,
//   Typography,
//   Box,
//   Paper,
// } from '@mui/material';

// export default function WorkoutEnvironmentList() {
//   const [environments, setEnvironments] = useState([]);
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const unsubscribe = auth.onAuthStateChanged((user) => {
//       setUser(user);
//     });

//     return unsubscribe;
//   }, []);

//   useEffect(() => {
//     const fetchEnvironments = async () => {
//       const q = query(collection(db, 'environments'), where('userId', '==', user.uid));
//       const querySnapshot = await getDocs(q);
//       const docs = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
//       setEnvironments(docs);
//     };
//     fetchEnvironments();
//   }, [user]);

//   return (
//     <Box sx={{ m: 2 }}>
//       <Typography variant="h4" sx={{ mb: 2 }}>
//         Environments
//       </Typography>
//       <Paper elevation={3}>
//         <TableContainer>
//           <Table>
//             <TableHead>
//               <TableRow>
//                 <TableCell>Name</TableCell>
//                 <TableCell>Description</TableCell>
//                 <TableCell>Time</TableCell>
//                 <TableCell>Week Day</TableCell>
//                 <TableCell>Rest Time</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {environments.map((environment) => (
//                 <TableRow key={environment.id}>
//                   <TableCell>{environment.name}</TableCell>
//                   <TableCell>{environment.description}</TableCell>
//                   <TableCell>{environment.time}</TableCell>
//                   <TableCell>{environment.weekDay}</TableCell>
//                   <TableCell>{environment.restTime}</TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       </Paper>
//     </Box>
//   );
// };




import { useState, useEffect } from 'react';
import { collection, query, where, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db, auth } from '../firebase';
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';

export default function WorkoutEnvironmentList() {
  const [environments, setEnvironments] = useState([]);
  const [user, setUser] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [formValues, setFormValues] = useState({
    name: '',
    description: '',
    time: '',
    weekDay: '',
    restTime: '',
  });
  const [selectedEnvironment, setSelectedEnvironment] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    const fetchEnvironments = async () => {
      const q = query(collection(db, 'environments'), where('userId', '==', user.uid));
      const querySnapshot = await getDocs(q);
      const docs = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setEnvironments(docs);
    };
    fetchEnvironments();
  }, [user]);

  const handleFormChange = (e) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      [e.target.name]: e.target.value,
    }));
  };

  const handleAddEnvironment = async () => {
    await addDoc(collection(db, 'environments'), { ...formValues, userId: user.uid });
    setOpenDialog(false);
    setFormValues({
      name: '',
      description: '',
      time: '',
      weekDay: '',
      restTime: '',
    });
  };

  const handleEditEnvironment = async () => {
    await updateDoc(doc(db, 'environments', selectedEnvironment.id), formValues);
    setOpenDialog(false);
    setSelectedEnvironment(null);
    setFormValues({
      name: '',
      description: '',
      time: '',
      weekDay: '',
      restTime: '',
    });
  };

  const handleDeleteEnvironment = async (environment) => {
    if (window.confirm(`Are you sure you want to delete "${environment.name}"?`)) {
      await deleteDoc(doc(db, 'environments', environment.id));
    }
  };

  return (
    <>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Time</TableCell>
              <TableCell>Week Day</TableCell>
              <TableCell>Rest Time</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {environments.map((environment) => (
              <TableRow key={environment.id}>
                <TableCell>{environment.name}</TableCell>
                <TableCell>{environment.description}</TableCell>
                <TableCell>{environment.time}</TableCell>
                <TableCell>{environment.weekDay}</TableCell>
                <TableCell>{environment.restTime}</TableCell>
                <TableCell>
                  <Button variant="outlined" onClick={() => {
                    setSelectedEnvironment(environment);
                    setFormValues(environment);
                    setOpenDialog(true);
                  }}>Edit</Button>
                  < Button variant="outlined" onClick={() => handleDeleteEnvironment(environment)}>Delete</Button>
</TableCell>
</TableRow>
))}
</TableBody>
</Table>
</TableContainer>
  {/* Dialog for adding/updating environments */}
  <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
    <DialogTitle>{selectedEnvironment ? 'Edit Environment' : 'Add Environment'}</DialogTitle>
    <DialogContent>
      <TextField
        autoFocus
        margin="dense"
        label="Name"
        name="name"
        fullWidth
        value={formValues.name}
        onChange={handleFormChange}
      />
      <TextField
        margin="dense"
        label="Description"
        name="description"
        fullWidth
        value={formValues.description}
        onChange={handleFormChange}
      />
      <TextField
        margin="dense"
        label="Time"
        name="time"
        fullWidth
        value={formValues.time}
        onChange={handleFormChange}
      />
      <TextField
        margin="dense"
        label="Week Day"
        name="weekDay"
        fullWidth
        value={formValues.weekDay}
        onChange={handleFormChange}
      />
      <TextField
        margin="dense"
        label="Rest Time"
        name="restTime"
        fullWidth
        value={formValues.restTime}
        onChange={handleFormChange}
      />
    </DialogContent>
    <DialogActions>
      <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
      <Button onClick={selectedEnvironment ? handleEditEnvironment : handleAddEnvironment}>
        {selectedEnvironment ? 'Save Changes' : 'Add'}
      </Button>
    </DialogActions>
  </Dialog>
</>
);
};