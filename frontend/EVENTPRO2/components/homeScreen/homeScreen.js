function getRandomData(length, max = 100) {
    return Array.from({ length }, () => Math.floor(Math.random() * max));
}

function updateCharts() {
    Highcharts.charts[0].series[0].setData(getRandomData(6));
    Highcharts.charts[0].series[1].setData(getRandomData(6));
    Highcharts.charts[1].series[0].setData(getRandomData(6, 20));
    Highcharts.charts[2].series[0].setData(getRandomData(4, 30));
    Highcharts.charts[3].series[0].setData([
        { name: 'Enero', y: Math.floor(Math.random() * 10000) },
        { name: 'Febrero', y: Math.floor(Math.random() * 10000) },
        { name: 'Marzo', y: Math.floor(Math.random() * 10000) },
        { name: 'Abril', y: Math.floor(Math.random() * 10000) },
        { name: 'Mayo', y: Math.floor(Math.random() * 10000) },
        { name: 'Junio', y: Math.floor(Math.random() * 10000) }
    ]);
    Highcharts.charts[4].series[0].setData(getRandomData(6, 100));
    Highcharts.charts[4].series[1].setData(getRandomData(6, 100));
}

Highcharts.setOptions({
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
});

export function init() {
    Highcharts.chart('events-summary', {
        chart: {
            type: 'line'
        },
        title: {
            text: 'Resumen de Eventos'
        },
        xAxis: {
            categories: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio']
        },
        yAxis: {
            title: {
                text: 'Número de Eventos'
            }
        },
        series: [{
            name: 'Eventos Próximos',
            data: getRandomData(6)
        }, {
            name: 'Eventos Recientes',
            data: getRandomData(6)
        }]
    });

    Highcharts.chart('clients-stats', {
        chart: {
            type: 'column'
        },
        title: {
            text: 'Estadísticas de Clientes'
        },
        xAxis: {
            categories: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio']
        },
        yAxis: {
            title: {
                text: 'Número de Clientes'
            }
        },
        series: [{
            name: 'Clientes Nuevos',
            data: getRandomData(6, 20)
        }]
    });

    Highcharts.chart('events-stats', {
        chart: {
            type: 'bar'
        },
        title: {
            text: 'Estadísticas de Eventos'
        },
        xAxis: {
            categories: ['Conferencias', 'Seminarios', 'Reuniones', 'Talleres']
        },
        yAxis: {
            title: {
                text: 'Número de Eventos'
            }
        },
        series: [{
            name: 'Eventos',
            data: getRandomData(4, 30)
        }]
    });

    Highcharts.chart('income-stats', {
        chart: {
            type: 'pie'
        },
        title: {
            text: 'Estadísticas de Ingresos'
        },
        series: [{
            name: 'Ingresos',
            colorByPoint: true,
            data: [
                { name: 'Enero', y: Math.floor(Math.random() * 10000) },
                { name: 'Febrero', y: Math.floor(Math.random() * 10000) },
                { name: 'Marzo', y: Math.floor(Math.random() * 10000) },
                { name: 'Abril', y: Math.floor(Math.random() * 10000) },
                { name: 'Mayo', y: Math.floor(Math.random() * 10000) },
                { name: 'Junio', y: Math.floor(Math.random() * 10000) }
            ]
        }]
    });

    Highcharts.chart('occupancy-stats', {
        chart: {
            type: 'area'
        },
        title: {
            text: 'Ocupación de Salones y Transportes'
        },
        xAxis: {
            categories: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio']
        },
        yAxis: {
            title: {
                text: 'Porcentaje de Ocupación'
            }
        },
        series: [{
            name: 'Salones',
            data: getRandomData(6, 100)
        }, {
            name: 'Transportes',
            data: getRandomData(6, 100)
        }]
    });

    // Actualiza los gráficos cada 3 segundos
    setInterval(updateCharts, 3000);
}

// Usa 'DOMContentLoaded' para asegurarte de que el DOM está listo
document.addEventListener('DOMContentLoaded', init);
