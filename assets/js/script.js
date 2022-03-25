// Find elements on page
const currentDayEl = $("#currentDay");
const containerEl = $(".container");
const buttonEl = $("button"); // We might have an issue declaring this here as the button has yet to be created.

// Declare variables
var workDayStart = "09:00";
var workDayEnd = "17:00";
var hoursInWorkDay = 0;
var currentDay = 0; // Construct with moment.js

/**
 * Function to build the page with the following components
 * -- Add current date to header
 * -- Dynamically build the day planner defaulting to 9am to 5pm time blocks.
 * As the page will be dynamically built, an extended working day could be parameterized.
 */
function buildSchedulerPage() {
    // Create an array of hours based upon workday start & end times
    timeArrays = convertTime();

    // Loop over each hour and add insert each hour as an element under the container
    for (let i = 0; i < timeArrays.workDay12HourTime.length; i++) {
        const hour = timeArrays.workDay12HourTime[i];
        // Create four elements for each row (hour in the work day)
        const hourContainerA = $("<div>");
        const hourContainerA1 = $("<div>").text(hour);
        const hourContainerA2 = $("<textarea>");
        const hourContainerA3 = $("<button>").text("Save");

        // Nest elements in each hourly container
        containerEl.append(hourContainerA);
        hourContainerA.append(hourContainerA1);
        hourContainerA.append(hourContainerA2);
        hourContainerA.append(hourContainerA3);

    }

    console.log("Schedule Page built");
}

/**
 * Converts from military time to 12-hour clock
 * @param {}
 * @returns
 */
function convertTime() {
    // Create object to hold the time arrays
    const timeArrays = {
        workDay12HourTime: [],
        workDayMilitaryTime: [],
    };

    // Create the time arrays by looping over a range of numbers defined by the workday start and end time.
    for (
        let i = parseInt(workDayStart.split(":")[0]);
        i <= parseInt(workDayEnd.split(":"[0]));
        i++
    ) {
        // Load up the military time array
        timeArrays.workDayMilitaryTime.push(i);

        // Load up the 12-hour time array
        if (i < 12) {
            timeArrays.workDay12HourTime.push(i + " am");
        } else if (i > 12) {
            timeArrays.workDay12HourTime.push(i - 12 + " pm");
        } else {
            timeArrays.workDay12HourTime.push(12 + " pm");
        }
    }

    // Return time arrays
    return timeArrays;
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
