import Song from './cancionClass.js';
import artistas from '../artista/artistaObjects.js';
import albumes from '../album/albumObjects.js';

function getArtistByName(name){
    return artistas.find(element => element.nombre === name);
}

function getAlbumByName(name){
    return albumes.find(element => element.nombre === name);
}

const canciones = [
    new Song(1001, 'Do I Wanna Know?', getArtistByName('Arctic Monkeys'), getAlbumByName('AM'), '4:25', 'src/audios/Do_I_Wanna_Know.mp3'),
    new Song(1002, 'Reminder', getArtistByName('The Weeknd'), getAlbumByName('Starboy'), '3:39', 'src/audios/Reminder.mp3'),
    new Song(1003, 'R.I.P. 2 My Youth', getArtistByName('The Neighbourhood'), getAlbumByName('Wiped Out!'), '3:26', 'src/audios/R.I.P._2_My_Youth.mp3'),
    new Song(1004, 'Let It Happen', getArtistByName('Tame Impala'), getAlbumByName('Currents'), '7:50', 'src/audios/Let_It_Happen.mp3'),
    new Song(1005, 'We Are The People', getArtistByName('Empire Of The Sun'), getAlbumByName('Walking On A Dream'), '4:27', 'src/audios/We_Are_The_People.mp3'),
    new Song(1006, '505', getArtistByName('Arctic Monkeys'), getAlbumByName('Favourite Worst Nightmare'), '4:13', 'src/audios/505.mp3'),
    new Song(1007, 'Maps', getArtistByName('Maroon 5'), getAlbumByName('V'), '3:10', 'src/audios/Maps.mp3'),
    new Song(1008, 'Locked Out Of Heaven', getArtistByName('Bruno Mars'), getAlbumByName('Unorthodox Jukebox'), '3:54', 'src/audios/Locked_Out_Of_Heaven.mp3'),
    new Song(1009, 'Stop The World I Wanna Get Off With You', getArtistByName('Arctic Monkeys'), getAlbumByName('Why\'d You Only Call Me When You\'re High?'), '3:11', 'src/audios/Stop_The_World_I_Wanna_Get_Off_With_You.mp3'),
    new Song(1010, 'Instant Crush (feat. Julian Casablancas)', getArtistByName('Daft Punk'), getAlbumByName('Random Access Memories'), '5:37', 'src/audios/Instant_Crush.mp3'),
];

