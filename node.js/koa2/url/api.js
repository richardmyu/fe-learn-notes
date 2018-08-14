// GET
$.get = function(url, data, callback) {
  $.ajax({
    url: url,
    type: "GET",
    data: data,
    dataType: "json",
    success: function(data) {
      callback(data);
    },
    error: function(xhr) {
      console.log(xhr.status + " " + xhr.statusText);
    }
  });
};

// POST
$.post = function(url, data, callback) {
  $.ajax({
    url: url,
    type: "POST",
    data: data,
    dataType: "json",
    success: function(data) {
      callback(data);
    },
    error: function(xhr) {
      console.log(xhr.status + " " + xhr.statusText);
    }
  });
};

// PUT
$.put = function(url, data, callback) {
  $.ajax({
    url: url,
    type: "PUT",
    data: data,
    dataType: "json",
    success: function(data) {
      callback(data);
    },
    error: function(xhr) {
      console.log(xhr.status + " " + xhr.statusText);
    }
  });
};

// DELETE
$.delete = function(url, data, callback) {
  $.ajax({
    url: url,
    type: "DELETE",
    data: data,
    dataType: "json",
    success: function(data) {
      callback(data);
    },
    error: function(xhr) {
      console.log(xhr.status + " " + xhr.statusText);
    }
  });
};