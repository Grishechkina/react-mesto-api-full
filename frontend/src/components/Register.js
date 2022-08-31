import AuthForm from './AuthForm'

function Register(props) {
  
  return (
    <AuthForm
      title="Регистрация"
      saveBtnText="Зарегистрироваться"
      saveBtnSubtitle="Уже зарегистрированы? Войти"
      onSubmit={props.onSubmit}
    />
  )
}

export default Register;