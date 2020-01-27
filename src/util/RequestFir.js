import firebase from '../firebase'

export function GetFire() {
    return new Promise((resolve, reject) => {
            const db = firebase.firestore()
            const data = db.collection("agenda").get()
            resolve(data)
    })
}

export function PostFire(contato) {
    const db = firebase.firestore()
    db.collection("agenda").add(contato)
}

export function UpdateFire(id, contato) {    
    const db = firebase.firestore()
    return db.collection("agenda").doc(id).update(contato)
}

export function DeleteFire(id) {
    const db = firebase.firestore()
    return db.collection("agenda").doc(id).delete()
}

export function OrdenaFire() {
    const db = firebase.firestore()
    return db.collection("agenda").where("nome", "==", "KOF 9")
}