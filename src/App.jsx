import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Members from './pages/Members';
import Schedule from './pages/Schedule';


const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/members" element={<Members />} />
          <Route path="/schedule" element={<Schedule />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
