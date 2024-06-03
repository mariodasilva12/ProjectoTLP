
const url = 'http://localhost:5501/usuarios'
let parar = false
let txNome = document.getElementById('nome')
let txEmail = document.getElementById('email')


let btnListar = document.getElementById('listar')
let btnVoltar = document.getElementById('voltar')
let btnEditar = document.getElementById('editar')
let btnApagar = document.getElementById('apagar')
btnVoltar.style.display = 'none'
btnApagar.style.display = 'none'
btnEditar.style.display = 'none'

btnListar.addEventListener('click', () => {
    getUser()
    document.getElementById('conteudo').style.display= 'none'
    btnListar.style.display= 'none'
    btnEditar.style.display= 'block'
    btnApagar.style.display= 'block'
    btnVoltar.style.display= 'block'
})

btnVoltar.addEventListener('click', () => {
    location.reload()
})

function getUser(){

    axios.get(url)

    .then(response => {
        const data = response.data
        console.log(data)
        const lista = document.querySelector('#lista') 
         
        data.forEach(element => {
            
            console.log((element));
            let p1 = document.createElement("p");
            let p2 = document.createElement("p");
            let div = document.createElement('div');
            let selecionar = document.createElement("button");

            selecionar.textContent= "selecionar"

            p1.innerHTML =" Nome : "+element.nome
            p2.innerHTML ="Email : " +element.email

            lista.appendChild(p1);
            lista.appendChild(p2);
            lista.appendChild(div);
            div.appendChild(selecionar);
            
            selecionar.addEventListener('click', () =>{
            deleteUser(element.id)
            btnApagar.setAttribute('id','apg')
            btnEditar.setAttribute('id','edt')         
            })        
        
    })

})
    .catch(error => console.log(error))

}

document.getElementById('btnLogin').addEventListener('click', () =>{
    let nome = txNome.value
    let email = txEmail.value

   axios.post(url,{nome, email})
  
      .then(response => {
          alert('Inserção feito com sucesso!')
          console.log(response.data)
      })
  
      .catch(error => {
          alert('Falha na inserção')
          console.log(error)
  })
  
  })


  let idUser = null
  function deleteUser(id){
    idUser = id

    console.log('Usuario selecionado',id)
  }


  btnApagar.addEventListener('click',() =>{
    lista.style.display = 'none' 
    btnEditar.style.display = 'none' 
    btnApagar.style.display = 'none' 
    btnVoltar.style.display = 'none' 
   

    if(idUser !== 0){
    axios.delete(`${url}/${idUser}`)
    .then(
        response => {
            console.log(response.data)
        }
       
    )
    .catch(error => {
        alert('Erro')
        console.log(error)
    })
    }else{
        alert('nenhum usuario seleciionado!')
    }
    
    location.reload(btnListar)
  })


btnEditar.addEventListener('click',() =>{

    if(idUser !== 0){
        lista.style.display = 'none' 
        btnEditar.style.display = 'block' 
        btnApagar.style.display = 'none' 
        btnVoltar.style.display = 'block' 
        
        document.getElementById('conteudo').style.display = 'block'
        document.getElementById('btnLogin').style.display = 'none'
       
     btnEditar.addEventListener('click',() =>{
        let txNome = document.getElementById('nome')
        let txEmail = document.getElementById('email')
        let nome = txNome.value
        let email = txEmail.value
        axios.put(`${url}/${idUser}`,{nome,email})
            .then(
                 response => {
                    console.log(response.data)
            }
       
    )
    .catch(error => {
        alert('Erro')
        console.log(error)
    })
     })   
    
    }else{
        alert('nenhum usuario seleciionado!')
    }
    
 
  })

