window.onload = async function() {

    webgazer.params.showVideoPreview = true;
    //start the webgazer tracker
    await webgazer.setRegression('ridge') /* currently must set regression and tracker */
        //.setTracker('clmtrackr')
        .setGazeListener(function(data, clock) {
          //   console.log(data); /* data is an object containing an x and y key which are the x and y prediction coordinates (no bounds limiting) */
          //   console.log(clock); /* elapsed time in milliseconds since webgazer.begin() was called */
        }).begin();
        webgazer.showVideoPreview(true) /* shows all video previews */
            .showPredictionPoints(true) /* shows a square every 100 milliseconds where current prediction is */
            .applyKalmanFilter(true); /* Kalman Filter defaults to on. Can be toggled by user. */

    //Set up the webgazer video feedback.
    var setup = function() {

        //Set up the main canvas. The main canvas is used to calibrate the webgazer.
        var canvas = document.getElementById("plotting_canvas");
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        canvas.style.position = 'fixed';
    };
    setup();

};


function stopVideo() {
    player.stopVideo();
}

// Set to true if you want to save the data even if you reload the page.
window.saveDataAcrossSessions = true;

window.onbeforeunload = function() {
    webgazer.end();
}

/**
 * Restart the calibration process by clearing the local storage and reseting the calibration point
 */
function Restart(){
    document.getElementById("Accuracy").innerHTML = "<a>Not yet Calibrated</a>";
    webgazer.clearData();
    ClearCalibration();
    PopUpInstruction();
}

function store_points_variable(){
    webgazer.params.storingPoints = true;
  }
  
  /*
   * Sets store_points to false, so prediction points aren't
   * stored any more
   */
  function stop_storing_points_variable(){
    webgazer.params.storingPoints = false;
  }
  
  
  /*
   * This function calculates a measurement for how precise 
   * the eye tracker currently is which is displayed to the user
   */
   function calculatePrecision(past50Array) {
    var windowHeight = $(window).height();
    var windowWidth = $(window).width();
  
    // Retrieve the last 50 gaze prediction points
    var x50 = past50Array[0];
    var y50 = past50Array[1];
    
    //$target.css('left', x50[49]+ 'px');
      //  $target.css('top', y50[49] + 'px');
    // Calculate the position of the point the user is staring at
    var staringPointX = windowWidth / 2;
    var staringPointY = windowHeight / 2;
  
    var precisionPercentages = new Array(50);
    calculatePrecisionPercentages(precisionPercentages, windowHeight, x50, y50, staringPointX, staringPointY);
    var precision = calculateAverage(precisionPercentages);
  
    // Return the precision measurement as a rounded percentage
    return Math.round(precision);
  };
  
  /*
   * Calculate percentage accuracy for each prediction based on distance of
   * the prediction point from the centre point (uses the window height as
   * lower threshold 0%)
   */
  function calculatePrecisionPercentages(precisionPercentages, windowHeight, x50, y50, staringPointX, staringPointY) {
    for (x = 0; x < 50; x++) {
      // Calculate distance between each prediction and staring point
      var xDiff = staringPointX - x50[x];
      var yDiff = staringPointY - y50[x];
      var distance = Math.sqrt((xDiff * xDiff) + (yDiff * yDiff));
  
      // Calculate precision percentage
      var halfWindowHeight = windowHeight / 2;
      var precision = 0;
      if (distance <= halfWindowHeight && distance > -1) {
        precision = 100 - (distance / halfWindowHeight * 100);
      } else if (distance > halfWindowHeight) {
        precision = 0;
      } else if (distance > -1) {
        precision = 100;
      }
  
      // Store the precision
      precisionPercentages[x] = precision;
    }
  }
  
  /*
   * Calculates the average of all precision percentages calculated
   */
  function calculateAverage(precisionPercentages) {
    var precision = 0;
    for (x = 0; x < 50; x++) {
      precision += precisionPercentages[x];
    }
    precision = precision / 50;
    return precision;
  }
  /**
   * Show the Calibration Points
   */
  function ShowCalibrationPoint() {
    $(".Calibration").show();
    $("#Pt5").hide(); // initially hides the middle button
  }
  
  /**
  * This function clears the calibration buttons memory
  */
  function ClearCalibration(){
    // Clear data from WebGazer
  
    $(".Calibration").css('background-color','red');
    $(".Calibration").css('opacity',0.2);
    $(".Calibration").prop('disabled',false);
  
    CalibrationPoints = {};
    PointCalibrate = 0;
  }
  
  // sleep function because java doesn't have one, sourced from http://stackoverflow.com/questions/951021/what-is-the-javascript-version-of-sleep
  function sleep (time) {
    return new Promise((resolve) => setTimeout(resolve, time));
  }

  /**
 * Show the instruction of using calibration at the start up screen.
 */
function PopUpInstruction(){
    //ClearCanvas();
    swal({
      title:"Calibration",
      text: "Please click on each of the 9 points on the screen. You must click on each point 5 times till it goes yellow. This will calibrate your eye movements.",
      buttons:{
        cancel: false,
        confirm: true
      }
    }).then(isConfirm => {
      ShowCalibrationPoint();
    });
  
  }
  /**
    * Show the help instructions right at the start.
    */
  function helpModalShow() {
      $('#helpModal').modal('show');
  }

  function openTab(evt, name) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tab ");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none ";
    }
    /* tablinks = document.getElementsByClassName("tablinks ");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active ", " ");
    } */
    if(name != "Train")
        $(".Calibration").hide();
    else
        $(".Calibration").show();
    document.getElementById(name).style.display = "block ";
    document.getElementById(name).className += ' active '

}