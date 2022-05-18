let wid
let hght
let colms
let rows
let musicArray=[];
let myblocks = [];
const nmbr=40; 
let playbckRte = [];
let soundnmbr=40;                 


function preload() { 
  for(let m=0;m<nmbr;m++){
    musicArray.push(loadSound(`${m+1}.wav`));
    playbckRte.push(random(0.5, 2));                 //function to load sounds
  }

 
  
}


function setup() {
  createCanvas(windowWidth, windowHeight);
  colms = 5;
  rows = 8;
  wid = width / colms;
  hght = height / rows;
  
  drawGrid();
  
}                                                     //drawing a canvas with 5 columns and 8 rows

class Pad {
 constructor(sound, x, y, wid, hght, rate){
   this.s = sound;
   this.x = x;
   this.y = y;
   this.wid = wid;
   this.hght = hght;
   this.active = false;
   this.color = 230;                                                        //color of pad after you press it, you can change it from here
   this.activeColor = color(random(135), random(135), random(135));           
   this.s.rate(rate);
   this.amp = new p5.Amplitude();
   this.amp.setInput(this.s);
   
 }                                                           //class for creating objects
 update(){
   noStroke();
   fill(this.color);
   rect(this.x, this.y, this.wid, this.hght);
   
   
   let lvl = this.amp.getLevel();
   let volum = map(lvl, 0, 1, 10, 50);
   push();
   noStroke();
   fill(0);                                   // color of the circle inside the pad, you can change it from here
   ellipse(this.x+this.wid/2, this.y+this.hght/2, volum, volum);
   pop();
 }
 clicked(){
     if (mouseX > this.x  && mouseX <= this.x + this.wid && 
         mouseY > this.y  && mouseY <= this.y+this.hght) {
        this.active = !this.active;
        if(this.active){
          this.s.loop();
          this.color = this.activeColor;
        }else{
          this.s.stop();
          this.color = 255; 
        }
     }
 }
}


function drawGrid(){
  let index = 0;
  for (let i = 0; i < colms; i++) {
    for (let j = 0; j < rows; j++) {   
      myblocks.push(new Pad(musicArray[index], i * wid, j * hght, wid, hght, playbckRte[index]));
                
      index++;
    }
  }  
}            //function for plying music


function draw() {

  for (let i = 0; i < myblocks.length; i++) {
    myblocks[i].update();
  }
     
}      //drawing pads

function mousePressed(){
  for (let i = 0; i < myblocks.length; i++) {
    myblocks[i].clicked();
  }
  
}                      //when you press a mouse this funstion executes
  
