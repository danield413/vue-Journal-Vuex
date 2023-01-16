// donde alojaremos el estado de nuestro módulo

export default () => ({
    status: 'authenticating',
    user: null,
    idToken: null,
    refreshToken: null,
})