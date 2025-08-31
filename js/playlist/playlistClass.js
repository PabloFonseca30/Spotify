class Playlist{
    constructor(nombre, cantidad, horas, canciones){
        this.nombre = nombre;
        this.cantidad = cantidad; // Cantidad de canciones
        this.horas = horas; // Horas totales de la playlist
        this.canciones = []; // Arreglo con las canciones
    }
}

export default Playlist;