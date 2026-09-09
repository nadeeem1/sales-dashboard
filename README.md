# Sales Analytics Dashboard

A responsive analytics dashboard for monitoring sales performance, revenue, orders, and product activity.

## Features

- Revenue, orders, average order value, and growth KPI cards
- Revenue area chart for the last 12 months
- Top products bar chart
- Date range filtering (7 / 30 / 90 days / all time)
- Category filtering
- Sortable orders table
- Pagination
- Responsive layout (mobile / tablet / desktop)
- Dark mode toggle
- Vercel Serverless API with fallback demo data

## Tech Stack

- React
- TypeScript
- Vite
- Tailwind CSS
- Recharts
- Lucide React
- Vercel Serverless Functions

## Run Locally

```bash
npm install
npm run dev
```

Open:

```
http://localhost:3000
```

## Build

```bash
npm run build
```

## Deployment

1. Push the project to GitHub.
2. Open Vercel and import the GitHub repository.
3. Use the default Vite build settings.
4. Deploy the project.

The serverless endpoints will be available at:

```
/api/sales-data
/api/sales-summary
```

## Live Demo

Add the deployed Vercel URL here:

```
https://your-sales-dashboard.vercel.app
```
