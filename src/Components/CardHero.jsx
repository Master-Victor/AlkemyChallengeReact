import React from 'react'
import {agregarHeroeEquipo, eliminarHeroe, obtenerHeroeSiguiente} from '../Redux/heroDucks'
import {useDispatch} from 'react-redux'
import { withRouter } from 'react-router-dom'


const CardHero = (props) => {
    const dispatch = useDispatch();
    const MasDetalles = async (id) => {
            await dispatch(obtenerHeroeSiguiente(id))
            .then(
                props.history.push('/PersonajeDetalle')
            )
    }

    return (
        <div className="card "style={{maxWidth: "540px"}}>
            <div className="row g-0">
                <div className="col-md-4">
                    <img src={props.image} className="img-fluid rounded-start" alt="..." onClick={ () => MasDetalles(props.id) }/>
                </div>
                <div className="col-md-8">
                    <div className="card-body">
                        <h5 className="card-title">{props.name}</h5>
                    </div>
                        <ul className="card-text">
                            <li> combat: {props.powerstats.combat}</li>
                            <li> durability: {props.powerstats.durability}</li>
                            <li> intelligence: {props.powerstats.intelligence}</li>
                            <li> power: {props.powerstats.power}</li>
                            <li> speed: {props.powerstats.speed}</li>
                            <li> alignment: {props.alignment} </li>
                        </ul>                   
                </div>
                <button className="btn btn-outline-secondary" onClick={ () => dispatch(agregarHeroeEquipo(props.id)) }>Agregar</button>
                <button className="btn btn-outline-secondary" onClick={ () => dispatch(eliminarHeroe(props.id, props.alignment)) }>Eliminar</button>
                <button className="btn btn-outline-secondary" onClick={ () => MasDetalles(props.id) }>Detalles</button>
            </div>
        </div>
    )
}

export default withRouter(CardHero)
