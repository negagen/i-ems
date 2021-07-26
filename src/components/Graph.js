import React, {useState, useEffect} from 'react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

async function getEnergyCompany(){
    let response = await fetch( 
      "http://localhost:8000/api/energycompany", 
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
  
    return await response.json()
  }
  
  async function getEnergyCosts(){
    let response = await fetch( 
      "http://localhost:8000/api/energycosts", 
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
  
    return await response.json()
  }

const Graph = () => {
    const [options, setOptions] = useState({
        title: {
            text: "Precio de energia por kWh",
            type: "scatter",
        },
        series: [],
        xAxis:{
            tickInterval: 30 * 24 * 3600 * 1000,
            labels: {
                autoRotation: [0, -90],
                padding: 1,
                distance: 1
              },
            type: 'datetime',
        },
        yAxis:{
            title: "$/kWh"
        },
    })

    useEffect(() => {
        getEnergyCosts().then( 
          (response) => {
            let costs = response.data
            console.log("How many times did I call this?")
            getEnergyCompany().then( 
                (response) => {
                    setOptions({
                    series: response.map(
                    (company)=>{
                        return {
                        id: company.id,
                        name: company.name,
                        data: costs.find(
                            (item) => item.trading_company === company.id
                        ).energy_cost,
                        }
                    }
                    )
                })
                }
            )
          }
        )
      }, [])
    
    

    return (
        <div>
            <HighchartsReact
                highcharts = { Highcharts }
                options = {options}
            />         
        </div>
        
    )
}

export default Graph
