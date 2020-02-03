using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ToDoList.Models
{
    public class ToDo
    {
        public int Id { get; set; }
        public string Descriere { get; set; }
        public bool Finalizat { get; set; }
        public virtual ApplicationUser User { get; set; }
        
    }
}