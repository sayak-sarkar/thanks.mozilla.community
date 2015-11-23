$('#inputSubmit').click(function () {
  $('#inputForm').submit()
})

var btn = document.getElementById("copyButton");
btn.addEventListener("click", clickHandler, false);
btn.addEventListener("copy", copyHandler, false);

function clickHandler(e) {
  e.target.dispatchEvent(new ClipboardEvent("copy"));
}

function copyHandler(e) {
  e.clipboardData.setData("text/plain", "Simulated copy. Yay!");

  // CRITICAL: Must call `preventDefault();` to get this data into the system/desktop clipboard!!!
  e.preventDefault();
}
