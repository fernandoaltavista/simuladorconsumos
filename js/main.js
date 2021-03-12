$(document).ready(function(){

    sumaLocalStorage()                 //Incializa en localStorage la suma anterior , y sino te da la bievenida
    
    cargarDatos()                    //Carga todos los datos desde el archivo listado-json.js y demas datos
    
    cargaSelectArtefactos()         //Carga todos los select segun el tipo

    cargaArrayHorasCantidad()      //Carga los select de cantidad y horas

    cargaArrayEventos()             //Funcion que carga en Array, todos los ID a utilizar para los eventos

    eventos()                       //Activa los eventos que realiza las operaciones de consumo

})

    imprimirTotal()                 //Imprime en pantalla el total del consumo mediante un boton



