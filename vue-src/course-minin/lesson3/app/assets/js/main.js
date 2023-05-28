
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
	methods: {
		changeTitle() {
			this.title = 'Изменить'
			console.log(this)
		}
	}
})



app.mount('#app');



