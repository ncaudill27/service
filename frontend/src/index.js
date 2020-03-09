document.addEventListener('DOMContentLoaded', ()=> {
    fetch('http://127.0.0.1:3000/categories')
    .then(resp => resp.json())
    .then(json => console.log(json))
})