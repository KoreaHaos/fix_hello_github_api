// These number are used to setup the initial placement of the object.
var xRotInitial = 0;
var yRotInitial = 180;
var zRotInitial = 0;

// These variable are the degrees per update of the animation.
var xRotAdjust = 0;
var yRotAdjust = 1;
var zRotAdjust = 0;

// These variable are used to let the user know to click.
var rotationCount = 0.0;
var displayedFirstWord = false;
var displayedFinalWords = false;

// As it says, higher numbers rotate the object slower.
var rotationLag = 10;

show_viewer(xRotInitial, yRotInitial, zRotInitial);

/*
function loadImage(img_to_load){
    
    var img = new Image();
    
    $(img).load(function(){
    
      $('.the_top_left_corner').append($(this));
    
    }).attr({
    
      src: '../img/GitCatsMashUp.png'
    
    }).error(function(){
      //do something if image cannot load
    });
}
*/

function displayPartOneOfMessageToUser() {
    console.log("First Bit!");
    var imgPath = "../img/click.gif";
    loadImage(imgPath);
    
    
    displayedFirstWord = true;
}

function displayPartTwoOfMessageToUser() {
    console.log("Second Bit!");
    var imgPath = "../img/asYouPlease.gif";
    loadImage(imgPath);
    displayedFinalWords = true;

}

function loadImage(path_to_image_to_place_on_dom) {
    
    var img = new Image();
    
    $(img).load(function(){
    
      $('.overlayed_message').append($(this));
        console.log("First Bit! ajaxed" + this);
    }).attr({
    
      src: path_to_image_to_place_on_dom
    
    }).error(function(){
      //do something if image cannot load
    });    
    
}


function show_viewer(xRotIn, yRotIn, zRotIn) {

    // Get the canvas from The Don
    var cvs = document.getElementById('object_canvas');


    cvs.width = window.innerWidth;
    cvs.height = window.innerHeight;

    var viewer = new JSC3D.Viewer(cvs);

    viewer.setParameter('SceneUrl', '../obj/git_hub_logo.obj');

    viewer.setParameter('InitRotationX', xRotIn);
    viewer.setParameter('InitRotationY', yRotIn);
    viewer.setParameter('InitRotationZ', zRotIn);

    viewer.setParameter('ModelColor', '#1a1a1a');

    viewer.setBackgroudImageFromUrl('../img/GitCatsMashUp.png');

    viewer.setParameter('RenderMode', 'texturesmooth');

    viewer.init();

    // This bit takes care of the aniumation.

    setInterval(function() {
        viewer.rotate(xRotAdjust, yRotAdjust, zRotAdjust);
        viewer.update();
        // ToDo put this into a switch...
        if (!displayedFinalWords) {
            rotationCount += 1;
        }
        if (rotationCount > 360 && !displayedFirstWord) {
            displayPartOneOfMessageToUser();
        }
        if (rotationCount > 720 && displayedFirstWord && !displayedFinalWords) {
            displayPartTwoOfMessageToUser();
        }
        else if (rotationCount % 45 == 0) {
            console.log("degrees rotated = " + rotationCount);
        }
    }, rotationLag);
}

// That's it!

// Source : i'm sure i script-kiddied this at some level, but i lost the source, google 'JSC3D' and the method you are interested in and you'll find what you need.
