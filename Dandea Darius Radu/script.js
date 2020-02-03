/**
 * @class Model
 *
 * Manages the data of the application.
 */
class Model {
  constructor() {
    this.lucrue = JSON.parse(localStorage.getItem('lucrue')) || []
  }

  bindlucruListChanged(callback) {
    this.onlucruListChanged = callback
  }

  _commit(lucrue) {
    this.onlucruListChanged(lucrue)
    localStorage.setItem('lucrue', JSON.stringify(lucrue))
  }

  addlucru(lucruText) {
    const lucru = {
      id: this.lucrue.length > 0 ? this.lucrue[this.lucrue.length - 1].id + 1 : 1,
      text: lucruText,
      complete: false,
    }

    this.lucrue.push(lucru)

    this._commit(this.lucrue)
  }

  editlucru(id, updatedText) {
    this.lucrue = this.lucrue.map(lucru =>
      lucru.id === id ? { id: lucru.id, text: updatedText, complete: lucru.complete } : lucru
    )

    this._commit(this.lucrue)
  }

  deletelucru(id) {
    this.lucrue = this.lucrue.filter(lucru => lucru.id !== id)

    this._commit(this.lucrue)
  }

  togglelucru(id) {
    this.lucrue = this.lucrue.map(lucru =>
      lucru.id === id ? { id: lucru.id, text: lucru.text, complete: !lucru.complete } : lucru
    )

    this._commit(this.lucrue)
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
    this.form = this.createElement('form')
    this.input = this.createElement('input')
    this.input.type = 'text'
    this.input.placeholder = 'Add lucru'
    this.input.name = 'lucru'
    this.submitButton = this.createElement('button')
    this.submitButton.textContent = 'Submit'
    this.form.append(this.input, this.submitButton)
    this.title = this.createElement('h1')
    this.title.textContent = 'lucrue'
    this.lucruList = this.createElement('ul', 'lucru-list')
    this.app.append(this.title, this.form, this.lucruList)

    this._temporarylucruText = ''
    this._initLocalListeners()
  }

  get _lucruText() {
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

  displaylucrue(lucrue) {
    // Delete all nodes
    while (this.lucruList.firstChild) {
      this.lucruList.removeChild(this.lucruList.firstChild)
    }

    // Show default message
    if (lucrue.length === 0) {
      const p = this.createElement('p')
      p.textContent = 'Nimic de lucruut! Adaugati un task nou?'
      this.lucruList.append(p)
    } else {
      // Create nodes
      lucrue.forEach(lucru => {
        const li = this.createElement('li')
        li.id = lucru.id

        const checkbox = this.createElement('input')
        checkbox.type = 'checkbox'
        checkbox.checked = lucru.complete

        const span = this.createElement('span')
        span.contentEditable = true
        span.classList.add('editable')

        if (lucru.complete) {
          const strike = this.createElement('s')
          strike.textContent = lucru.text
          span.append(strike)
        } else {
          span.textContent = lucru.text
        }

        const deleteButton = this.createElement('button', 'delete')
        deleteButton.textContent = 'Delete'
        li.append(checkbox, span, deleteButton)

        // Append nodes
        this.lucruList.append(li)
      })
    }

    // Debugging
    console.log(lucrue)
  }

  _initLocalListeners() {
    this.lucruList.addEventListener('input', event => {
      if (event.target.className === 'editable') {
        this._temporarylucruText = event.target.innerText
      }
    })
  }

  bindAddlucru(handler) {
    this.form.addEventListener('submit', event => {
      event.preventDefault()

      if (this._lucruText) {
        handler(this._lucruText)
        this._resetInput()
      }
    })
  }

  bindDeletelucru(handler) {
    this.lucruList.addEventListener('click', event => {
      if (event.target.className === 'delete') {
        const id = parseInt(event.target.parentElement.id)

        handler(id)
      }
    })
  }

  bindEditlucru(handler) {
    this.lucruList.addEventListener('focusout', event => {
      if (this._temporarylucruText) {
        const id = parseInt(event.target.parentElement.id)

        handler(id, this._temporarylucruText)
        this._temporarylucruText = ''
      }
    })
  }

  bindTogglelucru(handler) {
    this.lucruList.addEventListener('change', event => {
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
    this.model.bindlucruListChanged(this.onlucruListChanged)
    this.view.bindAddlucru(this.handleAddlucru)
    this.view.bindEditlucru(this.handleEditlucru)
    this.view.bindDeletelucru(this.handleDeletelucru)
    this.view.bindTogglelucru(this.handleTogglelucru)

    // Display initial lucrue
    this.onlucruListChanged(this.model.lucrue)
  }

  onlucruListChanged = lucrue => {
    this.view.displaylucrue(lucrue)
  }

  handleAddlucru = lucruText => {
    this.model.addlucru(lucruText)
  }

  handleEditlucru = (id, lucruText) => {
    this.model.editlucru(id, lucruText)
  }

  handleDeletelucru = id => {
    this.model.deletelucru(id)
  }

  handleTogglelucru = id => {
    this.model.togglelucru(id)
  }
}

const app = new Controller(new Model(), new View())


