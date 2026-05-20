import { useState, useEffect } from 'react';
import { getDespachos, deleteDespacho } from '../../api/axiosConfig';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const ListadoDespachos = () => {
    const [despachos, setDespachos] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchDespachos = async () => {
        try {
            const response = await getDespachos();
            setDespachos(response);
        } catch (error) {
            console.error("Error al obtener despachos", error);
            Swal.fire('Error', 'No se pudieron cargar los despachos', 'error');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDespachos();
    }, []);

    const eliminarDespacho = async (idDespacho) => {
        const result = await Swal.fire({
            title: '¿Estás seguro?',
            text: "No podrás revertir esto",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#4f46e5',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        });

        if (result.isConfirmed) {
            try {
                await deleteDespacho(idDespacho);
                Swal.fire('Eliminado!', 'El despacho ha sido eliminado.', 'success');
                fetchDespachos();
            } catch (error) {
                Swal.fire('Error', 'Hubo un problema al eliminar el despacho', 'error');
            }
        }
    };

    if (loading) {
        return <div className="flex justify-center items-center h-64"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div></div>;
    }

    return (
        <div className="bg-white shadow rounded-lg p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Listado de Despachos</h2>
                <Link to="/despachos/nuevo" className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded transition-colors duration-200 shadow-md">
                    + Nuevo Despacho
                </Link>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patente</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Intento</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID Compra</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {despachos.length === 0 ? (
                            <tr>
                                <td colSpan="7" className="px-6 py-4 text-center text-gray-500">No hay despachos registrados.</td>
                            </tr>
                        ) : (
                            despachos.map((despacho) => (
                                <tr key={despacho.idDespacho} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{despacho.idDespacho}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{despacho.fechaDespacho}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{despacho.patenteCamion}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{despacho.intento}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{despacho.idCompra}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${despacho.despachado ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                            {despacho.despachado ? 'Entregado' : 'Pendiente'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <button onClick={() => eliminarDespacho(despacho.idDespacho)} className="text-red-600 hover:text-red-900">Eliminar</button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ListadoDespachos;
