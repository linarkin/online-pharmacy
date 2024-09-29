const express = require('express');
const path = require('path');
const app = express();
const cors = require('cors');

const medications = require('./medications.json');

app.use(cors());

const filterMedications = (medications, filters) => {
  return medications.filter((medication) => {
    let isValid = true;
    if (
      filters.name &&
      !medication.name.toLowerCase().includes(filters.name.toLowerCase())
    ) {
      isValid = false;
    }
    if (
      filters.description &&
      !medication.description.toLowerCase().includes(filters.description.toLowerCase())
    ) {
      isValid = false;
    }
    if (
      filters.manufacturer &&
      !medication.manufacturer.toLowerCase().includes(filters.manufacturer.toLowerCase())
    ) {
      isValid = false;
    }
    return isValid;
  });
};

// Route to fetch medications with pagination, sorting, and filtering
app.get('/api/medications', (req, res) => {
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 10;
  const skip = (page - 1) * limit;

  let filteredMedications = filterMedications(medications, req.query);

  const sortByPrice = req.query.sortByPrice;
  if (sortByPrice && (sortByPrice === 'asc' || sortByPrice === 'desc')) {
    filteredMedications = filteredMedications.sort((a, b) => {
      return sortByPrice === 'asc' ? a.price - b.price : b.price - a.price;
    });
  }

  const paginatedMedications = filteredMedications.slice(skip, skip + limit);

  return res.json({
    medications: paginatedMedications,
    currentPage: page,
    totalPages: Math.ceil(filteredMedications.length / limit),
    totalItems: filteredMedications.length,
  });
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
