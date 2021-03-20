function mayusculaTipos() {
    let mayuscula = tiposLabel.map(item => item.toUpperCase())
    return mayuscula
}

function creaGrafico() {  

arrayID.forEach(element => {totalesTipo.push(parseInt(element.totalTipo))})

var options = {
    series: totalesTipo,
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
    position: 'bottom',
    horizontalAlign: 'center',
    fontSize: '9px'
  }
  };

  var chart = new ApexCharts(document.querySelector("#chart"), options);
  chart.render();
}