import canciones from "../cancion/cancionObjects.js";
import playlists from "./playlistObjects.js";
import Playlist from "./playlistClass.js";

const searchbar = document.getElementById("searchbar");
const search_input = document.getElementById("search_input");
const delete_typed = document.getElementById("delete_searched_song_list");
const temporal_results = document.getElementById("temporal_results");
const biblioteca = document.getElementById("biblioteca");

// CONFIGURACIÓN DE LA BARRA DE BÚSQUEDA DE CANCIONES
search_input.addEventListener("focus", () => {
    delete_typed.classList.add("writting");
    searchbar.style.border = "solid 1.5px #00DC4B";
    delete_typed.style.cursor = "pointer";
});

// Borrar el texto con el botón
delete_typed.addEventListener("click", () => {
    search_input.value = "";
    delete_typed.classList.remove("writting");
    searchbar.style.border = "solid 1.5px rgb(85, 85, 85)";
    delete_typed.style.cursor = "unset";
    biblioteca.style.visibility = "visible";
    cargarResultados(""); // Vacía los resultados al borrar

    if(ceroResultsSearch3.classList.contains("noResults")){
        ceroResultsSearch3.classList.remove("noResults");
    }
    if(ceroResultsSearch4.classList.contains("noResults")){
        ceroResultsSearch4.classList.remove("noResults");
    }
});

// Quitar color searchbar cuando no tiene el foco
search_input.addEventListener("blur", () => {
    // Que se quite el foco solo si no hay ningún input o si no ha encontrado resultados
    if(search_input.value == "" || cancionesEncontradas.length == 0) {
        temporal_results.style.visibility = "hidden";
        temporal_results.style.height = 0;
        search_input.value = "";
        delete_typed.classList.remove("writting");
        searchbar.style.border = "solid 1.5px rgb(85, 85, 85)";
        delete_typed.style.cursor = "unset";
        biblioteca.style.visibility = "visible";
        cargarResultados("");
    }
});

// BUSCAR LA CANCIÓN MEDIANTE LA BARRA
search_input.addEventListener("input", () => {
    cargarResultados(search_input.value);
    if(search_input.value.trim() == ""){
        biblioteca.style.visibility = "visible";
    }else{
        biblioteca.style.visibility = "hidden";
    }
});

let cancionesEncontradas;
let playlistsEncontradas;

