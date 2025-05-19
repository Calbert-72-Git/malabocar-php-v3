
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Importamos los estilos directamente 
import './styles/base.css';
import './styles/header.css';
import './styles/footer.css';
import './styles/buttons.css';
import './styles/cars.css';
import './styles/filters.css';
import './styles/car-details.css';
import './styles/cart.css';
import './styles/responsive.css';
import './styles/animations.css';
import './styles/compiled.css';

createRoot(document.getElementById("root")!).render(<App />);
