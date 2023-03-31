import { useState } from 'react';
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

const Workout = () => {
  const [form, setForm] = useState({
    eid: '',
    name: '',
    description: '',
    duration: '',
    category: '',
    sequence: '',
    image: '',
    rest_time: '',
  });

  

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Form data:', form);
    // TODO: Submit form data to backend
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
        color:'white',
      }}
    >
      <Box
        sx={{
          backgroundColor: 'rgba(255,255,255,0.8)',
          backgroundImage: `url('https://images.unsplash.com/photo-1434719079929-f61498a4828e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=874&q=80')`,
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
              {/* <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel id="category-label">Category</InputLabel>
                  <Select
                    name="category"
                    labelId="category-label"
                    value={form.category}
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
                  >
                    <MenuItem value="cardio">Cardio</MenuItem>
                    <MenuItem value="strength">Strength</MenuItem>
                    <MenuItem value="flexibility">Flexibility</MenuItem>
                    <MenuItem value="balance">Balance</MenuItem>
                  </Select>
                </FormControl>
              </Grid> */}
  
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
              name="sequence"
              label="Sequence"
              variant="outlined"
              fullWidth
              multiline
              rows={4}
              value={form.sequence}
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
              name="image"
              label="Image URL"
              variant="outlined"
              fullWidth
              value={form.image}
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
    </Box>
  </Box>
  );
  };
  
  export default Workout;