function cargarResultados(texto_buscado) {
    // Vacía el contenedor antes de mostrar resultados nuevos
    temporal_results.innerHTML = "";

    if(ceroResultsSearch.classList.contains("noResults")){
        ceroResultsSearch.classList.remove("noResults");
    }
    if(ceroResultsSearch2.classList.contains("noResults")){
        ceroResultsSearch2.classList.remove("noResults");
    }

    if(ceroResultsSearch3.classList.contains("noResults")){
        ceroResultsSearch3.classList.remove("noResults");
    }
    if(ceroResultsSearch4.classList.contains("noResults")){
        ceroResultsSearch4.classList.remove("noResults");
    }

    if (texto_buscado.trim() !== "") {  // Trim elimina espacios en blanco
        // Busca canciones que incluyan el texto (no solo coincidencia exacta)
        cancionesEncontradas = canciones.filter(element => element.titulo.replace('á', 'a').replace('é', 'e').replace('í', 'i').replace('ó', 'o').replace('ú', 'u').replace(/[\-.,'()]/g, ' ').toLowerCase().includes(texto_buscado.replace('á', 'a').replace('é', 'e').replace('í', 'i').replace('ó', 'o').replace('ú', 'u').replace(/[\-.,'()]/g, ' ').toLowerCase()));   // Includes comprueba que contenga el texto introducido, no solo que sea idéntico

        if (cancionesEncontradas.length > 0) {
            temporal_results.style.visibility = "visible";
            temporal_results.style.height = "fit-content";
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

                // Crear botón "add"
                const add_songs_list = document.createElement("img");
                ext_cont_songs_searched.appendChild(add_songs_list);
                add_songs_list.classList.add("add_songs_list");
                add_songs_list.classList.add("icon");
                add_songs_list.setAttribute("alt", "Botón de añadir canciones");
                add_songs_list.src = "src/icons/icons8-add-32.png";
                
                // Reproducir canción encontrada
                tittle_songs_searched.addEventListener("click", () => {
                    playSongFromListSearched(cancionInPlaylist);
                    temporal_results.style.visibility = "hidden"; // Oculta resultados
                    temporal_results.style.height = 0;
                    search_input.value = "";
                    delete_typed.classList.remove("writting");
                    searchbar.style.border = "solid 1.5px rgb(85, 85, 85)";
                    delete_typed.style.cursor = "unset";
                    biblioteca.style.visibility = "visible";
                    cargarResultados("");
                });

                img_songs_searched.addEventListener("click", () => {
                    playSongFromListSearched(cancionInPlaylist);
                    temporal_results.style.visibility = "hidden"; // Oculta resultados
                    temporal_results.style.height = 0;
                    search_input.value = "";
                    delete_typed.classList.remove("writting");
                    searchbar.style.border = "solid 1.5px rgb(85, 85, 85)";
                    delete_typed.style.cursor = "unset";
                    biblioteca.style.visibility = "visible";
                    cargarResultados("");
                });

                ext_cont_songs_searched.addEventListener("mouseover", () => {
                    add_songs_list.classList.add("hovered");
                });

                ext_cont_songs_searched.addEventListener("mouseout", () => {
                    add_songs_list.classList.remove("hovered");
                });

                const whiteFilter = "brightness(0) saturate(100%) invert(99%) sepia(37%) saturate(147%) hue-rotate(270deg) brightness(116%) contrast(100%)";

                add_songs_list.addEventListener("mouseover", () => {
                    add_songs_list.style.filter = whiteFilter;
                });

                add_songs_list.addEventListener("mouseout", () => {
                    add_songs_list.style.filter = "unset";
                });

                // Añadir canción al pulsar el botón - usando modal
                const modal_AddSong = document.getElementById("modal_AddSong");
                const guardado_en_cont = document.getElementById("guardado_en_cont");
                const mas_relevante_cont = document.getElementById("mas_relevante_cont");

                add_songs_list.addEventListener("click", () => {
                    ext_cont_songs_searched.style.backgroundColor = "rgba(255, 255, 255, 0.072)";
                    modal_AddSong.showModal();

                    // Mostrar playlists
                    createInitialPlaylists(cancionInPlaylist);

                    // Playlist Searchbar
                    const search_input_playlist = document.getElementById("search_input_playlist");

                    search_input_playlist.addEventListener("input", () => {
                        // Cargar resultados
                        cargarResultadosSearchbarPlaylist(search_input_playlist.value, cancionInPlaylist);
                        delete_searched_playlist.classList.add("writting");

                        if(search_input_playlist.value == "" && delete_searched_playlist.classList.contains("writting")){
                            delete_searched_playlist.classList.remove("writting");
                        }
                    });
                });

                modal_AddSong.addEventListener("close", () => {
                    // Cerrar searchbar
                    temporal_results.style.visibility = "hidden";
                    temporal_results.style.height = 0;
                    search_input.value = "";
                    delete_typed.classList.remove("writting");
                    searchbar.style.border = "solid 1.5px rgb(85, 85, 85)";
                    delete_typed.style.cursor = "unset";
                    biblioteca.style.visibility = "visible";
                    cargarResultados("");
                    search_input_playlist.value = "";
                });

                // Cerrar modal con el botón cancelar
                const cancel_text = document.getElementById("cancel_text");

                cancel_text.addEventListener("click", () => {
                    modal_AddSong.close();
                });
            });
        } else {
            temporal_results.style.visibility = "hidden";
            temporal_results.style.height = 0;
            ceroResultsSearch3.classList.add("noResults");
            ceroResultsSearch3.textContent = "No se ha encontrado ningún";
            ceroResultsSearch4.classList.add("noResults");
            ceroResultsSearch4.textContent = "resultado para \"" + search_input.value + "\"";
        }
    } else {
        temporal_results.style.visibility = "hidden";
        temporal_results.style.height = 0;
    }
}

