# Protein Progress

A beautiful, modern protein tracking Progressive Web App (PWA) built with React and TypeScript. Track your daily protein intake with style and efficiency.

![Protein Progress App Screenshot](https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?auto=format&fit=crop&q=80&w=1280&h=720)

## Features

- 🎯 Set and track daily protein goals
- 📱 Progressive Web App (PWA) for native-like experience
- 🌓 Dark/Light theme support
- 📊 Real-time progress tracking
- ⚡ Fast and responsive interface
- 💾 Offline support
- 📱 Mobile-first design
- 🔄 Automatic data persistence
- ⌚ Timestamp tracking for entries

## Tech Stack

- **Frontend Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS for modern, utility-first styling
- **Icons**: Lucide React for beautiful, consistent icons
- **Animations**: Framer Motion for smooth transitions
- **Build Tool**: Vite for lightning-fast development
- **PWA**: Vite PWA plugin for offline capabilities
- **Date Handling**: date-fns for timestamp formatting

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Build for production:
   ```bash
   npm run build
   ```

## Project Structure

```
src/
├── components/         # React components
├── hooks/             # Custom React hooks
├── types/             # TypeScript type definitions
├── App.tsx            # Main application component
└── main.tsx          # Application entry point
```

## Key Components

- **SetupScreen**: Initial setup for daily protein goal
- **ProgressBar**: Visual representation of daily progress
- **AddEntryForm**: Form for adding new protein entries
- **EntryList**: List of protein entries with timestamps

## Features in Detail

### PWA Support
The app can be installed on mobile devices and desktop computers, providing a native app-like experience with offline functionality.

### Theme Support
Automatically detects system theme preference and allows manual toggling between light and dark modes.

### Data Persistence
All data is stored locally using the browser's localStorage API, ensuring your data persists between sessions.

### Responsive Design
Built with a mobile-first approach, ensuring a great experience across all device sizes.

## Contributing

Feel free to submit issues and enhancement requests!

## License

MIT License - feel free to use this project for your own purposes.