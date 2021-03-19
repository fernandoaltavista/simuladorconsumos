//Funcion que carga en Array, todos los ID a utilizar para los eventos. Por ahora solo el de agregar y total
function cargaArrayEventos() {

    tipos.forEach(element => {
        arrayID.push(new IdTipos('#'+element,0,"#"+element+"-modal","#agregar-"+ element +"","#total-"+ element))
    });
}


function eventos() {

    arrayID.forEach(element => {
       
        $(element.idAgregar).click( (e)=> {         //Activa los eventos de agregar electrodomesticos
            imprimirOpcion(element.idTipo)
            scrollBoton()
        });

        resetModal(element.idModal)                 //Resetea selects si clickea boton de Cerrar del Modal
        
    })

}

function imprimirOpcion(tipo) {

    let electroOpcion = $(tipo + " option:selected")
    let cantidadOpcion = $(tipo + "-cantidad option:selected")
    let horasOpcion = $(tipo +"-horas option:selected")


    if (validaOpciones(electroOpcion,cantidadOpcion,horasOpcion)) {     

        let electroElegido = electroOpcion.text()

        let consumo = buscarPotencia(electroElegido)

        let tipoElegido = buscarTipo(electroElegido)

        let cantidadElegida = cantidadOpcion.text()

        let horasElegida = horasOpcion.val()
    
        let opcionElegida = new ElectroElegido(electroElegido,consumo,tipoElegido,cantidadElegida,horasElegida)

        arrayElectroElegidos.push(opcionElegida)

        
        creaListadoOpciones(tipo.slice(1),opcionElegida.electrodomestico,arrayElectroElegidos.length - 1) 
        
        actualizaTotales()                                                     
        
        habilitaBotonResultado()                                                    
        
        resetSelect(electroOpcion,horasOpcion,cantidadOpcion)                 
        
        
    }
}

function creaListadoOpciones(tipo,electro,indice) {

    let idElectroElegido =   tipo +"-"+ indice
    let idElectroBotonBorrar = (electro +"-"+ indice).replace(/\s+/g, '')
    idElectroBotonBorrar = idElectroBotonBorrar.replace(/[.'']/g,'')
    
        nuevoElegido(tipo,idElectroElegido,electro,idElectroBotonBorrar,indice)
       
        $("#"+idElectroBotonBorrar).click(function (e) { 

            borrarElegidos(idElectroElegido,indice)
            actualizaTotales()                             
            renderizaTablero()
        });    
        
}

//Funcion que actualiza todo el array de electrdomesticos elegidos (AB)
function actualizaTotales() {

incializa()

let existeListaVacia = arrayElectroElegidos.every(item => item == 0)    //Si hay todos 0 (elementos eliminados), devuelve true
                                                                        
    if (!existeListaVacia) {
        arrayID.forEach(element1 => {
            arrayElectroElegidos.forEach(element2 =>{

                if ((element1.idTipo) == ("#"+element2.tipo)){
                    element1.totalTipo += (parseInt(element2.operacion()))                    
                    mostrarTotalesPorTipo(element2.tipo,((parseInt(element1.totalTipo))+ " KWH"))
                }
            })
                mostrarTotalesPorTipo(element1.idTipo.slice(1),((parseInt(element1.totalTipo)) + " KWH"))
            
            
        })

    } else {                                                            //Incializa todo
        arrayID.forEach(element => {
            element.totalTipo = 0
            mostrarTotalesPorTipo((element.idTipo).slice(1),(0 + " KWH"))
            $("#botonResultado").prop("disabled",true)  //Desabilita boton resultado cuando esta todo en 0
            arrayElectroElegidos= [ ]           //Inicializa el array de Electrodomesticos elegidos
        });
    }
    renderizaTablero()
}


//Funcion suma total de todos los electrodomesticos elegidos menos los elementos elimiandos (los que estan en 0)
function sumaTotal() {


    for (let i = 0; i < arrayElectroElegidos.length; i++) { 
        if (arrayElectroElegidos[i] !== 0 ){                    //Elementos eliminados
        totalConsumo = parseInt(totalConsumo) + parseInt(arrayElectroElegidos[i].operacion())
        }
    }

    localStorage.setItem('total',totalConsumo)       //Guarda en localStorage consumo total
    
    return totalConsumo
}


