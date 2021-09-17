import "./App.css";
import Content from "./components/Content";
import Header from "./components/Header";

function App() {
  return (
    <div className="App">
      <div className="container py-3">
        <Header />
        <Content />
      </div>
    </div>
  );
}

export default App;
