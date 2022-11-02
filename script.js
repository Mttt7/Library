let myLibrary = []

function Book(title,author,isRead,pages,cover,color){
    this.title = title
    this.author =author
    this.isRead = isRead
    this.pages = pages
    this.cover = cover
    this.color = color
}

function addBook(){

}



// POPING UPS:
const openModalButtons = document.querySelectorAll('[data-modal-target]')
const closeModalButtons = document.querySelectorAll('[data-close-button]')

const overlay = document.getElementById('overlay')

openModalButtons.forEach(button =>{
    button.addEventListener('click', ()=>{
        const modal = document.querySelector(button.dataset.modalTarget)
        openModal(modal)
        console.log(modal)
    })
})

closeModalButtons.forEach(button =>{
    button.addEventListener('click', ()=>{
        const modal = button.closest('.modal')
        closeModal(modal)
        
    })
})


function openModal(modal){
    if(modal== null) return
    modal.classList.add('active')
    overlay.classList.add('active')
}

function closeModal(modal){
    if(modal== null) return
    modal.classList.remove('active')
    overlay.classList.remove('active')
}