var i = 0;
 function move() {
  if (i == 0) {
    i = 1;
    var elem = document.getElementById("myBar");
    var width = 1;
    var id = setInterval(frame, 10);
    function frame() {
      if (width >= 100) {
        clearInterval(id);
        i = 0;
      } else {
        width++;
        elem.style.width = width + "%";
      }
    }
  }
}
window.onload = move;	
 //setTimeout("window.open('C:/Users/beaut/Desktop/html/Final_Project/Meniu_principal.html')",1000);
 setTimeout("window.open('Meniu_principal.html')",1000);