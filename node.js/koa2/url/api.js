// GET
$.GET = function(url, data, callback) {
  $.ajax({
    url: url,
    type: "GET",
    data: data,
    dataType: "json",
    cache: false,
    success: function(data, status) {
      callback(JSON.stringify(data), status);
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
    dataType: "json",
    cache: false,
    success: function(data, status) {
      callback(JSON.stringify(data), status);
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
    dataType: "json",
    cache: false,
    success: function(data, status) {
      callback(JSON.stringify(data), status);
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
    dataType: "json",
    cache: false,
    success: function(data, status) {
      callback(JSON.stringify(data), status);
    },
    error: function(xhr) {
      console.log(xhr.status + " " + xhr.statusText);
    }
  });
};
