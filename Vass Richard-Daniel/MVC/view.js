class view
{
  events_list;

  constructor()
  {
      document.getElementById("id_start").addEventListener("click", this.on_button_pressed.bind(this)); //bind=fortez sa se lege de this-ul curent
      document.getElementById("id_btnCheck").addEventListener("check",this.check.bind(this));
  }

  set_events(events) //setam lista de functii
  {
      this.events_list = events;
  }

  on_button_pressed()
  {
      //controller.on_solve
      //din lista functii apleleaza functia dorita
      this.events_list.call_event("solve");
  }

  check()
  {
    this.evens_list.call_event("checker");
  }

  get_myResult()
  {
    return document.getElementById("id_result").value;
  }

  set_random_numbers(nr1, nr2)
  {
      document.getElementById("id_random_1").innerHTML = nr1;
      document.getElementById("id_random_2").innerHTML = nr2;
  }
}
