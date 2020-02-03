class model
{
  rand_1;
  rand_2;
  result;
  verifier;

  constructor()
  {
    this.rand_1 = 0;
    this.rand_2 = 0;
    this.result = 0;
    this.verifier = 0;
  }

  set_randoms(rand_1,rand_2)
  {
    this.rand_1 = rand_1;
    this.rand_2 = rand_2;
  }

  solution()
  {
    this.result = this.rand_1 + this.rand_2;
  }

  set_verifier()
  {
    return this.verifier;
  }

  mySolution()
  {
    var time = 5;
    document.getElementById("id_start").disabled = true;

    setInterval( function()
    {
      time--;
      if(time == -1)
      {
        this.verifier = 1;
        alert(this.verifier);
        time = 6;

        //this.restarter = 0;
      }
      document.getElementById("timer").innerHTML = time;
    }, 1000);
    this.restarter = 0;
  }

  result_1()
  {
    this.rand_1 = Math.floor(Math.random() * 100) + 1;
    return this.rand_1;
  }

  result_2()
  {
    this.rand_2 = Math.floor(Math.random() * 100) + 1;
    return this.rand_2;
  }

  get_randoms()
  {
      var randoms = {};
      randoms.rand_1 = this.rand_1;
      randoms.rand_2 = this.rand_2;
      return randoms;
  }
}
