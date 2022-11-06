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
   // console.log(e.target)
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
       // console.log(myLibrary)
    }


    showLibrary()
}))





function showLibrary(){ 
    
    clearLibrary()
    
    const card = document.querySelector(".bookBoilerPrint")
    for(let i =0;i<myLibrary.length;i++){
        const newCard = card.cloneNode(true)
        newCard.style.display="flex"
        newCard.dataset.index=`${i}`
        newCard.classList.remove("bookBoilerPrint")
        newCard.classList.add("book")

       


        bookshelf.appendChild(newCard)

    //NW - new book
    let NB=document.querySelector(`[data-index="${i}"]`)
    let NBchildren = NB.childNodes
    

    //title
    if(myLibrary[i].title=="") NBchildren[1].innerText = "no title"
    else NBchildren[1].innerText = myLibrary[i].title

    //cover
    if(myLibrary[i].cover=="") NBchildren[3].firstChild.setAttribute("src","/images/nocover.png")
    else NBchildren[3].firstChild.setAttribute("src",`${myLibrary[i].cover}`)

    //author
    if(myLibrary[i].author=="") NBchildren[5].innerText = "unknown author"
    else NBchildren[5].innerText = myLibrary[i].author

    //checkbox
    if(myLibrary[i].isRead) NBchildren[7].getElementsByTagName('input')[0].setAttribute("checked","")
    else  NBchildren[7].getElementsByTagName('input')[0].removeAttribute("checked")
    
    //pages
    if(myLibrary[i].pages=="") NBchildren[9].innerText="pages: ???"
    NBchildren[9].innerText = "pages:"+myLibrary[i].pages

    //color
    newCard.style.borderLeft = `solid ${myLibrary[i].color} 4px`
    
    updateSelection()
}
}

function clearLibrary(){
    let toDelete = document.querySelectorAll(".book")
    //console.log(toDelete)
     toDelete.forEach(element=>{
        //console.log("DELETED", element)
        bookshelf.removeChild(element)
     })
    
}





/* SELECTING BOOKS */


let books = null
let selectedBooks = []

function updateSelection(){
    books = document.querySelectorAll(".index-label")
    books.forEach(book=>{
        book.addEventListener('click',selectBook)
    })
}


function selectBook(e){
    let index = e.target.parentElement.dataset.index
    


    if(selectedBooks.includes(index)){
        
        selectedBooks = selectedBooks.filter(a => a!= index)
        e.target.parentElement.style.border="solid 0px blue"
        e.target.parentElement.style.border="solid 0px blue"
        e.target.parentElement.style.borderLeft=`solid ${myLibrary[index].color} 4px`
    } 
    else{
        selectedBooks.push(index)
        e.target.parentElement.style.border="solid 4px rgb(34, 141, 207)"
    } 
    
    checkSelectedBooksArrayLenght()
    


console.log(selectedBooks)
}
function checkSelectedBooksArrayLenght(){
    if(selectedBooks.length==1) toogleButtons(false,true,true)
    else if(selectedBooks.length>1) toogleButtons(false,false,true)
    else if(selectedBooks.length==0) toogleButtons(true,false,false)
}

const addButton = document.querySelector("#add-button")
const editButton = document.querySelector("#edit-button")
const deleteButton = document.querySelector("#delete-button")

function toogleButtons(add,edit,del){
    if(add) addButton.classList.remove('disabled')
    else  addButton.classList.add('disabled')

    if(edit) editButton.classList.remove('disabled')
    else editButton.classList.add('disabled')

    if(del) deleteButton.classList.remove('disabled')
    else deleteButton.classList.add('disabled')
}





/* DELETING BOOKS */
const confirmDelete = document.querySelector("#confirm-delete-yes")
confirmDelete.addEventListener('click',()=>{
   let copySelectedBooks = selectedBooks
   let libSize = myLibrary.length
for(let i = 0;i<libSize;i++){
    if(copySelectedBooks.includes(`${i}`)){
        myLibrary[i]='x'
        selectedBooks = selectedBooks.filter(a => a!= i) 
    }
}
for(let i = 0;i<=libSize;i++){
    if(myLibrary[i]=='x'){
        myLibrary.splice(i,1)
        i=-1
        libSize--
    }
}
showLibrary()
checkSelectedBooksArrayLenght()
})








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
