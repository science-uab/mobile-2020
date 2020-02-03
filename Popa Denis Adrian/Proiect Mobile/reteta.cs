using SQLite;
using System;
using System.Collections.Generic;
using System.Text;

namespace ProiectMobile
{
    public class reteta
    {
        [PrimaryKey, AutoIncrement]
        public int id { get; set; }
        public string NumeReteta { get; set; }
        public string Ingrediente { get; set; }


    }
}
