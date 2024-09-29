import { AppBar, Toolbar, Typography, Box, Container } from '@mui/material';
import Main from './pages/HomePage';

function App() {
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Online Pharmacy
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Box>
          <Main />
        </Box>
      </Container>
    </div>
  );
}

export default App;
