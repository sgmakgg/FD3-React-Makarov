import { useState } from 'react';
import './App.css';
import {Cover} from "./components/Cover";
import Main from "./components/Main";
import {QueryClient, QueryClientProvider} from "react-query";

const queryClient = new QueryClient();

function App() {
  const[isSearchPageOn, setIsCoverPageOn] = useState(false);

  function switchToSearchPage(flag){
      setIsCoverPageOn(flag);
  }

  return (
    <div className="App">
      {(!isSearchPageOn)
      ? 
      <Cover cbSwitchToSearchPage={switchToSearchPage}/>
      :
      <QueryClientProvider client={queryClient}>
        <Main/>
      </QueryClientProvider>}
    </div>
  );
}

export default App;
