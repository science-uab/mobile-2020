
## Nume Proiect:

 FoodAppV3
 
## Autor:

 Neag Mircea
 
## Descriere:

 Aplicatie android tip carte de bucate, utilizatorul poate vizualiza, introduce, edita si sterge retete.
 
 Creata dupa modelul MVVM, foloseste async task-uri pentru operatiile asupra bazei de date sqlite.
 
## Structura aplicatiei:
 __[View]__
 
 Activitati/UI 
 
 __[ViewModel]__
 
 ViewModel	 - nivel de abstractie intre View si Repository;  
 
 __[Model]__
 
 Repository - nivel de abstractie intre ViewModel si baza de date;  
 
 DAO 		 - Data Acces Object, interfata implementata de Room pt operatiile asupra DB; 
 
 DataBase   - baza de date, mosteneste RoomDataBase
 
 Food 		 - o simpla clasa cu atribute si metode get/set specifice;
 
 FoodData - clasa cu o metoda ce returneaza un array de instante Food
 
## Sistem de operare:
 Android
 
## Tehnologii/biblioteci folosite:

 [Room](https://developer.android.com/topic/libraries/architecture/room) pentru abstractizarea operatiilor cu baze de date
 
 
 [LifeCycle](https://developer.android.com/topic/libraries/architecture/lifecycle) pentru LiveData (date observabile) si ViewModel
 
 
 [RecyclerView](https://developer.android.com/guide/topics/ui/layout/recyclerview) pentru lista glisabila
 
 
 [CircleImageView](https://github.com/hdodenhof/CircleImageView) pentru imagini in forma de cerc
 
 
 [Glide](https://github.com/bumptech/glide) pentru afisarea imaginilor
 
 ## Capturi ecran:
 
 * Ecran principal:
 
 ![alt text](https://github.com/NeagMircea/FoodAppV3/blob/master/capturi_ecran/ecran_principal.png "Ecran principal")
 
 * Cautare in ecran principal:
 
 ![alt text](https://github.com/NeagMircea/FoodAppV3/blob/master/capturi_ecran/ecran_principal_cautare.png "Cautare")
  
 * Ecran reteta:
 
 ![alt text](https://github.com/NeagMircea/FoodAppV3/blob/master/capturi_ecran/ecran_reteta.png "Ecran reteta")
 
 * Ecran inserare:
 
 ![alt text](https://github.com/NeagMircea/FoodAppV3/blob/master/capturi_ecran/ecran_inserare.png "Ecran inserare")
 
 * Ecran principal dupa inserare:
 
 ![alt text](https://github.com/NeagMircea/FoodAppV3/blob/master/capturi_ecran/ecran_reteta_inserata.png "Ecran principal dupa inserare")
