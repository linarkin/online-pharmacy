import {
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  SelectChangeEvent,
} from '@mui/material';

interface SortProps {
  sortOrder: 'asc' | 'desc' | '';
  setSortOrder: (order: 'asc' | 'desc' | '') => void;
}

const Sort = ({ sortOrder = '', setSortOrder }: SortProps) => {
  const handleSortChange = (event: SelectChangeEvent) => {
    setSortOrder(event.target.value as 'asc' | 'desc' | '');
  };

  return (
    <FormControl variant="outlined" sx={{ flex: 1 }}>
      <InputLabel id="sort-label">Sort by Price</InputLabel>
      <Select
        labelId="sort-label"
        value={sortOrder}
        onChange={handleSortChange}
        label="Sort by Price"
      >
        <MenuItem value="">No sorting</MenuItem>
        <MenuItem value="asc">Price: Low to High</MenuItem>
        <MenuItem value="desc">Price: High to Low</MenuItem>
      </Select>
    </FormControl>
  );
};

export default Sort;
