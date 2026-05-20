import axios from 'axios';

// Instancia para el backend de Ventas (puerto 8080)
export const ventasApi = axios.create({
    baseURL: 'http://localhost:8080/api/v1',
    headers: {
        'Content-Type': 'application/json'
    }
});

// Instancia para el backend de Despachos (puerto 8081)
export const despachosApi = axios.create({
    baseURL: 'http://localhost:8081/api/v1',
    headers: {
        'Content-Type': 'application/json'
    }
});

// --- Fallback utilities (usa db.json y localStorage cuando el backend no responde) ---

const mapVenta = (v) => ({
    idVenta: v.idVenta ?? v.id ?? null,
    direccionCompra: v.direccionCompra ?? v.direccion_compra ?? '',
    valorCompra: v.valorCompra ?? v.valor_compra ?? 0,
    fechaCompra: v.fechaCompra ?? v.fecha_compra ?? '',
    despachoGenerado: v.despachoGenerado ?? v.despacho_generado ?? false
});

const getMockVentas = async () => {
    const stored = localStorage.getItem('mockVentas');
    if (stored) return JSON.parse(stored);

    try {
        const res = await fetch('/db.json');
        const data = await res.json();
        const ventas = (data.Ventas || []).map(mapVenta);
        localStorage.setItem('mockVentas', JSON.stringify(ventas));
        return ventas;
    } catch (e) {
        return [];
    }
};

const saveMockVentas = (ventas) => localStorage.setItem('mockVentas', JSON.stringify(ventas));

export const getVentas = async () => {
    try {
        const res = await ventasApi.get('/ventas');
        return res.data;
    } catch (e) {
        return await getMockVentas();
    }
};

export const createVenta = async (payload) => {
    try {
        const res = await ventasApi.post('/ventas', payload);
        return res.data;
    } catch (e) {
        const ventas = await getMockVentas();
        const nextId = ventas.length ? Math.max(...ventas.map(v => v.idVenta || 0)) + 1 : 1;
        const nueva = { ...payload, idVenta: nextId };
        ventas.push(mapVenta(nueva));
        saveMockVentas(ventas);
        return nueva;
    }
};

export const deleteVenta = async (idVenta) => {
    try {
        await ventasApi.delete(`/ventas/${idVenta}`);
        return true;
    } catch (e) {
        const ventas = await getMockVentas();
        const filtered = ventas.filter(v => v.idVenta !== idVenta);
        saveMockVentas(filtered);
        return true;
    }
};

// Despachos: simple fallback using localStorage when backend no está
const getMockDespachos = async () => {
    const stored = localStorage.getItem('mockDespachos');
    if (stored) return JSON.parse(stored);
    localStorage.setItem('mockDespachos', JSON.stringify([]));
    return [];
};

const saveMockDespachos = (d) => localStorage.setItem('mockDespachos', JSON.stringify(d));

export const getDespachos = async () => {
    try {
        const res = await despachosApi.get('/despachos');
        return res.data;
    } catch (e) {
        return await getMockDespachos();
    }
};

export const createDespacho = async (payload) => {
    try {
        const res = await despachosApi.post('/despachos', payload);
        return res.data;
    } catch (e) {
        const despachos = await getMockDespachos();
        const nextId = despachos.length ? Math.max(...despachos.map(d => d.idDespacho || 0)) + 1 : 1;
        const nuevo = { ...payload, idDespacho: nextId };
        despachos.push(nuevo);
        saveMockDespachos(despachos);
        return nuevo;
    }
};

export const deleteDespacho = async (idDespacho) => {
    try {
        await despachosApi.delete(`/despachos/${idDespacho}`);
        return true;
    } catch (e) {
        const despachos = await getMockDespachos();
        const filtered = despachos.filter(d => d.idDespacho !== idDespacho);
        saveMockDespachos(filtered);
        return true;
    }
};

