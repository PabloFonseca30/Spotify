import Song from './cancionClass.js';
import artistas from '../artista/artistaObjects.js';

function getArtistByName(name){
    return artistas.find(element => element.nombre === name)
}

const canciones = [
    new Song(1001, 'Do I Wanna Know?', getArtistByName('Arctic Monkeys'), 'AM', '4:25','src/images/album/album_AM.jpeg', 'src/audios/Do_I_Wanna_Know.mp3'),
    new Song(1002, 'Reminder', getArtistByName('The Weeknd'), 'Starboy', '3:39','src/images/album/album_Starboy.jpeg', 'src/audios/Reminder.mp3'),
    new Song(1003, 'R.I.P. 2 My Youth', getArtistByName('The Neighbourhood'), 'Wiped Out!', '3:26','src/images/album/album_WipedOut.jpg', 'src/audios/R.I.P._2_My_Youth.mp3'),
    new Song(1004, 'Let It Happen', getArtistByName('Tame Impala'), 'Currents', '7:50','src/images/album/album_Currents.jpeg', 'src/audios/Let_It_Happen.mp3'),
    new Song(1005, 'We Are The People', getArtistByName('Empire Of The Sun'), 'Walking On A Dream', '4:27','src/images/album/album_WalkingOnADream.jpeg', 'src/audios/We_Are_The_People.mp3'),
    new Song(1006, '505', getArtistByName('Arctic Monkeys'), 'Favourite Worst Nightmare', '4:13','src/images/album/album_FavouriteWorstNightmare.jpeg', 'src/audios/505.mp3'),
    new Song(1007, 'Maps', getArtistByName('Maroon 5'), 'V', '3:10','src/images/album/album_V.jpeg', 'src/audios/Maps.mp3'),
    new Song(1008, 'Locked Out Of Heaven', getArtistByName('Bruno Mars'), 'Unorthodox Jukebox', '3:54','src/images/album/album_Unorthodox Jukebox.jpeg', 'src/audios/Locked_Out_Of_Heaven.mp3'),
    new Song(1009, 'Stop The World I Wanna Get Off With You', getArtistByName('Arctic Monkeys'), 'Why\'d You Only Call Me When You\'re High?', '3:11','src/images/album/album_WhydYouOnlyCallMeWhenYoureHigh.jpeg', 'src/audios/Stop_The_World_I_Wanna_Get_Off_With_You.mp3'),
    new Song(1010, 'Instant Crush (feat. Julian Casablancas)', getArtistByName('Daft Punk'), 'Random Access Memories', '5:37','src/images/album/album_RandomAccessMemories.jpeg', 'src/audios/Instant_Crush.mp3'),
];

export default canciones;