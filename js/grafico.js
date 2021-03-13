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


creaArrayTotales()

var options = {
    series: arrayTotales,
    chart: {
    width: '100%',
    type: 'pie',
  },
  labels: mayusculaTipos(),
  theme: {
    monochrome: {
      enabled: true
    }
  },
  plotOptions: {
    pie: {
      dataLabels: {
        offset: -5
      }
    }
  },
  dataLabels: {
    formatter(val, opts) {
      const name = opts.w.globals.labels[opts.seriesIndex]
      return [name, val.toFixed(1) + '%']
    }
  },
  legend: {
    show: true,
    position: 'bottom'
  }
  };

  var chart = new ApexCharts(document.querySelector("#chart"), options);
  chart.render();
}