const ceroResultsSearch = document.getElementById("ceroResultsSearch");
const ceroResultsSearch2 = document.getElementById("ceroResultsSearch2");
const ceroResultsSearch3 = document.getElementById("ceroResultsSearch3");
const ceroResultsSearch4 = document.getElementById("ceroResultsSearch4");
const delete_searched_playlist = document.getElementById("delete_searched_playlist");

// Función para cargar resultados de la búsqueda de playlists en el modal
function cargarResultadosSearchbarPlaylist(textoBuscado, cancionInPlaylist) {
    guardado_en_cont.innerHTML = "";
    mas_relevante_cont.innerHTML = "";

    if(ceroResultsSearch.classList.contains("noResults")){
        ceroResultsSearch.classList.remove("noResults");
    }
    if(ceroResultsSearch2.classList.contains("noResults")){
        ceroResultsSearch2.classList.remove("noResults");
    }

    if(ceroResultsSearch3.classList.contains("noResults")){
        ceroResultsSearch3.classList.remove("noResults");
    }
    if(ceroResultsSearch4.classList.contains("noResults")){
        ceroResultsSearch4.classList.remove("noResults");
    }
    
    if(textoBuscado.trim() !== ""){
        playlistsEncontradas = playlists.filter(element => element.nombre.replace('á', 'a').replace('é', 'e').replace('í', 'i').replace('ó', 'o').replace('ú', 'u').replace(/[\-.,'()]/g, ' ').toLowerCase().includes(textoBuscado.replace('á', 'a').replace('é', 'e').replace('í', 'i').replace('ó', 'o').replace('ú', 'u').replace(/[\-.,'()]/g, ' ').toLowerCase()));
        // La letra g en .replace(/[\-.,'()]/g, ' ') es una bandera que hace que el replace sustituya todas las ocurrencias especificadas previamente por ' '
        
        if(playlistsEncontradas.length > 0){
            // Filtrar resultados según su array (si la canción ya ha sido incluida en ella o no)

            let songInPlaylistSearched = [];
            let songNotInPlaylistSearched = [];

            playlistsEncontradas.forEach(playlist => {
                let isHere = false;
                songInPlaylist.forEach(playlistOnArray => {
                    if(playlistOnArray.id == playlist.id){
                        isHere = true
                    }
                });
                
                //Si hay coincidencia insertar en el array
                if(isHere == true){
                    songInPlaylistSearched.push(playlist);
                } else{
                    songNotInPlaylistSearched.push(playlist);
                }
            });

            // Cargar resultados
            isChecked2 = true;
            mostrarPlaylistsModal(guardado_en_cont, checked, cancionInPlaylist, songInPlaylistSearched, isChecked2);
            if(songInPlaylistSearched.length == 0){
                guardado_en_text.classList.add("notDisplayed");
            }else if(songInPlaylistSearched.length != 0 && guardado_en_text.classList.contains("notDisplayed")){
                guardado_en_text.classList.remove("notDisplayed");
            }

            isChecked2 = false;
            mostrarPlaylistsModal(mas_relevante_cont, unchecked, cancionInPlaylist, songNotInPlaylistSearched, isChecked2);
            if(songNotInPlaylistSearched.length == 0){
                mas_relevante_text.classList.add("notDisplayed");
            }else if(songNotInPlaylistSearched.length != 0 && mas_relevante_text.classList.contains("notDisplayed")){
                mas_relevante_text.classList.remove("notDisplayed");
            }

            delete_searched_playlist.addEventListener("click", () => {
                search_input_playlist.value = "";
                createInitialPlaylists(cancionInPlaylist);

                if(ceroResultsSearch.classList.contains("noResults")){
                    ceroResultsSearch.classList.remove("noResults");
                }
                if(ceroResultsSearch2.classList.contains("noResults")){
                    ceroResultsSearch2.classList.remove("noResults");
                }

                delete_searched_playlist.classList.remove("writting");
            });

        } else {
            // Si no encuentra resultados poner un texto
            guardado_en_text.classList.add("notDisplayed");
            mas_relevante_text.classList.add("notDisplayed");
            ceroResultsSearch.classList.add("noResults");
            ceroResultsSearch.textContent = "No se ha encontrado ningún";
            ceroResultsSearch2.classList.add("noResults");
            ceroResultsSearch2.textContent = "resultado para \"" + search_input_playlist.value + "\"";
        }
    } else {
        // Mostrar las playlists iniciales
        createInitialPlaylists(cancionInPlaylist);
    }
}

