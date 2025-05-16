Highcharts.theme = {
  colors: ['#00FF99', '#009966', '#ff0066', '#ffcc00', '#6600ff', '#33cc33'],
  chart: {
      backgroundColor: '#0b1d15',
      style: {
          fontFamily: '\'Poppins\', sans-serif'
      },
      plotBorderColor: '#606063'
  },
  title: {
      style: {
          color: '#E0E0E3',
          textTransform: 'uppercase',
          fontSize: '20px'
      }
  },
  subtitle: {
      style: {
          color: '#E0E0E3',
          textTransform: 'uppercase'
      }
  },
  xAxis: {
      gridLineColor: '#707073',
      labels: {
          style: {
              color: '#E0E0E3'
          }
      },
      lineColor: '#707073',
      minorGridLineColor: '#505053',
      tickColor: '#707073',
      title: {
          style: {
              color: '#A0A0A3'
          }
      }
  },
  yAxis: {
      gridLineColor: '#707073',
      labels: {
          style: {
              color: '#E0E0E3'
          }
      },
      lineColor: '#707073',
      minorGridLineColor: '#505053',
      tickColor: '#707073',
      tickWidth: 1,
      title: {
          style: {
              color: '#A0A0A3'
          }
      }
  },
  tooltip: {
      backgroundColor: 'rgba(0, 0, 0, 0.85)',
      style: {
          color: '#F0F0F0'
      }
  },
  plotOptions: {
      series: {
          dataLabels: {
              color: '#F0F0F3',
              style: {
                  fontSize: '13px'
              }
          },
          marker: {
              lineColor: '#333'
          }
      },
      boxplot: {
          fillColor: '#505053'
      },
      candlestick: {
          lineColor: 'white'
      },
      errorbar: {
          color: 'white'
      }
  },
  legend: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      itemStyle: {
          color: '#E0E0E3'
      },
      itemHoverStyle: {
          color: '#FFF'
      },
      itemHiddenStyle: {
          color: '#606063'
      },
      title: {
          style: {
              color: '#C0C0C0'
          }
      }
  },
  credits: {
      style: {
          color: '#666'
      }
  },
  labels: {
      style: {
          color: '#707073'
      }
  },
  drilldown: {
      activeAxisLabelStyle: {
          color: '#F0F0F3'
      },
      activeDataLabelStyle: {
          color: '#F0F0F3'
      }
  },
  navigation: {
      buttonOptions: {
          symbolStroke: '#DDDDDD',
          theme: {
              fill: '#505053'
          }
      }
  },
  rangeSelector: {
      buttonTheme: {
          fill: '#505053',
          stroke: '#000000',
          style: {
              color: '#CCC'
          },
          states: {
              hover: {
                  fill: '#707073',
                  stroke: '#000000',
                  style: {
                      color: 'white'
                  }
              },
              select: {
                  fill: '#000003',
                  stroke: '#000000',
                  style: {
                      color: 'white'
                  }
              }
          }
      },
      inputBoxBorderColor: '#505053',
      inputStyle: {
          backgroundColor: '#333',
          color: 'silver'
      },
      labelStyle: {
          color: 'silver'
      }
  },
  navigator: {
      handles: {
          backgroundColor: '#666',
          borderColor: '#AAA'
      },
      outlineColor: '#CCC',
      maskFill: 'rgba(255,255,255,0.1)',
      series: {
          color: '#7798BF',
          lineColor: '#A6C7ED'
      },
      xAxis: {
          gridLineColor: '#505053'
      }
  },
  scrollbar: {
      barBackgroundColor: '#808083',
      barBorderColor: '#808083',
      buttonArrowColor: '#CCC',
      buttonBackgroundColor: '#606063',
      buttonBorderColor: '#606063',
      rifleColor: '#FFF',
      trackBackgroundColor: '#404043',
      trackBorderColor: '#404043'
  }
};

Highcharts.setOptions(Highcharts.theme);

document.addEventListener('DOMContentLoaded', init);

function init() {
const apiUrl = 'http://localhost:8000/0322103675/valores';
const rfidUrl = 'http://localhost:8000/0322103675/rfid';

fetchData(apiUrl, displaySensorData);
fetchData(rfidUrl, displayRFIDData);

setInterval(() => {
  fetchData(apiUrl, updateSensorData);
  fetchData(rfidUrl, updateRFIDData);
}, 5000); // Fetch data every 5 seconds
}

function fetchData(url, callback) {
fetch(url)
  .then(response => response.json())
  .then(data => {
    console.log(data);
    callback(data.data);
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });
}

let temperatureChart, humidityChart, lightChart;
let temperatureGauge, humidityGauge, lightGauge;

function displaySensorData(sensorData) {
sensorData.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp)); // Ordenar por timestamp ascendente

temperatureChart = Highcharts.chart('temperatureChart', {
  chart: {
    type: 'line',
    height: 250
  },
  title: {
    text: 'Temperatura'
  },
  xAxis: {
    categories: sensorData.map(data => data.timestamp)
  },
  yAxis: {
    title: {
      text: 'Temperatura (°C)'
    }
  },
  series: [{
    name: 'Temperatura',
    data: sensorData.map(data => data.temperature)
  }]
});

humidityChart = Highcharts.chart('humidityChart', {
  chart: {
    type: 'line',
    height: 250
  },
  title: {
    text: 'Humedad'
  },
  xAxis: {
    categories: sensorData.map(data => data.timestamp)
  },
  yAxis: {
    title: {
      text: 'Humedad (%)'
    }
  },
  series: [{
    name: 'Humedad',
    data: sensorData.map(data => data.humidity)
  }]
});

