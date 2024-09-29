import { Box, TextField } from '@mui/material';

interface FiltersProps {
  filters: {
    name: string;
    description: string;
    manufacturer: string;
  };
  setFilter: (filterName: string, value: string) => void;
}

const Filters = ({ filters, setFilter }: FiltersProps) => {
  return (
    <Box
      display="flex"
      sx={{
        justifyContent: 'space-between',
        flexDirection: { xs: 'column', sm: 'row' },
      }}
      gap={2}
    >
      <TextField
        label="Filter by Name"
        variant="outlined"
        value={filters.name}
        onChange={(e) => setFilter('name', e.target.value)}
      />
      <TextField
        label="Filter by Description"
        variant="outlined"
        value={filters.description}
        onChange={(e) => setFilter('description', e.target.value)}
      />
      <TextField
        label="Filter by Manufacturer"
        variant="outlined"
        value={filters.manufacturer}
        onChange={(e) => setFilter('manufacturer', e.target.value)}
      />
    </Box>
  );
};

export default Filters;
