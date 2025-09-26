let contadorRepeat = 0;

document.addEventListener("DOMContentLoaded", () => {
    // PLAY/PAUSE BOTÓN
    const player_button = document.getElementById("player_button");
    const song_audio = document.getElementById("song_audio");

    function reproducir(){
        if (song_audio.paused) {
            song_audio.play();
            player_button.classList.add("playing");
        } else {
            song_audio.pause();
            player_button.classList.remove("playing");
        }
    }

    player_button.addEventListener("click", () => {
        reproducir();
    });

    // Media Session API - para captar pulsacones externas al ratón como teclado o botón de auricular
    navigator.mediaSession.setActionHandler("play", () => {
        reproducir();
    });
    navigator.mediaSession.setActionHandler("pause", () => {
        reproducir();
    });

    // BARRA DE PROGRESO
    const progress_bar_inside = document.getElementById("progress_bar_inside");
    const current_time = document.getElementById("current_time");
    function update_progressbar(){
        let currentTime_song = ((song_audio.currentTime / song_audio.duration) * 100) + "%";
        progress_bar_inside.style.width = currentTime_song;
        // Actualizar el tiempo actual de reproducción
        let minutes = Math.floor(song_audio.currentTime / 60);
        let seconds = Math.floor(song_audio.currentTime % 60);
        let formatted_seconds;
        if (seconds < 10) {
            formatted_seconds = "0" + seconds;
        } else {
            formatted_seconds = seconds;
        }
        let transformed_current_time = minutes + ":" + formatted_seconds;
        current_time.textContent = transformed_current_time;
    }

    // Poner en bucle la canción al activar el botón "repeat"
    const repeat_song_button = document.getElementById("repeat_song_button");
    function loopCheck(){
        if(contadorRepeat%3 == 2){
            song_audio.loop = true;
        }else{
            song_audio.loop = false;
        }
    }

    // Actualizar el valor - timeupdate funciona solo para contenido multimedia, actualiza 4 veces cada segundo, si esta pausado no actualiza
    song_audio.addEventListener("timeupdate", () => {
        update_progressbar();
        loopCheck();
        checkSoundBarWidth();
    });

    song_audio.addEventListener("ended", () => {
        // Solo resetear el botón si NO está en bucle
        if (!song_audio.loop) {
            player_button.classList.remove("playing");
        }
    });

    // Ajustar el texto de la duración total de la canción
    const total_time = document.getElementById("total_time");
    // Con loadedmetadata esperamos a que los metadatos del audio como la duración estén preparados y cargados
    song_audio.addEventListener("loadedmetadata", () => {
        let minutes = Math.floor(song_audio.duration / 60);
        let seconds = Math.floor(song_audio.duration % 60);
        let formatted_seconds2;
        if (seconds < 10) {
            formatted_seconds2 = "0" + seconds;
        } else {
            formatted_seconds2 = seconds;
        }
        total_time.textContent = minutes + ":" + formatted_seconds2;
    });

    // Cambiar la posición de la barra con un click
    const progress_bar_outside = document.getElementById("progress_bar_outside");
    const acho_progress_bar_outside = progress_bar_outside.offsetWidth; // Captura el ancho de un elemento

    progress_bar_outside.addEventListener("click", (event) => {
        const cambio_de_ancho = ((event.offsetX / acho_progress_bar_outside) * 100);
        progress_bar_inside.style.width = cambio_de_ancho + "%";
        song_audio.currentTime = (cambio_de_ancho * song_audio.duration) / 100;
    });

    // Cambiar el color interior a verde al pasar sobre el contenedor exterior
    progress_bar_outside.addEventListener("mouseover", () => {
        progress_bar_inside.style.backgroundColor = "#26D760";
    });
    progress_bar_outside.addEventListener("mouseout", () => {
        progress_bar_inside.style.backgroundColor = "white";
    });

    // ICONOS
    const green_filter = "brightness(0) saturate(100%) invert(76%) sepia(26%) saturate(1358%) hue-rotate(78deg) brightness(90%) contrast(87%)";
    const white_filter = "brightness(0) saturate(100%) invert(99%) sepia(37%) saturate(147%) hue-rotate(270deg) brightness(116%) contrast(100%)";
    
    // BARRA DE VOLUMEN
    const volume_bar_outside = document.getElementById("volume_bar_outside");
    const volume_bar_inside = document.getElementById("volume_bar_inside");
    
    // Poner un volumen incial y aplicarlo a la barra - No hay APIs que capturen el volumen del PC
    song_audio.volume = 0.4;
    volume_bar_inside.style.width = "40%";

    // Ajustar el volumen según el click en la barra
    const ancho_volume_bar_outside = volume_bar_outside.offsetWidth;
    volume_bar_outside.addEventListener("click", (event) => {
        const click_volume_bar_outside = (event.offsetX / ancho_volume_bar_outside) * 100;
        volume_bar_inside.style.width = click_volume_bar_outside + "%";
        song_audio.volume = click_volume_bar_outside / 100;

        // Si el audio está muteado y en vez de desmutearlo cambias la posición de la barra:
        if(volume_song_button.style.filter == green_filter){
            currentSounBarWidth = volume_bar_inside.style.width;
            song_audio.muted = false;
            volume_song_button.src = "src/icons/icons8-volume-32.webp";
            volume_song_button.style.filter = "unset";
            cont5++;
        }
    });

    // Cambiar el color interior de la barra de volumen a verde al pasar sobre el contenedor exterior
    volume_bar_outside.addEventListener("mouseover", () => {
        volume_bar_inside.style.backgroundColor = "#26D760";
    });
    volume_bar_outside.addEventListener("mouseout", () => {
        volume_bar_inside.style.backgroundColor = "white";
    });

    // Cambiar icono de volumen al hacer click y mutear
    const volume_song_button = document.getElementById("volume_song_button");
    let cont5 = 0;
    let currentSounBarWidth
    function checkSoundBarWidth (){     // La utilizamos en el evento loadmetadata de arriba para que se actualize constantemente
        if(cont5%2 != 1){
            currentSounBarWidth = volume_bar_inside.style.width;
        }
    }
    volume_song_button.addEventListener("click", () => {
        cont5++;
        if(cont5%2 == 1){
            volume_song_button.src = "src/icons/icons8-muted-32.png";
            song_audio.muted = true;
            volume_bar_inside.style.width = "0%";
        }else{
            volume_song_button.src = "src/icons/icons8-volume-32.webp";
            song_audio.muted = false;
            volume_bar_inside.style.width = currentSounBarWidth;
        } 
    });
    
    // ICONOS
    // Iconos que cambian a verde al hacer click
    const iconGreen = document.querySelectorAll(".iconGreen");
    let isHover = false;
    iconGreen.forEach(icon => {
        icon.addEventListener("click", () => {
            if(icon.style.filter == white_filter){
                icon.style.filter = green_filter;
            }else{
                icon.style.filter = white_filter;
            }
        })
        icon.addEventListener("mouseover", () => {
            isHover = true
            if(icon.style.filter == green_filter){
                icon.style.filter = green_filter;
            }else{
                icon.style.filter = white_filter;
            }
        });
        icon.addEventListener("mouseout", () => {
            isHover = false;
            if(icon.style.filter == green_filter){
                icon.style.filter = green_filter;
            }else{
                icon.style.filter = "unset";
            }
        });
    });

    // Iconos que NO CAMBIAN a verde al hacer click
    const iconWhite = document.querySelectorAll(".iconWhite");
    iconWhite.forEach(icon => {
        icon.addEventListener("mouseover", () => {
            icon.style.filter = white_filter;
        });
        icon.addEventListener("mouseout", () => {
            icon.style.filter = "unset";
        });
    });

     // Iconos para repetir playlist o poner canción en bucle
    repeat_song_button.style.filter = "unset";
    let isHover2 = false;

    repeat_song_button.addEventListener("click", () => {
        contadorRepeat++;
        if(contadorRepeat%3 == 1) {
            repeat_song_button.src = "src/icons/icons8-repeat-32.png";
            repeat_song_button.style.filter = green_filter;
        } else if(contadorRepeat%3 == 2) {
            repeat_song_button.src = "src/icons/icons8-repeat-one-32.webp";
            repeat_song_button.style.filter = green_filter;
        } else if(contadorRepeat%3 == 0 && isHover2 == true) {
            repeat_song_button.src = "src/icons/icons8-repeat-32.png";
            repeat_song_button.style.filter = white_filter;
        } else if (contadorRepeat%3 == 0) {
            repeat_song_button.src = "src/icons/icons8-repeat-32.png";
            repeat_song_button.style.filter = "unset";
        }
    });

    repeat_song_button.addEventListener("mouseover", () => {
        isHover2 = true;
        if(repeat_song_button.style.filter == "unset"){
            repeat_song_button.style.filter = white_filter;
        }
    });

    repeat_song_button.addEventListener("mouseout", () => {
        isHover2 = false;
        if(repeat_song_button.style.filter == white_filter){
            repeat_song_button.style.filter = "unset";
        }
    });
});

// Funcion letra de canciones
const microphone_song_button = document.getElementById("microphone_song_button");
const song_lyrics = document.getElementById("song_lyrics");
const displayed_inner_container = document.getElementById("displayed_inner_container");

microphone_song_button.addEventListener("click", () => {
    if(song_lyrics.classList.contains("unactive")){
        song_lyrics.classList.remove("unactive");
        displayed_inner_container.style.display = "none";
        displayed_inner_container.style.height = "0";
    } else {
        song_lyrics.classList.add("unactive");
        displayed_inner_container.style.display = "block";
        displayed_inner_container.style.height = "100%";
    }
});

export { contadorRepeat };