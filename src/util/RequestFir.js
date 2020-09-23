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
        return new Promise(async (resolve, reject) => {
            const fref = database.ref(col)
            let resp = await fref.once('value')
            resolve(resp.val())
        })
    },
    del: (ref) => {
        return new Promise((resolve, reject) => {
            const fref = database.ref(`/listsUsers/${ref}`)
            fref.remove()
            resolve('Deletado')
        })
    }
}