import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import AddSchool from "./pages/AddSchool";
import ShowSchools from "./pages/ShowSchools";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <main style={{ minHeight: "80vh", padding: "20px" }}>
        <Routes>
          <Route path="/" element={<AddSchool />} />
          <Route path="/schools" element={<ShowSchools />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