//Funcion que crea el elemento elegido y lo muestra
function nuevoElegido(tipo,id,nombre,idBoton,indice) {
    $("#"+tipo + "-objeto").append("<div id="+id+"></div>")
    $("#"+id).hide().append('<p class="d-block m-0">'+ nombre +'</p>').fadeIn();  
 
    $("#"+id).addClass("p-2 m-2 bg-opcion")
    $("#"+id).append('<input type= "button" class="ml-2 btn btn-danger d-block botonBorrar" id="'+ idBoton+'" value=""></input>') 
    $('#'+id +'> p').css('cursor', 'pointer')
    tippy('#'+id +'> p' ,{
        content :   `Consumo: ${arrayElectroElegidos[indice].consumo} watts,
                    Cantidad: ${arrayElectroElegidos[indice].cantidad} ,
                    Uso Diario: ${arrayElectroElegidos[indice].horas} horas`,  
    })
}  


function mostrarTotalesPorTipo(id,mensaje) {
    $("#total-"+id).text(mensaje)
}


function renderizaTablero() {
    arrayID.forEach(element => {

        if (element.totalTipo !== 0 ) {
            $(element.idTipo+"-contenedor").removeClass("bg-contenedor");
            $(element.idTipo+"-contenedor").addClass("bg-contenedor-elegido");
            
        } else{
            $(element.idTipo+"-contenedor").addClass("bg-contenedor");
            $(element.idTipo+"-contenedor").removeClass("bg-contenedor-elegido");
        }
    });
}

function borrarElegidos(idBorrar,indiceBorrar) {  

    borraElemento("#"+idBorrar)
    arrayElectroElegidos[indiceBorrar] = 0              //Coloca un 0 en el elemento eliminado
}

function buscarPotencia(electro) {

    let indice = (listadoElectrodomesticos.findIndex(item => (item.nombre === electro)))
    return (listadoElectrodomesticos[indice].consumo)
}


function buscarTipo(electro) {
    
    let indice = (listadoElectrodomesticos.findIndex(item => (item.nombre === electro)))
    return (listadoElectrodomesticos[indice].tipo)
}


function habilitaBotonResultado() {
   if (arrayID.some(item => item.totalTipo !== 0)) {
        $("#botonResultado").prop("disabled",false)
    }
}


function borraElemento(id) { 
    $(id).slideUp(800,()=>{$(id).remove()})
}


function incializa() {
    arrayID.forEach(element => {
        element.totalTipo = 0 
    });
}

function scrollBoton() {
    $('html,body').animate({
        scrollTop: $("#botonResultado").offset().top })
}
function scrollInicio() {
    $("html, body").animate({ scrollTop: 0 })
}

function validaOpciones(param1,param2,param3) {
    
    if ( (param1.val() == "seleccione") ) {
        $(param1.parent()).notify("No ingreso el electrodomestico",{autoHideDelay: 2500,hideDuration:500})
        return false
    }
    
    if ( (param2.val() == "seleccione") ){
        $(param2.parent()).notify("No ingreso cantidad",{autoHideDelay: 2500,hideDuration:500})
        return false
    }


    if ( (param3.val() == "seleccione") ){
        $(param3.parent()).notify("No ingreso horas",{autoHideDelay: 2500,hideDuration:500})
        return false
    }
    return true
}


function resetSelect(param1,param2,param3) {
    param1.parent().prop('selectedIndex',0)
    param2.parent().prop('selectedIndex',0)
    param3.parent().prop('selectedIndex',0)
}



function resetModal(id) {
    $(id).on("hidden.bs.modal", ()=> { 
        $('option').parent().prop('selectedIndex',0)
    })
}

//Funcion que limpia el array para antes de sumar todo.
function limpiaArrayElectroElegidos(){
    arrayElectroElegidos.forEach(element => {
        if (element === 0){
            arrayElectroElegidos.splice(element.indexOf(),1)
        }
    });
}


function sumaLocalStorage() {
    scrollInicio()
    $("#botonResultado").prop("disabled",true) 
    if ( ((localStorage.getItem('total')) == 0) || ((localStorage.getItem('total')) == null)  )  {  //Coloque 0 o null por algun navegador
        localStorage.setItem('total',totalConsumo)
        $.notify("Bienvenido a su primer calculo","success")
        
    } else {
        $.notify("Su ultimo consumo: " + localStorage.getItem('total')+" KWH","info")
        
    }

}