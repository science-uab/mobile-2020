class controller
{
    view;
    model;

    constructor(view, model)
    {
      this.view = view;
      this.model = model;

      var events_list = new events();  //cream o lista de functii
      events_list.add_event("solve", this.solving.bind(this)); //adaugam un nume care vrem noi si atasam functia de mai jos
      //adaugam la lista pe on_solve
      this.view.set_events(events_list);   //trimitem la view lista de functii
    }

    solving()
    {
      this.model.mySolution();

      var num1 = this.model.result_1();
      var num2 = this.model.result_2();

      this.model.set_randoms(num1,num2);
      this.model.solution();
      var randoms = this.model.get_randoms();

      this.view.set_random_numbers(randoms.rand_1,randoms.rand_2);

      //this.model.get_myResult();
    }
}

const app = new controller(new view(),new model());
