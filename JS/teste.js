 

const url = 'http://localhost:3000/carros'


document.getElementById('CarroForm').addEventListener('submit', (event) => {
    event.preventDefault()

    const data = {
        nome : document.getElementById('nome').value,
        preco : document.getElementById('preco').value,
        imagem : document.getElementById('imagem').value
    }

    axios.post(url, data)

    .then(response => {
        alert('Dados inseridos com sucesso!')
        console.log(response.data)
    })
    .catch(error =>  {
        alert('Erro ao inserir dados')
        console.log(error)
    })
    
})

function getUser(){
    axios.get(url)
    .then(response => {
        console.log(response.data)
    })
    .catch(error => {
        console.log(error)
    })
}

getUser()

