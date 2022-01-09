const _ = require("lodash")
const { db } = require('./database')

const scale = (data) => {

    let newData = data

    const getDataFrom = (specialty) => {
        newData = data.find(item => item.specialty === specialty)
        return (
            {
                "data": newData,
                getProfessionals
            })
    }

    const getProfessionals = () => {
        newData = newData.professionals
        return (
            {
                "data": newData,
                filterByName,
                filterBySubSpecialty
            })
    }

    const filterByName = (name) => {
        newData = newData.find(item => item.name === name)
        return (
            {
                "data": newData,
                getTelephones
            })
    }

    const filterBySubSpecialty = (subSpecialty) => {
        array = newData.map(professional => ({ "name": professional.name, "telephones": professional.telephones, "subSpecialties": professional.subSpecialties.map(item => item.specialty) }))
        array2 = array.filter(item => item.subSpecialties.includes(subSpecialty))
        newData = array2
        return({
            "data": newData
        })
    }


    const getTelephones = () => {
        newData = newData.telephones
        return (
            {
                "data": newData
            })
    }

    const getSubSpeciatiesArrayFrom = (specialty) => {
        array = _.flatMap(getDataFrom(specialty).getProfessionals().data.map(item => item.subSpecialties))
        return _.uniqBy(array, "specialty")
    }

    return (
        {
            "data": data,
            getDataFrom,
            getSubSpeciatiesArrayFrom
        }
    )
}

//---------

const l = scale(db())
//console.log (txt("Ortopedia"))

const txt = (specialty) =>{
    const arr = l.getSubSpeciatiesArrayFrom("Ortopedia").map(item => item.specialty)
    const arr2 = arr.map(itemOfArray => {
        const subSpecialty = itemOfArray
        const professionals = l.getDataFrom(specialty).getProfessionals().filterBySubSpecialty(itemOfArray).data
        console.log(subSpecialty)
        console.log(professionals)
})}


console.log(txt("Ortopedia"))

//console.log(l.getDataFrom("Ortopedia").getProfessionals().filterBySubSpecialty("Pé"))


const modifyString = (string) => {
    const newString = _.deburr(_.toLower(string)).replace(" ", "_")
    console.log(newString)
    return newString
}


module.exports = scale