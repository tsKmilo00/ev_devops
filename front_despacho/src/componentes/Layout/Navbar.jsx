import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
    const location = useLocation();

    const isActive = (path) => {
        return location.pathname === path ? "bg-indigo-700 text-white" : "text-indigo-100 hover:bg-indigo-500 hover:text-white";
    };

    return (
        <nav className="bg-indigo-600 shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <span className="text-white font-bold text-xl tracking-wider">📦 SistemaLogístico</span>
                        </div>
                        <div className="hidden md:block">
                            <div className="ml-10 flex items-baseline space-x-4">
                                <Link to="/" className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${isActive('/')}`}>
                                    Inicio
                                </Link>
                                <Link to="/ventas" className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${isActive('/ventas')}`}>
                                    Ventas
                                </Link>
                                <Link to="/despachos" className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${isActive('/despachos')}`}>
                                    Despachos
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
