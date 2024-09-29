import { Box } from '@mui/material';
import MedicationItem from './MedicationItem';
import { Medication } from '../types/types';

const MedicationsList = ({ medications }: { medications: Medication[] }) => {
  return (
    <Box mb={6}>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: '1fr 1fr',
          },
          gap: 3,
        }}
      >
        {medications.map((medication: Medication) => (
          <Box key={medication.id}>
            <MedicationItem {...medication} />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default MedicationsList;
