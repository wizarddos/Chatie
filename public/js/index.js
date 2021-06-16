const form  = document.getElementById('send');
const content = document.getElementById('message');
const appWindow = document.getElementById('window');
let sended = 1;
let seen = 1;
let lastMessage = "";
const messages = [
     {
          "id": 2,
          "content":"Jak masz na imię",

     },
];


window.addEventListener('load', ()=>{
     showMessage("hej", "Chatie:");
},false);

form.addEventListener('submit', (e)=>{
     e.preventDefault();
     const text = content.value;
     showMessage(text, "Ty:");
     sended= sended+1;
     lastMessage = text;
     setTimeout(botSendMessage, 500);

     
}, false)


function newMessage(){
     if(sended == 2){
          return messages[0].content;
     }else if (sended == 3){
          $.get("../../hidden/scripts/get.php",{data: lastMessage}, (data)=>{
               var names = JSON.parse(data);
               if(names.name == lastMessage){
                    showMessage("Już spotkałem kogoś z takim imieniem jak ty", "Chatie:");   
               }else{
                    showMessage("Masz na Imię "+lastMessage+" jescze nigdy nie spotkałem kogoś z takim imieniem", "Chatie:"); 
                    $.post("../../hidden/scripts/post.php", { name: names[names.indexOf(lastMessage)]});
     
               }
          })
         
          
     }
}

function showMessage(text, who){
     appWindow.innerHTML = appWindow.innerHTML+"<br/><span class = \"who\">"+who+"</span><p class = \"content\">"+text+"</p>";
}

function botSendMessage(){
     let message = newMessage();
     showMessage(message, "Chatie:");
}
