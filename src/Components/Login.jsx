import React from 'react';
import { Formik, Form, Field } from 'formik';
import { useDispatch, useSelector } from 'react-redux'
import { obtenerTokenAccion } from '../Redux/tokenDucks'
import LogoAlkemy from '../Images/LogoAlkemy.jpeg'
import {withRouter} from 'react-router-dom'

function validateEmail(value) {
  let error;
  if (!value) {
    error = <h6 className="text-danger">Required</h6>;
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
    error = <h6 className="text-danger">Invalid email address</h6>;
  }
  return error;
}

function validatePassword(value) {
  let error;
  if (value.length < 5) {
    error = <h6 className="text-danger">min 5 characters</h6>;
  }
  return error;
}

const Login = (props) => {

  const dispatch = useDispatch();
  const activo = useSelector(store => store.token.activo);
  
  React.useEffect(() => {
    console.log(activo)
    if(activo === true){
      props.history.push('/Inicio')
    }
  },[activo])

  return (
    <div>
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        onSubmit={values => {
          dispatch(obtenerTokenAccion(values.email, values.password));
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <div className="container" style={{ maxWidth: "400px", margin: "auto" }}>
              <div className="row" >
                <div className="col-md-12" >
                  <div className="mr-auto ml-auto text-center" >
                    <img src={LogoAlkemy} alt="alkemy.org" />
                    <div className="form-group mb-3">
                      <label className="form-label">Email address</label>
                      <Field name="email" validate={validateEmail} className="form-control" />
                      {errors.email && touched.email && <div>{errors.email}</div>}
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Password</label>
                      <Field name="password" validate={validatePassword} type="password" className="form-control" />
                      {errors.password && touched.password && <div>{errors.password}</div>}
                    </div>
                    <button type="submit" className="btn btn-outline-secondary">Enviar</button>
                  </div>
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}


export default withRouter(Login);
