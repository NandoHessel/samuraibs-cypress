

class LoginElements {

    inputEmail = () => { return 'input[placeholder="Seu email"]' }
    inputSenha = () => {return 'input[placeholder="Sua senha secreta"]'}
    buttonLogin = () => {return '.sc-AxgMl'}

    buttonForgot = () => {return 'a[href="/forgot-password"]'}

}

export default new LoginElements()