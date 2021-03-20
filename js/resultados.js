
function cargarIconosEmpresa(listado) {
    $("#importe").after($(`<div id='iconosEmpresas' class='text-center p-3 border'></div>`))
    listado.forEach(element => {
        $("#iconosEmpresas").append($('<img>', {
            src: element.icon,
            class:'iconos m-2',
            id : element.nombre,
            }));
            $('#'+element.nombre).css('cursor', 'pointer');

            $('#'+element.nombre).hover(()=> {

                    $('#'+element.nombre).addClass('iconosEmpresas');
                },()=> {
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

const advertencia = "/icon/round_priority_high_white_18dp.png"

$("#totalGeneral").after($("<div id='calculo' class='text-center d-block p-3 border-bottom'></div>"))

$("#calculo").append(   `<h3 class='d-block py-2 consumoTotal'>IMPORTE MENSUAL ESTIMADO: $`+ sumaTotalPesos.toFixed(2) +
                            `<img src=`+advertencia+` id="signo" class="btn botonGeneral ml-2"></img></h3>
                        <img src=`+ icon +` height="110px" class="py-2"></img>
                        `)

$('#signo').css('cursor', 'pointer');
tippy("#signo",{content: 'No estan incluidos los impuestos municipales ni alumbrado publico. Valores correspondiente a tarifa T1R',
                animation: 'scale',}
)}


function facturacionYAlertas() {

    $.ajax({
        type: "GET",
        url: "../json/tarifas.json",
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

const existeLluvia = ((codClima.id===503) || (codClima.id===504) || (codClima.id===522) || (codClima.id===531))

    if (existeLluvia) {

        Swal.fire({
            title: 'En '+ clima.name + ' tené presente estos consejos ante lluvias intensas',
            text:   `Si comienza a entrar agua en tu casa o establecimiento, cortá la luz accionando 
                    la llave térmica o el interruptor general.`,
            imageUrl: 'http://openweathermap.org/img/wn/'+codClima.icon+'.png',
            imageWidth: 60,
            imageHeight: 60,
            backdrop: 'rgba(15,92,193,0.4)'
          })
    }
}


function alertaTormentas(codClima,clima) {

const existeTormenta = ((codClima.id===211) || (codClima.id===212) || (codClima.id===221) || (codClima.id===202))
    if (existeTormenta) {
        Swal.fire({
            title: 'En '+ clima.name + ' tené presente este consejo ante tormentas electricas.',
            text: `Si comienza a entrar agua en tu casa o establecimiento, cortá la luz accionando
                    la llave térmica o el interruptor general.`,
            imageUrl: 'http://openweathermap.org/img/wn/'+ codClima.icon +'.png',
            imageWidth: 60,
            imageHeight: 60,
            backdrop: 'rgba(5,8,203,0.6)'
            
          })
    }
}

function alertaAltasTemperaturas(codClima,temp,clima) {
const altaTemperatura = 32
const existeAltaTemperatura = (temp.toFixed() > altaTemperatura)

    if (existeAltaTemperatura) {
        Swal.fire({
            title: `En ${clima.name} hace ${temp.toFixed()}º tené presente este consejo.`,
            text:   `Regulá los aparatos de aire acondicionado en 24° cuando haga calor. 
                    Por cada grado inferior a esa temperatura, el consumo aumenta entre un 5% y 7%.`,
            imageUrl: 'http://openweathermap.org/img/wn/'+codClima.icon+'.png',
            imageWidth: 60,
            imageHeight: 60,
            backdrop: 'rgba(228,1,1,0.4)'
          })
    }
}

function alertasClimaticas(indice,listado) {
    const id = listado[indice].idCiudad
    const key = "de881c07d95369b3e22b33fe91e740db"
        $.ajax({
            type: "GET",
            url: "https://api.openweathermap.org/data/2.5/weather?id="+ id +"&appid="+ key +"&units=metric&lang=es",
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

function imprimirTotal() {
    
    $("#botonResultado").click(()=> { 

        $("#tablero").slideUp(1000,()=>{ $("#tablero").remove() })
        borraElemento("#botonResultado")
        borraElemento("#total-general > p")
        scrollInicio()
        $("#total-general").after($(    `<div class="container-fluid mt-5">
        <div class="row justify-content-center mb-2 align-items-center">
            <div class="col-md-6 d-block">
                <label id="importe" class="form-label d-block" >3) Seleccione la empresa para calcular su factura</label> 
                <h2 id="totalGeneral" class="consumoTotal py-3 mt-3 text-center">CONSUMO TOTAL MENSUAL  `+ sumaTotal() + ` KWH</h2>
            </div> 
            <div class="col-md-6 grafico" id="resultado">
                <div id="chart"></div>
                
            </div> 
            
            <div class="col-12 py-1"  style="bottom:0 right:0;" >
                <input type="button" id="reiniciar" class= "btn material-icons-round botonHome" value="" onclick="location.reload()"></input>
            </div> 
        </div>  
    </div>
        `))
        creaGrafico()
        facturacionYAlertas()
    })
    
}
