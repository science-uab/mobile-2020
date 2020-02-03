class model {
  canvas ;
  ctx ;
  onload ;
  numara ;
  panaLa ;

  constructor() {
    this.canvas = document.getElementById('id_canvas');
    this.ctx = this.canvas.getContext('2d');
    this.numara = 0;
    this.panaLa = Math.floor(Math.random() * 10) + 1;
    this.onload = setInterval(this.randomize.bind(this), 500);
  }

  randomize(){
    var rr = 10;
    var rx = Math.ceil(290* Math.random());
    var ry = Math.ceil(290* Math.random());

    if(this.numara++ >= this.panaLa) {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      clearInterval(this.onload);
    }
    else
      this.drawCircle(rx,ry,rr);
  }

   drawCircle(rx,ry,rr){
    var myColors  = ["purple","red"];
    var colorPicker = Math.ceil(4* Math.random() -1);
    this.ctx.strokeStyle = myColors[colorPicker];
    this.ctx.beginPath();
    this.ctx.arc(rx,ry,rr,0,2*Math.PI);
    this.ctx.stroke();
    this.ctx.closePath();
  }

   verifica(){
    var numar = document.getElementById('cercuri').value;

    if(numar == this.panaLa)
      alert("Corect!");
    else {
      window.navigator.vibrate(200);
      alert("Incorect!");
    }
   }
}
