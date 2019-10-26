$(document).ready( async () => {

	// Date sorting script initiation (must before dataTable initiation)
	$.fn.dataTable.moment('MMMM Do YYYY, h:mm:ss a');
	
	// DataTable init
  let userTable = $('#users_table').DataTable({
  	ajax: {
  		url: 'https://testing-255716.appspot.com/users',
  		dataSrc: '',
      xhrFields: {
        withCredentials: true
      },
      crossDomain: true,
      complete: (xhr, textStatus) => {
        if (xhr.status === 401) {
          // Redirect window to login page
          Swal.fire({
            type: 'error',
            title: 'Unauthorized',
            text: 'You need to log in as admin'
          })
          .then(() => {
            // Redirect to login
            window.location.assign('login.html')
          })
        }
      },
      error: (event, flag, message) => {
        console.log(message)
      }
  	},
  	columns: [
  		{data: 'id'},
  		{data: 'username'},
  		{data: 'name'},
  		{data: 'Classroom.name'},
  		{
  			data: 'updatedAt',
  			render: (data) => moment(data).format('MMMM Do YYYY, h:mm:ss a')
  		}
  	]
  })
  // On click event listener (users table)
  $('#users_table tbody').on('click', 'tr', function () {
    // Define data
    let data = userTable.row(this).data()
    // redirect to user details
    window.location.assign(`user-details.html?id=${data.id}`)
  })

  // DataTable init
  let classroomTable = $('#classrooms_table').DataTable({
  	ajax: {
  		url: 'https://testing-255716.appspot.com/classrooms',
  		dataSrc: '',
      xhrFields: {
        withCredentials: true
      },
      crossDomain: true,
      complete: (xhr, textStatus) => {
        if (xhr.status === 401) {
          // Redirect window to login page
          Swal.fire({
            type: 'error',
            title: 'Unauthorized',
            text: 'You need to log in as admin'
          })
          .then(() => {
            // Redirect to login
            window.location.assign('login.html')
          })
        }
      },
      error: (event, flag, message) => {
        console.log(message)
      }
  	},
  	columns: [
  		{data: 'id'},
  		{data: 'name'},
  		{
  			data: 'updatedAt',
  			render: (data) => moment(data).format('MMMM Do YYYY, h:mm:ss a')
  		}
  	]
  });
  // On click event listener (classrooms table)
  $('#classrooms_table tbody').on('click', 'tr', function () {
    // Define data
    let data = classroomTable.row(this).data()
    // redirect to user details
    window.location.assign(`classroom-details.html?id=${data.id}`)
  })

  // Log out user
  logOut = () => {
    // Define log out url
    let urlLogOut = 'https://testing-255716.appspot.com/users/logout'
    // Axios request
    axios({
      method: 'post',
      url: urlLogOut,
      withCredentials: true
    })
    .then((response) => {
      // Redirect window to login
      window.location.assign('login.html')
    })
    .catch((err) => {
      // Define error data
      let error = err.response.data
      console.log(error)
      // Give feedback to user
      Swal.fire({
        type: 'error',
        title: 'Error' + ' ' + error.code,
        text: error.message
      })
      // Loading overlay hide
      $.LoadingOverlay('hide')
    })
  }

})