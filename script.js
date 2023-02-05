
Chandru
Attachments
14:57 (0 minutes ago)
to me

const canvas = document.querySelector("canvas"),
toolBtns = document.querySelectorAll(".tool"),
clearCanvas = document.querySelector(".clear-canvas"),
saveImg = document.querySelector(".save-img"),
ctx = canvas.getContext("2d");

let prevMouseX, prevMouseY,snapshot,
isDrawing = false,
selectedTool = "brush";

const setCanvasBackground = () =>{
ctx.fillStyle ="#fff";
ctx.fillRect(0, 0, canvas.width, canvas.height);

}

window.addEventListener("load",()=>{
canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;
});

const drawRect = (e) =>{
ctx.strokeRect(e.offsetX, e.offsetY,prevMouseX-e.offsetX,prevMouseY-e.offsetY);
}
const drawCircle = (e) =>{
ctx.beginPath();
let radius = Math.sqrt(Math.pow((prevMouseX -e.offsetX),2)+Math.pow((prevMouseY -e.offsetY),2));
ctx.arc(prevMouseX,prevMouseY, radius, 0, 2 * Math.PI);
ctx.stroke();
}
const drawtriangle = (e) =>{
ctx.beginPath();
ctx.moveTo(prevMouseX ,prevMouseY);
ctx.lineTo(e.offsetX, e.offsetY);
ctx.lineTo(prevMouseX * 2 - e.offsetX,e.offsetY);

ctx.closePath();
ctx.stroke();
}
const drawSquare = (e) =>{
ctx.strokeRect(e.offsetX, e.offsetY,prevMouseX-e.offsetX,prevMouseY-e.offsetY);
}
const drawroundRect = (e) =>{
ctx.strokeStyle ='blue';
ctx.beginPath();
ctx.roundRect(10, 20, 150, 100, [4]);
ctx.stroke();
}
const drawEllipse = (e) =>{
ctx.save();
        ctx.beginPath();

        ctx.translate(prevMouseX-e.offsetX ,  prevMouseY - e.offsetY );
        ctx.scale(e.offsetX, e.offsetY);
        ctx.arc(1, 1, 1, 0, 2 * Math.PI, false);

        ctx.restore();
        ctx.stroke();
}

const drawDiamond = (e) =>{
ctx.beginPath();
ctx.moveTo(prevMouseX, prevMouseY);
ctx.lineTo(prevMouseX- e.offsetX /2, prevMouseY + e.offsetY /2);
ctx.lineTo(prevMouseX,prevMouseY+e.offsetY);

ctx.lineTo(prevMouseX+e.offsetX/2, prevMouseY+e.offsetY/2);
ctx.closePath();
ctx.restore();
ctx.stroke();

}

const drawUpArrow = (e) =>{
ctx.beginPath();
ctx.moveTo(prevMouseX, prevMouseY);
ctx.lineTo(e.offsetX, e.offsetY);
ctx.stroke();

}

const drawDownArrow = (e) =>{
ctx.beginPath();
ctx.moveTo(prevMouseX, prevMouseY);
ctx.lineTo(e.offsetX, e.offsetY);
ctx.stroke();
}
const drawLeftArrow = (e) =>{
ctx.beginPath();
ctx.moveTo(prevMouseX, prevMouseY);
ctx.lineTo(e.offsetX, e.offsetY);
ctx.stroke();
}
const drawRightArrow = (e) =>{
ctx.beginPath();
ctx.moveTo(prevMouseX, prevMouseY);
ctx.lineTo(e.offsetX, e.offsetY);
ctx.stroke();
}
const drawDiagonalArrow = (e) =>{
ctx.beginPath();
ctx.moveTo(prevMouseX, prevMouseY);
ctx.lineTo(e.offsetX, e.offsetY);
ctx.stroke();
}

const startDraw =(e) =>{
  isDrawing = true;
prevMouseX =e.offsetX;
prevMouseY =e.offsetY;
  ctx.beginPath();
  snapshot = ctx.getImageData(0, 0, canvas.width, canvas.height);
 }



const drawing= (e)=>{
if(!isDrawing) return;
ctx.putImageData(snapshot, 0, 0);
if(selectedTool==="brush"){
ctx.lineTo(e.offsetX, e.offsetY);
ctx.stroke();
}
else if(selectedTool==="rectangle"){
drawRect(e);
}
else if(selectedTool==="circle"){
drawCircle(e);
}
else if(selectedTool==="triangle"){
drawtriangle(e);
}
else if(selectedTool==="square"){
drawSquare(e);
}
else if(selectedTool==="curved rectangle"){
drawroundRect(e);
}
else if(selectedTool==="oval"){
drawEllipse(e);
}
else if(selectedTool==="diamond"){
drawDiamond(e);
}
else if(selectedTool==="uparrow"){
drawUpArrow(e);
}
else if(selectedTool==="downarrow"){
drawDownArrow(e);
}
else if(selectedTool==="leftarrow"){
drawLeftArrow(e);
}
else if(selectedTool==="rightarrow"){
drawRightArrow(e);
}
else if(selectedTool==="diagonalarrow"){
drawDiagonalArrow(e);
}
}

toolBtns.forEach(btn => {
    btn.addEventListener("click", () => {
    for(var i = 0;i<btn.length;i++){
    btn[i].addEventListener("click",function(){
    var current=document.getElementByClassName("active");
    if(current.length>0){
    current[0].className.replace(" active", "");
    }
    this.className+=" active";
    });
    }
    selectedTool=btn.id;
    console.log(selectedTool);
    });
});

clearCanvas.addEventListener("click",() =>{
ctx.clearRect(0, 0, canvas.width, canvas.height);
setCanvasBackground()
});

saveImg.addEventListener("click", ()=>{
const link=document.createElement("a");
link.download =`${Date.now()}.jpg`; ;
link.href = canvas.toDataURL();
link.click();
});


canvas.addEventListener("mousedown",startDraw);
canvas.addEventListener("mousemove",drawing);
canvas.addEventListener("mouseup",() => isDrawing = false);
