const bookshelf = document.querySelector("#bookshelf")


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




/* ADDING BOOK */
const submitBtns = document.querySelectorAll('.submit-form')  

submitBtns.forEach(button=>
button.addEventListener('click',(e)=>{
    console.log(e.target)
    let mode =null
    if(e.target.id == "submit-btn-add") mode = 'add'
    else if(e.target.id == "submit-btn-edit") mode = 'edit'
    

    //F - form
    let titleF = document.querySelector(`#title-${mode}`).value
    let authorF = document.querySelector(`#author-${mode}`).value
    let isReadF = document.querySelector(`#isread-${mode}`).checked
    let pagesF = document.querySelector(`#pages-${mode}`).value
    let imageUrlF = document.querySelector(`#img-url-${mode}`).value
    let colorF = document.querySelector(`#color-${mode}`).value
    
    
    //console.log(titleF,authorF,isReadF,pagesF,colorF,imageUrlF)

    if(mode=='add'){
        let book = new Book(titleF,authorF,isReadF,pagesF,imageUrlF,colorF)
        myLibrary.push(book)
        console.log(myLibrary)
    }



    updateLibraryView()
}))


function updateLibraryView(){
    
}












// POPING UPS:
const openModalButtons = document.querySelectorAll('[data-modal-target]')
const closeModalButtons = document.querySelectorAll('[data-close-button]')

const overlay = document.getElementById('overlay')

openModalButtons.forEach(button =>{
    button.addEventListener('click', ()=>{
        const modal = document.querySelector(button.dataset.modalTarget)
        openModal(modal)
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