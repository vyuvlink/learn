export default class Results {

    constructor(code = 200, msg = '', data = null) {
        this.code = code
        this.msg = msg
        this.data = data
    }

    get getCode() {
        return this.code
    }

    set setCode(value) {
        this.code = value
    }

    get getMsg() {
        return this.msg
    }

    set setMsg(value) {
        this.msg = value
    }

    get getData() {
        return this.code
    }

    set setData(value) {
        this.data = value
    }

    clear() {
        this.code = 200
        this.msg = ''
        this.data = null
    }

    toJson() {
        const results = {
            code: this.code,
            msg: this.msg,
            data: this.data,
        }
        return (this.clear(), results)
    }

    toText() {
        return this.data
    }
}