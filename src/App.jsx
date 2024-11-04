import SearchForm from "./components/SearchForm";
import ThemeToggle from "./components/ThemeToggle";
import Gallery from "./components/Gallery";
import { AppProvider } from "./context/context";

const App = () => {
  return <main>
    <AppProvider>
      <ThemeToggle />
      <SearchForm />
      <Gallery />
    </AppProvider>
  </main>;
};

export default App;
