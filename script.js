objects = [];
let status = "";
let statusDetector = document.querySelector('.status').innerHTML;
song = "";



    function setup() {
        canvas = createCanvas(380, 380);
        canvas.center();
            video = createCapture(VIDEO);
            video.size(380, 380);
            video.hide();
    }

        function preload() {
            song = loadSound("alarm.mp3");
        }

            function detectBaby() {
                objectDetector = ml5.objectDetector('cocossd', modelLoaded);
                document.querySelector('.status').innerHTML = "Status : Detecting Objects";
                console.log("Detecting starting");
            }

                    function modelLoaded() {
                        console.log("Model Loaded!");
                        status = true;
                    }

                function gotResult(error, results) {
                    if(error) {
                        console.error(error);
                    }
                        else {
                            console.log(results);
                            objects = results;
                        }
                    }

                    function draw() {
                            image(video, 0, 0, 380, 380);
                        if(status != "") {

                                r = random(250);
                                g = random(250);
                                b = random(250);

                                objectDetector.detect(video, gotResult);
                            for(i = 0; i < objects.length; i++) {
                            document.querySelector(".status").innerHTML = "Status: Detecting Objects";

                            if(objects[i].label == "person") {
                                console.log("Person Detected!");
                                document.querySelector(".status").innerHTML = "Person/Baby Detected!";
                            }
                                else {
                                    song.play();
                                }
                                fill(r,g,b);
                                percent = floor(objects[i].confidence*100);
                                text(objects[i].label + " " + percent + "%", objects[i].x, objects[i].y);
                                noFill();
                                stroke(r,g,b);
                                rect(objects[i].x, objects[i].y, objects[i].width + 15, objects[i].height + 15);

                                if(objects.length == 0) {
                                    song.play();
                                    // document.querySelector('#audio').play();
                                }
 
                            }
                        }
                    }