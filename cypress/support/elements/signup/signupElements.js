
class SignupElements {

    botaoCriarConta = () => { return 'a[href="/signup"]' }
    inputNome = () => { return 'input[placeholder^="Nome"]' }
    inputEmail = () => { return 'input[placeholder$="email"]' }
    inputSenha = () => { return 'input[placeholder*="senha"]' }
    botaoSubmeter = () => { return '.sc-AxgMl' }
}

//exportar a classe já instanciada
export default new SignupElements()

/*exports.el = {
    name: 'input[placeholder^="Nome"]',
    email: 'input[placeholder$="email"]',
    password: 'input[placeholder*="senha"]',
    signupButton: '.sc-AxgMl',
    toast: '.toast'
}*/