

class DashElements {

    calendar = () => {return 'div[class="DayPicker-Months"]'}
    day = () => {return '.DayPicker-Day--available'}
    customerValidate = () => {return '.appointment'}
    hourValidate = () => {return '.sc-fzpjYC'}
    buttonNextMonth = () => {return 'span[aria-label="Next Month"]'}
}

export default new DashElements()