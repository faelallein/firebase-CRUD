export const LocalStorage = {
    getLocalStorage: (key) => {
        return JSON.parse(localStorage.getItem(key));
    },
    updateLocalStorage: (key, data) => {
        if (localStorage.getItem(key) === JSON.stringify(data)) {
            return false
        } else {
            localStorage.setItem(key, JSON.stringify(data))
            return true
        }
    }
}