// Owner: M1 (everyone adds ONE route line)
import { Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext.jsx';
import Dashboard from './pages/dashboard';
import Shop from './pages/shop';

export default function App() {
  return (
    <CartProvider>
      <Routes>
        <Route path="/" element={<div>Minuto Me</div>} />
        {/* <Route path="/login" element={<Login />} />                    M1 */}
        {/* <Route path="/create-store" element={<CreateStore />} />       M2 */}
        {/* <Route path="/store/:slug" element={<Home />} />               M3 */}
        <Route path="/dashboard/*" element={<Dashboard />} /> {/* M4 */}
        <Route path="/store/:slug/*" element={<Shop />} /> {/* M5: cart, checkout, orders */}
      </Routes>
    </CartProvider>
  );
}
