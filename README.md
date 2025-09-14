# InDrive Maps Dashboard

A Next.js web application for testing and exploring InDrive maps APIs. This dashboard provides an interactive interface to view and test various map visualizations including traffic analysis, congestion maps, and heatmaps.

## Features

- **Interactive Dashboard**: Browse maps organized by categories (Analysis, Congestion, Heatmaps)
- **Real-time Connection Status**: Monitor backend connectivity with automatic retry functionality
- **Map Viewer**: Detailed view of each map with direct links to HTML visualizations
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Modern UI**: Built with shadcn/ui components and Tailwind CSS

## Backend Integration

The app connects to a backend server running on `http://192.168.0.102:8081/` that provides:

- **Analysis Maps**: Traffic clustering and movement analysis
- **Congestion Maps**: Traffic bottleneck and congestion visualizations  
- **Heatmaps**: Density and traffic flow visualizations

## Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start the development server**:
   ```bash
   npm run dev
   ```

3. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

## Prerequisites

- Node.js 18+ 
- Backend server running on `http://192.168.0.102:8081/`

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **UI Components**: shadcn/ui
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **Icons**: Lucide React

## Project Structure

```
src/
├── app/                 # Next.js app directory
├── components/          # React components
│   ├── ui/             # shadcn/ui components
│   ├── MapsDashboard.tsx
│   ├── MapCard.tsx
│   ├── MapViewer.tsx
│   └── ConnectionStatus.tsx
├── lib/                # Utility functions
│   ├── api.ts          # API service
│   └── utils.ts        # shadcn/ui utilities
└── types/              # TypeScript type definitions
    └── api.ts          # API response types
```

## Usage

1. **View Connection Status**: The top-right corner shows the connection status to your backend
2. **Browse Maps**: Use the tabs to navigate between different map categories
3. **View Map Details**: Click "View Details" on any map card to see more information
4. **Open Maps**: Use the "Open Map" button to view the actual HTML visualization in a new tab

## API Endpoints

The app expects the backend to provide a JSON response at the root endpoint (`/`) with the following structure:

```json
{
  "maps": {
    "analysis": [...],
    "congestion": [...], 
    "heatmaps": [...]
  },
  "message": "Description",
  "total_maps": 10,
  "version": "1.0.0"
}
```

Each map object should contain:
- `name`: Display name
- `description`: Map description
- `url`: Relative path to the HTML file