function createInitialPlaylists(cancionInPlaylist) {
    // Crear ambos arrays: cancion en la lista y cancion fuera de la lista
    songInPlaylist = [];
    songNotInPlaylist = [];

    // Buscar la canción
    playlists.forEach(playlist => {
        let isContained = false;

        playlist.canciones.forEach(cancion => {
            
            if(cancionInPlaylist.id == cancion.id){
                isContained = true;
            }
        });

        if(isContained){
            songInPlaylist.push(playlist);
        } else{
            songNotInPlaylist.push(playlist);
        }
    });

    const guardado_en_text = document.getElementById("guardado_en_text");
    const mas_relevante_text = document.getElementById("mas_relevante_text");

    // Mostrar las playlists que contienen la canción en el modal
    isChecked = true;
    mostrarPlaylistsModal(guardado_en_cont, checked, cancionInPlaylist, songInPlaylist, isChecked);
    if(songInPlaylist.length == 0){
        guardado_en_text.classList.add("notDisplayed");
    }else if(songInPlaylist.length != 0 && guardado_en_text.classList.contains("notDisplayed")){
        guardado_en_text.classList.remove("notDisplayed");
    }

    //Mostrar las playlists que NO contienen la canción en el modal
    isChecked = false;
    mostrarPlaylistsModal(mas_relevante_cont, unchecked, cancionInPlaylist, songNotInPlaylist, isChecked);
    if(songNotInPlaylist.length == 0){
        mas_relevante_text.classList.add("notDisplayed");
    }else if(songNotInPlaylist.length != 0 && mas_relevante_text.classList.contains("notDisplayed")){
        mas_relevante_text.classList.remove("notDisplayed");
    }
}

// Función para mostrar las playlists en el modal
// Parámetros:
// - Contenedor en el que se van a mostrar
// - Src del icono a mostrar ("checked" o "unchecked")
// - Variable del forEach "cancionInPlaylist"
// - Array con las playlists a mostrar según contengan o no la canción
// - Valor booleano para distinguir entre las playlists que contienen la canción y las que no

const unchecked = "src/icons/icons8-unchecked-32.png";
const checked = "src/icons/icons8-checked-32.png";

let songInPlaylist = [];
let songNotInPlaylist = [];

let isChecked;
let isChecked2;

