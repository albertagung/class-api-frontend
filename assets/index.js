$(document).ready(() => {

	// Date sorting script initiation (must before dataTable initiation)
	$.fn.dataTable.moment('MMMM Do YYYY, h:mm:ss a');
	
	// DataTable init
  let userTable = $('#users_table').DataTable({
  	ajax: {
  		url: 'http://localhost:3000/users',
  		dataSrc: ''
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
  });
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
  		url: 'http://localhost:3000/classrooms',
  		dataSrc: ''
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

})