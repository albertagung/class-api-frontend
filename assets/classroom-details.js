$(document).ready( async () => {

	// Loading overlay show
	$.LoadingOverlay('show')

	// Get value from query
	getQueryValue = () => {
		let arrQuery = [], hash;
		let hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
		for(let i = 0; i < hashes.length; i++)
		{
			hash = hashes[i].split('=');
			arrQuery.push(hash[0]);
			arrQuery[hash[0]] = hash[1];
		}
		// Return object query, but have to called per key. ex: getQueryValue().name
		return arrQuery;
	}

	// Define response axios from finding class by id
	let resGetClassroomDetails = await axios.get(`http://localhost:3000/classrooms/find/${getQueryValue().id}`)
	let classroomData = await resGetClassroomDetails.data[0]

	// Populate user data on the form
	$('#classNameInput').val(classroomData.name)
	
	// Date sorting script initiation (must before dataTable initiation)
	$.fn.dataTable.moment('MMMM Do YYYY, h:mm:ss a');
	
	// DataTable init
  let userTable = $('#users_table').DataTable({
  	data: classroomData.users,
  	columns: [
  		{data: 'id'},
  		{data: 'username'},
  		{data: 'name'},
  		{
  			data: 'updatedAt',
  			render: (data) => moment(data).format('MMMM Do YYYY, h:mm:ss a')
  		}
  	]
  });

	// Loading overlay hide
	$.LoadingOverlay('hide')

	// Submit update
	submitUpdate = () => {
		// Loading overlay show
		$.LoadingOverlay('show')
		// Define url update
		let urlUpdate = `http://localhost:3000/classrooms/update/${getQueryValue().id}`
		// Update via axios
		axios({
			method: 'put',
			url: urlUpdate,
			data: {
				name: $('#classNameInput').val()
			}
		})
		.then((response) => {
			// Redirect window back
			window.location.assign('index.html')
		})
		.catch((err) => {
			console.log(err)
			Swal.fire({
			  type: 'error',
			  title: 'Oops...',
			  text: 'Something went wrong!'
			})
			// Loading overlay hide
			$.LoadingOverlay('hide')
		})
	}

	// Submit delete
	submitDelete = () => {
		Swal.fire({
		  title: 'Are you sure?',
		  text: "You won't be able to revert this!",
		  type: 'warning',
		  showCancelButton: true,
		  confirmButtonColor: '#3085d6',
		  cancelButtonColor: '#d33',
		  confirmButtonText: 'Yes, delete it!'
		}).then((result) => {
		  if (result.value) {
		    // Loading overlay show
				$.LoadingOverlay('show')
				// Define url update
				let urlDelete = `http://localhost:3000/classrooms/remove/${getQueryValue().id}`
				// Update via axios
				axios({
					method: 'delete',
					url: urlDelete
				})
				.then((response) => {
					// Redirect window back
					window.location.assign('index.html')
				})
				.catch((err) => {
					console.log(err)
					Swal.fire({
					  type: 'error',
					  title: 'Oops...',
					  text: 'Something went wrong!'
					})
					// Loading overlay hide
					$.LoadingOverlay('hide')
				})
		  }
		})
	}

})