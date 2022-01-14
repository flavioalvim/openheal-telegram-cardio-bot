
const { KeyboardFromArray, Keyboard } = require('../../components/keyboard')
const {modifyString} = require('../../components/utils')
const db = require('./database')


const regularKeyboard = (data) => new Keyboard([...data.map(({text,action})=>({"text": text , "action":action})),{"text": 'Voltar ao menu principal', "action":'leave'}])
const returnKeyboard = () => new Keyboard([{"text": 'Voltar', "action":'Voltar'}])

const keyboardOptions = {
    "regular" : regularKeyboard(db()),
    "return" : returnKeyboard()
}

const getCorrectKeyboard =  (option) => keyboardOptions[option]

module.exports = getCorrectKeyboard