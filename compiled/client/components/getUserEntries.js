'use strict';

// retrieves user data from database
// pass username for database search
// TODO: verify that user data can be send with get request
var getUserEntries = function getUserEntries(username, callback) {
  $.ajax({
    url: '/querydb',
    type: 'GET',
    data: {
      username: username
    },
    success: function success(response) {
      return callback(response);
    },
    error: function error(_error) {
      console.log(_error);
      throw _error;
    }
  });
};

// make accessible on the window
window.getUserEntries = getUserEntries;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NsaWVudC9jb21wb25lbnRzL2dldFVzZXJFbnRyaWVzLmpzIl0sIm5hbWVzIjpbImdldFVzZXJFbnRyaWVzIiwidXNlcm5hbWUiLCJjYWxsYmFjayIsIiQiLCJhamF4IiwidXJsIiwidHlwZSIsImRhdGEiLCJzdWNjZXNzIiwicmVzcG9uc2UiLCJlcnJvciIsImNvbnNvbGUiLCJsb2ciLCJ3aW5kb3ciXSwibWFwcGluZ3MiOiI7O0FBQUE7QUFDQTtBQUNBO0FBQ0EsSUFBSUEsaUJBQWlCLFNBQWpCQSxjQUFpQixDQUFVQyxRQUFWLEVBQW9CQyxRQUFwQixFQUE4QjtBQUNqREMsSUFBRUMsSUFBRixDQUFPO0FBQ0xDLFNBQUssVUFEQTtBQUVMQyxVQUFNLEtBRkQ7QUFHTEMsVUFBTTtBQUNKTixnQkFBVUE7QUFETixLQUhEO0FBTUxPLGFBQVMsaUJBQVVDLFFBQVYsRUFBb0I7QUFDM0IsYUFBT1AsU0FBU08sUUFBVCxDQUFQO0FBQ0QsS0FSSTtBQVNMQyxXQUFPLGVBQVVBLE1BQVYsRUFBaUI7QUFDdEJDLGNBQVFDLEdBQVIsQ0FBWUYsTUFBWjtBQUNBLFlBQU1BLE1BQU47QUFDRDtBQVpJLEdBQVA7QUFjRCxDQWZEOztBQWlCQTtBQUNBRyxPQUFPYixjQUFQLEdBQXdCQSxjQUF4QiIsImZpbGUiOiJnZXRVc2VyRW50cmllcy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIHJldHJpZXZlcyB1c2VyIGRhdGEgZnJvbSBkYXRhYmFzZVxuLy8gcGFzcyB1c2VybmFtZSBmb3IgZGF0YWJhc2Ugc2VhcmNoXG4vLyBUT0RPOiB2ZXJpZnkgdGhhdCB1c2VyIGRhdGEgY2FuIGJlIHNlbmQgd2l0aCBnZXQgcmVxdWVzdFxudmFyIGdldFVzZXJFbnRyaWVzID0gZnVuY3Rpb24gKHVzZXJuYW1lLCBjYWxsYmFjaykge1xuICAkLmFqYXgoe1xuICAgIHVybDogJy9xdWVyeWRiJyxcbiAgICB0eXBlOiAnR0VUJyxcbiAgICBkYXRhOiB7XG4gICAgICB1c2VybmFtZTogdXNlcm5hbWVcbiAgICB9LFxuICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgcmV0dXJuIGNhbGxiYWNrKHJlc3BvbnNlKTtcbiAgICB9LFxuICAgIGVycm9yOiBmdW5jdGlvbiAoZXJyb3IpIHtcbiAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgICAgIHRocm93IGVycm9yO1xuICAgIH1cbiAgfSlcbn07XG5cbi8vIG1ha2UgYWNjZXNzaWJsZSBvbiB0aGUgd2luZG93XG53aW5kb3cuZ2V0VXNlckVudHJpZXMgPSBnZXRVc2VyRW50cmllcztcbiJdfQ==