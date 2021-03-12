//Crea un array con los totales de cada tipo
function creaArrayTotales(){
    arrayID.forEach(element => {arrayTotales.push(parseInt(element.totalTipo))})
}

//Pasa a mayuscula el array con los tipos ,solamente para mostrarlos en el grafico
function mayusculaTipos() {
    let mayuscula = tiposLabel.map(item => item.toUpperCase())
    return mayuscula
}


//Funcion que crea el grafico con ChartJs, con su nodo
function creaGrafico() {  

var ctx = document.getElementById("myChart").getContext('2d')

Chart.defaults.global.defaultFontSize = 11;
Chart.defaults.global.defaultFontFamily = 'Helvetica';
Chart.defaults.global.defaultFontColor = 'black';


creaArrayTotales()

var myChart = new Chart(ctx, {
    type: 'pie',
    data: {
        labels: mayusculaTipos(),
        datasets: [{
            label: '# of Votes',
            data: arrayTotales,
            backgroundColor: [
                
                '#D4E6F1',
                '#A9CCE3 ',
                '#7FB3D5',
                '#5499C7',
                '#2980B9',
                '#1F618D',
                '#1A5276', 
                '#154360'
            ],

            borderWidth: 2

        }]
    },
    options: {
        responsive : true,
        maintainAspectRatio: false,
        legend :{
            position : 'right',
            align : 'center',
            
            
        },
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                },
                display:false
            }]
        }
    }
});
}