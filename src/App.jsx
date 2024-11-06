import SearchForm from './components/SearchForm';
import ThemeToggle from './components/ThemeToggle';
import Gallery from './components/Gallery';
import { AppProvider } from './context/context';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient();
const App = () => {
  return (
    <main>
      <AppProvider>
        <QueryClientProvider client={queryClient}>
          <ThemeToggle />
          <SearchForm />
          <Gallery />
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </AppProvider>
    </main>
  );
};

export default App;
