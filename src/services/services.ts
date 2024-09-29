const BASE_URL = 'http://localhost:5000/api' as string;

export class UnauthorizedError extends Error {
  constructor() {
    super('Unauthorized');
  }
}

export class NotFoundError extends Error {
  constructor() {
    super('Not Found');
  }
}

interface queryParamsProp {
  page: string;
  name: string;
  description: string;
  manufacturer: string;
  sortByPrice: 'asc' | 'desc' | '';
}
/**
 * Get list of medications
 **/
export async function getMedications<T>(queryParams: URLSearchParams): Promise<T> {
  return await fetch(`${BASE_URL}/medications?${queryParams}`)
    .then((res) => {
      return checkStatus(res).json();
    })
    .then((res) => res);
}

function checkStatus(response: Response) {
  if (response.status === 401) {
    throw new UnauthorizedError();
  }
  if (response.status === 404) {
    throw new NotFoundError();
  }
  return response;
}
