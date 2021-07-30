import axios from 'axios'

//constantes

const dataInicial = {
    array: [],
    offset: 1,
    busqueda: false,
    loading: false,
    equipo: {
        good: 0,
        bad: 0,
        miembros: []
    },
    heroeDetalle:[]
}

const OBTENER_HEROE_EXITO = 'OBTENER_HEROE_EXITO';
const BUSQUEDA_HEROE_EXITO = 'BUSQUEDA_HEROE_EXITO';
const DETALLE_HEROE_EXITO = 'DETALLE_HEROE_EXITO';
const AGREGAR_HEROE_EXITO = 'AGREGAR_HEROE_EXITO';
const ELIMINAR_HEROE_EXITO = 'ELIMINAR_HEROE_EXITO';
const LOADING_HEROE = 'LOADING_HEROE'
const BUSQUEDA_HEROE_ERROR = 'BUSQUEDA_HEROE_ERROR'
//reducer
export default function heroReducer(state = dataInicial, action) {
    switch (action.type) {
        case OBTENER_HEROE_EXITO:
            return { ...state, array: action.payload }
        case DETALLE_HEROE_EXITO:
            return { ...state, heroeDetalle: action.payload.array, loading: false }
        case BUSQUEDA_HEROE_EXITO:
            return { ...state, array: action.payload.array, busqueda: true, loading: false }
        case BUSQUEDA_HEROE_ERROR:
            return { ...state, array: [], busqueda: false, loading:false }    
        case AGREGAR_HEROE_EXITO:
            return { ...state, equipo: action.payload.equipo }
        case ELIMINAR_HEROE_EXITO:
            return { ...state, equipo: action.payload.equipo }
        case LOADING_HEROE:
            return { ...state, loading: true }
        default:
            return state;
    }
}
//action

export const obtenerHeroeAccion = () => async (dispatch, getState) => {
    try {
        const res = await axios.get('https://www.superheroapi.com/api.php/1920922501395672/1');

        dispatch({
            type: OBTENER_HEROE_EXITO,
            payload: res.data
        })
    } catch (error) {
        console.log(error)
    }
}

export const obtenerHeroeSiguiente = (sigueinte) => async (dispatch, getState) => {

    dispatch({
        type: LOADING_HEROE
    })

    try {
        const res = await axios.get(`https://www.superheroapi.com/api.php/1920922501395672/${sigueinte}`);
        dispatch({
            type: DETALLE_HEROE_EXITO,
            payload: {
                array: res.data,
            }
        })
        localStorage.removeItem( 'heroeDetalle' )
        localStorage.setItem( 'heroeDetalle',JSON.stringify(res.data) )
    } catch (error) {
        console.log(error);
    }
}


export const BuscarHeroe = (nombreHeroe) => async (dispatch, getState) => {
    dispatch({
        type: LOADING_HEROE
    })
    try {
        const res = await axios.get(`https://www.superheroapi.com/api.php/1920922501395672/search/${nombreHeroe}`);
        
        if( !(res.data.response === 'success') ){
            dispatch({
                type: BUSQUEDA_HEROE_ERROR,
            })
        }else{
            dispatch({
                type: BUSQUEDA_HEROE_EXITO,
                payload: {
                    array:res.data.results
                }
            })
        }
    } catch (error) {
        console.log(error);        
    }
}

export const agregarHeroeEquipo = (heroeID) => async (dispatch, getState) => {
    const { equipo } = getState().heroe
    let { good, bad, miembros } = equipo

    if( (miembros.filter( x => x.id === heroeID )).length > 0 ){
        dispatch({
            type: AGREGAR_HEROE_EXITO,
            payload: {
                equipo: equipo,
            }
        })        
    }else{

        try {
            const hero = await axios.get(`https://www.superheroapi.com/api.php/1920922501395672/${heroeID}`);
            
            const newHero = ((hero.data.biography.alignment === "bad" && bad < 3) || (hero.data.biography.alignment === "good" && good < 3))
                ? ([hero.data, ...miembros])
                : [...miembros];
            if (hero.data.biography.alignment === "bad" && bad < 3) {
                bad++;
            } else if (hero.data.biography.alignment === "good" && good < 3) {
                good++;
            } else {
                alert(`maximo alcanzado good:${good} bad:${bad}`)
            }
            dispatch({
                type: AGREGAR_HEROE_EXITO,
                payload: {
                    equipo: {
                        good: good,
                        bad: bad,
                        miembros: newHero,
                    }
                }
            })
            localStorage.setItem( 'equipo', JSON.stringify({                    
                equipo: {
                good: good,
                bad: bad,
                miembros: newHero,
            }}) )
        } catch (error) {
            console.log(error);
        }
    }
}

export const eliminarHeroe = (heroeID, alignment) => (dispatch, getState) => {
    const { equipo } = getState().heroe
    let { good, bad, miembros } = equipo
    miembros = miembros.filter(x => (!(x.id === heroeID)))
    if( alignment === 'good' ){
        if( good > 0 ){
            good--;
        }
    }else if( alignment === 'bad' ){
        if( bad > 0 ){
            bad--;
        }        
    }
    dispatch({
        type: ELIMINAR_HEROE_EXITO,
        payload: {
            equipo: {
                good: good,
                bad: bad,
                miembros: miembros,
            }
        }
    })
    localStorage.removeItem('equipo')
    localStorage.setItem( 'equipo', JSON.stringify({                    
        equipo: {
        good: good,
        bad: bad,
        miembros: miembros,
    }}) )    
}

export const leerEquipo = () => async (dispatch) => {
    if( localStorage.getItem('equipo') ){
        dispatch({
            type: AGREGAR_HEROE_EXITO,
            payload: JSON.parse(localStorage.getItem('equipo'))
        })
    }  
}

export const leerDetalle = () => async(dispatch) => {
    if( localStorage.getItem('heroeDetalle') ){
        dispatch({
            type: DETALLE_HEROE_EXITO,
            payload:{
                array: JSON.parse(localStorage.getItem('heroeDetalle'))
            } 
        })
    }  
}