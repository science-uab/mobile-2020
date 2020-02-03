class t_eq2_model{
    a;
    b;
    c;
    x1_re;
    x1_im;
    x2_re;
    x2_im;
    apiWeatherUrl;
    constructor()
    {
        this.a = 1;
        this.b = 1;
        this.c = 1;
        this.x1_re = 0;
        this.x1_im = 0;
        this.x2_re = 0;
        this.x2_im = 0;
    }
    set_coefficients(a , b)
    {
        this.a = a;
        this.b = b;
    }
 
    get_solutions(numar, conversie)
    {
        if(conversie == "Bin"){
            var numarBin = Number(numar).toString(2)
            return numarBin
        }
        if(conversie == "Hex"){
            var numarHex = Number(numar).toString(16)
            return numarHex
        }
        if(conversie == "Oct"){
            var numarOct = Number(numar).toString(8)
            return numarOct
        }
    }
}