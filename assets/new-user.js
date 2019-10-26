$(document).ready( async () => {

	// Loading overlay show
	$.LoadingOverlay('show')

	// Define response axios from finding all available classes
	let resGetAllClassrooms = await axios.get(`http://localhost:3000/classrooms`)
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
		// Loading overlay show
		$.LoadingOverlay('show')
		// Define url save
		let urlSave = `http://localhost:3000/users/create`
		// Update via axios
		axios({
			method: 'post',
			url: urlSave,
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

})