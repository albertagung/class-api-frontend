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
	let resGetUserDetails = await axios.get(`https://testing-255716.appspot.com/users/find/${getQueryValue().id}`)
	let userData = await resGetUserDetails.data[0]

	// Define response axios from finding all available classes
	let resGetAllClassrooms = await axios.get(`https://testing-255716.appspot.com/classrooms`)
	let classroomData = await resGetAllClassrooms.data

	// Populate user data on the form
	$('#nameInput').val(userData.name)
	$('#usernameInput').val(userData.username)
	// Iterate through classrooms data
	classroomData.forEach((classroom) => {
		// Check if selected class
		if (classroom.id === userData.ClassroomId) {
			$('#classInput').append(`
				<option value="${classroom.id}" selected>${classroom.name}</option>
			`)
		} else {
			$('#classInput').append(`
				<option value="${classroom.id}" selected>${classroom.name}</option>
			`)
		}
	})

	// Loading overlay hide
	$.LoadingOverlay('hide')

	// Submit update
	submitUpdate = () => {
		// Loading overlay show
		$.LoadingOverlay('show')
		// Define url update
		let urlUpdate = `https://testing-255716.appspot.com/users/update/${getQueryValue().id}`
		// Update via axios
		axios({
			method: 'put',
			url: urlUpdate,
			data: {
				username: $('#usernameInput').val(),
				name: $('#nameInput').val(),
				ClassroomId: $('#classInput').val()
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
				let urlDelete = `https://testing-255716.appspot.com/users/remove/${getQueryValue().id}`
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