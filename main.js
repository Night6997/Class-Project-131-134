img="";
stat="";
objects=[];

function preload(){

    img=loadImage("dog_cat.jpg");
    

}

function setup(){

    canvas=createCanvas(500,350);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();

    objectDetector = ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML="Object(s) are being detected";

}

function modelLoaded(){

    console.log("Model loaded");
    objectDetector.detect(video, gotResults);
    stat=true;

}

function gotResults(error,results){

    if(error){

        console.log(error);

    }
    else{

        console.log(results);
        objects=results;

    }

}

function draw(){

    image(video,0,0,500,350);
    if(stat != ""){
        r=random(255);
        g=random(255);
        b=random(255);
        objectDetector.detect(video, gotResults);
        for(i=0; i<objects.length; i++){

            document.getElementById("status").innerHTML="Object(s) detected successfully";
            document.getElementById("ObjectsDetected").innerHTML="Number of objects detected are "+objects.length;
            fill(r,g,b);
            stroke(r,g,b);
            percent=Math.floor(objects[i].confidence*100);
            text(objects[i].label+" "+percent.toFixed(0)+"%",objects[i].x+15,objects[i].y+15);
            noFill();
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);

        }

    }

}