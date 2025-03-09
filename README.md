# Modern Stock Price Dashboard

This is a real-time stock price tracking dashboard for major tech companies, built with TypeScript, React, Vite, Recharts, and Tailwind CSS.

## Features

-   Real-time stock data for MSFT, AAPL, NFLX, META, and AMZN.
-   Interactive line chart displaying historical stock data.
-   Data table showing the last 10 days of trading data.
-   Auto-refresh every minute, with a manual refresh option.
-   Modern UI with a dark theme and glassmorphism effect.

## Technologies Used

-   **TypeScript**: For static typing and improved code maintainability.
-   **React**: A JavaScript library for building user interfaces.
-   **Vite**: A fast build tool and development server.
-   **Recharts**: A composable charting library for React.
-   **Tailwind CSS**: A utility-first CSS framework for rapidly building custom designs.
-   **Lucide React**: For icons.
-   **date-fns**: For date formatting.
-  **Alpha Vantage API**: Provides stock data (Accessed via RapidAPI).

## Setup

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/gontseweya/DTG-dashboard.git
    
    ```
    

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Configure API Key:**

    -   Obtain an API key from Alpha Vantage (via RapidAPI).
    -   Replace the placeholder API key in `src/config.ts` with your actual key.

4.  **Run the development server:**

    ```bash
    npm run dev
    ```

    This will start the development server, and you can view the application in your browser.

## Project Structure

-   **`src/`**: Contains the source code for the application.
    -   **`components/`**: React components for different parts of the UI.
    -   **`utils/`**: Utility functions, including the API call logic.
    -   **`config.ts`**: Configuration file for API keys, stock symbols, and other constants.
    -   **`App.tsx`**: The main application component.
    -   **`main.tsx`**: The entry point for the React application.
    -   **`index.css`**: Global styles and Tailwind CSS configuration.
-   **`public/`**: Static assets.
-   **`index.html`**: The main HTML file.
-   **`vite.config.ts`**: Vite configuration file.
- **`tailwind.config.js`**: Tailwind CSS configuration file.
- **`postcss.config.js`**: PostCSS configuration file.

## API Rate Limits

The application uses the Alpha Vantage API (via RapidAPI), which has rate limits:

-   5 calls per minute
-   500 calls per day

The application implements in-memory caching to help manage these rate limits.
