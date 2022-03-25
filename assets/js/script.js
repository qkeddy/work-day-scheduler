// Find elements on page
const currentDayEl = $("#currentDay");
const containerEl = $(".container");
const buttonEl = $("button"); // We might have an issue declaring this here as the button has yet to be created.

// Declare variables
var workDayStart = "08:00";
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
        const hoursStandard = timeArrays.workDay12HourTime[i];
        const hoursMilitary = timeArrays.workDayMilitaryTime[i];
        // Create four elements for each row (hour in the work day) and add classes for visual styling as well as attribute ID to find the text in a particular hour.
        const hourContainerA = $("<div>")
            .attr("id", hoursMilitary)
            .addClass("row");
        const hourContainerA1 = $("<div>")
            .addClass("col-1 hour")
            .text(hoursStandard);
        const hourContainerA2 = $("<textarea>").addClass(
            "col-10 textarea past description").val(`Text Value ${i + 1}`)
        ;
        const hourContainerA3 = $("<button>").addClass(
            "col-1 saveBtn i:hover fas fa-save"
        );

        // Nest elements in each hourly container and build out
        containerEl.append(hourContainerA);
        hourContainerA.append(hourContainerA1);
        hourContainerA.append(hourContainerA2);
        hourContainerA.append(hourContainerA3);
    }

    console.log("Schedule Page built");


    // *** Testing ***

      const textInputEl = $(".textarea");

      for (let i = 0; i < timeArrays.workDay12HourTime.length; i++) {
          const hoursMilitary = timeArrays.workDayMilitaryTime[i];
        //   localStorage.setItem(
        //       `"${hoursMilitary}", "rowEl.children().eq(1).value")`
        //   );
          //console.log(rowEl.children().eq(1).val());
          console.log(textInputEl[i].value);
      }

      console.log("Save text in a time block to local storage");
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
    // loop through the military time array and write any data to local storage

    // Create an array of hours based upon workday start & end times
    timeArrays = convertTime();

    // Isolate each row
    const rowEl = $(".row");

    for (let i = 0; i < timeArrays.workDay12HourTime.length; i++) {
        const hoursMilitary = timeArrays.workDayMilitaryTime[i];
        localStorage.setItem(
            `"${hoursMilitary}", "rowEl.children().eq(1).value")`
        );
        console.log(rowEl.children().eq(1).value);
    }

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
