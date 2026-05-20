import { useState, useEffect } from 'react';
import { getVentas, deleteVenta } from '../../api/axiosConfig';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const ListadoVentas = () => {
    const [ventas, setVentas] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchVentas = async () => {
        try {
            const response = await getVentas();
            setVentas(response);
        } catch (error) {
            console.error("Error al obtener ventas", error);
            Swal.fire('Error', 'No se pudieron cargar las ventas', 'error');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchVentas();
    }, []);

    const eliminarVenta = async (idVenta) => {
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
                await deleteVenta(idVenta);
                Swal.fire('Eliminado!', 'La venta ha sido eliminada.', 'success');
                fetchVentas();
            } catch (error) {
                Swal.fire('Error', 'Hubo un problema al eliminar la venta', 'error');
            }
        }
    };

    if (loading) {
        return <div className="flex justify-center items-center h-64"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div></div>;
    }

    return (
        <div className="bg-white shadow rounded-lg p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Listado de Ventas</h2>
                <Link to="/ventas/nueva" className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded transition-colors duration-200 shadow-md">
                    + Nueva Venta
                </Link>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dirección</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Valor</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Despacho</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {ventas.length === 0 ? (
                            <tr>
                                <td colSpan="6" className="px-6 py-4 text-center text-gray-500">No hay ventas registradas.</td>
                            </tr>
                        ) : (
                            ventas.map((venta) => (
                                <tr key={venta.idVenta} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{venta.idVenta}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{venta.direccionCompra}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${venta.valorCompra}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{venta.fechaCompra}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${venta.despachoGenerado ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                            {venta.despachoGenerado ? 'Sí' : 'No'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <button onClick={() => eliminarVenta(venta.idVenta)} className="text-red-600 hover:text-red-900">Eliminar</button>
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

export default ListadoVentas;
