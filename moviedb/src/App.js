import {QueryClient, QueryClientProvider} from "react-query";
import {PagesRouter} from "./routes/PagesRouter";

import './App.css';

const queryClient = new QueryClient();

function App() {

  return (
        <div className="App">
            <QueryClientProvider client={queryClient}>
                <PagesRouter/>
            </QueryClientProvider>
        </div>
  );
}

export default App;
