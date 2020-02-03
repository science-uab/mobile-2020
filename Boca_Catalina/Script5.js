var videos_nr_nat=["nrintregi.mp4","nrr.mp4"];
var vid=document.getElementById("vdisk");
var nr_apasari_next=0;
var nr_apasari_previous=0;
document.getElementById("btn_previous").addEventListener("click",go_back);
document.getElementById("btn_next").addEventListener("click",go_next);
function go_next()
{
	
	if(nr_apasari_next==0)
	{
		vid.src="nrr.mp4";
		nr_apasari_next=nr_apasari_next+1;
	}
	
	else if(nr_apasari_next>=2)
	{
		btn_next.disabled=true;
	}
}
function go_back()
{
    nr_apasari_previous=nr_apasari_previous+1;
	if(nr_apasari_next==0) 
	{
		btn_previous.disabled=true;
	}
	else if(((nr_apasari_previous==1)&&(nr_apasari_next==1))||((nr_apasari_previous==2)&&(nr_apasari_next==2)))
	{
		vid.src="nrintregi.mp4";
		//nr_apasari_previous=nr_apasari_previous+1;
	}
	else if((nr_apasari_previous==1)&&(nr_apasari_next==2))
	{
		vid.src="nrr.mp4";
		//nr_apasari_previous=nr_apasari_previous+1;
	}
}
