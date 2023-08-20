$(document).ready(() => {

  fetch("https://paaextract.com/getCouponCodes", {
    method: "GET"
  }).then(res => res.json()).then(resp => {
    let rows = "";
    resp.forEach(element => {
      rows += `<li class="list-group-item d-flex">
            <div class="column column-id">${element.id}</div>
            <div class="column column-description">${element.description}</div>
            <div class="column column-code">${element.code}</div>
            <button class="use-btn btn btn-danger" data-code="${element.code}">Click Here For Use</button>
          </li>`
    });

    $("#coupon-list").html(rows);
  });
  $(document).on("click",".use-btn", (e) => {
    let code = e.target.getAttribute("data-code");
    console.log(code);

    chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
      var activeTab = tabs[0];
      chrome.tabs.sendMessage(activeTab.id, {
        msg: "apply-coupon",
        code: code,
      });
    });
  });
});
