
const h = Vue.h

const app = Vue.createApp({
	data:  () =>  ({
		title: "Это из свойства template"
	}),
	// template: `
	// 	<div class="card center">
    //     	<h1>{{title}}</h1>
    // 		<button class="btn" @click = 'title = "Изменить"'>Изменить</button>
    // 	</div>
	// `
	render () {
		return h('div', {
			class: 'card center'
		}, [
			h('h1', {}, this.title),
			h('button', {
				class: 'btn',
				onClick: this.changeTitle
			}, 'изменить')
		])
	},
<<<<<<< HEAD
	beforeCreate() {
		console.log('beforeCreate - после инициализации event & lifecycle')
	},
	created() {
		console.log('created - после иницализации injections & reacticity')
	},
	beforeMount() {
		console.log('beforeMount - перед тем как vue пытаеться всё засунуть в дом дерево')
	},
	mounted() {
		console.log('mounted - после построения дом дерева')
	},
	// если мы что то изменяем
	beforeUpdate() {
		console.log('beforeUpdate - перед изменением V DOM ')
	},
	updated() {
		console.log('updated - после изменения V DOM ')
	},
	// сработывают при вызове app.unmount()
	beforeUnmount() {
		console.log('mounted - перед уничтожением')
	},
	unmounted() {
		console.log('mounted - компонент был уничтожен')
	},
=======
>>>>>>> b4da08d79b60a2f18803feef40fa88369720ad03
	methods: {
		changeTitle() {
			this.title = 'Изменить'
			console.log(this)
		}
	}
})

<<<<<<< HEAD
// setTimeout(() => {
// 	app.unmount()
// }, 2000)

=======
>>>>>>> b4da08d79b60a2f18803feef40fa88369720ad03


app.mount('#app');



