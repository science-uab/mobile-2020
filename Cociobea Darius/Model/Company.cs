using SQLite;
using System;
using System.Collections.Generic;
using System.Text;

namespace MoveMe.Model
{
    public class Company
    {
        [PrimaryKey, AutoIncrement]
        public int id { get; set; }
        public string companyName { get; set; }
        public string password { get; set; }
        public string email { get; set; }
        public string city { get; set; }
        public string address { get; set; }
        public double feePerKm { get; set; }
    }
}
