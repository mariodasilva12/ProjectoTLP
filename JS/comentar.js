
const url = 'http://localhost:3000/comentarios'
let btnEditar = document.getElementById('editar')
let btnEnviar = document.getElementById('enviar')
const descricao = document.getElementById('descricao')
btnEditar.style.display='none'
let idComent = null 
function getComent(){

    axios.get(url)
   
    .then(response => {
        const data = response.data
        const lista = document.querySelector('#lista') 
         
        data.forEach(element => {
           
            console.log(element);
            let elemento = document.createElement("p");
            let div = document.createElement('div')
            let editar = document.createElement("button");
            let apagar = document.createElement("button");

            editar.textContent= "Editar"
            apagar.textContent= "Apagar"

            editar.classList.add('editar')
            apagar.classList.add('apagar')

            elemento.innerHTML =element.descricao;

            lista.appendChild(elemento);
            lista.appendChild(div);
            div.appendChild(editar);
            div.appendChild(apagar);
            id = element.id
          
            apagar.addEventListener('click', () =>{
                deletecoment(element.id)

            })

            editar.addEventListener('click', () =>{
                editarComent(element.id)
            })
      })   
    })

    .catch(error => console.log(error))
}

function deletecoment(id){
    idComent = id
    console.log("Comentario selecionado",id)
     axios.delete(`${url}/${idComent}`)

     .then(response => {
        alert('Comentário apagado!')
        console.log(response.data)
        location.reload()
     })

     .catch(error => {
        alert('Erro')
        console.log(error)
     })
   
}


function editarComent(id){
    idComent = id
    descricao.onfocus
    btnEnviar.style.display= 'none'
    btnEditar.style.display = 'block'

    btnEditar.addEventListener('click', () =>{

        let descricao = document.getElementById('descricao')
        let comentario = descricao.value
        alert(comentario)
        axios.put(`${url}/${idComent}`,comentario)
        location.reload()
    })
   

}
btnEnviar.addEventListener('click', () =>{

  let comentario = descricao.value
 axios.post(url,JSON.stringify(comentario))

    .then(response => {
        alert('Inserção feito com sucesso!')
        console.log(response.data)
        location.reload()
       
    })

    .catch(error => {
        alert('Falha na inserção')
        console.log(error)
})

})

getComent()


