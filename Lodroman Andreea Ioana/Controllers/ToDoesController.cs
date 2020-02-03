using Microsoft.AspNet.Identity;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using ToDoList.Models;

//Inspired from Pill Bug Interactive

namespace ToDoList.Controllers
{
    public class ToDoesController : Controller
    {
        private ApplicationDbContext db = new ApplicationDbContext();

        // GET: ToDoes
        public ActionResult Index()
        {
             string Idusercurent = User.Identity.GetUserId();
             ApplicationUser usercurent = db.Users.FirstOrDefault
                 (x => x.Id == Idusercurent);
            return View(
                db.ToDos.ToList().Where(x=>x.User == usercurent));
                   
        }

        /*private IEnumerable<ToDo> GetMyToDoes()
        {
            string Idusercurent = User.Identity.GetUserId();
            ApplicationUser usercurent = db.Users.FirstOrDefault
                 (x => x.Id == Idusercurent);
            return db.ToDos.ToList().Where(x => x.User ==usercurent);
        }*/

        public ActionResult BuildToDoTable()
        {
            string Idusercurent = User.Identity.GetUserId();
           ApplicationUser usercurent = db.Users.FirstOrDefault
               (x => x.Id == Idusercurent);
            return PartialView(db.ToDos.ToList().Where(x => x.User==usercurent));
        }

        // GET: ToDoes/Details/5
        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            ToDo toDo = db.ToDos.Find(id);
            if (toDo == null)
            {
                return HttpNotFound();
            }
            return View(toDo);
        }

        // GET: ToDoes/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: ToDoes/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include = "Id,Descriere,Finalizat")] ToDo toDo)
        {
            if (ModelState.IsValid)
            {
                string Idusercurent = User.Identity.GetUserId();
                ApplicationUser usercurent = db.Users.FirstOrDefault
                    (x => x.Id == Idusercurent);
                toDo.User = usercurent;
                db.ToDos.Add(toDo);
                db.SaveChanges();
                return RedirectToAction("Index");
            }

            return View(toDo);
        }

        //De aici am modificat, in caz ca nu merge, de aici sterg
            

       
        //pana aici
        // GET: ToDoes/Edit/5
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            ToDo toDo = db.ToDos.Find(id);
            if (toDo == null)
            {
                return HttpNotFound();
            }
            return View(toDo);
        }

        // POST: ToDoes/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
      

        // GET: ToDoes/Delete/5
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            ToDo toDo = db.ToDos.Find(id);
            if (toDo == null)
            {
                return HttpNotFound();
            }
            return View(toDo);
        }

        // POST: ToDoes/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            ToDo toDo = db.ToDos.Find(id);
            db.ToDos.Remove(toDo);
            db.SaveChanges();
            return RedirectToAction("Index");
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}
