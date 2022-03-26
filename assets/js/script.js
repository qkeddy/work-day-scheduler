// Find elements on page
const currentDayEl = $("#currentDay");
const containerEl = $(".container");

// Declare variables
var workDayStart = "07:00";
var workDayEnd = "17:00";
var hoursInWorkDay = 0;
var currentDay = 0; // Construct with moment.js


/**
 * Function to refresh the current date and time to be displayed in the header
 */
function displayTime() {
    var rightNow = moment().format("MMM Do, YYYY - h:mm:ss a");
    currentDayEl.text(rightNow);
}


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
        const hoursStandard = timeArrays.workDay12HourTime[i];
        const hoursMilitary = timeArrays.workDayMilitaryTime[i];
        // Create four elements for each row (hour in the work day) and add classes for visual styling as well as attribute ID to find the text in a particular hour.
        const hourRowContainerEl = $("<div>")
            .attr("id", hoursMilitary)
            .addClass("row");
        const hourEl = $("<div>").addClass("col-1 hour").text(hoursStandard);
        const textInputEl = $("<textarea>")
            .addClass("col-10 textarea past description")
            .val(`Text Value ${i + 1}`);
        const saveEl = $("<button>").addClass(
            "col-1 saveBtn i:hover fas fa-save"
        );

        // Nest elements in each hourly container and build out
        containerEl.append(hourRowContainerEl);
        hourRowContainerEl.append(hourEl, textInputEl, saveEl);
    }

    console.log("Schedule Page built");

    // TODO REMOVE - loading some dummy data
    // const textInputEl = $(".textarea");

    // for (let i = 0; i < timeArrays.workDay12HourTime.length; i++) {
    //     console.log(textInputEl[i].value);
    // }

}

/**
 * Converts from military time to 12-hour clock
 * @param {}
 * @returns
 */
function convertTime() {
    // TODO - Look into changing this to moment.js - this can be replaced with a few lines of code.
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
 * Initialization function
 */
function init() {
    // Update time in header
    setInterval(displayTime, 1000);

    // Build schedule based upon settings
    buildSchedulerPage();

    // Kickoff automated schedule color
    colorCodeSchedule();

    // Load any existing schedules from local storage
    loadSchedule();
}

// Run initialization

// Display time as soon as the page loads
displayTime();

// Run init routine
init();


/**
 * Function (CLICK) to respond to a click event in a particular time row and then 
 * save to local storage the text that was entered. The variable buttonEl needs to 
 * be initialized after the page is built.
 */
const buttonEl = $("button");

buttonEl.on("click", function (event) {
    event.preventDefault();

    // Create an array of hours based upon workday start & end times
    timeArrays = convertTime();

    // Isolate each input areas
    const textInputEl = $(".textarea");

    for (let i = 0; i < timeArrays.workDay12HourTime.length; i++) {
        const hoursMilitary = timeArrays.workDayMilitaryTime[i];
        localStorage.setItem(
            `"${hoursMilitary}"`,
            `"${textInputEl[i].value}"`
        );
        console.log(textInputEl[i].value);
    }

    console.log("Input text in the respective hourly blocks has been saved to local storage");
});

