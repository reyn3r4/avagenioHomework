import React from 'react';
import auth from './auth';
import { useNavigate } from 'react-router';
import {UserContext, ThemeContext} from './UserContext';
import { useContext } from 'react';

const LoginPage = () => {

  let navigate = useNavigate();
  const [userState, setUserState] = React.useState('');
  const [password, setPassword] = React.useState('');
  const {user,setUser}=useContext(UserContext);

  const handleLoginFormSubmit = (e) => {
    //e.preventDefault();
    // Aquí puedes realizar la lógica de inicio de sesión con los datos ingresados
    console.log(typeof setUser)
    if(auth(userState,password)){
      setUser(userState);
      navigate(`/`)
    };
    if(!auth(userState,password)){
      alert("usuario o contraseña incorrecto")
    };
    console.log('User:', userState);
    console.log('Password:', password);
    // Luego, puedes restablecer los valores de los campos y ocultar el formulario
    //setUser('');
    //setPassword('');
  };

  const handleUserChange = (e) => {
    setUserState(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div className='loginPage'>
      {/* Formulario de autenticación */}
      <div className='card login'>
        <div className='container'>
          <div className='inputs'>
        <input type="text" placeholder='Usuario' id="username" onChange={handleUserChange} />
        <br></br>
        <input type="password" placeholder='Contraseña' id="password" onChange={handlePasswordChange} />

        <button onClick={handleLoginFormSubmit} className="loginButton" >Iniciar sesión</button>
        </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;

/*import { LoadingButton } from '@mui/lab';
import { Box, styled, useTheme ,Card, Grid, TextField,Alert, Snackbar } from '@mui/material';
import useAuth from 'app/hooks/useAuth';
import { Formik } from 'formik';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

const FlexBox = styled(Box)(() => ({ display: 'flex', alignItems: 'center' }));

const JustifyBox = styled(FlexBox)(() => ({ justifyContent: 'center' }));

const ContentBox = styled(Box)(() => ({
  height: '100%',
  padding: '32px',
  position: 'relative',
  background: 'rgba(0, 0, 0, 0.01)',
}));

const JWTRoot = styled(JustifyBox)(() => ({
  background: 'linear-gradient(30deg, rgba(0,53,93,1) 0%, rgb(0 0 0 / 99%) 90%)',
  minHeight: '100% !important',
  '& .card': {
    maxWidth: 820,
    minHeight: 350,
    margin: '1rem',
    display: 'flex',
    borderRadius: 10,
    alignItems: 'center',
  }
}));

// inital login credentials
const initialValues = {
  //email: 'jason@ui-lib.com',
  username: '',
  password: '',
  //remember: true,
};

// form field validation schema
const validationSchema = Yup.object().shape({
  password: Yup.string()
    .min(6, '¡La contraseña debe tener mas de 6 caracteres!')
    .required('¡Escriba la contraseña!'),
  username: Yup.string().required('¡Escriba el usuario!'),
});

const JwtLogin = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [loginerror, setError] = useState({
    success:true,
    message:''
  });

  function handleClose(_, reason) {
      if (reason === "clickaway") {
          return;
      }
      setError({
        success:true,
        message:''
      });
  }
  let {login} = useAuth();

  const handleFormSubmit = async (values) => {
    setLoading(true);
    try {
      await login(values.username, values.password, function(response){
        if(response){
          if(response.user && response.user.is_active){
            setError({
              success:true,
              message:''
            });
            navigate('/');
          }else if(response.message){
            setError({
              success:false,
              message:response.message
            })
          }
        }else{
          setError({
            success:false,
            message:'!Ha ocurrido un error!'
          });
        }
      });
      setLoading(false);
    } catch (e) {
      setError({
        success:false,
        message:e
      });
      setLoading(false);
    }
  };

  return (
    <JWTRoot>
      <Card className="card">
        <Grid container>
          <Grid item sm={6} xs={12}>
            <JustifyBox p={4} height="100%" sx={{ minWidth: 320 }}>
              <svg width="125px" height="125px" style={{'marginBottom': '20px'}}>
                <g><path fill="#00355d" d="M 32.5,-0.5 C 36.1667,-0.5 39.8333,-0.5 43.5,-0.5C 43.5,41.1667 43.5,82.8333 43.5,124.5C 39.8333,124.5 36.1667,124.5 32.5,124.5C 32.5,82.8333 32.5,41.1667 32.5,-0.5 Z"/></g>
                <g><path fill="#00355d" d="M 51.5,-0.5 C 55.1667,-0.5 58.8333,-0.5 62.5,-0.5C 62.5,41.1667 62.5,82.8333 62.5,124.5C 58.8333,124.5 55.1667,124.5 51.5,124.5C 51.5,82.8333 51.5,41.1667 51.5,-0.5 Z"/></g>
                <g><path fill="#00355d" d="M 3.5,8.5 C 11.1667,8.5 18.8333,8.5 26.5,8.5C 26.5,10.5 26.5,12.5 26.5,14.5C 20.8333,14.5 15.1667,14.5 9.5,14.5C 9.5,16.8333 9.5,19.1667 9.5,21.5C 16.0837,19.8683 20.2504,22.2017 22,28.5C 22.6667,51.1667 22.6667,73.8333 22,96.5C 20.2504,102.798 16.0837,105.132 9.5,103.5C 9.5,105.833 9.5,108.167 9.5,110.5C 15.1667,110.5 20.8333,110.5 26.5,110.5C 26.5,112.5 26.5,114.5 26.5,116.5C 18.8333,116.5 11.1667,116.5 3.5,116.5C 3.5,80.5 3.5,44.5 3.5,8.5 Z"/></g>
                <g><path fill="#00355d" d="M 68.5,8.5 C 85.8333,8.5 103.167,8.5 120.5,8.5C 120.5,44.5 120.5,80.5 120.5,116.5C 103.167,116.5 85.8333,116.5 68.5,116.5C 68.5,114.5 68.5,112.5 68.5,110.5C 74.1667,110.5 79.8333,110.5 85.5,110.5C 85.5,108.167 85.5,105.833 85.5,103.5C 80.8306,104.3 76.9973,102.967 74,99.5C 72.6395,87.8811 72.1395,76.2144 72.5,64.5C 77.6278,64.1115 82.6278,64.6115 87.5,66C 89.8233,69.4729 90.8233,73.3062 90.5,77.5C 92.8333,77.5 95.1667,77.5 97.5,77.5C 97.5,66.5 97.5,55.5 97.5,44.5C 95.1667,44.5 92.8333,44.5 90.5,44.5C 90.6042,48.6098 89.2708,52.1098 86.5,55C 81.964,56.3789 77.2973,56.8789 72.5,56.5C 72.5,44.8333 72.5,33.1667 72.5,21.5C 81.2354,21.1241 89.9021,21.6241 98.5,23C 105.481,25.7911 108.814,30.9578 108.5,38.5C 110.833,38.5 113.167,38.5 115.5,38.5C 115.5,30.5 115.5,22.5 115.5,14.5C 99.8333,14.5 84.1667,14.5 68.5,14.5C 68.5,12.5 68.5,10.5 68.5,8.5 Z"/></g>
              </svg>
              <div style={{color:'#00355d', 'fontSize':'28px', 'marginLeft': '5px', 'fontWeight': 'bold','fontFamily': 'georgia,serif','lineHeight': '1'}}>
              INTELIGENCIA<br/>FINANCIERA<hr color="#00355d" style={{'height':'5px', 'marginRight':'30px'}}/>BCC
              </div>
            </JustifyBox>
          </Grid>

          <Grid item sm={6} xs={12}>
            <ContentBox>
              <Formik
                onSubmit={handleFormSubmit}
                initialValues={initialValues}
                validationSchema={validationSchema}
              >
                {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
                  <form onSubmit={handleSubmit}>
                    <TextField
                      fullWidth
                      size="small"
                      type="string"
                      name="username"
                      label="Usuario"
                      variant="outlined"
                      onBlur={handleBlur}
                      value={values.username}
                      onChange={handleChange}
                      helperText={touched.username && errors.username}
                      error={Boolean(errors.username && touched.username)}
                      sx={{ mb: 3 }}
                    />

                    <TextField
                      fullWidth
                      size="small"
                      name="password"
                      type="password"
                      label="Contraseña"
                      variant="outlined"
                      onBlur={handleBlur}
                      value={values.password}
                      onChange={handleChange}
                      helperText={touched.password && errors.password}
                      error={Boolean(errors.password && touched.password)}
                      sx={{ mb: 1.5 }}
                    />

                 

                    <LoadingButton
                      type="submit"
                      color="primary"
                      loading={loading}
                      variant="contained"
                      sx={{ my: 2 }}
                    >
                      Autenticar
                    </LoadingButton>

                  </form>
                )}
              </Formik>
            </ContentBox>
          </Grid>
        </Grid>
      </Card>
      <Snackbar open={!loginerror.success} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ vertical: "top", horizontal: "center" }}>
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }} variant="filled">
                    {loginerror.message}
        </Alert>
      </Snackbar>
    </JWTRoot>
  );
};

export default JwtLogin;
*/