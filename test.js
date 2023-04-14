

function Home() {
  

    //si une chanson déja dans les suggestions envoie un like// on puet dirigé vers le titre cherché  et suggeré le like
    
      const CLIENT_ID = "f23691598dc1491190e048505e50122d";
      const CLIENT_SECRET = "c9f9ba3556ae4eac86f56fb1823a3631";
      const tokenbis ="BQCWCvLdHJ8mXtpC_tJMSjazBExXswDAUXwWYrbSb30soof74MdNSwbdwW_7LpCdWC6gzJGrtiu6C9Ldk3hB6GDcCPajtN9voaTUkrzk--_GGPMqHvRkEDy73DGhRALjfZJ8h54qpWAlCG9D_8Zr6J9xTv7GNV2lZZ-yIp6nMvPVdSJ9O_6rhIgD2sg-s2IBL3RxHtakywjGtPRR6C-8";
    
    const SpotifyWebApi = require ('spotify-web-api-node');
    const [titre, setTitre] = useState('');
    const [token, setToken] = useState('');
    const [playlist, setPlaylist] = useState('');
    const [track, setTrack] = useState('');
    const [image, setImage] =useState('');
    const [title, setTitle] = useState('');
    const [artiste, setArtiste] = useState('');
    const [resultats, setResultats] = useState([]);
    const [party, setParty] = useState('');
    const [uri, setUri] = useState('');
    const [queue, setQueue] = useState([]);
    
    const handleSubmit = () =>  {
      search();
    setTitre(titre);
    console.log('setTitre', titre);
    }
    
    const handlePlaylist = () =>  {
    getplaylist();
    setPlaylist(playlist);
    console.log('setPlaylist', playlist);
    }
    
    const handleMAJ = () => {
      addTrack() ;
      setTrack(track);
      console.log('track', track);
    }
    
    
    /*const handleInvite = () => {
      fetch("https://accounts.spotify.com/api/token", { 
      method: 'POST',
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      body: 'grant_type=client_credentials&client_id=' + CLIENT_ID + '&client_secret='+ CLIENT_SECRET
    })
      .then(result => result.json())
      .then(data => {
        setToken(data.access_token);
          })
    }*/
    
    useEffect (() => {
      const authParameters = {
        method: 'POST',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        body: 'grant_type=client_credentials&client_id=' + CLIENT_ID + '&client_secret='+ CLIENT_SECRET
      }
      fetch("https://accounts.spotify.com/api/token",  authParameters)
      .then(result => result.json())
      .then(data => {
        setToken(data.access_token);
        
      }
       )
    }, []);
    
    console.log(token);
    
    
    
    async function search() {
      const trackParameters = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token,
        }
      }
    // pour avoir titanic en premier il faut faire un tri selon popularité de la chanson pour l'avoir en premier
     
      const track = await fetch(`https://api.spotify.com/v1/search?query=${titre}&type=track,artist&market=FR&locale=fr-FR%2Cfr%3Bq%3D0.9%2Cen-US%3Bq%3D0.8%2Cen%3Bq%3D0.7&offset=0&limit=5`, trackParameters)
      .then(response => response.json())
      .then(data => {
        
            const result = data.tracks.items;
            const tracks = result.map(item => ({
              title: item.name,
              artist: item.artists[0].name,
              url_image: item.album.images[2].url,
              uri: item.uri,
            }));
            //useState tableau vide resultats à prendre en compte
            setResultats(tracks);
            console.log('tableau résultat', tracks);
            console.log('resultats', resultats);
            })
           
            /*setResultats(data.tracks.items);
       ;
        setImage(data.tracks.items[1].album.images[2].url);
       setTitle(data.tracks.items[1].name);
      setArtiste(data.tracks.items[1].artists[0].name);
      setUri(data.tracks.items[1].uri);
      //console.log ('image', image, 'title', title, 'artiste', artiste, 'uri', uri)*/
      ;}
    
      const affichage = resultats.map((data, i) => {
        return (
          <div>
            <img src={data.url_image}></img>
            <p>Artiste :{data.artist} Chanson: {data.title}</p>
            </div>
        )})
    
    //data.tracks.items avec le tableau des 4 chansons
    //suite à ce fetch la liste proposée doit être mappée dans un pop-up
    //l'invité choisi le titre en cliquant dessus et cela envoi les infos en database
    //collection image source, URI, nom artiste et nom abum ?
    /*//setImage(data.tracks.items[1].album.images[2].url);
       // setTitle(data.tracks.items[1].name);
        setArtiste(data.tracks.items[1].artists[0].name);
        en choissisant le titre il envoi les infos via le usestate 
        
        
        */
    
    
    
    
    
    // endpoint pour avoir une playlist   https://api.spotify.com/v1/playlists/{playlist_id}
    async function getplaylist() {
    const playlistParameters = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+token,
      }}
    
      const playlistData = await fetch(`https://api.spotify.com/v1/playlists/${playlist}`, playlistParameters)
      .then(response => response.json())
      .then(data => {
       })
      }
       
    
    
    
    
    
    //revoir l'ajout de la piste/track  car l'authetification n'est pas la même c'est celle de l'authentification du début
    async function addTrack() {
      const addTrackParameters = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${tokenbis}`,
        },
        body: JSON.stringify({
          uri: 'spotify:track:1ImRLQGYsmrn3NaiKvO6pt',
        })}
    
        // c'est cette adresse API pour l'ajout du titre
        const addPlaylist = await fetch(`https://api.spotify.com/v1/me/player/queue`, addTrackParameters)
        .then(response => response.json())
        .then(data => {console.log(data);
            })
        }
    
        async function getQueue() {
          const addPlaylist = await fetch(`https://api.spotify.com/v1/me/player/queue`, 
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + tokenbis,
            }
          })
        .then(response => response.json())
        .then(data => {
          console.log(data);
          const liste = data.queue;
          const items = liste.map(item => ({
            title: item.name,
            artist: item.artists[0].name,
            url_image: item.album.images[2].url,
            uri: item.uri,
          }));
        setQueue(items);
        })}
    
    
          const lecture = queue.map((data, i) => {
            return (
              <div>
                <img src={data.url_image}></img>
                <p>Artiste :{data.artist} Chanson: {data.title}</p>
                </div>
            )})
    
    
       // pour lire en direct la lecture savoir ce qui est joué avec le début de l'entête 
        //fetch (https://api.spotify.com/v1/me/player/queue)
        //permet d'avoir le currently playing et la queue pour la liste des chansons
    /* 
    // Authorization token that must have been created previously. See : https://developer.spotify.com/documentation/web-api/concepts/authorization
    const token = 'BQBkH_6-IlGQnUsfUuT41-ReWFUSBsTcwkYPDSi1BVs3nFrpm14acfoPghV66fL4vjFx3D-xZW13JsqrkZa0iEMZTOFl4LN8V3hUPu5qnnwzQ07bQ6EYAq7J73xvV8jwhcQOBlt5wj32fHv31ATsjqgVyDYoHiK9w8LISqdG6EDNmNXfWYsU20DBKwDOFVLdYdgZilfHsi3Be_smzLIqIXB8fT7Co1yIf_G1bvOKBMRQTGywZgez26b2v4nlhUyeJZD15RbvgkRYjNpme2NrpqSJ7q1811ZPs9ymFfyrxFrKhT5oJIW_TdCeIdhL0Yx6LOUeX56FzS08PhEMVgvxxmHokg';
    async function fetchWebApi(endpoint, method, body) {
      const res = await fetch(`https://api.spotify.com/${endpoint}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        method,
        body:JSON.stringify(body)
      });
      return await res.json();
    }
    
     <text> {data?.items ? data.items.map((item) => <p>{item.name}</p>) : null} </text>
     
    
      
      
    
    */
    
    //const sendSongDB()
    
    
    function partyrandom () {
      const mots =['BadBunny','DaddyYankee','Maluma','Romeo','Adele', 'Jacquouille','LaFripouille','Jeanne','BrunoMars','Disney','Macumba','NickyMinaj','Shaki','RayCharles','Reaggeton','Jazz','RapUs','PatrickSebastien', 'DjSnake', 'Retro', 'FrenchTouch', 'Karaoke', 'DanceHall', 'Rock', 'Soul', 'Blues', 'BossaNova']
      const motAleatoire = mots[Math.floor(Math.random() * mots.length)];
      const chiffreAleatoire = Math.floor(Math.random() * 10000);
      const password = motAleatoire + chiffreAleatoire;
           console.log('password', password);
      return password;
    }
    
    
    const handlePassword = () => {
      //partyrandom();
    setParty(partyrandom());   
    console.log('party', party)
        }
       
    
     /*fetch (https://api.spotify.com/v1/me/player/queue)
        //permet d'avoir le currently playing et la queue pour la liste des chansons
    
    // Authorization token that must have been created previously. See : https://developer.spotify.com/documentation/web-api/concepts/authorization
    const tokenbis = 'BQBZ3u7b7h2Zlonr3EkL-63B3SLLLecl__KJi4vKbHOCxhx350H1N9T4mmufRVZxZKusPBWJgloCI_6Xs6BSztHEEXl6g2W5azDNLkEJ3qmFUZdHcsYMEfDjdzxILtGfmnCG6ZHnDzkMBF8v0ZwWFLML9-5_hcDzQD-Jg6lQkuqIEYe3VMvwqBu_LCToPiKhYZMF9iThGLdxa28x';
      fetch(`https://api.spotify.com/v1/me/player/queue`, {
        headers: {
          Authorization: `Bearer ${tokenbis}`,
        },
        method,
        body:JSON.stringify(body)
      })
      .then(response => response.json())
      .then(data => {
        console.log(data)});
              */
        
     async function addSong() {
      /*const addTrackParameters = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${tokenbis}`,
        },
        body: JSON.stringify({
          uri: 'spotify:track:1ImRLQGYsmrn3NaiKvO6pt',
        })}*/
    
        // c'est cette adresse API pour l'ajout du titre
        const addPlaylist = await fetch(`https://api.spotify.com/v1/me/player/queue?uri=spotify:track:0rFUSCYVLkShrzSeU1sIp8`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${tokenbis}`, 
        },
        json: true
        }
        )}
      
      
    
      return (
        <div>
          <div>
            <div>
          <button onClick={() => handlePassword()}>génére un nom de party </button>
          <text>voici le nom de ta party:{party}</text>
            </div>
          <button onClick = {() => handleInvite()}>Invite</button>
         <input placeholder="Search" onChange={(event) => setTitre(event.target.value)} value={titre}></input>
         <button onClick = {() => handleSubmit()}>Cherche moi ça !</button>
         </div>
         <div>
          <input placeholder="Playlist" onChange={(event) => setPlaylist(event.target.value)} value={playlist} ></input>
          <button onClick = {() => handlePlaylist()}> Recherche de la playlist</button>
         </div>
         <div>
         <input placeholder="Track" onChange={(event) => setTrack(event.target.value)} value={track} ></input>
          <button onClick = {() => handleMAJ()}> Ajout de Track </button>
         </div>
         <div> 
           <img src={image} alt={titre}  />
           <text> titre de la chanson : {title}; Artiste : {artiste}</text>
          </div>
          <div>
          <button onClick = {() => getQueue()}>Get Playlists</button>
          <button onClick = {() => addSong()}>ajout chanson à la queuleuleu</button>
          </div>
          <div>{affichage}</div>
          <div>{lecture}</div>
        </div>
      );
    }
    
    export default Home;


    import React, { useEffect, useState } from 'react';
import { Card, Button, Icon, ListItem, Avatar } from 'react-native-elements'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {
    ImageBackground,
    Image,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    View,  
    TouchableOpacity,
    ScrollView,
  } from 'react-native';
  import { useSelector, useDispatch } from 'react-redux';


