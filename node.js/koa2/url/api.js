// GET
$.GET = function(url, callback) {
  $.ajax({
    url: url,
    type: "GET",
    dataType: "jsonp",
    jsonp: "callback",
    jsonpCallback: "successCallback",
    success: function(json) {
      callback(JSON.stringify(json.data));
    },
    error: function(xhr) {
      console.log(xhr.status + " " + xhr.statusText);
    }
  });
};

// POST
$.POST = function(url, data, callback) {
  $.ajax({
    url: url,
    type: "POST",
    data: data,
    dataType: "jsonp",
    success: function(data) {
      callback(data);
    },
    error: function(xhr) {
      console.log(xhr.status + " " + xhr.statusText);
    }
  });
};

// PUT
$.PUT = function(url, data, callback) {
  $.ajax({
    url: url,
    type: "PUT",
    data: data,
    dataType: "jsonp",
    success: function(data) {
      callback(data);
    },
    error: function(xhr) {
      console.log(xhr.status + " " + xhr.statusText);
    }
  });
};

// DELETE
$.DELETE = function(url, data, callback) {
  $.ajax({
    url: url,
    type: "DELETE",
    data: data,
    dataType: "jsonp",
    success: function(data) {
      callback(data);
    },
    error: function(xhr) {
      console.log(xhr.status + " " + xhr.statusText);
    }
  });
};
