import { BrowserRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Characters from './pages/Characters';

function AppLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPage = location.pathname === '/' ? 'home' : location.pathname.slice(1);
  const isHome = currentPage === 'home';

  const handleNavigate = (page: string) => {
    navigate(page === 'home' ? '/' : `/${page}`);
  };

  return (
    <div
      className="flex flex-col h-screen overflow-hidden"
      style={{ background: '#0a0a14' }}
    >
      <Navbar onNavigate={handleNavigate} currentPage={currentPage} />

      {isHome ? (
        <>
          <main className="flex-1 overflow-hidden">
            <Home />
          </main>
          <Footer />
        </>
      ) : (
        <main className="flex-1 overflow-y-auto" style={{ height: 0 }}>
          <div className="flex flex-col min-h-full">
            <div className="flex-1">
              <Routes>
                <Route path="/characters" element={<Characters />} />
              </Routes>
            </div>
            <Footer />
          </div>
        </main>
      )}
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<AppLayout />} />
      </Routes>
    </BrowserRouter>
  );
}
