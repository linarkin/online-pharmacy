import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import HomePage from '../pages/HomePage';
import { getMedications } from '../services/services';
import '@testing-library/jest-dom';

jest.mock('../services/services');

jest.mock('lodash/debounce', () => jest.fn((fn) => fn));

const mockedGetMedicationsList = getMedications as jest.MockedFunction<
  typeof getMedications
>;

describe('HomePage Test', () => {
  const mockMedicationsResponse = {
    medications: [
      {
        id: '1',
        name: 'Medication A',
        description: 'Description A',
        manufacturer: 'Manufacturer A',
        price: 15,
      },
      {
        id: '2',
        name: 'Medication B',
        description: 'Description B',
        manufacturer: 'Manufacturer B',
        price: 25,
      },
    ],
    totalPages: 2,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders medications list after API call', async () => {
    mockedGetMedicationsList.mockResolvedValueOnce(mockMedicationsResponse);

    render(<HomePage />);

    await waitFor(() => {
      expect(screen.getByText('Medication A')).toBeInTheDocument();
    });
    expect(screen.getByText('Medication B')).toBeInTheDocument();

    expect(screen.queryByTestId('loading-indicator')).not.toBeInTheDocument();
  });

  test('displays empty state when no medications are found', async () => {
    mockedGetMedicationsList.mockResolvedValueOnce({
      medications: [],
      totalPages: 1,
    });

    render(<HomePage />);

    await waitFor(() => {
      expect(screen.getByText('No medications found.')).toBeInTheDocument();
    });

    expect(screen.queryByTestId('medication-item')).not.toBeInTheDocument();
  });
});
