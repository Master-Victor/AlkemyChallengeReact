import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import CardHero from './CardHero'
import { BuscarHeroe } from '../Redux/heroDucks'

const ListaHeroesBuscados = () => {
    const dispatch = useDispatch() 
    const heroe = useSelector( store => store.heroe );
    const loading = useSelector( store => store.heroe.loading );
    const busqueda = useSelector( store => store.heroe.busqueda );
    return (loading === false && busqueda === true)?(
        <div>
            <div className="d-grid gap-2 d-md-flex justify-content-md-end bg-danger">
                <button className="btn btn-danger" onClick={() => dispatch( BuscarHeroe("CERRAR SEARCH") )} >X</button>
            </div>
            {
                <div className="row row-cols-1 row-cols-md-3 g-4" >{heroe.array.map( x => <CardHero key={x.id} image={x.image.url} name={x.name} powerstats={x.powerstats} id={x.id} alignment={x.biography.alignment}/> )}</div>                
            }
        </div>
    ):<div>loading</div>
}

export default ListaHeroesBuscados
