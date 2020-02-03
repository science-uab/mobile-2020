//--------------------------------------------------------------------------------------------------------//
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ MVC - Model View Controller ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
//--------------------------------------------------------------------------------------------------------//


////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                         MODEL - pastreaza date si regulile lor de functionare;                         //
//                               - contine functiile aplicatiei;                                          //
//                                                                                                        //
////////////////////////////////////////////////////////////////////////////////////////////////////////////

class Model 
{
  constructor() 
  {
    this.lista_ToDo = JSON.parse(localStorage.getItem('lista_ToDo')) || []
  }

  legatura_cu_lista_modificata(callback) 
  {
    this.on_lista_modificata = callback
  }

  _commit(lista_ToDo) 
  {
    this.on_lista_modificata(lista_ToDo)
    localStorage.setItem('lista_ToDo', JSON.stringify(lista_ToDo))
  }

  adaugare_lista_ToDo(text_lista) 
  {
    const todo = 
    {
      id: this.lista_ToDo.length > 0 ? this.lista_ToDo[this.lista_ToDo.length - 1].id + 1 : 1,
      text: text_lista,
      completare: false,
    }

    this.lista_ToDo.push(todo)

    this._commit(this.lista_ToDo)
  }

  editare_lista_ToDo(id, text_actualizat) 
  {
    this.lista_ToDo = this.lista_ToDo.map(todo =>
      todo.id === id ? { id: todo.id, text: text_actualizat, completare: todo.completare } : todo)

    this._commit(this.lista_ToDo)
  }

  stergere_lista_ToDo(id) 
  {
    this.lista_ToDo = this.lista_ToDo.filter(todo => todo.id !== id)

    this._commit(this.lista_ToDo)
  }

  indeplinire_ToDo(id) 
  {
    this.lista_ToDo = this.lista_ToDo.map(todo =>
      todo.id === id ? { id: todo.id, text: todo.text, completare: !todo.completare } : todo)

    this._commit(this.lista_ToDo)
  }
}



////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                         VIEW - contine elementele interfetei cu utilizatorul;                          //
//                                                                                                        //
//    In fisierul view, putem accesa instanta controller-ului folosind this.                              //
//    Putem astfel sa primim informatii din afara view-ului, in special proprietatile controller-ului,    //
//       prin evaluarea this->propertyName in interiorul view-lui.                                        //
//                                                                                                        //
////////////////////////////////////////////////////////////////////////////////////////////////////////////

class View 
{
  constructor()
  {
    this.app = this.getElement('#baza_ToDo_list')
    this.form = this.createElement('form')
    this.input = this.createElement('input')
    this.input.type = 'text'
    this.input.placeholder = 'Adauga un ToDo'
    this.input.name = 'todo'
    this.submitButton = this.createElement('button')
    this.submitButton.textContent = 'Adaugare'
    this.form.append(this.input, this.submitButton)
    this.title = this.createElement('h1')
    this.title.textContent = 'My ToDo list for today`s :)'
    this.todoList = this.createElement('ul', 'todo-list')
    this.app.append(this.title, this.form, this.todoList)

    this._text_lista_temporar = ''
    this._initLocalListeners()
  }

  get _text_lista() 
  {
    return this.input.value
  }

  _resetInput() 
  {
    this.input.value = ''
  }

  createElement(tag, className) 
  {
    const element = document.createElement(tag)

    if (className) element.classList.add(className)

    return element
  }

  getElement(selector) 
  {
    const element = document.querySelector(selector)

    return element
  }

  afisare_lista_ToDo(lista_ToDo) 
  {
    // stergerea elementelor
    while (this.todoList.firstChild) 
    {
      this.todoList.removeChild(this.todoList.firstChild)
    }

    // afisare mesaj pentru lista goala
    if (lista_ToDo.length === 0) 
    {
      const p = this.createElement('p')
      p.textContent = 'Nu ai nimic planificat azi! Ai de gand sa stai degeaba?'
      this.todoList.append(p)
    } 
    else 
    {
      // Creaza elemente todo
      lista_ToDo.forEach(todo => 
      {
        const li = this.createElement('li')
        li.id = todo.id

        const checkbox = this.createElement('input')
        checkbox.type = 'checkbox'
        checkbox.checked = todo.completare

        const span = this.createElement('span')
        span.contentEditable = true
        span.classList.add('editable')

        if (todo.completare) 
        {
          const strike = this.createElement('s')
          strike.textContent = todo.text
          span.append(strike)
        } 
        else 
        {
          span.textContent = todo.text
        }

        const button_stergere = this.createElement('button', 'delete')
        button_stergere.textContent = 'Sterge'
        li.append(checkbox, span, button_stergere)

        // Adaugare todo
        this.todoList.append(li)
      })
    }
  }

