import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { SportsGymnasticsSharp } from '@mui/icons-material';

const cards = [
  {
    id: 1,
    title: 'Yoga',
    description: 'Practice yoga and improve your physical and mental health',
    image: 'https://source.unsplash.com/featured/?yoga',
    buttonText: 'Explore',
  },
  {
    id: 2,
    title: 'Exercises',
    description: 'Get fit and healthy with our collection of exercises',
    image: 'https://source.unsplash.com/featured/?exercise',
    buttonText: 'Explore',
  },
];

function Album() {
  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <SportsGymnasticsSharp sx={{ mr: 2 }} />
          <Typography variant="h6" color="inherit" noWrap>
            Fit Verse
          </Typography>
        </Toolbar>
      </AppBar>
      <main>
        <Container sx={{ py: 8 }} maxWidth="md">
          <Typography variant="h4" align="center" color="textPrimary" gutterBottom>
            Welcome to our Gallery
          </Typography>
          <Typography variant="h6" align="center" color="textSecondary" paragraph>
          The only bad workout is the one that didn't happen.
            Choose from a variety of yoga poses and exercises to improve your physical and mental health
          </Typography>
          <Grid container spacing={4}>
            {cards.map((card) => (
              <Grid item key={card.id} xs={12} sm={6} md={6}>
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <CardMedia
                    component="img"
                    sx={{ pt: '56.25%' }}
                    image={card.image}
                    alt={card.title}
                  />


                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {card.title}
                    </Typography>
                    <Typography>
                      {card.description}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" color="primary">
                      {card.buttonText}
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
      <footer>
        <Typography variant="h6" align="center" gutterBottom>
          Footer
        </Typography>
        <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
          Something here to give the footer a purpose!
        </Typography>
      </footer>
    </React.Fragment>
  );
}

export default Album;



