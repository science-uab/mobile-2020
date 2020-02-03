class events //t_list_of_events_and_functions
{
    events;

    constructor()
    {   //this il folosom cand avem variabile locale....doar in clasa noastra
        this.events = []; //vector gol in care vom pastra evenimente[on_click->f1,f2...., on_draw,on_close]
        //la fiecare functie din vector vom avea alte functii care ajuta la desfasurarea evenimentului....lista de liste
    }

    add_event(event_name, listener) //add_event("click",f1) add_event("draw",g1) add_event("click",f2)
    {
        if(this.events.length == 0)
        {
            this.events.push(event_name);
            this.events[event_name] = []; //cream o lista goala atasata unui eveniment...lista de functii( adica la on_click pentru f1, f2..)
        }
        else
            if(this.events.indexOf[event_name] == -1) //evenimentul nu este in lista
            {
                this.events.push(event_name);
                this.events[event_name] = [];
            }
        this.events[event_name].push(listener);
    }

    call_event(event_name, params)
    {
        //() => () apelare functie
        this.events[event_name].forEach(i => i(params));
    }
}
