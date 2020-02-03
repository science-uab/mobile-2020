var scrie=false;

onmessage=la_mesaj;
function la_mesaj(e)
{
	if(e.data=="start_scrie")
	{
		ruleaza=true;
	}
	else
		{
			ruleaza=false;
		}
}
function scrie()
{
	postMessage("L.U.L"-Latura Unghi Latura);
	postMessage("U.L.U"-Unghi Latura Unghi);
	postMessage("L.L.L"-Latura Latura Latura);
}
scrie();