const initProperty = () => {
    window.Date.prototype.amPm = function() {
        let h = this.getHours() < 12 ? "오전" : "오후";
        return h
    }
    window.Date.prototype.isSameDate = function (date) {
        return date.getFullYear() === this.getFullYear()
            && date.getMonth() === this.getMonth()
            && date.getDate() === this.getDate();
    }

    window.Date.prototype.isSameMonth = function (date) {
        return date.getFullYear() === this.getFullYear()
            && date.getMonth() === this.getMonth()
    }

    window.Date.prototype.isSameYear = function (date) {
        return date.getFullYear() === this.getFullYear()
    }
}

export default initProperty
