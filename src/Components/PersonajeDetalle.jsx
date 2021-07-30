import React from 'react'
import { useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom';

const PersonajeDetalle = (props) => {
    const loading = useSelector(store => store.heroe.loading);
    const heroe = useSelector(store => store.heroe.heroeDetalle)
    const activo = useSelector(store => store.token.activo)
    if( activo === false ){
        return <Redirect to="/" />
    }
    return ( loading === false )?(
        <div className="container" >
            <h4 className="text-center mt-3" >Detalles</h4>
            <div className="card mb-3" >
                <div className="row g-0">
                    <div className="col-md-4">
                        <img src={heroe.image.url} className="img-fluid rounded-start" alt="..." />
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <h3 className="card-title">{heroe.name}</h3>
                            <h5 className="card-subtitle">Estadisticas</h5>
                            <ul>
                                <li>intelligence: {heroe.powerstats.intelligence}</li>
                                <li>strength: {heroe.powerstats.strength}</li>
                                <li>speed: {heroe.powerstats.speed}</li>
                                <li>durability: {heroe.powerstats.durability}</li>
                                <li>power: {heroe.powerstats.power}</li>
                                <li>combat: {heroe.powerstats.combat}</li>
                            </ul>
                            <h5 className="card-subtitle">Biografia</h5>
                            <ul>
                                <li>full-name: {heroe.biography["full-name"]}</li>
                                <li>alter-egos: {heroe.biography["alter-egos"]}</li>
                                <li>aliases: {heroe.biography["aliases"]}</li>
                                <li>place-of-birth: {heroe.biography["place-of-birth"]}</li>
                                <li>first-appearance: {heroe.biography["first-appearance"]}</li>
                                <li>publisher: {heroe.biography["publisher"]}</li>
                                <li>alignment: {heroe.biography["alignment"]}</li>
                            </ul>
                            <h5 className="card-subtitle">Apariencia</h5>
                            <ul>
                                <li>gender: {heroe.appearance["gender"]}</li>
                                <li>race: {heroe.appearance["race"]}</li>
                                <li>height: {heroe.appearance["height"]}</li>
                                <li>weight: {heroe.appearance["weight"]}</li>
                                <li>eye-color: {heroe.appearance["eye-color"]}</li>
                                <li>hair-color: {heroe.appearance["hair-color"]}</li>
                            </ul>
                            <h5 className="card-subtitle">Trabajo</h5>
                            <ul>
                                <li>occupation: {heroe.work["occupation"]}</li>
                                <li>base: {heroe.work["base"]}</li>
                            </ul>
                            <h5 className="card-subtitle">Conecciones</h5>
                            <ul>
                                <li>group-affiliation: {heroe.connections["group-affiliation"]}</li>
                                <li>relatives: {heroe.connections["relatives"]}</li>
                            </ul>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    ):<div>Cargando...</div>
}

export default PersonajeDetalle
