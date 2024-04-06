let listaDeItens = [];
let itemAEditar ;

const form = document.getElementById('form-itens');
const itensInput = document.getElementById('receber-item');
const ulItens = document.getElementById('lista-de-itens');
const itensComprados = document.getElementById('itens-comprados');
const listaRecuperada = localStorage.getItem('listaDeItens');

function atualizaLocalStorage() {
    localStorage.setItem('listaDeItens', JSON.stringify(listaDeItens));
}

if(listaRecuperada) {
    listaDeItens = JSON.parse(listaRecuperada);
    mostrarItem();
} else {
    listaDeItens = [];
}

form.addEventListener('submit', function(evento) {
    evento.preventDefault();
    salvarItem();
    mostrarItem();
    itensInput.focus();
});

function salvarItem() {
    const novoItem = itensInput.value;
    const comparaItem = listaDeItens.some((elemento) => elemento.valor.toUpperCase() === novoItem.toUpperCase());

    if(comparaItem) {
        alert('Item já foi adicionado.')
    } else {
        listaDeItens.push({
            valor: novoItem,
            checar: false
        });
    }

    itensInput.value = '';
}

function mostrarItem() {
    ulItens.innerHTML = '';
    itensComprados.innerHTML = '';

    listaDeItens.forEach((elemento, index) => {

        if(elemento.checar) {
            itensComprados.innerHTML += `
            <li class="item-compra is-flex is-justify-content-space-between" data-value="${index}">
            <div>
                <input type="checkbox" checked class="is-clickable" />  
                <span class="itens-comprados is-size-5">${elemento.valor}</span>
            </div>
            <div>
                <i class="fa-solid fa-trash is-clickable deletar"></i>
            </div>
            </li>
            `
        } else {
            ulItens.innerHTML += `
            <li class="item-compra is-flex is-justify-content-space-between" data-value="${index}">
            <div>
                <input type="checkbox" class="is-clickable" />
                <input type="text" class="is-size-5" value="${elemento.valor}" ${index !== Number(itemAEditar) ? 'disabled' : ''}></input>
            </div>
            <div>
            ${index === Number(itemAEditar) ?'<button onclick="salvarEdicao()"><i class="fa-regular fa-floppy-disk is-clickable"></i></button>' : '<i class="fa-regular is-clickable fa-pen-to-square editar"></i>'}
                <i class="fa-solid fa-trash is-clickable deletar"></i>
            </div>
            </li>
        `
        }
    })
    const itemCheck = document.querySelectorAll('input[type="checkbox"]');

    itemCheck.forEach(i => {
        i.addEventListener('click', (evento) => {
            const valorElemento = evento.target.parentElement.parentElement.getAttribute('data-value');
            listaDeItens[valorElemento].checar = evento.target.checked;
            mostrarItem();
        })
    })

    const deletaObjeto = document.querySelectorAll('.deletar');

    deletaObjeto.forEach(i => {
        i.addEventListener('click', (evento) => {
            const valorElemento = evento.target.parentElement.parentElement.getAttribute('data-value');
            listaDeItens.splice(valorElemento, 1)
            mostrarItem();
        })
    })

    const editarItens = document.querySelectorAll('.editar');
    editarItens.forEach(i => {
        i.addEventListener('click', (evento) => {
            itemAEditar = evento.target.parentElement.parentElement.getAttribute('data-value');
            mostrarItem();
        })
    })
    atualizaLocalStorage();
}

function salvarEdicao() {
    const itemEditado = document.querySelector(`[data-value="${itemAEditar}"] input[type="text"]`);
    listaDeItens[itemAEditar].valor = itemEditado.value;
    itemAEditar = -1;
    mostrarItem();
    console.log(listaDeItens);
}


/*
function mexeLista(item) {
    item.addEventListener('click', evento => {
        const valorElemento = evento.target.parentElement.parentElement.getAttribute('data-value');
        listaDeItens.splice(valorElemento, 1);
        mostrarItem();
    })
}
*/