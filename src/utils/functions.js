const fs = require('fs')

const readUsers = () => {
    try {

        const getFile = fs.readFileSync(__dirname + '/db/users.json')
        const toText = getFile.toString()

        return JSON.parse(toText)

    } catch (e) {

        return e
    }
}

module.exports = {
    readUsers: readUsers
}