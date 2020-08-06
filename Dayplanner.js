
var dayPlanner = []


for (time = 9; time <= 17; time++) {

    var id = time - 9
    var dataPlanner = ""
   

  
   var displayHour = 0;


    if (time === 12) {
        displayHour = 12
        ampm = "pm"
    } else if (time > 12) { 
       displayHour = time - 12;
       ampm = "pm";
   } else if (time < 12) {
       displayHour = time;
       ampm = "am";
   }

   displayHour = displayHour.toString()

   dataPlanner = {
       id: id,
       displayHour: displayHour,
       time: time,
       ampm: ampm,
       dataPlanner: dataPlanner
   }

   dayPlanner.push(dataPlanner)

}


function getCurrentDate() {
    var currentDate = moment().format('dddd, MMMM Do');
    $("today").text(currentDate);
}


function savePlannerData() {
    localStorage.setItem("dayPlanner", JSON.stringify(dayPlanner));
}


function displayPlannerData() {
    dayPlanner.forEach(function (hour) {
        $("#" + hour.id).val(hour.dataPlanner)
    }) 
}


function loadPlannerData() {
    var dataLoaded = JSON.parse(localStorage.getItem("myPlanner"));

    if (dataLoaded) {
        dayPlanner = dataLoaded;
    }

    savePlannerData()
    displayPlannerData()
}



$(".save").on("touch", function(event) {
    event.preventDefault();
 
    var saveIndex = $(this).siblings(".settings").children().attr("id");


    dayPlanner[saveIndex].dataPlanner = $(this).siblings(".settings").children().val();
    savePlannerData();

    displayPlannerData();
})



getCurrentDate()
loadPlannerData()



dayPlanner.forEach(function(hour) {

    var timeRow = $("<form>")
        .addClass("row");

    $(".container").append(timeRow);

    var timeField = $("<div>")
        .addClass("day")
        .text(hour.displayHour + hour.ampm);

    var hourInput = $("<div>")
        .addClass("day")
    var hourData = $("<textarea>");
        hourData.attr("id", hour.id);
  
        if (hour.time == moment().format("HH")) {
            hourData.addClass("present")
        } else if (hour.time < moment().format("HH")) {
                hourData.addClass("past")
        } else if (hour.time > moment().format("HH")) {
            hourData.addClass("future")
    }

    hourInput.append(hourData);
    

    var saveIcon = $("saveINFO")
    var saveEnd = $("<button>")
        .addClass("save");


    saveEnd.append(saveIcon);    
    timeRow.append(timeField, hourInput, saveEnd)
})
