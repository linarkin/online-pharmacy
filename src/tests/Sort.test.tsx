import { render, screen, fireEvent } from '@testing-library/react';
import Sort from '../components/Sort';
import React from 'react';

describe('Sort Component', () => {
  const mockSetSortOrder = jest.fn();

  beforeEach(() => {
    mockSetSortOrder.mockClear();
  });

  test('renders select with correct initial value', () => {
    render(<Sort sortOrder="" setSortOrder={mockSetSortOrder} />);

    const selectElement = screen.getByLabelText(/sort by price/i);
    expect(selectElement).toBeInTheDocument();
  });

  test('renders select with asc value', () => {
    render(<Sort sortOrder="asc" setSortOrder={mockSetSortOrder} />);

    const selectElement = screen.getByLabelText(/sort by price/i);
    expect(selectElement).toHaveTextContent('Price: Low to High');
  });

  test('renders select with desc value', () => {
    render(<Sort sortOrder="desc" setSortOrder={mockSetSortOrder} />);

    const selectElement = screen.getByLabelText(/sort by price/i);
    expect(selectElement).toHaveTextContent('Price: High to Low');
  });

  test("calls setSortOrder with 'asc' when Low to High is selected", async () => {
    render(<Sort sortOrder="" setSortOrder={mockSetSortOrder} />);

    const selectElement = screen.getByLabelText(/sort by price/i);

    fireEvent.mouseDown(selectElement);

    const lowToHighOption = await screen.findByText(/price: low to high/i);
    fireEvent.click(lowToHighOption);

    expect(mockSetSortOrder).toHaveBeenCalledWith('asc');
  });

  test("calls setSortOrder with 'desc' when High to Low is selected", async () => {
    render(<Sort sortOrder="" setSortOrder={mockSetSortOrder} />);

    const selectElement = screen.getByLabelText(/sort by price/i);

    fireEvent.mouseDown(selectElement);

    const highToLowOption = await screen.findByText(/price: high to low/i);
    fireEvent.click(highToLowOption);

    expect(mockSetSortOrder).toHaveBeenCalledWith('desc');
  });
});
