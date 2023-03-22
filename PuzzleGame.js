let canvas = document.querySelector("canvas");
let tilesetContainer = document.querySelector(".tileset-container");
let tilesetSelection = document.querySelector(".tileset-container_selection");
let tilesetImage = document.querySelector("#tileset-source");

let selection = [0, 0]; //selectedColor

let isMouseDown = false;


function clearCanvas(){

}

//Select tile from the Tiles grid
tilesetContainer.addEventListener("mousedown", (event) => {
    selection = getCoords(event);
    tilesetSelection.style.left = selection[0] * 32 + "px";
    tilesetSelection.style.top = selection[1] * 32 + "px";
 });

//Handler for placing new tiles on the map
function addTile(mouseEvent) {
    var clicked = getCoords(event);
    var key = clicked[0] + "-" + clicked[1];
 
    if (mouseEvent.shiftKey) {
       delete layers[currentLayer][key];
    } else {
       layers[currentLayer][key] = [selection[0], selection[1]];
    }
    draw();
 }
 
 //Bind mouse events for painting (or removing) tiles on click/drag
 canvas.addEventListener("mousedown", () => {
    isMouseDown = true;
 });
 canvas.addEventListener("mouseup", () => {
    isMouseDown = false;
 });
 canvas.addEventListener("mouseleave", () => {
    isMouseDown = false;
 });
 canvas.addEventListener("mousedown", addTile);
 canvas.addEventListener("mousemove", (event) => {
    if (isMouseDown) {
       addTile(event);
    }
 });
 
//Utility for getting coordinates of mouse click
function getCoords(e) {
    const { x, y } = e.target.getBoundingClientRect();
    const mouseX = e.clientX - x;
    const mouseY = e.clientY - y;
    return [Math.floor(mouseX / 32), Math.floor(mouseY / 32)];
 }
 
 //converts data to image:data string and pipes into new browser tab
 function exportImage() {
    var data = canvas.toDataURL();
    var image = new Image();
    image.src = data;
 
    var w = window.open("");
    w.document.write(image.outerHTML);
 }

function draw() {
    let ctx = canvas.getContext("2d");
    ctx.clearRect(0,0,canvas.width,canvas.height);

    let sizeDiamond = 32;

    ctx.drawImage(
        colorsMenus,
        tilesheetX * 32,
        tilesheetY * 32,
        sizeDiamond,sizeDiamond,
        positionX * 32,
        positionY * 32,
        sizeDiamond,sizeDiamond
     );
}

colorsMenus.onload = function(){
    //init
    draw();
}
colorsMenus.src = "ColorsMenus.jpg"; //pixelArt.jpg