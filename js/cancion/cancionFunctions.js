import canciones from './cancionObjects.js';

const main_container = document.getElementById("songs_list");

// Modificar: DO NOT REPEAT YOURSELF
// Crear contenedor de la lista con datos y asociarlos a cada canción
canciones.forEach((cancion, index) => {
    // Crear contenedor exterior
    const sup_cont_songs_list = document.createElement("div");
    main_container.appendChild(sup_cont_songs_list);
    sup_cont_songs_list.classList.add("sup_cont_songs_list");
    const sup_cont_songs_list_id = "sup_cont_songs_list" + index;
    sup_cont_songs_list.setAttribute("id", sup_cont_songs_list_id);
    sup_cont_songs_list.style.cursor = "pointer";

    // Crear contenedor con datos principales de la canción
    const cont_songs_list = document.createElement("div");
    sup_cont_songs_list.appendChild(cont_songs_list);
    cont_songs_list.classList.add("cont_songs_list");
    const song_list_id = "cont_songs_list_" + index;
    cont_songs_list.setAttribute("id", song_list_id);

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
    const img_list_id = "img_songs_list_" + index;
    img_songs_list.setAttribute("id", img_list_id);
    img_songs_list.setAttribute("alt", "Imagen del album");
    img_songs_list.src = cancion.album.imagen;
    
    // Crear contenedor interior "details_songs_list"
    const details_songs_list = document.createElement("div");
    cont_songs_list.appendChild(details_songs_list);
    details_songs_list.classList.add("details_songs_list");
    const details_list_id = "details_songs_list" + index;
    details_songs_list.setAttribute("id", details_list_id);

    // Crear texto y asociar datos del título
    const tittle_songs_list = document.createElement("p");
    details_songs_list.appendChild(tittle_songs_list);
    tittle_songs_list.classList.add("tittle_songs_list");
    const tittle_list_id = "tittle_songs_list" + index;
    tittle_songs_list.setAttribute("id", tittle_list_id);
    tittle_songs_list.textContent = cancion.titulo;
    tittle_songs_list.style.cursor = "pointer";

    // Crear texto y asociar datos del artista
    const artist_songs_list = document.createElement("p");
    details_songs_list.appendChild(artist_songs_list);
    artist_songs_list.classList.add("artist_songs_list");
    const artist_list_id = "artist_songs_list" + index;
    artist_songs_list.setAttribute("id", artist_list_id);
    artist_songs_list.textContent = cancion.artista.nombre;
    artist_songs_list.style.userSelect = "none";

    // Crear contenedor con datos del album
    const cont_album_songs_list = document.createElement("div");
    sup_cont_songs_list.appendChild(cont_album_songs_list);
    cont_album_songs_list.classList.add("cont_album_songs_list");
    const cont_album_songs_list_id = "cont_album_songs_list_" + index;
    cont_album_songs_list.setAttribute("id", cont_album_songs_list_id);

    // Crear texto y asociar datos del album
    const album_songs_list = document.createElement("p");
    cont_album_songs_list.appendChild(album_songs_list);
    album_songs_list.classList.add("album_songs_list");
    const album_songs_list_id = "album_songs_list_" + index;
    album_songs_list.setAttribute("id", album_songs_list_id);
    album_songs_list.textContent = cancion.album.nombre;
    album_songs_list.style.userSelect = "none";

    // Crear contenedor con datos de la duración
    const cont_duration_songs_list = document.createElement("div");
    sup_cont_songs_list.appendChild(cont_duration_songs_list);
    cont_duration_songs_list.classList.add("cont_duration_songs_list");
    const cont_duration_songs_list_id = "cont_duration_songs_list_" + index;
    cont_duration_songs_list.setAttribute("id", cont_duration_songs_list_id);

    // Crear texto y asociar datos de la duración
    const duration_songs_list = document.createElement("p");
    cont_duration_songs_list.appendChild(duration_songs_list);
    duration_songs_list.classList.add("duration_songs_list");
    const duration_songs_list_id = "duration_songs_list_" + index;
    duration_songs_list.setAttribute("id", duration_songs_list_id);
    duration_songs_list.textContent = cancion.duracion;
    duration_songs_list.style.userSelect = "none";

    //Funcionalidades al pulsar el botón play
    const song_played = document.getElementById("song_audio");
    const player_button = document.getElementById("player_button");
    const img_song_displayed_info = document.getElementById("img_song_displayed_info");
    const tittle_song_displayed_info = document.getElementById("tittle_song_displayed_info");
    const artist_song_displayed_info = document.getElementById("artist_song_displayed_info");
    const img_song_displayed = document.getElementById("img_song_displayed");
    const tittle_song_displayed = document.getElementById("tittle_song_displayed");
    const artist_song_displayed = document.getElementById("artist_song_displayed");
    const artist_about_artist = document.getElementById("artist_about_artist");
    const progress_bar_inside = document.getElementById("progress_bar_inside");
    const oyentes_about_artist = document.getElementById("oyentes_about_artist");
    const about_artist_song_displayed = document.getElementById("about_artist_song_displayed");
    const desc_about_artist = document.getElementById("desc_about_artist");
    let button_play_song = document.getElementById("play_songs_list" + index);
    button_play_song.addEventListener("click", () => {
        playSongFromList(cancion);
    });
    tittle_songs_list.addEventListener("click", () => {
        playSongFromList(cancion);
    });

    sup_cont_songs_list.addEventListener("click", () => {
        playSongFromList(cancion);
    });
    
});

function playSongFromList(cancion){
    song_played.src = cancion.audio;
    progress_bar_inside.style.width = "0%";
    song_played.play();
    if(!player_button.classList.contains("playing")){
        player_button.classList.add("playing");
    }
    img_song_displayed_info.src = cancion.album.imagen;
    tittle_song_displayed_info.textContent = cancion.titulo;
    artist_song_displayed_info.textContent = cancion.artista.nombre;
    img_song_displayed.src = cancion.album.imagen;
    tittle_song_displayed.textContent = cancion.titulo;
    artist_song_displayed.textContent = cancion.artista.nombre;
    artist_about_artist.textContent = cancion.artista.nombre;
    oyentes_about_artist.textContent = cancion.artista.oyentes + " oyentes mensuales";
    desc_about_artist.textContent = cancion.artista.descripcion;
    about_artist_song_displayed.style.background = 
    `linear-gradient(to bottom, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0)), url('${cancion.artista.imagen}') center/cover`;  //Insertar contenido fuera de css

    // Guardar la canción en localStorage
    if (window.lastSongManager) {
        window.lastSongManager.save(cancion);
    } else {
        console.warn('localStorage manager no está disponible');
    }
}