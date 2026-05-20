import { Routes, Route, Link } from 'react-router-dom';
import Navbar from './componentes/Layout/Navbar';
import ListadoVentas from './componentes/Ventas/ListadoVentas';
import FormularioVenta from './componentes/Ventas/FormularioVenta';
import ListadoDespachos from './componentes/Despachos/ListadoDespachos';
import FormularioDespacho from './componentes/Despachos/FormularioDespacho';

const Home = () => (
    <div className="text-center mt-20">
        <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl mb-8">
            Bienvenido al Sistema Logístico
        </h1>
        <p className="max-w-xl mx-auto text-xl text-gray-500 mb-10">
            Administra tus ventas y coordina tus despachos de manera eficiente desde un solo lugar.
        </p>
        <div className="flex justify-center gap-6">
            <Link to="/ventas" className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-lg shadow-lg transition-transform transform hover:scale-105">
                Gestionar Ventas
            </Link>
            <Link to="/despachos" className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-lg shadow-lg transition-transform transform hover:scale-105">
                Gestionar Despachos
            </Link>
        </div>
    </div>
);

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
        <Navbar />
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/ventas" element={<ListadoVentas />} />
                <Route path="/ventas/nueva" element={<FormularioVenta />} />
                <Route path="/despachos" element={<ListadoDespachos />} />
                <Route path="/despachos/nuevo" element={<FormularioDespacho />} />
            </Routes>
        </main>
    </div>
  );
}

export default App;
