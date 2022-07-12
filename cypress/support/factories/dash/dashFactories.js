import underscore from 'underscore'

exports.customer = {
    name: 'Nikk Sixx',
    email: 'sixx@yahoo.com',
    password: 'pwd123',
    is_provider: false
}

exports.provider = {
    name: 'Ramon Valdes',
    email: 'ramon@samuraibs.com',
    password: 'pwd123',
    is_provider: true
}

//a função sample dentro da biblioteca underscore pode sortear um valor único dentro do Array
exports.appointment = {
    hour: underscore.sample(['09:00', '10:00', '11:00', '12:00', 
    '13:00', '14:00', '15:00', '16:00', '17:00'])
}