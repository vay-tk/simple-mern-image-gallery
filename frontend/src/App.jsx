import './App.css';
import ImageGallary from './ImageGallary.jsx';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './Navbar.jsx';
import Footer from './Footer.jsx';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        {/* Navbar stays at the top */}
        <Navbar />  

        {/* Main Content */}
        <main className="min-h-screen">
          <Routes>
            <Route path='/' element={<ImageGallary />} />
          </Routes>
        </main>

        {/* Footer stays at the bottom */}
        <Footer />  
      </BrowserRouter>
    </div>
  );
}

export default App;
