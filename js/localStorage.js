// LocalStorage: guardar información en el navegador incluso cuando cierras y abres la web
// JSON: convertir objetos JS en texto para poder guardarlos (empaquetar y desempaquetar)

import { actualPlaylistDisplayed, setActualPlaylistDisplayed } from './playlist/playlistFunctions.js';

// Guardar la canción
function saveLastSong(cancion) {
    try { // "try": intenta hacer esto - "catch": si algo sale mal haz esto
        // Información a guardar (objeto)
        const songData = {
            id: cancion.id,
            titulo: cancion.titulo,
            artista: {
                nombre: cancion.artista.nombre,
                descripcion: cancion.artista.descripcion,
                oyentes: cancion.artista.oyentes,
                imagen: cancion.artista.imagen
            },
            album: cancion.album,
            imagen: cancion.imagen,
            audio: cancion.audio
        };
        
        // JSON.stringify() = convierte un objeto en texto (JSON)
        const textoParaGuardarSong = JSON.stringify(songData);
        
        // localStorage.setItem('nombre', 'valor') = "guarda esto con este nombre"
        localStorage.setItem('lastPlayedSong', textoParaGuardarSong);
        
    } catch (error) {
        console.error('Error al guardar la canción en localStorage:', error);
    }
}

function saveLastPlaylist(playlist) {
    try{
        const playlistData = {
            id: playlist.id,
            nombre: playlist.nombre,
            imagen: playlist.imagen,
            canciones: playlist.canciones
        };

        const textoParaGuardarPlaylist = JSON.stringify(playlistData);
        localStorage.setItem('currentPlaylist', textoParaGuardarPlaylist);

    }catch(error){
        console.error('Error al guardar la playlist en localStorage', error);
    }
}

// Cargar la canción guardada
function loadLastSong() {
    try {
        // localStorage.getItem('nombre') = "dame lo que guardé con este nombre"
        const textoGuardadoSong = localStorage.getItem('lastPlayedSong');
        
        if (textoGuardadoSong) { // Si hay algo guardado... (si no es NULL)
            // JSON.parse() = "convierte este texto de vuelta en objeto"
            const songData = JSON.parse(textoGuardadoSong);
            return songData;
        }
        
        return null;
        
    } catch (error) {
        console.error('Error al cargar la canción desde localStorage:', error);
        return null;
    }
}

function loadLastPlaylist(){
    try{
        const textoGuardadoPlaylist = localStorage.getItem('currentPlaylist');

        if (textoGuardadoPlaylist) {
            const playlistData = JSON.parse(textoGuardadoPlaylist);
            return playlistData;
        }

        return null;

    } catch (error) {
        console.error('Error al cargar la playlist desde localStorage', error);
        return null;
    }
}

