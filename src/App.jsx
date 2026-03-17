import { ThemeProvider } from "./contexts/ThemeContext";
import { WeatherProvider } from "./contexts/WeatherContext";
import AppRouter from "./router/AppRouter";

function App() {
  return (
    <ThemeProvider>
      <WeatherProvider>
        <AppRouter />
      </WeatherProvider>
    </ThemeProvider>
  );
}

export default App;
