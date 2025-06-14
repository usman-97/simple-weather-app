import { WeatherProvider } from "./contexts/WeatherContext";
import AppRouter from "./router/AppRouter";

function App() {
  return (
    <WeatherProvider>
      <AppRouter />
    </WeatherProvider>
  );
}

export default App;
