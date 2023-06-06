const localStorageName = 'to-do-list'


function validIfExistsNewTask(){
    let values = JSON.parse(localStorage.getItem(localStorageName) || "[]")
    let inputValue = document.getElementById('input-new-task').value
    let exists = values.find(x => x.name == inputValue)
    return !exists ? false : true
}

//insere uma nova task 
function newTask(){
    let input = document.getElementById('input-new-task')
    input.style.border = ''

    //validação do input realizado

    if(!input.value)
    {
        input.style.border = '1px solid red'
        alert('Digite algo para inserir em sua lista!')
    }
    else if(validIfExistsNewTask())
    {
        alert('Essa tarefa já foi inserida!')
    }
    else
    {
        // increment to localStorage apartir de uma array criada pelo JSON.parse
        let values = JSON.parse(localStorage.getItem(localStorageName) || "[]")
        values.push({
            name: input.value
        })
        localStorage.setItem(localStorageName,JSON.stringify(values))
        showValues()
    }
    input.value = ''
}

//mostra os valores inseridos 
function showValues(){
    let values = JSON.parse(localStorage.getItem(localStorageName) || "[]")
    let list = document.getElementById('to-do-list')
    list.innerHTML = ''
    for(let i = 0 ; i < values.length ; i++){
        list.innerHTML += `<li>${values[i]['name']}<button id="btn-ok" onclick='removeItem("${values[i]['name']}")'>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-clipboard-check" viewBox="0 0 16 16">
        <path fill-rule="evenodd" d="M10.854 7.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708 0z"/>
        <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z"/>
        <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z"/>
      </svg></button></li>`
    }
}

function removeItem(data){
    let values = JSON.parse(localStorage.getItem(localStorageName) || "[]")
    let index = values.findIndex(x => x.name == data)
    values.splice(index,1)
    localStorage.setItem(localStorageName,JSON.stringify(values))
    showValues()
}

showValues()
