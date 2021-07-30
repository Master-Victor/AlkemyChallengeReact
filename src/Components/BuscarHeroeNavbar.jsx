import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BuscarHeroe } from '../Redux/heroDucks'
import { Formik, Field, Form } from 'formik';
import LogoAlkemy from '../Images/LogoAlkemy.jpeg'
import { Link, NavLink } from 'react-router-dom'
import { salirToken } from '../Redux/tokenDucks'
import { withRouter } from 'react-router-dom'
import ListaHeroesBuscados from './ListaHeroesBuscados'


const BuscarHeroeNavbar = (props) => {
    const dispatch = useDispatch();
    const activo = useSelector(store => store.token.activo);
    const busqueda = useSelector(store => store.heroe.busqueda);
    const salirTokenAcciones = () => {
        if (activo === true) {
            dispatch(salirToken())
            props.history.push('/')
        }
    }
    return activo===true?(
        <div className="container">
            <nav className="navbar navbar-light bg-light navbar-expand-sm sticky-top">
                <Link className="navbar-brand" to="/">
                    <img src={LogoAlkemy} alt="" className="img-thumbnail" style={{ maxWidth: "50px" }} />
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#toggleMobileMenu"
                    aria-controls="toggleMobileMenu"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="container-fluid">
                    <Formik
                        initialValues={{
                            heroName: '',
                        }}
                        onSubmit={values => dispatch(BuscarHeroe(values.heroName))}
                    >

                        <Form className="d-flex ms-auto">
                            <div className="collapse navbar-collapse" id="toggleMobileMenu">
                                <ul className="navbar-nav ms-auto text-center">
                                    <li>
                                        <NavLink className="btn btn-outline-secondary me-2 mt-2" to="/Inicio" exact>Inicio</NavLink>
                                    </li>
                                    <li>
                                        <Field id="heroName" name="heroName" placeholder="Search Hero" className="form-control me-2 mt-2" style={{ maxWidth: "400px" }} />
                                    </li>
                                    <li>
                                        <button type="submit" className="btn btn-outline-secondary mt-2">Search</button>
                                    </li>
                                    <li>
                                        <button className="btn btn-outline-secondary me-2 mt-2 " onClick={() => salirTokenAcciones()} >Salir</button>
                                    </li>
                                </ul>
                            </div>
                        </Form>
                    </Formik>
                </div>
            </nav>
            {
                busqueda ? <ListaHeroesBuscados/> : <div></div> 
            }    
        </div>
        
    ): <div></div>
}
export default withRouter(BuscarHeroeNavbar)
