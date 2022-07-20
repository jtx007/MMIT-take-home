import "./App.css";
import { PrevFormContextWrapper } from "./context/formContext";
import SearchForm from "./components/SearchForm";

function App() {
  return (
    <div className="App">
      <PrevFormContextWrapper>
        <SearchForm />
      </PrevFormContextWrapper>
    </div>
  );
}

export default App;