function mostrarPlaylistsModal(containerToShow, srcChecked, cancionInPlaylist, isInPlaylist, isChecked){
    // Eliminar posible contenido antes de mostrar las playlists
    while(containerToShow.firstChild){
        containerToShow.removeChild(containerToShow.firstChild);
    }

    // Mostrar las playlists
    isInPlaylist.forEach((playlist, index) => {
        // Crear contenedor exterior
        const cont_playlists_show = document.createElement("div");
        containerToShow.appendChild(cont_playlists_show);
        cont_playlists_show.classList.add("cont_playlists_show");
        if (isChecked == false){
            cont_playlists_show.style.cursor = "pointer";
        }
    
        // Crear imagen y asociar datos
        const img_playlist_show = document.createElement("img");
        cont_playlists_show.appendChild(img_playlist_show);
        img_playlist_show.classList.add("img_playlist_show");
        img_playlist_show.setAttribute("alt", "Imagen de la playlist");
        img_playlist_show.src = playlist.imagen;

        // Crear contenedor interior
        const cont_int_playlists_show = document.createElement("div");
        cont_playlists_show.appendChild(cont_int_playlists_show);
        cont_int_playlists_show.classList.add("cont_int_playlists_show");

        // Crear texto y asociar los datos del título
        const tittle_songs_list_show = document.createElement("p");
        cont_int_playlists_show.appendChild(tittle_songs_list_show);
        tittle_songs_list_show.classList.add("tittle_songs_list_show");
        tittle_songs_list_show.textContent = playlist.nombre;

        // Calcular canciones totales
        let totalCancionesModal;

        if(playlist.canciones.length == 1){
            totalCancionesModal = playlist.canciones.length + " canción";
        }else{
            totalCancionesModal = playlist.canciones.length + " canciones";
        }

        // Crear texto y asociar los datos de la cantidad de canciones
        const songs_amount_playlist_show = document.createElement("p");
        cont_int_playlists_show.appendChild(songs_amount_playlist_show);
        songs_amount_playlist_show.classList.add("songs_amount_playlist");
        songs_amount_playlist_show.textContent = totalCancionesModal;

        // Crear botón "checked"
        const checked_playlist_show = document.createElement("img");
        cont_playlists_show.appendChild(checked_playlist_show);
        checked_playlist_show.classList.add("checked_playlist_show");
        const checked_playlist_id = "checked_playlist_show" + index;
        checked_playlist_show.setAttribute("id", checked_playlist_id);
        checked_playlist_show.setAttribute("alt", "Botón de reproducción");
        checked_playlist_show.src = srcChecked;

        // Añadir canción
        cont_playlists_show.addEventListener("click", () => {
            // SOLO si la canción no está en la playlist
            if(isChecked == false){
                addsongtoList();
                // Volver a cargar todas las playlist de la biblioteca para actualizar el número de canciones de cada una

                // Primero borrar las existentes
                while(playlists_displayed.firstChild){
                    playlists_displayed.removeChild(playlists_displayed.firstChild);
                }

                playlists.forEach(playlist => {
                    crearPlaylistYFuncionalidades(playlist);
                });
            }
        });

        function addsongtoList(){
            // Buscar la canción
            const songPosition = cancionInPlaylist.id - 1000 - 1;
            const playlistPosition = playlist.id - 8000 - 1;

            // console.log('Agregando canción a playlist:', {
            //     playlistId: playlist.id,
            //     actualPlaylistDisplayed: actualPlaylistDisplayed,
            //     songTitle: cancionInPlaylist.titulo,
            //     playlistName: playlist.nombre
            // });

            playlists[playlistPosition].canciones.push(canciones[songPosition]);
            if(actualPlaylistDisplayed != null && actualPlaylistDisplayed == playlist.id){
                updateDisplayedPlaylist(playlist);
            }

            modal_AddSong.close();

            temporal_results.style.visibility = "hidden";
            temporal_results.style.height = 0;
            search_input.value = "";
            delete_typed.classList.remove("writting");
            searchbar.style.border = "solid 1.5px rgb(85, 85, 85)";
            delete_typed.style.cursor = "unset";
            biblioteca.style.visibility = "visible";
            cargarResultados("");
        }
    });
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

// MOSTRAR PLAYLISTS
const playlists_displayed = document.getElementById("playlists_displayed");

// Primero borrar las existentes
while(playlists_displayed.firstChild){
    playlists_displayed.removeChild(playlists_displayed.firstChild);
}

playlists.forEach(playlist => {
    crearPlaylistYFuncionalidades(playlist);
});

const songs_list = document.getElementById("songs_list");

function crearPlaylistYFuncionalidades(playlist){
    // Crear contenedor exterior
    const cont_playlists = document.createElement("div");
    playlists_displayed.appendChild(cont_playlists);
    cont_playlists.classList.add("cont_playlists");
    cont_playlists.style.cursor = "pointer";

    // Crear imagen y asociar datos
    const img_playlist = document.createElement("img");
    cont_playlists.appendChild(img_playlist);
    img_playlist.classList.add("img_playlist");
    img_playlist.setAttribute("alt", "Imagen de la playlist");
    img_playlist.src = playlist.imagen;
    img_playlist.style.cursor = "pointer";

    // Crear contenedor interior
    const cont_int_playlists = document.createElement("div");
    cont_playlists.appendChild(cont_int_playlists);
    cont_int_playlists.classList.add("cont_int_playlists");
    cont_int_playlists.style.cursor = "pointer";

    // Crear texto y asociar los datos del título
    const tittle_playlist = document.createElement("p");
    cont_int_playlists.appendChild(tittle_playlist);
    tittle_playlist.classList.add("tittle_playlist");
    tittle_playlist.textContent = playlist.nombre;
    tittle_playlist.style.cursor = "pointer";

    // Calcular canciones totales
    let totalCanciones;

    if(playlist.canciones.length == 1){
        totalCanciones = playlist.canciones.length + " canción";
    }else{
        totalCanciones = playlist.canciones.length + " canciones";
    }

    // Crear texto y asociar los datos de la cantidad de canciones
    const songs_amount_playlist = document.createElement("p");
    cont_int_playlists.appendChild(songs_amount_playlist);
    songs_amount_playlist.classList.add("songs_amount_playlist");
    songs_amount_playlist.textContent = totalCanciones;
    songs_amount_playlist.style.cursor = "pointer";

    cont_playlists.addEventListener("click", () => {
        // Función borrar actuales y meter canciones playlist
        updateDisplayedPlaylist(playlist);
    });
}

// AHORRAR CÓDIGO --> METER LA FUNCIÓN DESDE cancionFunctions.js
let actualPlaylistDisplayed = null;
function updateDisplayedPlaylist(playlist){
    // Borrar canciones actuales
    // (Eliminar todos los hijos del contenedor padre)
    while(songs_list.firstChild){
        songs_list.removeChild(songs_list.firstChild);
    }

    actualPlaylistDisplayed = playlist.id;

    // Insertar las canciones de la playlist
    playlist.canciones.forEach((cancion, index) => {
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

            // Guardar la canción en localStorage
            if (window.lastSongManager) {
                window.lastSongManager.save(cancion);
            } else {
                console.warn('localStorage manager no está disponible');
            }
        }
    });

    // Cambiar datos de la playlist en el header
    const img_header_list = document.getElementById("img_header_list");
    const tittle_header_list = document.getElementById("tittle_header_list");

    img_header_list.src = playlist.imagen;
    tittle_header_list.textContent = playlist.nombre;

    // Calcular canciones totales
    const info_header_list = document.getElementById("info_header_list");
    let cancionesTotales;
    
    if(playlist.canciones.length == 1){
        cancionesTotales = playlist.canciones.length + " canción";
    }else{
        cancionesTotales = playlist.canciones.length + " canciones";
    }

    // Calcular horas y minutos
    let tiempoTotalSegundos = 0;
    playlist.canciones.forEach(cancion => {
        const [minutos, segundos] = cancion.duracion.split(":");    // Split devuelve un array - solo se puede usar en cadenas de texto
        tiempoTotalSegundos += (parseInt(minutos) * 60) + parseInt(segundos);
    });
    const tiempoTotalMinutos = Math.trunc(tiempoTotalSegundos/60);
    const horas = Math.trunc(tiempoTotalMinutos/60);
    const min = tiempoTotalMinutos%60;

    info_header_list.textContent = cancionesTotales + " • " + horas + " h " + min + " min";

    // Guardar la playlist en localStorage
    if (window.lastPlaylistManager) {
        window.lastPlaylistManager.save(playlist);
    } else {
        console.warn('localStorage manager no está disponible');
    }
}

// BOTÓN DE CREAR PLAYLIST
const addPlaylist = document.getElementById("addPlaylist");

addPlaylist.addEventListener("click", () => {
    const idNewPlaylist =  8000 + playlists.length + 1;
    playlists.push(new Playlist(idNewPlaylist, "Nueva lista", "src/images/default_playlist.png"));
    crearPlaylistYFuncionalidades(playlists[playlists.length - 1]);
});

// Exportamos la variable actualPlaylistDisplayed para modificar su valor al cargarla desde localStorage

// export { actualPlaylistDisplayed };  ==> Si ponemos esto se exporta como solo lectura, hay que crear una funcion que permita modificarla y exportarla

function setActualPlaylistDisplayed(id) {
    actualPlaylistDisplayed = id;
}

export { actualPlaylistDisplayed, setActualPlaylistDisplayed };