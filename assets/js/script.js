// Find elements on page
const currentDayEl = $("#currentDay");
const containerEl = $(".container");

// Declare variables
var workDayStart = "07:00";
var workDayEnd = "17:00";


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
            .addClass("row");
        const hourEl = $("<div>")
            .addClass("col-1 hour")
            .text(hoursStandard);
        const textInputEl = $("<textarea>")
            .attr("id", hoursMilitary)
            .addClass("col-10 textarea past description");
        const saveEl = $("<button>")
            .addClass("col-1 saveBtn i:hover fas fa-save");

        // Nest elements in each hourly container and build out
        containerEl.append(hourRowContainerEl);
        hourRowContainerEl.append(hourEl, textInputEl, saveEl);
    }

    console.log("Schedule Page built");
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
    // Create an array of hours based upon workday start & end times
    timeArrays = convertTime();

    // Isolate each input areas
    const textInputEl = $(".textarea");

    for (let i = 0; i < timeArrays.workDay12HourTime.length; i++) {
        const hoursMilitary = timeArrays.workDayMilitaryTime[i];

        // Set the value of the respective text input to the value in local storage.
        textInputEl[i].value = localStorage.getItem(`${hoursMilitary}`);
    }
    
    console.log("Existing schedules loaded");
}

/**
 * Function to color code the time block for past, present, and future based on the current time
 */
function colorCodeSchedule() {
    // Create an array of hours based upon workday start & end times
    timeArrays = convertTime();

    // Isolate each row
    const textInputEl = $(".textarea");

    // Set the current hour
    currHour = parseInt(moment().format("H"));

    // Loop over each row element
    textInputEl.each(function () {
        // Convert ID to integer for comparison
        rowHour = parseInt($(this).attr("id"));

        // Set color coding based upon the time. Assumes the default color scheme uses the "past" class upon page load.
        if (rowHour === currHour) {
            $(this).removeClass("past");
            $(this).addClass("present");
        } else if (rowHour > currHour) {
            $(this).removeClass("present");
            $(this).addClass("future");
        }
    });

    console.log("Schedule color coded");
}


/**
 * Initialization function
 */
function init() {
    // Display time as soon as the page loads
    displayTime();

    // Build schedule based upon settings
    buildSchedulerPage();

    // Load any existing schedules from local storage
    loadSchedule();

    // Kickoff automated schedule color
    colorCodeSchedule();

    // Update time in header via setInterval
    setInterval(displayTime, 1000);

    // Color code schedule via setInterval
    setInterval(colorCodeSchedule, 3600000);
}

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
            `${hoursMilitary}`,
            `${textInputEl[i].value}`
        );
    }

    console.log("Input text in the respective hourly blocks has been saved to local storage");
});
