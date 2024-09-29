# Online Pharmacy Application

A web application that displays a list of medications with features for filtering, sorting, and pagination.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Frontend

### Features

- **Medication List**: Displays a comprehensive list of medications.
- **Filtering**: Filter medications by `name`, `description`, or `manufacturer`.
- **Sorting**: Sort medications by price (low to high, high to low).
- **Pagination**: Navigate between multiple pages of medication listings.

### Styling

The application uses the MUI (Material-UI) component library for a responsive and modern UI.

### Areas for Improvement

Due to time constraints, the following features were left out:

- **State Management**: No centralized state management was implemented as the application is small.
- **Persistent Filters**: Filter and sorting preferences are not saved in the URL and reset on page reload.
- **Test Coverage**: Integration tests need more coverage to improve reliability.

## Backend: Node.js Server

A simple Express.js API that serves the medication data with filtering, sorting, and pagination.

### API Endpoint

#### `GET /api/medications`

Fetches a paginated list of medications.

- **Query Parameters**:

  - `page`: The current page number (default: 1).
  - `limit`: The number of items per page (default: 10).
  - `name`, `description`, `manufacturer`: Filters to search by (case-insensitive).
  - `sortByPrice`: Sort by price (`asc` or `desc`).

- **Response**:
  - `medications`: Medications for the current page.
  - `currentPage`: The current page number.
  - `totalPages`: Total number of pages.
  - `totalItems`: Total number of medications available after filtering.

#### Example:

```bash
GET /api/medications?page=1&name=aspirin&sortByPrice=asc
```

### Server

The backend server runs on port 5000 or the port defined in the `PORT` environment variable.

## Setup and Running the Application

1. **Install dependencies**:

   ```bash
   yarn
   ```

2. **Start the application**:
   ```bash
   yarn start
   ```
   - Runs the React app at [http://localhost:3000](http://localhost:3000).
   - The medications API is available at [http://localhost:5000/api/medications](http://localhost:5000/api/medications).

The app will reload automatically if you make changes, and lint errors will appear in the console.

## Additional Commands

### `yarn test`

Launches the test runner in interactive watch mode.

For more information, see the [official documentation on running tests](https://facebook.github.io/create-react-app/docs/running-tests).

### `yarn build`

Builds the application for production and outputs the optimized bundle to the `build` folder.

- React is bundled in production mode.
- The build is minified, and filenames include content hashes for optimal caching.

For more details on deployment, see the [deployment guide](https://facebook.github.io/create-react-app/docs/deployment).

### `yarn eject`

**Note**: This is a one-way operation and cannot be undone.

The `eject` command copies all configuration files and dependencies (e.g., Webpack, Babel, ESLint) directly into your project, allowing full control over the setup. This is only recommended for advanced use cases, as most projects won’t require this level of customization.

All other commands will still work after ejecting, but will now use the copied scripts.
