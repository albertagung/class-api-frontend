$(document).ready( async () => {

	// Submit new classroom
	submitClassroom = () => {
		// Loading overlay show
		$.LoadingOverlay('show')
		// Define url save
		let urlSave = `http://localhost:3000/classrooms/create`
		// Create via axios
		axios({
			method: 'post',
			url: urlSave,
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

})