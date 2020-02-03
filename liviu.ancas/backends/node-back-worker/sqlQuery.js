module.exports = {
  items: request => {
    let mysqlQuery = "SELECT * FROM items_lista";
    let mysqlQueryLimit = "";
    let mysqlQueryActive = "";

    if (request.limit != null) mysqlQueryLimit = " LIMIT " + request.limit;
    if (request.active != null) mysqlQueryActive = " AND activa_item = '" + request.active + "' ";

    if (request.id == null && request.category == null && request.nume == null && request.detalii == null && request.active != null) mysqlQuery = "SELECT * FROM items_lista WHERE activa_item = '" + request.active + "' " + mysqlQueryLimit;
    if (request.id == null && request.category == null && request.nume == null && request.detalii == null && request.active == null) mysqlQuery = "SELECT * FROM items_lista " + mysqlQueryLimit;

    if (request.id != null) mysqlQuery = "SELECT * FROM items_lista WHERE id_item = '" + request.id + "' " + mysqlQueryActive + mysqlQueryLimit;
    if (request.category != null) mysqlQuery = "SELECT * FROM items_lista WHERE id_categorie_item ='" + request.category + "' " + mysqlQueryActive + mysqlQueryLimit;
    if (request.nume != null) mysqlQuery = "SELECT * FROM items_lista WHERE nume_item like '%" + request.nume + "%' " + mysqlQueryActive + mysqlQueryLimit;
    if (request.detalii != null) mysqlQuery = "SELECT * FROM items_lista WHERE detalii_item like '%" + request.detalii + "%' " + mysqlQueryActive + mysqlQueryLimit;

    if (request.nume != null && request.detalii != null) mysqlQuery = "SELECT * FROM items_lista WHERE detalii_item like '%" + request.detalii + "%' AND nume_item like '%" + request.nume + "%' " + mysqlQueryActive + mysqlQueryLimit;
    if (request.nume != null && request.detalii != null && request.category != null) mysqlQuery = "SELECT * FROM items_lista WHERE detalii_item like '%" + request.detalii + "%' AND nume_item like '%" + request.nume + "%' AND id_categorie_item ='" + request.category + "' " + mysqlQueryActive + mysqlQueryLimit;
    return mysqlQuery;
  },
  category: request => {
    let mysqlQuery = "SELECT * FROM categorie_lista";
    if(request.parentid == "0") mysqlQuery=  "SELECT * FROM categorie_lista WHERE `id_parent_cat` IS NULL;";
    if(request.parentid != "0" && request.parentid !=null) mysqlQuery=  "SELECT * FROM categorie_lista WHERE `id_parent_cat` = "+request.parentid+";";
    return mysqlQuery;
  },
  oferta: request => {
    let mysqlQuery = "SELECT * FROM oferta_lista";
    return mysqlQuery;
  },
  masa: request => {
    let mysqlQuery = "SELECT * FROM masa_lista";    
    if (request.active != null && request.type == null) mysqlQuery = "SELECT * FROM masa_lista WHERE activa_masa = '" + request.active + "' ";
    if (request.type == "rez") mysqlQuery = "SELECT * FROM `masa_rez` ORDER BY `masa_rez`.`data_start_rezervare` DESC";
    return mysqlQuery;    
  },
  comanda: request => {
    let mysqlQuery = "";    
    let mysqlQueryLimit = "";
    let msyqlQueryUser = "";

    if(request.limit != null) mysqlQueryLimit = " LIMIT " + request.limit;
    if(request.iduser != null) msyqlQueryUser = " WHERE `id_user` = "+request.iduser;

    if(request.type == "fin") mysqlQuery = "SELECT * FROM `comanda_finalizata` " + msyqlQueryUser+mysqlQueryLimit;
    if(request.type == null) mysqlQuery = "SELECT * FROM `comanda_activa` "+ msyqlQueryUser+mysqlQueryLimit;

    if(request.idcomanda !=null && request.type == "fin") mysqlQuery = "SELECT * FROM comanda_finalizata as com JOIN comanda_detalii as com_det on com.id_comanda=com_det.id_comanda JOIN items_lista as item ON com_det.id_item = item.id_item WHERE com.id_comanda=1"+request.idcomanda+mysqlQueryLimit;
    if(request.idcomanda !=null && request.type == null) mysqlQuery = "SELECT * FROM comanda_activa as com JOIN comanda_detalii as com_det on com.id_comanda=com_det.id_comanda JOIN items_lista as item ON com_det.id_item = item.id_item WHERE com.id_comanda="+request.idcomanda+mysqlQueryLimit;    
    return mysqlQuery;   
  },
  users: request => {
    let mysqlQuery = "SELECT id,username,fullname,access_lvl,id_masa_user,activ_user FROM all_users";
    if (request.id != null) mysqlQuery = `SELECT id,username,fullname,access_lvl,id_masa_user,activ_user FROM all_users WHERE id='` + request.id + "' LIMIT 1;";
    return mysqlQuery;
  },
  auth: request => {
    let mysqlQuery = "SELECT * FROM all_users WHERE username like '" + request.user + "' limit 1;";
    if(request.hash !=null) mysqlQuery = "SELECT * FROM all_users WHERE id = '"+request.id+"' AND activ_user = 1;";
    return mysqlQuery;
  },
  insertItem: request => {
    
    let mysqlQuery = "INSERT INTO `items_lista` (`id_item`, `pret_item`, `nume_item`, `id_categorie_item`, `pic_item`, `detalii_item`, `obs_item`, `priority_item`, `activa_item`) \
                      VALUES (NULL, '"+request.pret+"', '"+request.nume+"', '"+request.categorie+"', '"+request.pic_item+"', '"+request.detalii+"', '"+request.obs+"', '"+request.priority+"', '"+request.activa+"');";
    return mysqlQuery;
  },
  insertComanda: request =>{
    let mysqlQuery = "INSERT INTO `items_lista` (`id_item`, `pret_item`, `nume_item`, `id_categorie_item`, `pic_item`, `detalii_item`, `obs_item`, `priority_item`, `activa_item`) \
                      VALUES (NULL, '"+request.pret+"', '"+request.nume+"', '"+request.categorie+"', '"+request.pic_item+"', '"+request.detalii+"', '"+request.obs+"', '"+request.priority+"', '"+request.activa+"');";
    return mysqlQuery;    
  },
  updateItem: request => {

  },
  updateComanda: request => {

  }
};