lightChart = Highcharts.chart('lightChart', {
  chart: {
    type: 'line',
    height: 250
  },
  title: {
    text: 'Luz'
  },
  xAxis: {
    categories: sensorData.map(data => data.timestamp)
  },
  yAxis: {
    title: {
      text: 'Luz (lux)'
    }
  },
  series: [{
    name: 'Luz',
    data: sensorData.map(data => data.light)
  }]
});

temperatureGauge = Highcharts.chart('temperatureGauge', {
  chart: {
    type: 'solidgauge',
    height: 200
  },
  title: null,
  pane: {
    center: ['50%', '85%'],
    size: '170%',
    startAngle: -90,
    endAngle: 90,
    background: {
      backgroundColor: '#EEE',
      innerRadius: '60%',
      outerRadius: '100%',
      shape: 'arc'
    }
  },
  yAxis: {
    min: 0,
    max: 60,
    title: {
      text: 'Temperatura',
      y:30
    },
    labels: {
      style: {
        color: 'black'
      }
    }
  },
  series: [{
    name: 'Temperatura',
    data: [sensorData[sensorData.length - 1].temperature],
  }]
});

humidityGauge = Highcharts.chart('humidityGauge', {
  chart: {
    type: 'solidgauge',
    height: 200
  },
  title: null,
  pane: {
    center: ['50%', '85%'],
    size: '170%',
    startAngle: -90,
    endAngle: 90,
    background: {
      backgroundColor: '#EEE',
      innerRadius: '60%',
      outerRadius: '100%',
      shape: 'arc'
    }
  },
  yAxis: {
    min: 0,
    max: 100,
    title: {
      text: 'Humedad',
      y:30
    },
    labels: {
      style: {
        color: 'black'
      }
    }
  },
  series: [{
    name: 'Humedad',
    data: [sensorData[sensorData.length - 1].humidity],
  }]
});

lightGauge = Highcharts.chart('lightGauge', {
  chart: {
    type: 'solidgauge',
    height: 200
  },
  title: null,
  pane: {
    center: ['50%', '85%'],
    size: '170%',
    startAngle: -90,
    endAngle: 90,
    background: {
      backgroundColor: '#EEE',
      innerRadius: '60%',
      outerRadius: '100%',
      shape: 'arc'
    }
  },
  yAxis: {
    min: 0,
    max: 4094,
    title: {
      text: 'Luz',
      y:30
    },
    labels: {
      style: {
        color: 'black'
      }
    }
  },
  series: [{
    name: 'Luz',
    data: [sensorData[sensorData.length - 1].light],
  }]
});
}

function updateSensorData(sensorData) {
sensorData.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp)); // Ordenar por timestamp ascendente

const timestamps = sensorData.map(data => data.timestamp);
const temperatures = sensorData.map(data => data.temperature);
const humidities = sensorData.map(data => data.humidity);
const lightLevels = sensorData.map(data => data.light);

temperatureChart.xAxis[0].setCategories(timestamps);
temperatureChart.series[0].setData(temperatures);

humidityChart.xAxis[0].setCategories(timestamps);
humidityChart.series[0].setData(humidities);

lightChart.xAxis[0].setCategories(timestamps);
lightChart.series[0].setData(lightLevels);

temperatureGauge.series[0].setData([temperatures[temperatures.length - 1]]);
humidityGauge.series[0].setData([humidities[humidities.length - 1]]);
lightGauge.series[0].setData([lightLevels[lightLevels.length - 1]]);
}

let rfidTableBody;

function displayRFIDData(rfidData) {
rfidData.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp)); // Ordenar por timestamp ascendente

const rfidTableContainer = document.getElementById('rfidTableContainer');
const table = document.createElement('table');

const thead = document.createElement('thead');
const headerRow = document.createElement('tr');
const headers = ['Timestamp', 'Employee Number', 'Employee Name', 'Employee Position'];
headers.forEach(headerText => {
  const th = document.createElement('th');
  th.textContent = headerText;
  headerRow.appendChild(th);
});
thead.appendChild(headerRow);
table.appendChild(thead);

rfidTableBody = document.createElement('tbody');
rfidData.slice(-10).forEach(row => {
  const tr = document.createElement('tr');
  tr.innerHTML = `
    <td>${row.timestamp}</td>
    <td>${row.employee_number}</td>
    <td>${row.employee_name}</td>
    <td>${row.employee_position}</td>
  `;
  rfidTableBody.appendChild(tr);
});
table.appendChild(rfidTableBody);

rfidTableContainer.appendChild(table);
}

function updateRFIDData(rfidData) {
rfidData.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp)); // Ordenar por timestamp ascendente

rfidTableBody.innerHTML = '';
rfidData.slice(-10).forEach(row => {
  const tr = document.createElement('tr');
  tr.innerHTML = `
    <td>${row.timestamp}</td>
    <td>${row.employee_number}</td>
    <td>${row.employee_name}</td>
    <td>${row.employee_position}</td>
  `;
  rfidTableBody.appendChild(tr);
});
}

function openDoor() {
fetch('http://localhost:8000/open-door', {
  method: 'POST'
})
.then(response => response.json())
.then(data => {
  console.log('Door opened:', data);
})
.catch(error => {
  console.error('Error opening door:', error);
});
}

function closeDoor() {
fetch('http://localhost:8000/close-door', {
  method: 'POST'
})
.then(response => response.json())
.then(data => {
  console.log('Door closed:', data);
})
.catch(error => {
  console.error('Error closing door:', error);
});
}