  _initLocalListeners() 
  {
    this.todoList.addEventListener('input', event => 
    {
      if (event.target.className === 'editable') 
      {
        this._text_lista_temporar = event.target.innerText
      }
    })
  }

  legatura_adaugare_lista_ToDo(handler) 
  {
    this.form.addEventListener('submit', event => 
    {
      event.preventDefault()

      if (this._text_lista) 
      {
        handler(this._text_lista)
        this._resetInput()
      }
    })
  }

  legatura_stergere_lista_ToDo(handler) 
  {
    this.todoList.addEventListener('click', event => 
    {
      if (event.target.className === 'delete') 
      {
        const id = parseInt(event.target.parentElement.id)

        handler(id)
      }
    })
  }

  legatura_editare_lista_ToDo(handler) 
  {
    this.todoList.addEventListener('focusout', event => 
    {
      if (this._text_lista_temporar) 
      {
        const id = parseInt(event.target.parentElement.id)

        handler(id, this._text_lista_temporar)
        this._text_lista_temporar = ''
      }
    })
  }

  legatura_indeplinire_ToDo(handler) 
  {
    this.todoList.addEventListener('change', event => 
    {
      if (event.target.type === 'checkbox') 
      {
        const id = parseInt(event.target.parentElement.id)

        handler(id)
      }
    })
  }
}



/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                  CONTROLLER - executa o functie ceruta de client;                               //
//                                              - face legatura dintre MODEL si VIEW;                              //
//                                                                                                                 //
//  Este creat atunci cand cere clientul ceva.                                                                     //
//  Atunci cand ruleaza, un controller executa o functie ceruta de client.                                         //
//  De obicei, functia apeleaza modelele necesare si va genera un view corespunzator (rezultatul vazut de client). //
//  O functie, este doar o metoda a clasei controller al carei nume incepe cu functie.                             //
//                                                                                                                 //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

class Controller 
{
  constructor(model, view) 
  {
    this.model = model
    this.view = view

    // Lagatura dintre model si view
    this.model.legatura_cu_lista_modificata(this.on_lista_modificata)
    this.view.legatura_adaugare_lista_ToDo(this.handle_adaugare_lista_ToDo)
    this.view.legatura_editare_lista_ToDo(this.handle_editare_lista_ToDo)
    this.view.legatura_stergere_lista_ToDo(this.handle_stergere_lista_ToDo)
    this.view.legatura_indeplinire_ToDo(this.handle_indeplinire_ToDo)

    // afisare lista_ToDo initiala
    this.on_lista_modificata(this.model.lista_ToDo)
  }

  on_lista_modificata = lista_ToDo => 
  {
    this.view.afisare_lista_ToDo(lista_ToDo)
  }

  handle_adaugare_lista_ToDo = text_lista => 
  {
    this.model.adaugare_lista_ToDo(text_lista)
  }

  handle_editare_lista_ToDo = (id, text_lista) => 
  {
    this.model.editare_lista_ToDo(id, text_lista)
  }

  handle_stergere_lista_ToDo = id => 
  {
    this.model.stergere_lista_ToDo(id)
  }

  handle_indeplinire_ToDo = id => 
  {
    this.model.indeplinire_ToDo(id)
  }
}

const app = new Controller(new Model(), new View())




///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                      Fir de executie - Patrate pe fundal                                                      //
// https://www.cssscript.com/animated-particles-background-pure-javascript/ - COD PRELUAT Partial                //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const colors = ["#7fa5e3", "#e896eb", "#b4f0af", "#f0ce7a", "#f08db0"];

const numPatrate = 100;
const patrate = [];

