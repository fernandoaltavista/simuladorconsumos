
//Funcion que carga arrays de numeros ,pasado por parametro
function cargaArray(arrayIngresado,total) {

    for (let i = 0; i < total; i++) {
    let valor = i + 1

    arrayIngresado.push(valor)
    }
}

//Funcion que carga Electrodomesticos en objeto y luego cada objeto en un array
function cargaListadoElectrodomesticos(){
    
electro.artefactos.forEach(element => {
    let nombreElectro = (element.electro)
    let consumoElectro = (element.consumo)
    let tipoElectro = (element.tipo)

    listadoElectrodomesticos.push(new Electrodomestico(nombreElectro,consumoElectro,tipoElectro))
});

}


//Funcion que carga los electros por tipo pasado por parametro en un select
function cargaSelectElectro(id) {

        listadoElectrodomesticos.forEach(element => {
            if (element.tipo == id){           //Le saca el numeral(#) para comparalo con tipo de Objeto
                $("#"+id).append($('<option>', {

                text: element.nombre
                }))

        }

    });

}

//Funcion que ordena un array
function ordenarArray(array){

    array.sort(function(a,b){
        if (a.nombre > b.nombre) {
            return 1;
        }
        if (a.nombre < b.nombre) {
            return -1;
        }
            return 0;

        
    })
}

//Funcion que carga los arrays de Cantidad y Horas en el select por clase
function cargaSelectNumeros(clase,array) {
    array.forEach(element => {
        if (clase == ".horas"){
            $(clase).append($('<option>',{text: element+" Hs.",value:element}));
        } else{
            $(clase).append($('<option>',{text: element}));
        }
        
    });
}

//Funcion que carga solamente el valor 24 en select de Refrigeracion
function cargaSelectHorasRefrigeracion() {  
    $(".horasRefrigeracion").append($('<option>',{text: 24 +" Hs",value :24}));
}

function cargaArrayHorasCantidad() {
    
    cargaSelectNumeros(".cantidad",arrayCantidad)
    cargaSelectNumeros(".horas",arrayHoras)
    cargaSelectHorasRefrigeracion()
}


function cargaSelectArtefactos() {
    tipos.forEach(element => {
        cargaSelectElectro(element)
    });
}


//Funcion general que carga todos los arrays a utilizar
function cargarDatos(){
    const cantidadElectrodomesticos = 15
    const cantidadHoras = 24

        cargaListadoElectrodomesticos()
        // cargaArrayEmpresas()
        ordenarArray(listadoElectrodomesticos) 

        cargaArray(arrayCantidad,cantidadElectrodomesticos)
        cargaArray(arrayHoras,cantidadHoras)

}



