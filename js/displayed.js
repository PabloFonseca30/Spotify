// Play/Pause Botón
const play_pause_list = document.getElementById("play_pause_list");

play_pause_list.addEventListener("click", () => {
    if(play_pause_list.classList.contains("playing_list")){
        play_pause_list.classList.remove("playing_list");
    }else{
        play_pause_list.classList.add("playing_list");
    }
});