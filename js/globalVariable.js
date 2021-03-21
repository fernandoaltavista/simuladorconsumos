let totalConsumo = 0 

let tipos = ["iluminacion","climatizacion","refrigeracion","cocina","agua","linea","electronica","cuidado"]
let tiposLabel = ["iluminacion","climatizacion","refrigeracion","cocina","agua","linea blanca","electronica","cuidado personal"]
let listadoElectrodomesticos = [  ]  
let arrayCantidad=[ ]
let arrayHoras = [  ]
let arrayElectroElegidos = [ ] 
let arrayID = [ ]  
let totalesTipo = [  ]   


function Electrodomestico(nombre,consumo,tipo) {       
    this.nombre = nombre
    this.consumo = consumo
    this.tipo = tipo
}

function ElectroElegido(electrodomestico,consumo,tipo,cantidad,horas) {

const diasMes = 30.4
    this.electrodomestico = electrodomestico
    this.consumo = consumo   //Consumo calculado en Wh
    this.tipo = tipo
    this.cantidad = cantidad
    this.horas = horas
    this.operacion = function() {              
        return  (((this.consumo * this.horas) / 1000)*this.cantidad)* diasMes  } 
}


function IdTipos(idTipo,totalTipo,idModal,idAgregar,idTotal){

    this.idTipo = idTipo
    this.totalTipo = totalTipo       //TOTAL POR TIPO (SUMA)
    this.idModal = $(idModal)                          
    this.idAgregar = $(idAgregar)
    this.idTotal = $(idTotal)
}

