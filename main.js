objects = [];
status_object = "";
input = "";

function preload() {

}
function setup() {
    canvas = createCanvas(480, 380);
    canvas.center();

    video = createCapture(VIDEO);
    video.size(480, 380);
    video.hide();
}
function draw() {
    image(video, 0, 0, 480, 380);
    if (status_object != "" ) 
    {
        for(i = 0; i < objects.length; i++)
        {
            document.getElementById("status").innerHTML = "Status : Object Detected";
            fill("#FF0000");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x, objects[i].y);
            noFill();
            stroke("#FF0000");
            rect(objects[i].x, objects[i].y,objects[i].width, objects[i].height);
            if (objects[i].label == input) 
            {
                video.stop();
                objectDetector.detect(gotResult);
                document.getElementById("detected_object").innerHTML = input + "Found"; 
                synth = window.speechSynthesis;
                utterThis = new SpeechSynthesisUtterance(input + "found");
                synth.speak(utterThis);                       
            }else{
                document.getElementById("detected_object").innerHTML = input + "Not Found";
            }
        }      
    }
}
function start() {
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
    input = document.getElementById("input").value;
}
function modelLoaded() {
    console.log("Model Loaded!");
    status_object = true;
}
function gotResult(error, results) {
    if (error) {
        console.log(error);        
    }
    console.log(results);
    objects = results;
}