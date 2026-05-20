import { useForm } from 'react-hook-form';
import { createVenta } from '../../api/axiosConfig';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const FormularioVenta = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
            // Convertir strings a tipos correspondientes
            const payload = {
                ...data,
                valorCompra: parseInt(data.valorCompra, 10),
                despachoGenerado: data.despachoGenerado === 'true' || data.despachoGenerado === true
            };
            
            await createVenta(payload);
            Swal.fire({
                icon: 'success',
                title: '¡Éxito!',
                text: 'La venta ha sido registrada.',
                confirmButtonColor: '#4f46e5'
            });
            navigate('/ventas');
        } catch (error) {
            console.error("Error al crear venta", error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Hubo un problema al crear la venta. Revisa la consola.',
                confirmButtonColor: '#4f46e5'
            });
        }
    };

    return (
        <div className="bg-white shadow rounded-lg p-8 max-w-2xl mx-auto mt-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">Registrar Nueva Venta</h2>
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Dirección de Compra</label>
                    <input 
                        type="text" 
                        className={`w-full border rounded-md px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none transition-all ${errors.direccionCompra ? 'border-red-500' : 'border-gray-300'}`}
                        {...register('direccionCompra', { required: 'La dirección es obligatoria' })} 
                    />
                    {errors.direccionCompra && <p className="text-red-500 text-xs mt-1">{errors.direccionCompra.message}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Valor de la Compra</label>
                    <input 
                        type="number" 
                        className={`w-full border rounded-md px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none transition-all ${errors.valorCompra ? 'border-red-500' : 'border-gray-300'}`}
                        {...register('valorCompra', { required: 'El valor es obligatorio', min: { value: 1, message: 'Debe ser mayor a 0' } })} 
                    />
                    {errors.valorCompra && <p className="text-red-500 text-xs mt-1">{errors.valorCompra.message}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Fecha de Compra</label>
                    <input 
                        type="date" 
                        className={`w-full border rounded-md px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none transition-all ${errors.fechaCompra ? 'border-red-500' : 'border-gray-300'}`}
                        {...register('fechaCompra', { required: 'La fecha es obligatoria' })} 
                    />
                    {errors.fechaCompra && <p className="text-red-500 text-xs mt-1">{errors.fechaCompra.message}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">¿Despacho Generado?</label>
                    <select 
                        className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none transition-all bg-white"
                        {...register('despachoGenerado')}
                    >
                        <option value="false">No</option>
                        <option value="true">Sí</option>
                    </select>
                </div>

                <div className="flex justify-end gap-4 pt-4 border-t">
                    <button type="button" onClick={() => navigate('/ventas')} className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors">
                        Cancelar
                    </button>
                    <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors shadow-md">
                        Guardar Venta
                    </button>
                </div>
            </form>
        </div>
    );
};

export default FormularioVenta;
