const App = {
	data() {
		return {
			placeholderString: 'Ведите название заметки',
			title: 'Список заметок',
			inputValue: '',
			notes: ['Заметка 1', 'Заметка 2']
		}
	},
	methods: {
		addNewNode() {
			if(this.inputValue !== '') {
				this.notes.push(this.inputValue)
				this.inputValue = ''
			}
		},
		toUpperCase(item) {
			return item.toUpperCase()
		},
		deleteNode(i, event) {
			this.notes.splice(i, 1)
		}
	},
	computed: {
		doubleCountComputed() {
			return this.notes.length * 2
		},
	},
	watch: {
		inputValue(value) {
			console.log(value)
		}
	}
}




Vue.createApp(App).mount('#app');
