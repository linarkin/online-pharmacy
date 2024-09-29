import { useEffect, useState, useCallback } from 'react';
import MedicationsList from '../components/MedicationsList';
import { Pagination, Box, Typography, CircularProgress } from '@mui/material';
import Filters from '../components/Filters';
import Sort from '../components/Sort';
import { getMedications } from '../services/services';
import { debounce } from 'lodash';
import { Medication } from '../types/types';

interface MedicationsResponse {
  medications: Medication[];
  totalPages: number;
}

const HomePage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [loadedMedications, setLoadedMedications] = useState<Medication[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [filters, setFilters] = useState({
    name: '',
    description: '',
    manufacturer: '',
  });

  const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | ''>('');

  const setFilter = useCallback((filterName: string, value: string) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterName]: value,
    }));
    setCurrentPage(1);
  }, []);

  const handleSortOrderChange = useCallback((value: 'asc' | 'desc' | '') => {
    setSortOrder(value);
    setCurrentPage(1);
  }, []);

  const handlePageChange = useCallback(
    (event: React.ChangeEvent<unknown>, value: number) => {
      setCurrentPage(value);
    },
    []
  );

  useEffect(() => {
    setIsLoading(true);

    const fetchMedications = async () => {
      try {
        const queryParams = new URLSearchParams({
          page: currentPage.toString(),
          name: filters.name,
          description: filters.description,
          manufacturer: filters.manufacturer,
          sortByPrice: sortOrder,
        });

        const responseData: MedicationsResponse = await getMedications(queryParams);
        setLoadedMedications(responseData.medications);
        setTotalPages(responseData.totalPages);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    const debouncedFetch = debounce(fetchMedications, 300);
    debouncedFetch();
  }, [currentPage, filters, sortOrder]);

  return (
    <Box mb={6}>
      <Typography variant="h3" gutterBottom textAlign="center">
        Medications
      </Typography>

      <Box
        display="flex"
        flexDirection={{ xs: 'column', md: 'row' }}
        justifyContent="space-between"
        gap={2}
        mb={2}
      >
        <Filters filters={filters} setFilter={setFilter} />
        <Sort sortOrder={sortOrder} setSortOrder={handleSortOrderChange} />
      </Box>

      {isLoading && (
        <Box textAlign="center" my={6}>
          <CircularProgress data-testid="loading-indicator" />
        </Box>
      )}

      {!isLoading && loadedMedications.length === 0 && (
        <Typography variant="body1" textAlign="center">
          No medications found.
        </Typography>
      )}

      {!isLoading && loadedMedications.length > 0 && (
        <>
          <MedicationsList medications={loadedMedications} />
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            variant="outlined"
            shape="rounded"
            sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}
          />
        </>
      )}
    </Box>
  );
};

export default HomePage;
