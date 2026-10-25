// Owner: M1 (everyone adds ONE route line)
import { Routes, Route } from 'react-router-dom';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<div>Minuto Me</div>} />
      {/* <Route path="/login" element={<Login />} />                    M1 */}
      {/* <Route path="/create-store" element={<CreateStore />} />       M2 */}
      {/* <Route path="/store/:slug" element={<Home />} />               M3 */}
      {/* <Route path="/dashboard" element={<DashboardHome />} />        M4 */}
      {/* <Route path="/cart" element={<Cart />} />                      M5 */}
    </Routes>
  );
}
