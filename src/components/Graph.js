import React, { useState, useEffect } from 'react'
import Card from 'react-bootstrap/Card';
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

// Get call to API endpoint energycompany
async function getEnergyCompany() {
  let response = await fetch(
    "/api/energycompany",
    {
      method: "GET",
      cache: "no-cache",
      mode: "no-cors",
      credentials: "include",
      headers: {
        'Content-Type': 'application/json'
      },
      redirect: "follow",
      referrerPolicy: "origin",
    }
  )

  return response.json()
}

// Get call to API endpoint energycosts
async function getEnergyCosts() {
  let response = await fetch(
    "/api/energycosts",
    {
      method: "GET",
      cache: "no-cache",
      mode: "cors",
      credentials: "include",
      headers: {
        'Content-Type': 'application/json'
      },
      redirect: "follow",
      referrerPolicy: "origin",
    }
  )

  return response.json()
}

const Graph = () => {
  const [options, setOptions] = useState({
    title: {
      text: "Precio de energia por kWh",
      type: "scatter",
    },
    series: [],
    xAxis: {
      tickInterval: 30 * 24 * 3600 * 1000,
      labels: {
        autoRotation: [0, -90],
        padding: 1,
        distance: 1
      },
      type: 'datetime',
    },
    yAxis: {
      title: "$/kWh"
    },
    credits: {
      text: 'Conexalab',
      href: 'http://www.conexalab.com/'
    },
    scrollbar: { enabled: false },
    rangeSelector: {
      y: -5,
      buttonTheme: { width: 50 },
      buttons: [{
        type: 'month',
        count: 1,
        text: '1m',
        title: 'View 1 month'
      }, {
        type: 'month',
        count: 3,
        text: '3m',
        title: 'View 3 months'
      }, {
        type: 'month',
        count: 6,
        text: '6m',
        title: 'View 6 months'
      }],
      verticalAlign: 'bottom',
      selected: 2,
      inputEnabled: false
    },
    chart: {
      events: {
        load: (event) => {
          const label = event.target.renderer.label(
            "Los datos en esta pagina son de uso exclusivo de ConexaLab"
          ).attr({
              'stroke': 'silver',
              'stroke-width': 1,
              'r': 2,
              'padding': 5
            }).css({
              fontSize: '9px'
            })
            .add();
          label.align(Highcharts.extend(label.getBBox(), {
            align: 'center',
            x: 20, // offset
            verticalAlign: 'bottom',
            y: -25 // offset
          }), null, 'spacingBox');
        }


        //69774
        //Alejandra Ortiz
      }
      , marginBottom: 120
    }
  })

  // This runs only once.
  useEffect(() => {
    getEnergyCosts().then(
      (response) => {
        console.log("Fist blood")
        console.log(response)
        return response
      }
    ).then(
      async (costs) => {
        console.log("Double kill")
        const response = await getEnergyCompany()
        return response.map(
          (company) => {
            return {
              id: company.id,
              name: company.name,
              allowPointSelect: true,
              data: costs.find(
                (item) => item.trading_company === company.id
              ).energy_cost,
            }
          }
        )
      }
    ).then(
      (series) => {
        console.log("Triple kill")
        setOptions({
          series: series
        })
      }
    )
  }, [])


  return (
    <div>
      <Card className="my-4 w-100">
        <Card.Body>
          <HighchartsReact
            highcharts={Highcharts}
            options={options}
          />
        </Card.Body>
      </Card>
    </div>

  )
}

export default Graph
