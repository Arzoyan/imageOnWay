var rect = appCanvas.getBoundingClientRect();
var ctx = document.getElementById("appCanvas").getContext("2d");
var img = document.getElementById("photo");
var pointSize = 3;
var canvasWidth = appCanvas.width;
var canvasHeight = appCanvas.height;
const imgWidth = 150;
const imgHeight = 150;
const squareColor = "#ff2626";
let move = false;


document.getElementById("appCanvas").addEventListener('click', e => {
    document.getElementById("appCanvas").addEventListener('mousemove', e => {
        if (move === true) {
            x = e.clientX - rect.left;
            y = e.clientY - rect.top;
            intermediateCoordinate(x, y);
        }
    });
});

function intermediateCoordinate(x, y) {
    let coordinate = findNearbyCoordinates({x, y}, points);
    drawImgOnCoordinates(coordinate.x, coordinate.y)
}

// last coordinate mouse
document.getElementById("appCanvas").addEventListener('mouseup', e => {
    if (move === true) {
        x = e.clientX - rect.left;
        y = e.clientY - rect.top;
        intermediateCoordinate(x, y);
        x = 0;
        y = 0;
        move = false;
    }
});

// draw image on coordinates
function drawImgOnCoordinates(x, y) {
    ctx.clearRect(0, 0, appCanvas.width, appCanvas.height);
    drawWay(points);
    ctx.drawImage(img, x - Math.floor(imgWidth / 2), y - Math.floor(imgHeight / 2), imgWidth, imgHeight);
    ctx.fillStyle = squareColor; // Red color
    ctx.beginPath();
    ctx.arc(x, y, pointSize, 0, Math.PI * 2, true);
}

// start move image coordinate mouse
document.getElementById("appCanvas").addEventListener('mousedown', e => {
    x = e.clientX - rect.left;
    y = e.clientY - rect.top;
    move = true;
});

// draw all Coordinates
function drawWay(points) {
    for (let i = 0; i < points.length; i++) {
        ctx.fillStyle = squareColor; // Red color
        ctx.beginPath();
        ctx.arc(points[i]['x'], points[i]['y'], pointSize, 0, Math.PI * 2, true);
        ctx.fill();
    }
}

//find Nearby Coordinates
function findNearbyCoordinates(coordinates, points) {
    let arrayOfDistances = [];
    let minIndex;
    for (let i = 0; i < points.length; i++) {

        if (points[i]["x"] > canvasWidth && points[i]['y'] > canvasHeight) {
            arrayOfDistances.push(null);
        } else {
            arrayOfDistances.push(Math.sqrt(Math.pow(coordinates.x - points[i]["x"], 2) + Math.pow(coordinates.y - points[i]["y"], 2)));
        }
    }
    let min = arrayOfDistances[0];

    for (let i = 0; i < arrayOfDistances.length; i++) {

        if (arrayOfDistances[i] && arrayOfDistances[i] < min) {
            min = arrayOfDistances[i];
            minIndex = i;
        }
    }

    return points[minIndex]
}

drawWay(points);
drawImgOnCoordinates(Math.floor(imgWidth / 2), Math.floor(imgHeight / 2));