class Pedido {
    constructor(ano,mes,dia,tipo,descricao,valor){
        this.ano = ano,
        this.mes = mes,
        this.dia = dia,
        this.tipo = tipo,
        this.descricao = descricao,
        this.valor = valor
    }

   validarDados(){
    for(let i in this){
        if(this[i]== undefined || this[i]== null|| this[i]== ''){
            return false
         }
     }
     return true
   }
}


class BancoDeDados{
    constructor(){
        let id = localStorage.getItem('id')
        if(id===null){
            localStorage.setItem('id',0)
        }
    }
    getProximoId(){
        let proximoId = localStorage.getItem('id')
        return parseInt(proximoId)+1
    }

    gravar(d){
        let id = this.getProximoId()

        localStorage.setItem(id, JSON.stringify(d))

        localStorage.setItem('id',id)
    }
    recuperarListaPedidos(){

      let pedidos = Array()

      let id =   localStorage.getItem('id')

        for(let i = 1; i <= id; i++){
        let pedido = JSON.parse(localStorage.getItem(i))

        if(pedido === null){
            continue
        }

      // console.log("ID:", i, "Pedido:", pedido);
      pedido.id = i
      pedidos.push(pedido)
      }
      return pedidos
    }
    //método de pesquisa
    pesquisar(pedido){
        let pedidosFiltrados = Array()
        pedidosFiltrados = this.recuperarListaPedidos()

        console.log(pedido)

        if(pedido.ano != ''){
            console.log(pedidosFiltrados.filter(d => d.ano== pedido.ano))

        }
        if(pedido.mes != ''){
            console.log(pedidosFiltrados.filter(d => d.mes== pedido.mes))

        }
        if(pedido.dia != ''){
            console.log(pedidosFiltrados.filter(d => d.dia== pedido.dia))

        }
        if(pedido.tipo != ''){
            console.log(pedidosFiltrados.filter(d => d.tipo== pedido.tipo))

        }
        if(pedido.descricao != ''){
            console.log(pedidosFiltrados.filter(d => d.descricao== pedido.descricao))

        }

        return pedidosFiltrados
               
    }
    remover(id){
        localStorage.removeItem(id)
    }
}

let banco = new BancoDeDados
// class BancoDeDados{

//     constructor(){
//         let id = localStorage.getItem('id')

//         if(id === null){
//             localStorage.setItem('id', 0)
//         }
//     }
    
//     getProximoId(){
//         let proximoId = localStorage.getItem('id')
//         return parseInt(proximoId)+1 
//     }

//      gravar(d){
//         //localStorage.setItem('pedido',JSON.stringify(d))
//         let id = this.getProximoId()

//         localStorage.setItem(id, JSON.stringify(d))

//         localStorage.setItem('id',id)
//     }
// }
// let BancoDeDados = new BancoDeDados()



function cadastrarPedidos(){
   let ano = document.getElementById('ano')
   let mes =  document.getElementById('mes')
   let dia = document.getElementById('dia')
   let tipo = document.getElementById('tipo')
   let descricao =  document.getElementById('descricao')
   let valor =  document.getElementById('valor')

    let pedido = new Pedido(
        ano.value,
        mes.value,
        dia.value,
        tipo.value,
        descricao.value,
        valor.value,
    )

    if(pedido.validarDados()){
        banco.gravar(pedido)

        document.getElementById('modal_titulo').innerHTML = 'Registro inserido com sucesso!'
        document.getElementById('modal_conteudo').innerHTML = 'Pedido foi cadastrado'
        document.getElementById('modal_titulo_div').className = 'modal-header text-success'
        document.getElementById('modal_btn').innerHTML = 'Voltar'
        document.getElementById('modal_btn').className = 'btn btn success'

      $('#modalRegistraDespesa').modal('show')


      //limpar campos
        ano.value = ''
        mes.value = ''
        dia.value = ''
        tipo.value = ''
        descricao.value = ''
        valor.value = ''
    //BancoDeDados.gravar(pedido)
    //dialog de sucesso
    }else{
        document.getElementById('modal_titulo').innerHTML = 'Registro NÃO inserido'
        document.getElementById('modal_conteudo').innerHTML = '[ERRO] Pedido não foi cadastrado'
        document.getElementById('modal_titulo_div').className = 'modal-header text-danger'

        document.getElementById('modal_btn').innerHTML = 'Voltar'
        document.getElementById('modal_btn').className = 'btn btn danger'

        $('#modalRegistraDespesa').modal('show')

        console.log('dados invalidos')

        //dialog erro
    }
    
}

function carregaListaPedidos(pedidos = Array(),filtro = false){

    if(pedidos.length == 0 && filtro == false){
        pedidos = banco.recuperarListaPedidos()
    }

    let listaPedidos = document.getElementById('listaPedidos')
    listaPedidos.innerHTML = ''
//    console.log(pedidos)

    pedidos.forEach(function(d){
        //criando linha
        var linha = listaPedidos.insertRow()

        //criar colunas

        linha.insertCell(0).innerHTML = `${d.dia}/${d.mes}/${d.ano}` 

        //ajustar o tipo

        switch(d.tipo){
            case '1':d.tipo = 'Café Preto'
            break
            case '2':d.tipo = 'Café Americano'
            break
            case '3':d.tipo = 'Café com Leite'
            break
            case '4':d.tipo = 'Capputino'
            break
            case '5':d.tipo = 'Latte'
            break
            case '6':d.tipo = 'Macchiatto'
            break
            case '7':d.tipo = 'Mocha'
            break
            case '8':d.tipo = 'Café com sabor '
            break
            case '9':d.tipo = 'Café Gelado'
            break
            case '10':d.tipo = 'Frapputino'
            break

        }
        linha.insertCell(1).innerHTML = d.tipo 
        linha.insertCell(2).innerHTML = d.descricao 
        linha.insertCell(3).innerHTML = d.valor

        //criar o botao  de exclusao

        let btn = document.createElement('button')
        btn.className = 'btn btn-danger'
        btn.innerHTML = '<i class="fa fa-times"  ></i>'
        btn.id = `id_despesa_${d.id}`
        btn.onclick = function(){
			let id = this.id.replace('id_despesa_','')
			//alert(id)
			banco.remover(id)
			window.location.reload()
		}
        linha.insertCell(4).append(btn)
        console.log(d)

    })
}


function pesquisarPedido(){
    let ano = document.getElementById('ano').value
    let mes = document.getElementById('mes').value
    let tipo = document.getElementById('tipo').value
    let descricao = document.getElementById('descricao').value
    let valor = document.getElementById('valor').value

    let pedido  = new Pedido(ano,mes,tipo,descricao,valor)

    let pedidos = banco.pesquisar(pedido)

    this.carregaListaPedidos(pedidos,true)
    
      
}