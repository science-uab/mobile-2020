class t_eq2_controller{
    view;
    model;
    constructor(view, model)
    {
        this.view = view;
        this.model = model;

        // creiem o lista de functii
        var events = new t_events();
        // adaugam on_solve(din contriller) in lista de functii
        events.add_event("on_solve_clicked_uab", this.on_solve.bind(this));
        //transmitem lista de functii la view
        this.view.set_events(events);
    }
    on_solve()
    {
       var a = this.view.get_a();
       var b = this.view.get_b();

        this.model.set_coefficients(a , b);
        //seteaza coeficientii din model
        var numarConvertit = this.model.get_solutions(a, b);
        this.view.set_solutions_para(numarConvertit);
    }
}

var app = new t_eq2_controller (new t_eq2_view(), new t_eq2_model());