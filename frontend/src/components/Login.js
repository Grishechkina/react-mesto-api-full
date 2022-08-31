import AuthForm from './AuthForm'

function Login(props) {

  return (
    <AuthForm title={'Вход'} saveBtnText={'Войти'} onSubmit={props.onSubmit} />
  )
}

export default Login;