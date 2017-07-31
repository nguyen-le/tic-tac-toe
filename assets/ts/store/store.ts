export default class Store {
    private callbacks: Function[] = []

    subscribe(callback: Function) {
        this.callbacks.push(callback)
        return this.createUnsubscribe(callback)
    }

    createUnsubscribe(callbackToRemove: Function) {
        return () => {
            this.callbacks = this.callbacks.filter((callback) => {
                return callback !== callbackToRemove
            })
        }
    }

    emit() {
        this.callbacks.forEach((fn) => fn())
    }
}
