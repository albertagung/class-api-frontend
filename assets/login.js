$(document).ready(() => {

	// Login user
	login = () => {
		// Define username
		let username = $('#username').val()
		// Define password
		let password = $('#password').val()
		// Check if not empty
		if (username !== '' && password !== '') {
			// Loading overlay start
			$.LoadingOverlay('show')
			// Define login url
			let urlLogin = 'http://localhost:3000/users/login'
			// Send login credentials to server
			axios({
				method: 'post',
				url: urlLogin,
				withCredentials: true,
				data: {
					username: username,
					password: password
				}
			})
			.then((response) => {
				// Define user
				let user = response.data
				// Check response
				if (user.username === 'administrator') {
					// Redirect window to index
					window.location.assign('index.html')
				} else {
					// Redirect window to user details
					window.location.assign(`/user-details.html?id=${user.id}`)
				}
			})
			.catch((err) => {
				console.log(err.message)
				if (err.message === 'Request failed with status code 401') {
					Swal.fire({
					  type: 'error',
					  title: 'Unauthorized',
					  text: 'Wrong username or password'
					})
					// Loading overlay hide
					$.LoadingOverlay('hide')
				} else {
					Swal.fire({
					  type: 'error',
					  title: 'Oops...',
					  text: err.message
					})
					// Loading overlay hide
					$.LoadingOverlay('hide')
				}
			})

		}

	}

})