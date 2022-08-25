Webcam.set({
    height:300,
    width:350,
    image_format:'png',
    png_quality:100
});

camera = document.getElementById("camera");
Webcam.attach('#camera');

function snapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = '<img id="captured_image" src="' + data_uri + '"/>';
    });
}

console.log("ml5 version:", ml5.version);
classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/eZG3LV8CH/model.json', Model_Loaded);

function Model_Loaded(){
    console.log("Model_Loaded");
}

function check(){
    img = document.getElementById("captured_image");
    document.getElementById("loading").src="Loading_2.gif";
    classifier.classify(img, gotResult);
}   

function gotResult(error, results){
if(error){
    console.log("error");
}
else{
    console.log(results);
     setTimeout(function(){
        document.getElementById("loading").src="";
     }, 500);
    document.getElementById("result_object_name").innerHTML = results[0].label;
    var hd = results[0].confidence.toFixed(3)*100;
    document.getElementById("result_object_accuracy").innerHTML = hd + "%";
    
}
}
