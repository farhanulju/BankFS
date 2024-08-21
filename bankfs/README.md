# Bank and MFS Analysis Dashboard

This is a Next.js application that provides a dashboard for analyzing bank and mobile financial service (MFS) data. The application allows users to select a bank and multiple MFS providers, submit the data, and view the aggregated results in a sortable table.

## Features

- Select a bank from a dropdown list
- Select multiple MFS providers using clickable cards
- Submit the selected bank and MFS data
- View the aggregated data in a dashboard table
- Sort the table columns by MFS count in ascending or descending order
- Sticky table headers and row headers for better visibility during scrolling
- Metrics displayed beside the dashboard title, including:
  - Total number of banks
  - Total number of MFS providers
  - Total number of data entries
  - Total number of unique banks with at least one data entry
  - Total number of MFS providers with at least one data entry

## Technologies Used

- Next.js: A React framework for building server-side rendered and static web applications
- React: A JavaScript library for building user interfaces
- Tailwind CSS: A utility-first CSS framework for rapidly building custom user interfaces
- Fetch API: A modern JavaScript API for making HTTP requests

## Getting Started

To run this application locally, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/farhanulju/BankFS.git
   ```

2. Navigate to the project directory:

   ```bash
   cd bank-mfs-analysis
   ```

3. Install the dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open your browser and visit `http://localhost:3000` to see the application.

## Project Structure

The project structure is as follows:

```
bank-mfs-analysis/
  ├── components/
  │   └── ...
  ├── lib/
  │   └── utils.js
  ├── pages/
  │   ├── api/
  │   │   └── data.js
  │   ├── dashboard.js
  │   └── index.js
  ├── public/
  │   └── ...
  ├── styles/
  │   └── ...
  ├── .gitignore
  ├── package.json
  ├── README.md
  └── tailwind.config.js
```

- `components/`: Contains reusable React components used in the application.
- `lib/`: Contains utility functions and data used in the application.
- `pages/`: Contains the Next.js pages and API routes.
  - `api/data.js`: API route for submitting and retrieving bank and MFS data.
  - `dashboard.js`: Page component for displaying the aggregated data in a table.
  - `index.js`: Page component for selecting a bank and MFS providers.
- `public/`: Contains static assets used in the application.
- `styles/`: Contains global CSS styles for the application.
- `.gitignore`: Specifies files and directories to be ignored by Git.
- `package.json`: Contains project dependencies and scripts.
- `README.md`: Provides information and instructions about the project.
- `tailwind.config.js`: Configuration file for Tailwind CSS.

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvement, please open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).