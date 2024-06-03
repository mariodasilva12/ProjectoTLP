
let table = document.getElementById('table')
let modal = document.getElementById('modal')




function fundo(){
    let home = document.querySelector('#atc')
    

    setTimeout(function(){
        home.classList.add('obj')
    },100)

    setTimeout(function(){
        table.style.display='flex'
        modal.style.display='block'
    },2000)
    
}



