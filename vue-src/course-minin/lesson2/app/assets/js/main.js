Vue.createApp({

	data: () => ({
		myHtml: '<h1>Заголовок</h1>',
		title: 'Я есть Грут',
		person: {
			firstName: 'Vladilen',
			lastName: 'Minin',
			age: 27,
		},
		items: [1,2]
	}),
	methods: {
		stopPropagation(event) {
			event.stopPropagation()
		},
		addItem() {
			if(event.key === 'd') {
				this.items.unshift(this.$refs.myInput.value)
				this.$refs.myInput.value = ''
			}
		},
		remove(i) {
			this.items.splice(i, 1)
		},
		log(item) {
			console.log(item)
		}
	},
	computed: {
		evenItems() {
			return this.items.filter(i =>  i)
		}
	}



}).mount('#app');



