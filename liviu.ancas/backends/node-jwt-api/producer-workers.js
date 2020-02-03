// limits and active can be added to any query
// var msgtosend = {client: "prod1", query:"items"};   // items request -all items (can add limits and active)
// var msgtosend = {client: "prod1", query:"items", id:"10"};   // items request based on id
// var msgtosend = {client: "prod1", query:"items", category:"4", limit:"10", active:"1"};   // items request based on category with limit or without limit
// var msgtosend = {client: "prod1", query:"items", nume:"apa", limit:"10", active:"1"};   // items request based on name items with limit or without limit
//  var msgtosend = {client: "prod1", query:"items", detalii:"apa", limit:"10", active:"1"};   // items request based on detalii items with limit or without limit
// var msgtosend = {client: "prod1", query:"items", nume:"apa", detalii:"apa", limit:"10", active:"1"};   // items request based on nume or detalii items with limit or without limit
// var msgtosend = {client: "prod1", query:"items", nume:"apa", detalii:"apa", category:"4", limit:"10", active:"1" };   // items request based on nume or detalii items with limit or without limit
// var msgtosend = {client: "prod1", query:"categorie", parentid:"0"};  //0 - all parent category , if !=0  specific category
// var msgtosend = {client: "prod1", query:"categorie"};  //all cat
// var msgtosend = {client: "prod1", query:"oferta"};  //all cat
// var msgtosend = {client: "prod1", query:"masa", active:"1"};  //default all tables (can add active filter)
// var msgtosend = {client: "prod1", query:"comanda", type:"fin", limit:"10"};  //toate comenzile finalizate (works with limit)
// var msgtosend = {client: "prod1", query:"comanda",  iduser:"1", type:"fin", limit:"10"};  //toate comenzile finalizate (works with limit)
// var msgtosend = {client: "prod1", query:"comanda",  iduser:"1", idcomanda:"1", type:"fin", limit:"10"};  //toate comenzile finalizate cu id si item details
// var msgtosend = {client: "prod1", query:"comanda", limit:"10"};  //toate comenzile active works with limit
// var msgtosend = {client: "prod1", query:"comanda", iduser:"1", limit:"10"};  //toate comenzile active pt userid
// var msgtosend = {client: "prod1", query:"comanda", iduser:"1", idcomanda:"1"};  // comanda cu id si items details
// var msgtosend = {client: "prod1", insert:"item"};  // comanda cu id si items details
// var msgtosend = {client: "prod1", update:"item"};  // comanda cu id si items details

// post -/items
// {
// 	"insert":"item",
// 	"pret":"10",
// 	"nume":"aqua_plat_c_33",
// 	"categorie":"4",
// 	"pic_item":"aqua_plac_c_33.jpg",
// 	"detalii":"Apa plata Carpatica 0.33L",
// 	"obs":"",
// 	"priority":"10",
// 	"activa":"1"
// }
// {"fieldCount":0,"affectedRows":1,"insertId":106,"serverStatus":2,"warningCount":0,"message":"","protocol41":true,"changedRows":0}



// var bcrypt = require('bcryptjs');

// bcrypt.hash('test123', 5, function( err, bcryptedPassword) {
//   console.log(bcryptedPassword.toString());
// });


var amqp = require('amqplib/callback_api');
const CONN_URL = 'amqp://broker:broker@127.0.0.1:5672';
let i = 0;

amqp.connect(CONN_URL, function (err, conn) {
  conn.createChannel(function (err, ch) {
    var queue = 'backrequest'
    ch.assertQueue(queue, {
      durable: true
    });

    ch.assertQueue("Prod1", {
      durable: true
    });

    ch.prefetch(1);
    ch.consume('Prod1', function (msg) {
      console.log('.....');
      console.log("Prod1:" + msg.content.toString() + " si val " + i++);

      ch.ack(msg);
    }
      //,{ noAck: true }

    );
    setInterval(function () {
      ch.sendToQueue(queue, Buffer.from(JSON.stringify(msgtosend)), { persistent: true, replyTo: "Prod1" });
      console.log("message sent");
    }, 1000);
  });
});
