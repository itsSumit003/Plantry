import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import NavRoutes from "./routes/NavRoutes";

function App() {
  return (
    <div>
      <Navbar />
      <NavRoutes />
      <ScrollToTop />
      <Footer />
    </div>
  );
}

export default App;
