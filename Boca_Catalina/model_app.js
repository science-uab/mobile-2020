class app_model
{
a;
b;
operatie;
constructor()
{
	this.a=0;
    this.b=0;	
	this.operatie="";
}
set_coeficients(a,b,operatie)
	{
		this.a=a;
		this.b=b;
		this.operatie=id_operatie.value;
	}
aplica_operatie()
{
	if(this.operatie=="+")
	{
		this.rezultat=Number(this.a)+Number(this.b);
	}
	if(this.operatie=="-")
	{
		this.rezultat=Number(this.a)-Number(this.b);
	}
	if(this.operatie=="*")
	{
		this.rezultat=Number(this.a)*Number(this.b);
	}
	if(this.operatie=="/"&& this.b!=0)
	{
		this.rezultat=Number(this.a)/Number(this.b);
	}
	else if((this.operatie=="/")&&(this.b==0))
	{
		this.rezultat="Nu se poate";
	}
}
get_rezultat()
{
	var result=0;
	result=this.rezultat;
	return result;
}
}
