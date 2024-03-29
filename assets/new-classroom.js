$(document).ready( async () => {

	// Submit new classroom
	submitClassroom = () => {
		// Loading overlay show
		$.LoadingOverlay('show')
		// Define url save
		let urlSave = `https://testing-255716.appspot.com/classrooms/create`
		// Create via axios
		axios({
			method: 'post',
			url: urlSave,
			data: {
				name: $('#classNameInput').val()
			},
			withCredentials: true
		})
		.then((response) => {
			// Redirect window back
			window.location.assign('index.html')
		})
		.catch((err) => {
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