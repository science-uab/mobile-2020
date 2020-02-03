/**
 * @class Model
 *
 * Manages the data of the application.
 */
class Model {
    constructor() {
        this.gyros = JSON.parse(localStorage.getItem('gyros')) || []
    }

    bindgyroListChanged(callback) {
        this.ongyroListChanged = callback
    }

    _commit(gyros) {
        this.ongyroListChanged(gyros)
        localStorage.setItem('gyros', JSON.stringify(gyros))
    }

    addgyro(gyroText) {
        const gyro = {
            id: this.gyros.length > 0 ? this.gyros[this.gyros.length - 1].id + 1 : 1,
            text: gyroText
        }

        this.gyros.push(gyro)

        this._commit(this.gyros)
    }

    deletegyro(id) {
        this.gyros = this.gyros.filter(gyro => gyro.id !== id)

        this._commit(this.gyros)
    }

    togglegyro(id) {
        this.gyros = this.gyros.map(gyro =>
            gyro.id === id ? { id: gyro.id, text: gyro.text, complete: !gyro.complete } : gyro
        )

        this._commit(this.gyros)
    }
}

/**
 * @class View
 *
 * Visual representation of the model.
 */
class View {
    constructor() {
        this.app = this.getElement('#root')
        this.title = this.createElement('h1')
        this.title.textContent = 'History'
        this.gyroList = this.createElement('ul', 'gyro-list')
        this.app.append(this.title, this.gyroList)

        this._temporarygyroText = ''
        this._initLocalListeners()
    }

    get _gyroText() {
        return this.input.value
    }

    _resetInput() {
        this.input.value = ''
    }

    createElement(tag, className) {
        const element = document.createElement(tag)

        if (className) element.classList.add(className)

        return element
    }

    getElement(selector) {
        const element = document.querySelector(selector)

        return element
    }

    displaygyros(gyros) {
        // Delete all nodes
        while (this.gyroList.firstChild) {
            this.gyroList.removeChild(this.gyroList.firstChild)
        }

        // Show default message
        if (gyros.length === 0) {
            const p = this.createElement('p')
            p.textContent = 'Nothing'
            this.gyroList.append(p)
        } else {
            // Create nodes
            gyros.forEach(gyro => {
                const li = this.createElement('li')
                li.id = gyro.id

                const span = this.createElement('span', 'coords')
                span.contentEditable = true
                span.classList.add('editable')

                if (gyro.complete) {
                    const strike = this.createElement('s')
                    strike.textContent = gyro.text
                    span.append(strike)
                } else {
                    span.textContent = gyro.text
                }

                const deleteButton = this.createElement('button', 'delete')
                deleteButton.textContent = 'Delete'
                li.append(span, deleteButton)

                // Append nodes
                this.gyroList.append(li)
            })
        }

        // Debugging
        // console.log(gyros)
    }

    _initLocalListeners() {
        this.gyroList.addEventListener('input', event => {
            if (event.target.className === 'editable') {
                this._temporarygyroText = event.target.innerText
            }
        })
    }

    bindDeletegyro(handler) {
        this.gyroList.addEventListener('click', event => {
            if (event.target.className === 'delete') {
                const id = parseInt(event.target.parentElement.id)

                handler(id)
            }
        })
    }

    bindEditgyro(handler) {
        this.gyroList.addEventListener('focusout', event => {
            if (this._temporarygyroText) {
                const id = parseInt(event.target.parentElement.id)

                handler(id, this._temporarygyroText)
                this._temporarygyroText = ''
            }
        })
    }

    bindTogglegyro(handler) {
        this.gyroList.addEventListener('change', event => {
            if (event.target.type === 'checkbox') {
                const id = parseInt(event.target.parentElement.id)

                handler(id)
            }
        })
    }
}

/**
 * @class Controller
 *
 * Links the user input and the view output.
 *
 * @param model
 * @param view
 */
class Controller {
    constructor(model, view) {
        this.model = model
        this.view = view

        // Explicit this binding
        this.model.bindgyroListChanged(this.ongyroListChanged)
        this.view.bindEditgyro(this.handleEditgyro)
        this.view.bindDeletegyro(this.handleDeletegyro)
        this.view.bindTogglegyro(this.handleTogglegyro)

        // Display initial gyros
        this.ongyroListChanged(this.model.gyros)
        var self = this;
        document.addEventListener('saveOrientation', function (event) {
            let data = {'x': event.detail.beta, 'y': event.detail.gama};
            let display = 'x:' + parseFloat(event.detail.beta).toFixed(3) + ' y:' + parseFloat(event.detail.beta).toFixed(3)
            self.model.addgyro(display);

            console.log(event);
        })
    }

    ongyroListChanged = gyros => {
        this.view.displaygyros(gyros)
    }

    handleAddgyro = gyroText => {
        this.model.addgyro(gyroText)
    }

    handleDeletegyro = id => {
        this.model.deletegyro(id)
    }

    handleTogglegyro = id => {
        this.model.togglegyro(id)
    }
}

const app = new Controller(new Model(), new View())