$(document).ready(() => {
  let backendUrl = "http://localhost:3000";

  fetch("http://localhost:3000/api/v1/cookies", {
    method: "GET",
  })
    .then((res) => res.json())
    .then((resp) => {
      let data = resp.data;
      let rows = "";
      data.forEach((element) => {
        rows += `<li class="list-group-item d-flex">
      <div class="column column-id">${element.cookie_id}</div>
      <div class="column column-name"><img src='${
        backendUrl + "/" + element.app_icon
      }' height="32" width="32" /> ${element.app_name}</div>
      <a href="${backendUrl}/api/v1/cookies/${
          element.cookie_id
        }/delete" class="use-btn btn btn-danger" data-code="${
          element.code
        }">Delete</a>
    </li>`;
      });

      $("#app-list").html(rows);
    });

  $(document).on("submit", "#add_new_app_form", (e) => {
    e.preventDefault();
    var form = $("#add_new_app_form");

    // you can't pass Jquery form it has to be javascript form object
    var formData = new FormData(form[0]);

    $.ajax({
      url: backendUrl + "/api/v1/cookies",
      type: "POST",
      data: formData,
      success: function (data) {
        window.location.reload();
      },
      cache: false,
      contentType: false,
      processData: false,
    });
  });
});
