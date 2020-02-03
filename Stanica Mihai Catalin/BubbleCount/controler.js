class controler {
    view;
    model;

    constructor() {
      this.view = new view();
      this.model = new model();

      var events_list = new events();
      events_list.add_event("verifica", this.verificaNumarul.bind(this));
      this.view.set_events(events_list);
    }

    verificaNumarul() { 
      this.model.verifica();
    }
}

const app = new controler();
