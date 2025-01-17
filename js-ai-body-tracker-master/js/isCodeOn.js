// Create variables and grab elements
let isRunning = false;
let observationComplete = false;
const codeRunner = document.getElementById("codeRunner");
const analysisCanvas = document.getElementById("analysisCanvas");
const closeCanvasButton = document.getElementById("closeCanvasButton");
const downloadButton = document.getElementById("downloadVideo");

function buttonSwap() {
  if (isRunning) {
    // Swap to red button
    codeRunner.removeEventListener("click", startCode);
    codeRunner.addEventListener("click", stopCode);
    codeRunner.setAttribute("class", "btn btn-danger");
    codeRunner.textContent = "Stop Presentation";
  } else if (!isRunning) {
    // Swap to green button
    codeRunner.removeEventListener("click", stopCode);
    codeRunner.addEventListener("click", startCode);
    codeRunner.setAttribute("class", "btn btn-success");
    codeRunner.textContent = "Start Presentation";
  }
}

function startCode() {
  if (!observationComplete) {
    if (!isRunning) {
      isRunning = true;
      buttonSwap();
    }
  }
}

function stopCode() {
  if (!observationComplete) {
    if (isRunning) {
      stopRecording().then((url) => {
        console.log("Recording URL:", url);
        downloadButton.addEventListener("click", () => {
          // Create a downloadable link
          const downloadLink = document.createElement("a");
          downloadLink.href = url;
          downloadLink.download = "presentation_recording.webm";
          document.body.appendChild(downloadLink);
          downloadLink.click();
          document.body.removeChild(downloadLink);
        });
      });
      isRunning = false;
      observationComplete = true;
      buttonSwap();

      // Show the analysis canvas
      analysisCanvas.classList.remove("hidden-canvas");
      analysisCanvas.classList.add("visible-canvas");

      stopTrackingBody(); // Call the function in `bodyTracking.js`
      stopTrackingVolume(); // Call the function in `volumeDetection.js`
    }
  }
}

// Close the analysis screen
closeCanvasButton.addEventListener("click", () => {
  analysisCanvas.classList.remove("visible-canvas");
  analysisCanvas.classList.add("hidden-canvas");
  observationComplete = false;
});

codeRunner.addEventListener("click", startCode);
