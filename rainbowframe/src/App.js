import './App.css';
import RainbowFrame from "./RainbowFrame";

function App() {
    let colors = ['red','orange', 'yellow','green', '#00BFFF', 'blue', 'purple'];
    return (
          <RainbowFrame colors={colors}>
            Hello!
          </RainbowFrame>
    );
}

export default App;
