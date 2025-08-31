import canciones from "../cancion/cancionObjects.js"

const searchbar = document.getElementById("searchbar");
const search_input = document.getElementById("search_input");
const delete_typed = document.getElementById("delete_searched_song_list");
const temporal_results = document.getElementById("temporal_results");

// CONFIGURACIÓN DE LA BARRA DE BÚSQUEDA DE CANCIONES
search_input.addEventListener("focus", () => {
    delete_typed.classList.add("writting");
    searchbar.style.border = "solid 1.5px #00DC4B";
    delete_typed.style.cursor = "pointer";
});

search_input.addEventListener("blur", () => {
    delete_typed.classList.remove("writting");
    searchbar.style.border = "solid 1px rgb(85, 85, 85)";
    delete_typed.style.cursor = "unset";
});

// Borrar el texto con el botón
delete_typed.addEventListener("click", () => {
    search_input.value = "";
    cargarResultados(""); // Vacía los resultados al borrar
});

// BUSCAR LA CANCIÓN MEDIANTE LA BARRA
search_input.addEventListener("input", () => {
    cargarResultados(search_input.value);
});



let cancionesEncontradas;

function cargarResultados(texto_buscado) {
    // Vacía el contenedor antes de mostrar resultados nuevos
    temporal_results.innerHTML = "";

    if (texto_buscado.trim() !== "") {  // Trim elimina espacios en blanco
        // Busca canciones que incluyan el texto (no solo coincidencia exacta)
        cancionesEncontradas = canciones.filter(element => element.titulo.toLowerCase().includes(texto_buscado.toLowerCase()));   // Includes comprueba que contenga el texto introducido, no solo que sea idéntico

        if (cancionesEncontradas.length > 0) {
            temporal_results.style.visibility = "visible";
            cancionesEncontradas.forEach(cancionInPlaylist => {
                // Montar el contenedor con las canciones encontradas
                const ext_cont_songs_searched = document.createElement("div");
                temporal_results.appendChild(ext_cont_songs_searched);
                ext_cont_songs_searched.classList.add("ext_cont_songs_searched");

                // Imagen y datos
                const img_songs_searched = document.createElement("img");
                ext_cont_songs_searched.appendChild(img_songs_searched);
                img_songs_searched.classList.add("img_songs_searched");
                img_songs_searched.setAttribute("alt", "Imagen del album");
                img_songs_searched.src = cancionInPlaylist.imagen;
                img_songs_searched.style.cursor = "pointer";

                // Contenedor interior "details_songs_searched"
                const details_songs_searched = document.createElement("div");
                ext_cont_songs_searched.appendChild(details_songs_searched);
                details_songs_searched.classList.add("details_songs_searched");

                // Título
                const tittle_songs_searched = document.createElement("p");
                details_songs_searched.appendChild(tittle_songs_searched);
                tittle_songs_searched.classList.add("tittle_songs_searched");
                tittle_songs_searched.textContent = cancionInPlaylist.titulo;
                tittle_songs_searched.style.cursor = "pointer";

                // Artista
                const artist_songs_searched = document.createElement("p");
                details_songs_searched.appendChild(artist_songs_searched);
                artist_songs_searched.classList.add("artist_songs_searched");
                artist_songs_searched.textContent = cancionInPlaylist.artista.nombre;
                artist_songs_searched.style.userSelect = "none";
                
                // Reproducir canción encontrada
                tittle_songs_searched.addEventListener("click", () => {
                    playSongFromListSearched(cancionInPlaylist);
                    temporal_results.style.visibility = "hidden"; // Oculta resultados
                    search_input.value = "";
                });

                img_songs_searched.addEventListener("click", () => {
                    playSongFromListSearched(cancionInPlaylist);
                    temporal_results.style.visibility = "hidden"; // Oculta resultados
                    search_input.value = "";
                });
            });
        } else {
            temporal_results.style.visibility = "hidden";
        }
    } else {
        temporal_results.style.visibility = "hidden";
    }
}

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

function playSongFromListSearched(cancion){
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
    about_artist_song_displayed.style.background = `linear-gradient(to bottom, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0)), url('${cancion.artista.imagen}') center/cover`;  //Insertar contenido fuera de css

    // Guardar la canción en localStorage
    if (window.lastSongManager) {
        window.lastSongManager.save(cancion);
    } else {
        console.warn('localStorage manager no está disponible');
    }
}