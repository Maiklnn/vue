Vue.createApp({

	data: () => ({
		myHtml: '<h1>Заголовок</h1>',
		title: 'Я есть Грут',
		person: {
			firstName: 'Vladilen',
			lastName: 'Minin',
			age: 27,
		},
		items: [1,2,3,6]
	}),
	methods: {
		stopPropagation(event) {
			console.log(event)
			event.stopPropagation()
		},
		test(event) {
			console.log(event)
		},
	},
	computed: {
		evenItems() {
			// return this.items.filter(i =>  i % 2 === 0)
			return this.items.filter(i =>  i )
		}
	}



}).mount('#app');


Vue.createApp({

	data: () => ({
		items: []
	}),
	methods: {
		stopPropagation(event) {
			console.log(event)
			event.stopPropagation()
		},
		test(event) {
			console.log(event)
		},
	},
	computed: {
		evenItems() {
			let gal = document.querySelector('.list')
			let arr = gal.querySelectorAll('.list-item')
			gal.remove()
			arr.forEach(item => {
				this.items.push(item.textContent)
			})
			return this.items
		}
	}



}).mount('#app2');


