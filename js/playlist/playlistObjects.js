import Playlist from "./playlistClass.js";
import canciones from "../cancion/cancionObjects.js";

const playlists = [
    new Playlist(8001, "Playlist 1", "src/images/default_playlist.webp"),
    new Playlist(8002, "Playlist 2", "src/images/default_playlist.webp"),
    new Playlist(8003, "Playlist con un título demasiado largo por lo que se sale siempre de la pantalla", "src/images/default_playlist.webp"),
    new Playlist(8004, "Playlist Completa", "src/images/default_playlist.webp"),
];

playlists[0].canciones.push(canciones[2]);
playlists[0].canciones.push(canciones[3]);
playlists[0].canciones.push(canciones[6]);

playlists[1].canciones.push(canciones[1]);
playlists[1].canciones.push(canciones[4]);
playlists[1].canciones.push(canciones[5]);
playlists[1].canciones.push(canciones[5]);
playlists[1].canciones.push(canciones[6]);

playlists[2].canciones.push(canciones[1]);
playlists[2].canciones.push(canciones[2]);
playlists[2].canciones.push(canciones[7]);
playlists[2].canciones.push(canciones[8]);
playlists[2].canciones.push(canciones[3]);
playlists[2].canciones.push(canciones[3]);
playlists[2].canciones.push(canciones[3]);
playlists[2].canciones.push(canciones[3]);
playlists[2].canciones.push(canciones[3]);
playlists[2].canciones.push(canciones[3]);
playlists[2].canciones.push(canciones[3]);
playlists[2].canciones.push(canciones[3]);
playlists[2].canciones.push(canciones[3]);
playlists[2].canciones.push(canciones[3]);
playlists[2].canciones.push(canciones[3]);
playlists[2].canciones.push(canciones[3]);
playlists[2].canciones.push(canciones[3]);

playlists[3].canciones.push(canciones[0]);
playlists[3].canciones.push(canciones[1]);
playlists[3].canciones.push(canciones[2]);
playlists[3].canciones.push(canciones[3]);
playlists[3].canciones.push(canciones[4]);
playlists[3].canciones.push(canciones[5]);
playlists[3].canciones.push(canciones[6]);
playlists[3].canciones.push(canciones[7]);
playlists[3].canciones.push(canciones[8]);
playlists[3].canciones.push(canciones[9]);

export default playlists;