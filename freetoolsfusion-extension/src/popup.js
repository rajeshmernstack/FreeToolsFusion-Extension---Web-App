$(document).ready(() => {

  let backendUrl = "http://localhost:3000"

  fetch("http://localhost:3000/api/v1/cookies", {
    method: "GET"
  }).then(res => res.json()).then(resp => {
    let data = resp.data;
    let rows = "";
    data.forEach((element, index) => {
      rows += `<li class="list-group-item d-flex">
            <div class="column column-id">${index + 1}</div>
            <div class="column column-name"><img src='${backendUrl + "/" +element.app_icon}' height="32" width="32" /> ${element.app_name}</div>
            <button class="use-btn btn btn-success p-1" data-appid="${element.cookie_id}">Access Now</button>
          </li>`
    });

    $("#app-list").html(rows);
  });
  $(document).on("click",".use-btn", (e) => {
    let cid = $(e.target).attr("data-appid");
    e.target.innerText = "Please Wait...";

    fetch(`${backendUrl}/api/v1/cookies/${cid}`).then(res => res.json()).then(resp => {
      let data = resp.data;
      let cookies = JSON.parse(data.app_cookies);
      cookies.forEach((cookie, index) => {
        cookie.url = data.app_url;
        delete cookie.hostOnly;
        delete cookie.session;

        chrome.cookies.set(cookie, () => {
          if(cookies.length-1 == index)
          window.open(data.app_url, "_blank");
        })
      });
    }).finally(() => {
      e.target.innerText = "Access Now";
    })

  });
});
