using SQLite;
using System;
using System.Collections.Generic;
using System.Text;

namespace MoveMe.Model
{
    public class User
    {
        [PrimaryKey, AutoIncrement]
        public int id { get; set; }
        public string firstName { get; set; }
        public string lastName { get; set; }
        public string email { get; set; }
        public string password { get; set; }
    }
}