// Actualizar la pantalla con la canción
function updateUIWithSong(songData) {
    
    // Encontrar todos los elementos a cambiar
    const img_song_displayed_info = document.getElementById("img_song_displayed_info");
    const tittle_song_displayed_info = document.getElementById("tittle_song_displayed_info");
    const artist_song_displayed_info = document.getElementById("artist_song_displayed_info");
    const img_song_displayed = document.getElementById("img_song_displayed");
    const tittle_song_displayed = document.getElementById("tittle_song_displayed");
    const artist_song_displayed = document.getElementById("artist_song_displayed");
    const artist_about_artist = document.getElementById("artist_about_artist");
    const oyentes_about_artist = document.getElementById("oyentes_about_artist");
    const desc_about_artist = document.getElementById("desc_about_artist");
    const about_artist_song_displayed = document.getElementById("about_artist_song_displayed");
    const song_played = document.getElementById("song_audio");
    
    // Cambiar el contenido de cada elemento (si existe)
    if (img_song_displayed_info) img_song_displayed_info.src = songData.imagen;
    if (tittle_song_displayed_info) tittle_song_displayed_info.textContent = songData.titulo;
    if (artist_song_displayed_info) artist_song_displayed_info.textContent = songData.artista.nombre;
    
    if (img_song_displayed) img_song_displayed.src = songData.imagen;
    if (tittle_song_displayed) tittle_song_displayed.textContent = songData.titulo;
    if (artist_song_displayed) artist_song_displayed.textContent = songData.artista.nombre;
    if (artist_about_artist) artist_about_artist.textContent = songData.artista.nombre;
    if (oyentes_about_artist) oyentes_about_artist.textContent = songData.artista.oyentes + " oyentes mensuales";
    if (desc_about_artist) desc_about_artist.textContent = songData.artista.descripcion;
    if (about_artist_song_displayed) {
        about_artist_song_displayed.style.background = 
            `linear-gradient(to bottom, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0)), url('${songData.artista.imagen}') center/cover`;
    }
    
    // Configurar el audio
    if (song_played) {
        song_played.src = songData.audio;
        
        // Resetear la barra de progreso a 0
        const progress_bar_inside = document.getElementById("progress_bar_inside");
        if (progress_bar_inside) {
            progress_bar_inside.style.width = "0%";
        }
    }
}

 function updateUIWithPlaylist(playlistData){
    const songs_list = document.getElementById("songs_list");
    while(songs_list.firstChild){
        songs_list.removeChild(songs_list.firstChild);
    }

    const song_played = document.getElementById("song_audio");

    // Actualizar id de playlist cargada
    setActualPlaylistDisplayed(playlistData.id);

    // Insertar las canciones de la playlist
    playlistData.canciones.forEach((cancion, index) => {
        // Crear contenedor exterior
        const sup_cont_songs_list = document.createElement("div");
        songs_list.appendChild(sup_cont_songs_list);
        sup_cont_songs_list.classList.add("sup_cont_songs_list");
        sup_cont_songs_list.style.cursor = "pointer";

        // Crear contenedor con datos principales de la canción
        const cont_songs_list = document.createElement("div");
        sup_cont_songs_list.appendChild(cont_songs_list);
        cont_songs_list.classList.add("cont_songs_list");

        // Crear botón "play"
        const play_songs_list = document.createElement("img");
        cont_songs_list.appendChild(play_songs_list);
        play_songs_list.classList.add("play_songs_list");
        const play_list_id = "play_songs_list" + index;
        play_songs_list.setAttribute("id", play_list_id);
        play_songs_list.setAttribute("alt", "Botón de reproducción");
        play_songs_list.src = "src/icons/icons8-play-32.png";

        // Crear imagen y asociar datos
        const img_songs_list = document.createElement("img");
        cont_songs_list.appendChild(img_songs_list);
        img_songs_list.classList.add("img_songs_list");
        img_songs_list.setAttribute("alt", "Imagen del album");
        img_songs_list.src = cancion.imagen;
        
        // Crear contenedor interior "details_songs_list"
        const details_songs_list = document.createElement("div");
        cont_songs_list.appendChild(details_songs_list);
        details_songs_list.classList.add("details_songs_list");

        // Crear texto y asociar datos del título
        const tittle_songs_list = document.createElement("p");
        details_songs_list.appendChild(tittle_songs_list);
        tittle_songs_list.classList.add("tittle_songs_list");
        tittle_songs_list.textContent = cancion.titulo;
        tittle_songs_list.style.cursor = "pointer";

        // Crear texto y asociar datos del artista
        const artist_songs_list = document.createElement("p");
        details_songs_list.appendChild(artist_songs_list);
        artist_songs_list.classList.add("artist_songs_list");
        artist_songs_list.textContent = cancion.artista.nombre;
        artist_songs_list.style.userSelect = "none";

        // Crear contenedor con datos del album
        const cont_album_songs_list = document.createElement("div");
        sup_cont_songs_list.appendChild(cont_album_songs_list);
        cont_album_songs_list.classList.add("cont_album_songs_list");

        // Crear texto y asociar datos del album
        const album_songs_list = document.createElement("p");
        cont_album_songs_list.appendChild(album_songs_list);
        album_songs_list.classList.add("album_songs_list");
        album_songs_list.textContent = cancion.album;
        album_songs_list.style.userSelect = "none";

        // Crear contenedor con datos de la duración
        const cont_duration_songs_list = document.createElement("div");
        sup_cont_songs_list.appendChild(cont_duration_songs_list);
        cont_duration_songs_list.classList.add("cont_duration_songs_list");

        // Crear texto y asociar datos de la duración
        const duration_songs_list = document.createElement("p");
        cont_duration_songs_list.appendChild(duration_songs_list);
        duration_songs_list.classList.add("duration_songs_list");
        duration_songs_list.textContent = cancion.duracion;
        duration_songs_list.style.userSelect = "none";

        //Funcionalidades al pulsar el botón play
        const desc_about_artist = document.getElementById("desc_about_artist");
        let button_play_song = document.getElementById("play_songs_list" + index);
        button_play_song.addEventListener("click", () => {
            playSongFromList();
        });
        tittle_songs_list.addEventListener("click", () => {
            playSongFromList();
        });

        sup_cont_songs_list.addEventListener("click", () => {
            playSongFromList();
        });

        function playSongFromList(){
            song_played.src = cancion.audio;
            progress_bar_inside.style.width = "0%";
            song_played.play();
            if(!player_button.classList.contains("playing")){
                player_button.classList.add("playing");
            }
            img_song_displayed_info.src = cancion.imagen;
            tittle_song_displayed_info.textContent = cancion.titulo;
            artist_song_displayed_info.textContent = cancion.artista.nombre;
            img_song_displayed.src = cancion.imagen;
            tittle_song_displayed.textContent = cancion.titulo;
            artist_song_displayed.textContent = cancion.artista.nombre;
            artist_about_artist.textContent = cancion.artista.nombre;
            oyentes_about_artist.textContent = cancion.artista.oyentes + " oyentes mensuales";
            desc_about_artist.textContent = cancion.artista.descripcion;
            about_artist_song_displayed.style.background = 
            `linear-gradient(to bottom, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0)), url('${cancion.artista.imagen}') center/cover`;  //Insertar contenido fuera de css
        }
    });

    // Cambiar datos de la playlist en el header
    const img_header_list = document.getElementById("img_header_list");
    const tittle_header_list = document.getElementById("tittle_header_list");

    img_header_list.src = playlistData.imagen;
    tittle_header_list.textContent = playlistData.nombre;

    // Calcular canciones totales
    const info_header_list = document.getElementById("info_header_list");
    let cancionesTotales;
    if(playlistData.canciones.length == 1){
        cancionesTotales = playlistData.canciones.length + " canción";
    }else{
        cancionesTotales = playlistData.canciones.length + " canciones";
    }

    // Calcular horas y minutos
    let tiempoTotalSegundos = 0;
    playlistData.canciones.forEach(cancion => {
        const [minutos, segundos] = cancion.duracion.split(":");    // Split devuelve un array - solo se puede usar en cadenas de texto
        tiempoTotalSegundos += (parseInt(minutos) * 60) + parseInt(segundos);
    });
    const tiempoTotalMinutos = Math.trunc(tiempoTotalSegundos/60);
    const horas = Math.trunc(tiempoTotalMinutos/60);
    const min = tiempoTotalMinutos%60;

    info_header_list.textContent = cancionesTotales + " • " + horas + " h " + min + " min";
 }

// Inicializar al cargar la web
function initializeLastPlayedSong() {
    // Intentar cargar la última canción guardada
    const lastSong = loadLastSong();
    
    // Si hay una canción guardada, actualizar la pantalla
    if (lastSong) {
        updateUIWithSong(lastSong);
    }
}

function initializeLastPlaylist(){
    const lastPlaylist = loadLastPlaylist();

    if (lastPlaylist) {
        updateUIWithPlaylist(lastPlaylist);
    }
}

// Auto-ejecutar al cargar la página
document.addEventListener("DOMContentLoaded", () => {
    // "DOMContentLoaded" = "cuando toda la página esté lista"
    initializeLastPlayedSong();
    initializeLastPlaylist();
});

// Hacer la funcion de guardado disponible globalmente (accesible desde otros archivos)
window.lastSongManager = {
    save: saveLastSong
}

window.lastPlaylistManager = {
    save: saveLastPlaylist
}