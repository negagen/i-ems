import React, { Component } from 'react'
import Form from 'react-bootstrap/Form'

export default class Calculator extends Component {
    constructor(props){
        super(props);
        this.state = {
            monthly_use: 0, 
            monthly_cost: 0,
            cost_per_watt: 0,
            company_list: [],
            company_id: -1
        }
        this.cost_per_watt = 100
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);
    }



    handleChange(event){
        this.setState({
            monthly_use: parseInt(event.target.value), 
            monthly_cost: parseInt(event.target.value)*this.state.cost_per_watt
        })
    }

    handleSelectChange(event){
        console.log(event.target.value)
        this.setState({
            company_id: event.target.value
        })
        fetch(`/api/energycosts/${event.target.value}/?count=1`,
        {
            method: 'GET',
            cache: "no-cache",
            mode: "no-cors",
            credentials: "include",
            redirect: "follow",
            referrerPolicy: "origin",
        }).then(
            async (response)=>{
                const data = await response.json()
                console.log(data[0][1])
                this.setState({
                    cost_per_watt: data[0][1],
                    monthly_cost: data[0][1]*this.state.monthly_use
                })
            }
        )
    }

    handleClick(event){
    }

    componentDidMount(){
        fetch("/api/energycompany/",
        {
            method: 'GET',
            cache: "no-cache",
            mode: "no-cors",
            credentials: "include",
            redirect: "follow",
            referrerPolicy: "origin",
        }).then(
            async (response) => {
                const company_list = await response.json()
                this.setState({
                    company_list: company_list
                })
            }
        )
    }

    render() {
        return (
            <>
            <Form.Group className="mt-3">
            <Form.Label>Distribuidora</Form.Label>
            <Form.Select value = {this.state.company_id} onChange={this.handleSelectChange}>
                <option value = "-1" disabled>{ this.state.company_list.length !== 0 ? "Seleccione una distribuidora" : "Cargando..." }</option>
                {this.state.company_list.map((company) => <option key={ this.state.company_list.indexOf(company) } value={company.id}>{company.name}</option>)}
            </Form.Select>
            </Form.Group>
            <Form.Group className="mt-2">
                <Form.Label> Consumo mensual </Form.Label>
                <Form.Control onChange={this.handleChange} type="number"/>
            </Form.Group>
            <Form.Group className="mt-2">
                <Form.Label>Costo del consumo mensual</Form.Label>
                <Form.Control disabled type="number" value={this.state.monthly_cost}/>
            </Form.Group>
            </>
        )
    }  
}