class Playlist{
    constructor(id ,nombre, imagen, canciones){
        this.id = id;
        this.nombre = nombre;
        this.imagen = imagen;
        this.canciones = []; // Array con las canciones
    }
}

export default Playlist;