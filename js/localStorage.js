// LocalStorage: guardar información en el navegador incluso cuando cierras y abres la web
// JSON: convertir objetos JS en texto para poder guardarlos (empaquetar y desempaquetar)

// Guardar la canción
function saveLastPlayedSong(cancion) {
    try { // "try": intenta hacer esto - "catch": si algo sale mal haz esto
        //Información a guardar (objeto)
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
        const textoParaGuardar = JSON.stringify(songData);
        
        // localStorage.setItem('nombre', 'valor') = "guarda esto con este nombre"
        localStorage.setItem('lastPlayedSong', textoParaGuardar);
        
    } catch (error) {
        console.error('Error al guardar la canción en localStorage:', error);
    }
}

// Cargar la canción guardada
function loadLastPlayedSong() {
    try {
        // localStorage.getItem('nombre') = "dame lo que guardé con este nombre"
        const textoGuardado = localStorage.getItem('lastPlayedSong');
        
        if (textoGuardado) { // Si hay algo guardado... (si no es NULL)
            // JSON.parse() = "convierte este texto de vuelta en objeto"
            const songData = JSON.parse(textoGuardado);
            return songData;
        }
        
        return null;
        
    } catch (error) {
        console.error('Error al cargar la canción desde localStorage:', error);
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

// Inicializar al cargar la web
function initializeLastPlayedSong() {
    // Intentar cargar la última canción guardada
    const lastSong = loadLastPlayedSong();
    
    // Si hay una canción guardada, actualizar la pantalla
    if (lastSong) {
        updateUIWithSong(lastSong);
    }
}

// Auto-ejecutar al cargar la página
document.addEventListener("DOMContentLoaded", () => {
    // "DOMContentLoaded" = "cuando toda la página esté lista"
    initializeLastPlayedSong();
});

// Hacer la funcion de guardado disponible globalmente (accesible desde otros archivos)
window.lastSongManager = {
    save: saveLastPlayedSong
}