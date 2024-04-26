import { BrowserRouter, Routes, Route } from "react-router-dom";
import List from "./List";
import Add from "./Add";
import Edit from "./Edit";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="" element={<List />}></Route>
          <Route path="/add" element={<Add />}></Route>
          <Route path="/edit/:id" element={<Edit />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
