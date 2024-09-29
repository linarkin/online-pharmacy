import { Card, CardContent, CardActions, Typography, Button } from '@mui/material';
import { Medication } from '../types/types';

const MedicationItem = ({ name, description, manufacturer, price }: Medication) => {
  return (
    <Card
      sx={{
        borderRadius: 2,
        backgroundColor: '#f5f5f5',
        border: '1px solid #ddd',
        boxShadow: 'none',
      }}
      data-testid="medication-item"
    >
      <CardContent>
        <Typography variant="h6" component="div" gutterBottom>
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
        <Typography variant="body2" sx={{ mt: 1 }}>
          <strong>Manufacturer: </strong>
          {manufacturer}
        </Typography>
        <Typography variant="h6" sx={{ mt: 2, color: 'primary.main' }}>
          ${price}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" variant="contained" color="primary">
          Add to Cart
        </Button>
        <Button size="small" variant="outlined" color="secondary">
          View Details
        </Button>
      </CardActions>
    </Card>
  );
};

export default MedicationItem;