for (let i = 0; i < numPatrate; i++) 
{
  let patrat = document.createElement("div");
  patrat.classList.add("patrat");
  patrat.style.background = colors[Math.floor(Math.random() * colors.length)];
  patrat.style.transform = `scale(${Math.random()})`;
  patrat.style.width = `${Math.random()}em`;
  patrat.style.height = patrat.style.width;
  
  patrate.push(patrat);
  document.body.append(patrat);
}

patrate.forEach((el, i, ra) => 
{
  let to = 
  {
    x: Math.random() * (i % 1 === 0 ? 60 : 100),
    y: Math.random() * 10
  };

  let anim = el.animate
  (
    [
      { transform: "translate(0, 0)" },
      { transform: `translate(${to.x}rem, ${to.y}rem)` }
    ],
    {
      duration: (Math.random() + 1) * 9000, // durata aleatorie
      direction: "alternate",
      fill: "both",
      iterations: Infinity,
      easing: "ease-in-out"
    }
  );
});


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                       Fir de executie - CEAS                                                  //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function startTime() 
      {
        var zi_actuala = new Date();
        var h = zi_actuala.getHours();
        var m = zi_actuala.getMinutes();
        var s = zi_actuala.getSeconds();
        m = checkTime(m);
        s = checkTime(s);
        document.getElementById('ceas').innerHTML =
        h + ":" + m + ":" + s;
        var t = setTimeout(startTime, 500);
      }
      function checkTime(i) 
      {
        if (i < 10) {i = "0" + i};  // adaugarea 0-urilor in fata cifrelor < 10
        return i;
      }




/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                        Senzor -  TOUCH                                                              //
//    Codul este preluat din laboratoarele de programarea dispozitivelor mobile, materie parcursa in sem 1, INFO III   //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

window.addEventListener("touchstart", touch_start_uab, {passive : false});
window.addEventListener("touchmove", touch_move_uab, {passive : false});
window.addEventListener("touchend", touch_end_uab, {passive : false});

var canvas = document.getElementById("id_canvas");
var context = canvas.getContext("2d"); 

var client_rect = canvas.getBoundingClientRect();

var last_touch = [];

function get_random_color()
{
  var tmp = "0123456789ABCDEF";
  var culoare = "#";
  for (var i = 0; i < 6; i++) 
  {
    culoare += tmp[Math.floor(Math.random() * 16)];
  }
  return culoare;
}

function touch_start_uab(e)
{
  e.preventDefault();

  var t = e.changedTouches;
  for (var i = 0; i < t.length; i++)
  {
    context.beginPath();
    context.arc(t[i].pageX - client_rect.left, t[i].pageY - client_rect.top, 2, 0, 2 * Math.PI);
    context.fillStyle = get_random_color();
    context.strokeStyle = context.fillStyle;
    context.fill();
    context.stroke();

    var touch_info = {};
    touch_info.x = t[i].pageX;
    touch_info.y = t[i].pageY;
    touch_info.color = context.fillStyle;
    touch_info.id = t[i].identifier;

    last_touch.push(touch_info);
  }
}

function touch_move_uab(e)
{
  e.preventDefault(); 

  var t = e.changedTouches;
  for (var i = 0; i < t.length; i++)
  {
    var touch_index = -1;
    for (var j=0; j< last_touch.length; j++)
    {
      if (t[i].identifier == last_touch[j].id) 
      {
        touch_index = j;
        break;
      }
    }
    context.beginPath();
    context.moveTo(last_touch[touch_index].x - client_rect.left, last_touch[touch_index].y - client_rect.top);
    context.lineTo(t[i].pageX - client_rect.left, t[i].pageY - client_rect.top);
    context.lineWidth = 10;
    context.strokeStyle = last_touch[touch_index].color;
    context.fillStyle = last_touch[touch_index].color;
    context.fill();
    context.stroke();

    last_touch[touch_index].x = t[i].pageX;
    last_touch[touch_index].y = t[i].pageY;
  }
}

function touch_end_uab(e)
{
  e.preventDefault(); 

  var t = e.changedTouches;
  for (var i = 0; i < t.length; i++)
  {
    var touch_index = -1;
    for (var j=0; j< last_touch.length; j++)
    {
      if (t[i].identifier == last_touch[j].id) 
      {
        touch_index = j;
        break;
      }
    }
    last_touch.splice(touch_index, 1);
  }
}