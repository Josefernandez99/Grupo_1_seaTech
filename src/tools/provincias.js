const fetch = require('node-fetch');

module.exports = async function getProvincias() {

    try {

        const data = await fetch('https://apis.datos.gob.ar/georef/api/provincias').then(res => res.json());

        return data.provincias.map(provincia => provincia.nombre).sort();

    } catch (error) {

        throw new Error('Error al obtener las provincias');

    }

}