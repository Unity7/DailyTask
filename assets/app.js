// AS AN employee with a busy schedule
// I WANT to add important events to a daily planner
// SO THAT I can manage my time effectively

// GIVEN I am using a daily planner to create a schedule
// WHEN I open the planner
// THEN the current day is displayed at the top of the calendar
// WHEN I scroll down
// THEN I am presented with time blocks for standard business hours
// WHEN I view the time blocks for that day
// THEN each time block is color-coded to indicate whether it is in the past, present, or future
// WHEN I click into a time block
// THEN I can enter an event
// WHEN I click the save button for that time block
// THEN the text for that event is saved in local storage
// WHEN I refresh the page
// THEN the saved events persist

// ------------  Variables ------------ //
tasks = [
  { time: "hour-9", toDo: "" },
  { time: "hour-10", toDo: "" },
  { time: "hour-11", toDo: "" },
  { time: "hour-12", toDo: "" },
  { time: "hour-1", toDo: "" },
  { time: "hour-2", toDo: "" },
  { time: "hour-3", toDo: "" },
  { time: "hour-4", toDo: "" },
  { time: "hour-5", toDo: "" },
];
timeCheck = ["9", "10", "11", "12", "1", "2", "3", "4", "5"];
timeCheck2 = [
  "9:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "1:00 PM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
  "5:00 PM",
];
var textInputValue;
var taskLocation, timeIndex2, localS, currentDate, currentTime;
// ------------  Functions ------------ //

// ------- Sets the Date ------- //
currentDate = setInterval(function () {
  $("#currentDay").text(moment().format("MMMM Do YYYY, h:mm:ss A"));
}, 1000);

// ------- Table Row Handler ------- //
$("tr").on("click", ".content", function () {
  // content = $(this).children().text();
  // if (content === "" || content === undefined) {

  //create an empty textarea box
  var input = $("<input type='text' style='width: 100%;'>");
  $(this).children().replaceWith($(input));
  input.trigger("focus");
});

$("tr").on("blur", "input", function () {
  textInputValue = $(this).val();
  var blank = $("<p class='p-content'>");
  $(this).replaceWith(blank);
});

// ------  SAVE BUTTON HANDLER ------ //
$("tr").on("click", ".saveBtn", function () {
  $(this).parent().parent().find("p").text(textInputValue);
  // console.log($(this).parent().parent().find("p"));

  //finds location of the time slot
  var timeIndex = $(this)
    .parent()
    .parent()
    .children()
    .attr("class")
    .replace(" hourofDay", "");
  timeIndex2 = timeIndex;
  findArray(timeIndex2);
  // textInputValue = "";
  setLS();
});

// ------ Match with global array  ------ //
//function to find the location of the time slow and replaces textInputValue
//with its contents
function findArray(time) {
  for (var i = 0; i < tasks.length; i++) {
    if (tasks[i]["time"] === time) {
      tasks[i]["toDo"] = textInputValue;
    }
  }
}

// ------ loads the values from global variable to the schedule  ------ //
function loadSchedule() {
  for (var i = 0; i < tasks.length; i++) {
    var hour = tasks[i]["time"];
    var hourCheck = "." + hour;
    var toDo = tasks[i]["toDo"];

    selector = $(hourCheck).find(".p-content");
    selector.text(toDo);
  }
}

//sets global data to local storage data
function setLS() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

//sets local storage data to global data
function getLS() {
  if (localStorage === null || undefined) {
    return;
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));

    // console.log(localS);
  }
}

//checks to see if time block is before or after the current time
function checkTimeBlock() {
  for (var i = 0; i < tasks.length; i++) {
    if (isTimeAfter(timeCheck2[i]) === true) {
      selector = ".hour-" + timeCheck[i];
      $(selector).css({ "background-color": "grey" });
    } else if (isTimeAfter(timeCheck2[i]) === false) {
      selector = ".hour-" + timeCheck[i];
      $(selector).css({ "background-color": "green" });
    }
    // else if (isTimeAfter(timeCheck2[i]) === true) {
    //   selector = ".hour-" + timeCheck[i];
    //   $(selector).css({ "background-color": "red" });
    // }
  }
}

function isTimeAfter(time) {
  return moment().isAfter(moment(time, "h:mm A"));
}

function isTimeWithin(time) {
  return moment().subtract(moment(time, "h:mm A"));
}

getLS();
loadSchedule();
checkTimeBlock();
