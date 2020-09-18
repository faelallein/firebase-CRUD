import firebase from '../firebase'
const database = firebase.database();

export const requestFirebase = {
    update: (ref, data) => {
        return new Promise((resolve, reject) => {
            const fref = database.ref()

            let update = {}
            update[`/listsUsers/` + ref] = data

            fref.update(update)
            resolve('Update')
        })
    },
    get: (col) => {
        return new Promise((resolve, reject) => {
            const fref = database.ref(col)

            fref.once('value').then(s => {
                let value = s.val()
                resolve(value)
            })
        })
    },
    del: (ref) => {
        return new Promise((resolve, reject) => {
            const fref = database.ref(`/tasks/${ref}`)

            fref.remove()
            resolve('Deletado')
        })
    }
}