// Reminder - The Weeknd
canciones[1].lyrics.push("Record man play my song on the radio");
canciones[1].lyrics.push("You too busy trying to find that blue-eyed soul");
canciones[1].lyrics.push("I let my black hair grow and my weed smoke");
canciones[1].lyrics.push("And I swear too much on the regular");
canciones[1].lyrics.push("We gon' let them hits fly, we gon' let it go");
canciones[1].lyrics.push("If it ain't XO then it gotta go");
canciones[1].lyrics.push("I just won a new award for a kids show");
canciones[1].lyrics.push("Talking 'bout a face numbing off a bag of blow");
canciones[1].lyrics.push("");
canciones[1].lyrics.push("");
canciones[1].lyrics.push("");
canciones[1].lyrics.push("I'm like, goddamn, bitch, I am not a Teen Choice");
canciones[1].lyrics.push("Goddamn, bitch, I am not a bleach boy");
canciones[1].lyrics.push("Whip game, make a nigga understand though");
canciones[1].lyrics.push("Got that Hannibal, Silence of the Lambo");
canciones[1].lyrics.push("Hit the gas so hard make it rotate");
canciones[1].lyrics.push("All my niggas blew up like a propane");
canciones[1].lyrics.push("All these R&B niggas be so lame");
canciones[1].lyrics.push("Got a sweet Asian chick, she go low mane (low mane, low mane)");
canciones[1].lyrics.push("");
canciones[1].lyrics.push("");
canciones[1].lyrics.push("");
canciones[1].lyrics.push("You know me, know me");
canciones[1].lyrics.push("You know, man, know, man, know, man");
canciones[1].lyrics.push("You know me, know me, know me");
canciones[1].lyrics.push("Every time you try to forget who I am");
canciones[1].lyrics.push("I'll be right there to remind you again");
canciones[1].lyrics.push("You know me, know me (pow, pow)");
canciones[1].lyrics.push("You know me, know me");
canciones[1].lyrics.push("");
canciones[1].lyrics.push("");
canciones[1].lyrics.push("");
canciones[1].lyrics.push("Said I'm just tryna swim in something wetter than the ocean");
canciones[1].lyrics.push("Faded off a double cup, I'm mixing up the potion");
canciones[1].lyrics.push("All I wanna do is make that money and make dope shit");
canciones[1].lyrics.push("It just seem like niggas tryna sound like all my old shit");
canciones[1].lyrics.push("");
canciones[1].lyrics.push("");
canciones[1].lyrics.push("");
canciones[1].lyrics.push("Everybody knows it, all these niggas know me");
canciones[1].lyrics.push("Platinum off a mixtape, sipping on that codeine");
canciones[1].lyrics.push("Pour it in my trophies, roll until my nose bleed");
canciones[1].lyrics.push("I'ma keep on singing while I'm burning up that OG");
canciones[1].lyrics.push("");
canciones[1].lyrics.push("");
canciones[1].lyrics.push("All my niggas get it, they make money all alone");
canciones[1].lyrics.push("Rock a chain around they neck, making sure I'm getting home");
canciones[1].lyrics.push("When I travel 'round the globe, make a couple mil' a show");
canciones[1].lyrics.push("And I come back to my city, I fuck every girl I know");
canciones[1].lyrics.push("");
canciones[1].lyrics.push("");
canciones[1].lyrics.push("");
canciones[1].lyrics.push("Used to walk around with a slouch, had a mattress on the floor");
canciones[1].lyrics.push("Now my shit straight, eating all day, tryna lose weight");
canciones[1].lyrics.push("That good sex, we'll sweat it out");
canciones[1].lyrics.push("Hotel bed springs, we'll wear it out");
canciones[1].lyrics.push("I ain't gotta tell you 'cause you know me");
canciones[1].lyrics.push("");
canciones[1].lyrics.push("");
canciones[1].lyrics.push("");
canciones[1].lyrics.push("You know me, know me");
canciones[1].lyrics.push("You know, man, know, man, know, man");
canciones[1].lyrics.push("You know me, know me, know me");
canciones[1].lyrics.push("Every time you try to forget who I am");
canciones[1].lyrics.push("I'll be right there to remind you again");
canciones[1].lyrics.push("You know me, know me (pow, pow)");
canciones[1].lyrics.push("You know me, know me (know me, know me)");
canciones[1].lyrics.push("");
canciones[1].lyrics.push("");
canciones[1].lyrics.push("");
canciones[1].lyrics.push("Why don't you shake some, shake somethin' for the Don?");
canciones[1].lyrics.push("Don't you break nothin', break nothin', baby girl");
canciones[1].lyrics.push("Won't you work some, work somethin' for the Don?");
canciones[1].lyrics.push("Don't you hurt nothin', hurt nothin', big girl");
canciones[1].lyrics.push("Won't you shake some, shake somethin' for the Don?");
canciones[1].lyrics.push("Don't you break nothin', break nothin', baby girl");
canciones[1].lyrics.push("Won't you work some, work somethin' for the Don?");
canciones[1].lyrics.push("Don't you hurt nothin', hurt nothin'");
canciones[1].lyrics.push("");
canciones[1].lyrics.push("");
canciones[1].lyrics.push("");
canciones[1].lyrics.push("'Cause you know me, they know me");
canciones[1].lyrics.push("You're a no-man, yeah, you know, man");
canciones[1].lyrics.push("Oh-oh-oh, na-na-na-na-na");
canciones[1].lyrics.push("Oh-oh-oh, na-na-na-na-na");
canciones[1].lyrics.push("Oh-oh-oh, na-na-na-na-na");
canciones[1].lyrics.push("Oh-oh-oh, na-na-na-na-na");

export default canciones;