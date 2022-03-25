// Find elements on page
const currentDayEl = $("#currentDay");
const containerEl = $(".container");
const buttonEl = $("button"); // We might have an issue declaring this here as the button has yet to be created.

// Declare variables
var workDayStart = "09:00";
var workDayEnd = "17:00";
var workDayMilitaryTime = [];
var workDay12HourTime = [];
var hoursInWorkDay = 0;
var currentDay = 0; // Construct with moment.js

/**
 * Function to build the page with the following components
 * -- Add current date to header
 * -- Dynamically build the day planner defaulting to 9am to 5pm time blocks.
 * As the page will be dynamically built, an extended working day could be parameterized.
 */
function buildSchedulerPage() {
    // Create an array of hours based upon workday start & end
    workDay = [];
    convertTime();

    // Loop over each hour

    // Add hourly time block elements to page as rows

    // To each row add the hour text
    // To each row add text area block element to the current hour
    // To each Add save button to the current hour

    console.log("Schedule Page built");
}

/**
 * Converts from military time to 12-hour clock
 * @param {} time
 * @returns
 */
function convertTime(time) {
    for (
        let i = parseInt(workDayStart.split(":")[0]);
        i <= parseInt(workDayEnd.split(":"[0]));
        i++
    ) {
        // Load up the military time array
        workDayMilitaryTime.push(i);

        // Load up the 12 hour time array
        if (i < 12) {
            workDay12HourTime.push(i + " am");
        } else if (i > 12) {
            workDay12HourTime.push(i-12 + " pm");
        } else {
            workDay12HourTime.push(12 + " pm");
        }
            
    }

    // TODO Add methods to return the respective arrays

    console.log(workDayMilitaryTime);
    console.log(workDay12HourTime);

    //return convertedTime;
}

/**
 * Function to refresh the current date and time to be displayed in the header
 */
setInterval(function () {
    currentDayEl.text(moment().format("MMM Do, YYYY - h:mm:ss a"));
}, 1000);

/**
 * Load current schedule from local storage
 */
function loadSchedule() {
    console.log("Schedule page loaded");
}

/**
 * Function to color code the time block for past, present, and future based on the current time
 */
function colorCodeSchedule() {
    // setInterval(function () {
    //     console.log("Automated color coding initiated");
    // }
    // )
    console.log("Schedule color coded");
}

/**
 * Function (CLICK) to respond to a click event in a particular time and save to local storage the text that was entered.
 */
buttonEl.on("click", function () {
    console.log("Save text in a time block to local storage");
});

/**
 * Initialization function
 */
function init() {
    buildSchedulerPage();

    // Kickoff automated schedule color
    colorCodeSchedule();

    loadSchedule();
}

// Run initialization
init();
