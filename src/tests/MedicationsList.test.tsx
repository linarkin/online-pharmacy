import { render, screen } from '@testing-library/react';
import MedicationsList from '../components/MedicationsList';
import { Medication } from '../types/types';

jest.mock(
  '../components/MedicationItem',
  () =>
    ({ name, description, manufacturer, price }: Medication) => (
      <div data-testid="medication-item">
        <h6>{name}</h6>
        <p>{description}</p>
        <p>Manufacturer: {manufacturer}</p>
        <p>{price}</p>
      </div>
    )
);

describe('MedicationsList Component', () => {
  const mockMedications = [
    {
      id: '1',
      name: 'Medication 1',
      description: 'Description 1',
      manufacturer: 'Manufacturer 1',
      price: 10,
    },
    {
      id: '2',
      name: 'Medication 2',
      description: 'Description 2',
      manufacturer: 'Manufacturer 2',
      price: 20,
    },
    {
      id: '3',
      name: 'Medication 3',
      description: 'Description 3',
      manufacturer: 'Manufacturer 3',
      price: 30,
    },
  ];

  test('renders the correct number of medication items', () => {
    render(<MedicationsList medications={mockMedications} />);

    const medicationItems = screen.getAllByTestId('medication-item');
    expect(medicationItems.length).toBe(3);
  });

  test('renders medication details correctly', () => {
    render(<MedicationsList medications={mockMedications} />);

    expect(screen.getByText('Medication 1')).toBeInTheDocument();
    expect(screen.getByText('Description 1')).toBeInTheDocument();
    expect(screen.getByText('Medication 2')).toBeInTheDocument();
    expect(screen.getByText('Description 2')).toBeInTheDocument();
  });

  test('renders medication price and manufacturer correctly', () => {
    render(<MedicationsList medications={mockMedications} />);

    expect(screen.getByText('10')).toBeInTheDocument();
    expect(screen.getByText('Manufacturer: Manufacturer 1')).toBeInTheDocument();

    expect(screen.getByText('20')).toBeInTheDocument();
    expect(screen.getByText('Manufacturer: Manufacturer 2')).toBeInTheDocument();
  });

  test('renders an empty state when no medications are provided', () => {
    render(<MedicationsList medications={[]} />);

    const medicationItems = screen.queryAllByTestId('medication-item');
    expect(medicationItems.length).toBe(0);
  });
});
