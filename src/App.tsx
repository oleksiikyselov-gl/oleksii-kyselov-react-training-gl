import { HashRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import RegistrationForm from './pages/RegistrationForm';

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/registration" element={<RegistrationForm />} />
      </Routes>
    </HashRouter>
  );
}
