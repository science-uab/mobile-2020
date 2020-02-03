
  class view
{
  events_list;

  constructor(){
    document.getElementById('id_verifica').addEventListener("click",this.verifica.bind(this));
  }

  set_events(events)
  {
      this.events_list = events;
  }

  verifica(){
    this.events_list.call_event("verifica");
  }

}
