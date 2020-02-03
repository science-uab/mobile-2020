class app_controller_V
{
view;
model;
  constructor(view)
	{
		this.view=view;
		var events=new app_events();
		events.add_event("navigation_app_V",this.on_click_menu_V.bind(this));
		this.view.set_events_list(events);
		
	}
		
	on_click_menu_V()
	{
		this.view.get_menu_V();
	}

	
}
const app_V=new app_controller_V(new app_view());
class app_controller_VI
{
view;
  constructor(view)
	{
		this.view=view;
		var events=new app_events();
		events.add_event("navigation_app_VI",this.on_click_menu_VI.bind(this));
		this.view.set_events_list(events);
	}
		
	on_click_menu_VI()
	{
		this.view.get_menu_VI();
	}
}
const app_VI=new app_controller_VI(new app_view());
class app_controller_VII
{
view;
  constructor(view)
	{
		this.view=view;
		var events=new app_events();
		events.add_event("navigation_app_VII",this.on_click_menu_VII.bind(this));
		this.view.set_events_list(events);
	}
		
	on_click_menu_VII()
	{
		this.view.get_menu_VII();
	}
}
const app_VII=new app_controller_VII(new app_view());
class app_controller_VIII
{
view;
  constructor(view)
	{
		this.view=view;
		var events=new app_events();
		events.add_event("navigation_app_VIII",this.on_click_menu_VIII.bind(this));
		this.view.set_events_list(events);
	}
		
	on_click_menu_VIII()
	{
		this.view.get_menu_VIII();
	}
	
}
const app_VIII=new app_controller_VIII(new app_view());
class app_controller_calculator
{
view;
model;
  constructor(view,model)
	{
		this.view=view;
		this.model=model;
		var events=new app_events();
		   events.add_event("calcul",this.on_click_rezolva.bind(this));
		   this.view.set_events_list(events);
	}
		
	on_click_rezolva()
	{
		var a=this.view.get_a();
		var b=this.view.get_b();
		var operatie=this.view.get_operatie();
		this.model.set_coeficients(a,b,operatie);
		this.model.aplica_operatie();
		var rez=this.model.get_rezultat();
		alert("Rezultat calcul : "+rez);
	}
	
}
const app_calc=new app_controller_calculator(new app_view_calc(),new app_model());