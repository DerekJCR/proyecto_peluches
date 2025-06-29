//***HERNÁNDEZ TORRES CARLOS ADRIÁN**4CV1**17/06/2024***
function ajax(){
    var req = new XMLHttpRequest();
    req.onreadystatechange = function(){
        if (req.readyState == 4 && req.status == 200){
            var chat = document.getElementById('chat');
            var shouldScroll = chat.scrollTop + chat.clientHeight === chat.scrollHeight;
            chat.innerHTML = req.responseText;
            if (shouldScroll) {
                chat.scrollTop = chat.scrollHeight;
            }
        }
    }
    req.open('GET', 'chat.php', true);
    req.send();
}

function enviarMensaje(event){
    event.preventDefault();
    var mensaje = document.querySelector('textarea[name="mensaje"]').value;
    if (mensaje.trim() === '') return;
    var req = new XMLHttpRequest();
    req.onreadystatechange = function() {
        if (req.readyState == 4 && req.status == 200) {
            document.querySelector('textarea[name="mensaje"]').value = '';
            ajax(); // Actualiza el chat
            var audio = new Audio('sounds/beep.mp3');
            audio.play();
        }
    }
    req.open('POST', 'enviarMensaje.php', true);
    req.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    req.send('mensaje=' + encodeURIComponent(mensaje));
}

function detectarEnter(event) {
    if (event.key === 'Enter' && !event.shiftKey) {
        enviarMensaje(event);
    }
}

setInterval(function(){ajax();}, 1000);
//***Realizado por HTCA***