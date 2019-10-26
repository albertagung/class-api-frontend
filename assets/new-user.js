$(document).ready( async () => {

	// Loading overlay show
	$.LoadingOverlay('show')

	// Define response axios from finding all available classes
	let resGetAllClassrooms = await axios.get(`https://testing-255716.appspot.com/classrooms`, { withCredentials: true}).catch((err) => {
		if (err.response.status === 401) {
			// Loading overlay hide
			$.LoadingOverlay('hide')
			Swal.fire({
			  type: 'error',
			  title: 'Unauthorized',
			  text: 'You need to log in'
			})
			.then(() => {
				// Redirect to login
				window.location.assign('login.html')
			})
		}
	})
	let classroomData = await resGetAllClassrooms.data

	// Populate classrooms on the form
	// Iterate through classrooms data
	classroomData.forEach((classroom) => {
		$('#classInput').append(`
			<option value="${classroom.id}" selected>${classroom.name}</option>
		`)
	})

	// Loading overlay hide
	$.LoadingOverlay('hide')

	// Submit update
	submitUpdate = () => {
		// Check form validity
		if ($('#formCreateUser')[0].checkValidity()) {
			// If true, then continue
			// Loading overlay show
			$.LoadingOverlay('show')
			// Define url save
			let urlSave = `https://testing-255716.appspot.com/users/create`
			// Update via axios
			axios({
				method: 'post',
				url: urlSave,
				data: {
					username: $('#usernameInput').val(),
					password: $('#passwordInput').val() === $('#passwordInput2').val() ? $('#passwordInput').val() : '', // Check if password matched, if not send empty field
					name: $('#nameInput').val(),
					ClassroomId: $('#classInput').val()
				},
				withCredentials: true
			})
			.then((response) => {
				// Redirect window back
				window.location.assign('index.html')
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
		} else {
			// If false, then feedback to user
			Swal.fire({
			  type: 'error',
			  title: 'Oops...',
			  text: 'Please fill all the form fields'
			})
			// Loading overlay hide
			$.LoadingOverlay('hide')
		}
	}

})