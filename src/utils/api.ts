import { API_BASE_URL, API_KEY } from '../config';

// Rate limiting variables
let requestCount = 0;
let lastResetTime = Date.now();
const requestsPerMinute = 5;
const requestsPerDay = 500;

const resetTimeInMs = 60 * 1000; // 1 minute in milliseconds
const oneDayInMs = 24 * 60 * 60 * 1000;

const checkRateLimit = () => {
  const now = Date.now();

  // Reset the counter if a minute has passed
  if (now - lastResetTime >= resetTimeInMs) {
    requestCount = 0;
    lastResetTime = now;
  }

  // Check if the daily limit has been exceeded
  if (requestCount >= requestsPerMinute) {
    throw new Error('Rate limit exceeded. Please wait a minute before making more requests.');
  }

  requestCount++;
};

export const fetchStockData = async (symbol: string) => {
  checkRateLimit();

  const url = `${API_BASE_URL}/query?function=TIME_SERIES_DAILY&symbol=${symbol}&outputsize=compact&datatype=json`;

  try {
    const response = await fetch(url, {
      headers: {
        'X-RapidAPI-Key': API_KEY,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      // Check for specific error messages from the API
      if (errorData['Error Message']) {
        throw new Error(errorData['Error Message']);
      } else if (errorData['Information']) {
        throw new Error(errorData['Information']);
      } else {
        throw new Error(`API request failed with status ${response.status}`);
      }
    }

    const rawData = await response.json();

    // Extract and format the necessary data
    const timeSeriesData = rawData['Time Series (Daily)'];
    if (!timeSeriesData) {
      throw new Error('No time series data found in the API response.');
    }

    const formattedData = Object.keys(timeSeriesData)
      .map((date) => ({
        date,
        open: parseFloat(timeSeriesData[date]['1. open']),
        high: parseFloat(timeSeriesData[date]['2. high']),
        low: parseFloat(timeSeriesData[date]['3. low']),
        close: parseFloat(timeSeriesData[date]['4. close']),
      }))
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()); // Sort by date descending

    return formattedData;
  } catch (error: any) {
    console.error('Error fetching stock data:', error);
    throw error; // Re-throw the error to be handled by the calling function
  }
};
