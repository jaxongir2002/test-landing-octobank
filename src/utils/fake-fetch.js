


export const FakeFetch = (cb) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(cb())
        }, 3000)
    })
}