export default class Category {
    constructor({id, name}) {
        this.id = id
        this.name = name

        this.element = document.createElement('div')
        this.element.setAttribute('class', 'menu-item')
    }

    render() {
        this.element.innerHTML = `<h2>${this.name}</h2>`
        console.log('here')
        return this.element
    }
}