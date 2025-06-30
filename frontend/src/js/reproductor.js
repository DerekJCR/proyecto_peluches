//***HERNÁNDEZ TORRES CARLOS ADRIÁN**4CV1**17/06/2024***
var volumen = document.getElementById("reproductor");
volumen.volume = 0.1;

function cambiarTrack(track) {
   var value =  track.getAttribute("value");
   viejo_audio = document.getElementById("reproductor");
   audio_padre = viejo_audio.parentNode;
   audio_padre.removeChild(viejo_audio);
   nuevo_audio = document.createElement("audio");
   nuevo_audio.setAttribute("id","reproductor");
   nuevo_audio.setAttribute("controls", "controls");
   nuevo_audio.setAttribute("autoplay", "autoplay");
   nuevo_audio.volume = 0.1;
   source = document.createElement("source");
   source.setAttribute("src", value);
   source.setAttribute("type", "audio/mpeg");
   source.setAttribute("id", "reproductorSource");
   nuevo_audio.appendChild(source);
   audio_padre.appendChild(nuevo_audio)
}
function cargarReproductor() {
   var select = document.getElementById("selectTrack");
   var value = select.options[0].getAttribute("value");
   nuevo_audio = document.createElement("audio");
   nuevo_audio.setAttribute("id","reproductor");
   nuevo_audio.setAttribute("controls", "controls");
   nuevo_audio.setAttribute("autoplay", "autoplay");
   nuevo_audio.volume = 0.1;      
   source = document.createElement("source");
   source.setAttribute("src", value);
   source.setAttribute("type", "audio/mpeg");
   source.setAttribute("id", "reproductorSource");
   nuevo_audio.appendChild(source);
   padre = document.getElementById("reproductorBox");
   padre.appendChild(nuevo_audio);
}
//***Realizado por HTCA***