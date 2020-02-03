class events {
    events;

    constructor() {
        this.events = [];
    }

    add_event(event_name, listener) {
        if(this.events.length == 0) {
            this.events.push(event_name);
            this.events[event_name] = [];
        }
        else {
            if(this.events.indexOf[event_name] == -1) {
                this.events.push(event_name);
                this.events[event_name] = [];
            }
        }

        this.events[event_name].push(listener);
    }

    call_event(event_name, params) {
        this.events[event_name].forEach(i => i(params));
    }
}
