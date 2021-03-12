let listadoElectrodomesticos = [     ]  //Array que guarda todos los electrodomesticos del JSON
let arrayCantidad=[     ]
let arrayHoras = [      ]

//Array con tipos de electrodomesticos
let tipos = ["iluminacion","climatizacion","refrigeracion","cocina","agua","linea","electronica","cuidado"]
let tiposLabel = ["iluminacion","climatizacion","refrigeracion","cocina","agua","linea blanca","electronica","cuidado personal"]

let totalConsumo = 0 //Variable Global Suma Total

let arrayElectroElegidos = [    ] //Array donde guarda los objetos de electro elegidos,para que luego se pueda borrar en caso que no se utilice

let arrayID = [ ]   //Array donde guarda objetos con los ID de cada tipo de electrodomestico para direccionar en el DOM

let arrayTotales = [    ]       //Array que guarda los totales de cada tipo

//Objeto Electrodomestico creado para el ARRAY PRINCIPAL sacado del archivo listado-Json
function Electrodomestico(nombre,consumo,tipo) {       
    this.nombre = nombre
    this.consumo = consumo
    this.tipo = tipo
    
}

//Objeto creado con el electrodomestico elegido con los atributos y su operacion
function ElectroElegido(electrodomestico,consumo,tipo,cantidad,horas){

const diasMes = 30.4
    this.electrodomestico = electrodomestico
    this.consumo = consumo   //Consumo calculado en Wh
    this.tipo = tipo
    this.cantidad = cantidad
    this.horas = horas
    this.operacion = function() {              
        return  (((this.consumo * this.horas) / 1000)*this.cantidad)*diasMes  }   //Realiza operacion y trunca para que queden 3 decimales
}


//Objeto de eventos donde contiene cada ID a donde direccionar en el DOM. Por ahora solo agregar y total
function IdTipos(idTipo,totalTipo,idModal,idAgregar,idTotal){

    this.idTipo = idTipo
    this.totalTipo = totalTipo       //TOTAL POR TIPO (SUMA)
    this.idModal = $(idModal)                          
    this.idAgregar = $(idAgregar)
    this.idTotal = $(idTotal)
}

