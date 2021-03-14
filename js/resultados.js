
function cargarIconosEmpresa(listado){
    $("#importe").after($(`<div id='iconosEmpresas' class='text-center p-3 border'></div>`))
    listado.forEach(element => {
        $("#iconosEmpresas").append($('<img>', {
            src: element.icon,
            class:'iconos m-2',
            id : element.nombre,
            }));
            $('#'+element.nombre).css('cursor', 'pointer');

            $('#'+element.nombre).hover(function () {
                   
                    $('#'+element.nombre).addClass('iconosEmpresas');
                }, function () {
                    $('#'+element.nombre).removeClass('iconosEmpresas');
                
                }
            );
    });
     
}



function calculoEnPesos(indice,listado) {
let sumaEnPesos = listado[indice].cargoFijo + (listado[indice].tarifa * totalConsumo)
let impuesto = sumaEnPesos * listado[indice].impuesto
let sumaTotalPesos = sumaEnPesos + impuesto
let icon = listado[indice].icon
const advertencia = "https://www.nicepng.com/png/detail/348-3484341_signos-de-interrogacin-signo-de-pregunta-fondo-azul.png"
$("#iconosEmpresas").after($("<div id='calculo' class='text-center d-block p-3'></div>"));

$("#calculo").append(`<h3 class='d-block py-2 consumoTotal'>IMPORTE MENSUAL ESTIMADO: $`+sumaTotalPesos.toFixed(2)+`<img src=`+advertencia+` height="20px" id="signo" class="ml-2"></img></h3>
                            <img src=`+icon+` height="100px" class="py-2"></img>
                        `).fadeIn(1000);
tippy("#signo",{content: 'No estan incluidos los impuestos municipales ni alumbrado publico.Valores correspondiente a tarifa T1R'}
)}


function cargaTarifas() {

    $.ajax({
        type: "GET",
        url: "./tarifas.json",
        dataType: "json",
      
    })
    .done((listado)=> {
        cargarIconosEmpresa(listado.empresas)
        $("body").on('click', '#iconosEmpresas img', function() {
            let opcion = ($(this).attr('id'))
            let indice = (listado.empresas).findIndex(item=> item.nombre === opcion)
            calculoEnPesos(indice,listado.empresas)
            borraElemento("#importe")
            borraElemento("#iconosEmpresas")
            alertasClimaticas(indice,listado.empresas)
        });
        
    })
    .fail(()=> {
        borraElemento("#importe")
        $.notify("Error ","error")
    })
 
}

function alertaLluvias(codClima,clima) {

    if ((codClima.id===500) || (codClima.id===504) || (codClima.id===522) || (codClima.id===531)){

        Swal.fire({
            title: 'En '+ clima.name + ' tené presente estos consejos ante cualquier riesgo eléctrico en la vía pública',
            text: 'Si comienza a entrar agua en tu casa o establecimiento, cortá la luz accionando la llave térmica o el interruptor general.',
            imageUrl: 'http://openweathermap.org/img/wn/'+codClima.icon+'.png',
            imageWidth: 60,
            imageHeight: 60,
          })
    }
}


function alertaTormentas(codClima,clima) {
    if ((codClima.id===211) || (codClima.id===212) || (codClima.id===221) || (codClima.id===202)){

        Swal.fire({
            title: 'En '+ clima.name + ' tené presente este consejo.',
            text: 'Si comienza a entrar agua en tu casa o establecimiento, cortá la luz accionando la llave térmica o el interruptor general.',
            imageUrl: 'http://openweathermap.org/img/wn/'+codClima.icon+'.png',
            imageWidth: 60,
            imageHeight: 60,
          })
    }
}

function alertaAltasTemperaturas(codClima,temp,clima) {
    if (temp.toFixed() > 30){
        Swal.fire({
            title: `En ${clima.name} hace ${temp.toFixed()}º tené presente este consejo.`,
            text: 'Regulá los aparatos de aire acondicionado en 24° cuando haga calor. Por cada grado inferior a esa temperatura, el consumo aumenta entre un 5% y 7%.',
            imageUrl: 'http://openweathermap.org/img/wn/'+codClima.icon+'.png',
            imageWidth: 60,
            imageHeight: 60,
          })
    }
}

function alertasClimaticas(indice,listado){
    const id = listado[indice].idCiudad
    const key = "de881c07d95369b3e22b33fe91e740db"
        $.ajax({
            type: "GET",
            url: "https://api.openweathermap.org/data/2.5/weather?id="+id+"&appid="+key+"&units=metric&lang=es",
            dataType: "json",
        
        })
        .done((clima)=> {
            let codClima = clima.weather[0]
            let temp = clima.main.temp_max
            alertaLluvias(codClima,clima)
            alertaTormentas(codClima,clima)
            alertaAltasTemperaturas(codClima,temp,clima)
        })
        .fail(()=> {
            
            $.notify("Error.El servidor no responde ","error")
        })

}


function imprimirTotal(){

    $("#botonResultado").click(()=> { 
    // $('html,body').animate({scrollTop: $("body").offset().top});
        $("#tablero").slideUp(1000,()=>{$("#tablero").remove()})
        borraElemento("#botonResultado")
        

        $("#total-general").after($(    `<div class="container-fluid">
        <div class="row justify-content-center align-items-center">
            <div class="col-md-6 d-block" >
                <h2 id="totalGeneral" class="consumoTotal py-2 mb-2 text-center">CONSUMO TOTAL MENSUAL  `+ sumaTotal() + ` KWH</h2>
                <label id="importe" class="form-label d-block border-top" >Seleccione la empresa para calcular su factura</label>
            </div> 
            <div class="col-md-6 border grafico" id="resultado">
                <div id="chart"></div>
                
            </div> 
            
            <div class="col-12 py-1"  style="bottom:0 right:0;" >
                <input type="button" id="reiniciar" class= "btn btn-primary botonHome" value="" onclick="location.reload()"></input>
            </div> 
        </div>  
    </div>
        `))

        creaGrafico()
        cargaTarifas()
    })
    
}
