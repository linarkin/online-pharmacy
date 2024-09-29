import { render, screen, fireEvent } from '@testing-library/react';
import Filters from '../components/Filters';
import React from 'react';

describe('Filters Component', () => {
  const mockSetFilter = jest.fn();
  const mockFilters = {
    name: 'Test Name',
    description: 'Test Description',
    manufacturer: 'Test Manufacturer',
  };

  beforeEach(() => {
    mockSetFilter.mockClear();
  });

  test('renders all filter fields with correct initial values', () => {
    render(<Filters filters={mockFilters} setFilter={mockSetFilter} />);

    expect(screen.getByLabelText(/filter by name/i)).toHaveValue(mockFilters.name);
    expect(screen.getByLabelText(/filter by description/i)).toHaveValue(
      mockFilters.description
    );
    expect(screen.getByLabelText(/filter by manufacturer/i)).toHaveValue(
      mockFilters.manufacturer
    );
  });

  test('calls setFilter function with correct arguments when name filter is changed', () => {
    render(<Filters filters={mockFilters} setFilter={mockSetFilter} />);

    const nameInput = screen.getByLabelText(/filter by name/i);

    fireEvent.change(nameInput, { target: { value: 'New Name' } });

    expect(mockSetFilter).toHaveBeenCalledWith('name', 'New Name');
  });

  test('calls setFilter function with correct arguments when description filter is changed', () => {
    render(<Filters filters={mockFilters} setFilter={mockSetFilter} />);

    const descriptionInput = screen.getByLabelText(/filter by description/i);

    fireEvent.change(descriptionInput, {
      target: { value: 'New Description' },
    });

    expect(mockSetFilter).toHaveBeenCalledWith('description', 'New Description');
  });

  test('calls setFilter function with correct arguments when manufacturer filter is changed', () => {
    render(<Filters filters={mockFilters} setFilter={mockSetFilter} />);

    const manufacturerInput = screen.getByLabelText(/filter by manufacturer/i);

    fireEvent.change(manufacturerInput, {
      target: { value: 'New Manufacturer' },
    });

    expect(mockSetFilter).toHaveBeenCalledWith('manufacturer', 'New Manufacturer');
  });

  test('does not call setFilter when input values are unchanged', () => {
    render(<Filters filters={mockFilters} setFilter={mockSetFilter} />);

    expect(mockSetFilter).not.toHaveBeenCalled();
  });
});
