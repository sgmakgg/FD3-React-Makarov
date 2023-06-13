import {QueryClient, QueryClientProvider} from "react-query";
import {PagesRouter} from "./routes/PagesRouter";
import {Provider} from "react-redux";
import { store } from './redux/store'

import './App.css';


const queryClient = new QueryClient();

function App() {

  return (
      <Provider store={store}>
        <div className="App">
            <QueryClientProvider client={queryClient}>
                <PagesRouter/>
            </QueryClientProvider>
        </div>
      </Provider>
  );
}

export default App;
