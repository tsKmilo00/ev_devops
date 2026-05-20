import { useForm } from 'react-hook-form';
import { createDespacho } from '../../api/axiosConfig';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const FormularioDespacho = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
            const payload = {
                ...data,
                intento: parseInt(data.intento, 10),
                idCompra: parseInt(data.idCompra, 10),
                valorCompra: parseInt(data.valorCompra, 10),
                despachado: data.despachado === 'true' || data.despachado === true
            };
            
            await createDespacho(payload);
            Swal.fire({
                icon: 'success',
                title: '¡Éxito!',
                text: 'El despacho ha sido registrado.',
                confirmButtonColor: '#4f46e5'
            });
            navigate('/despachos');
        } catch (error) {
            console.error("Error al crear despacho", error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Hubo un problema al crear el despacho.',
                confirmButtonColor: '#4f46e5'
            });
        }
    };

    return (
        <div className="bg-white shadow rounded-lg p-8 max-w-2xl mx-auto mt-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">Registrar Nuevo Despacho</h2>
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Fecha de Despacho</label>
                        <input 
                            type="date" 
                            className={`w-full border rounded-md px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none ${errors.fechaDespacho ? 'border-red-500' : 'border-gray-300'}`}
                            {...register('fechaDespacho', { required: 'La fecha es obligatoria' })} 
                        />
                        {errors.fechaDespacho && <p className="text-red-500 text-xs mt-1">{errors.fechaDespacho.message}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Patente del Camión</label>
                        <input 
                            type="text" 
                            placeholder="AB-CD-12"
                            className={`w-full border rounded-md px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none ${errors.patenteCamion ? 'border-red-500' : 'border-gray-300'}`}
                            {...register('patenteCamion', { required: 'La patente es obligatoria' })} 
                        />
                        {errors.patenteCamion && <p className="text-red-500 text-xs mt-1">{errors.patenteCamion.message}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Intento</label>
                        <input 
                            type="number" 
                            className={`w-full border rounded-md px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none ${errors.intento ? 'border-red-500' : 'border-gray-300'}`}
                            {...register('intento', { required: 'El número de intento es obligatorio', min: 1 })} 
                        />
                        {errors.intento && <p className="text-red-500 text-xs mt-1">{errors.intento.message}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">ID de Compra</label>
                        <input 
                            type="number" 
                            className={`w-full border rounded-md px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none ${errors.idCompra ? 'border-red-500' : 'border-gray-300'}`}
                            {...register('idCompra', { required: 'El ID de la compra asociada es obligatorio' })} 
                        />
                        {errors.idCompra && <p className="text-red-500 text-xs mt-1">{errors.idCompra.message}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Dirección de Compra</label>
                        <input 
                            type="text" 
                            className={`w-full border rounded-md px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none ${errors.direccionCompra ? 'border-red-500' : 'border-gray-300'}`}
                            {...register('direccionCompra', { required: 'La dirección es obligatoria' })} 
                        />
                        {errors.direccionCompra && <p className="text-red-500 text-xs mt-1">{errors.direccionCompra.message}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Valor de la Compra</label>
                        <input 
                            type="number" 
                            className={`w-full border rounded-md px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none ${errors.valorCompra ? 'border-red-500' : 'border-gray-300'}`}
                            {...register('valorCompra', { required: 'El valor es obligatorio' })} 
                        />
                        {errors.valorCompra && <p className="text-red-500 text-xs mt-1">{errors.valorCompra.message}</p>}
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">¿Despachado (Entregado)?</label>
                    <select 
                        className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none bg-white"
                        {...register('despachado')}
                    >
                        <option value="false">No</option>
                        <option value="true">Sí</option>
                    </select>
                </div>

                <div className="flex justify-end gap-4 pt-4 border-t mt-6">
                    <button type="button" onClick={() => navigate('/despachos')} className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors">
                        Cancelar
                    </button>
                    <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors shadow-md">
                        Guardar Despacho
                    </button>
                </div>
            </form>
        </div>
    );
};

export default FormularioDespacho;
