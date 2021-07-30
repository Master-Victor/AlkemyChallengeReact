import React from 'react'
import { useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'
import CardHero from './CardHero'


const Inicio = () => {

    const equipo = useSelector(store => store.heroe.equipo)
    const activo = useSelector(store => store.token.activo)

    let weight = 0
    let height = 0
    let intelligence = 0
    let strength = 0
    let speed = 0
    let durability = 0
    let power = 0
    let combat = 0
    if (equipo.miembros.length > 0) {
        equipo.miembros.forEach(x => {
            weight += (parseInt(x.appearance.weight[1]) * 1 / equipo.miembros.length);
            height += (parseInt(x.appearance.height[1]) * 1 / equipo.miembros.length);
            intelligence += parseInt(x.powerstats.intelligence);
            strength += parseInt(x.powerstats.strength);
            speed += parseInt(x.powerstats.speed);
            durability += parseInt(x.powerstats.durability);
            power += parseInt(x.powerstats.power);
            combat += parseInt(x.powerstats.combat);
        })
    }
    if( activo === false ){
        return <Redirect to="/" />
    }
    return (equipo.miembros.length > 0 ) ? (

        <div className="container">
            <br />
            <h4 className="text-center">Equipo</h4>
            <br />
            <div className="container card text-center" >
                <h5> Estadisticas totales </h5>
                <br />
                <span> strength: {strength} </span>
                <br />
                <span> combat: {combat}</span>
                <br />
                <span> durability: {durability}</span>
                <br />
                <span> intelligence: {intelligence}</span>
                <br />
                <span> power: {power}</span>
                <br />
                <span> speed: {speed}</span>
                <br />
                <span> weight: {weight} </span>
                <br />
                <span> height: {height} </span>
            </div>
            {
                <div className="row row-cols-1 row-cols-md-3 g-4" >{equipo.miembros.map(x => <CardHero key={x.id} image={x.image.url} name={x.name} powerstats={x.powerstats} id={x.id} alignment={x.biography.alignment} />)}</div>
            }
        </div>
    ) : <div></div>
}

export default Inicio
