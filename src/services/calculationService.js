export async function fetchCategories() {
	const token = window.token;
	const response = await fetch('http://192.168.1.6/api/categories', {
		method: 'GET', headers: {
			'Authorization': `Bearer ${token}`,
			'X-Requested-With': 'XMLHttpRequest',
		},
	})
	return await response.json()
}