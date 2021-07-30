import axios from 'axios';

//constantes

const dataInicial = {
    token: [],
    loading: false,
    activo: false
}

const OBTENER_TOKEN_EXITO = 'OBTENER_TOKEN_EXITO';
const OBTENER_TOKEN_ERROR = 'OBTENER_TOKEN_ERROR';
const TOKEN_EXIT = 'TOKEN_EXIT'; 
const LOADING = 'LOADING';
//reducer

export default function tokenReducer( state = dataInicial, action){
    switch( action.type ){
        case LOADING:
            return { ...state, loading: true, activo: true }
        case OBTENER_TOKEN_EXITO:
            return {...state, token: action.payload, loading: false, activo: true}
        case OBTENER_TOKEN_ERROR:
            return {...dataInicial}
        case TOKEN_EXIT:
            return {...dataInicial}        
        default:
            return state    
    }
}

//action

export const obtenerTokenAccion = (email, password) => async (dispatch) =>{
    dispatch({
        type: LOADING
    })
    try {
        await axios.post('http://challenge-react.alkemy.org/', {
            email: email,
            password: password
        })
        .then(function (response) {
            dispatch({
                type: OBTENER_TOKEN_EXITO,
                payload: response.data.token 
            })
            localStorage.setItem( 'token', JSON.stringify(response.data.token) )
        })
        .catch(function (error) {
            dispatch({
                type: OBTENER_TOKEN_ERROR,
            })
        });       
    } catch (error) {
        dispatch({
            type: OBTENER_TOKEN_ERROR,
        })
    }
}

export const leerToken = () => async (dispatch) => {
    if( localStorage.getItem('token') ){
        dispatch({
            type: OBTENER_TOKEN_EXITO,
            payload: JSON.parse(localStorage.getItem('token'))
        })
    }
}


export const salirToken = () => async (dispatch) =>{
    localStorage.removeItem('token')
    dispatch({
        type: TOKEN_EXIT,
    })
}