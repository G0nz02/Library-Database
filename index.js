var server = require("./server");
var router = require("./router");
var requestHandlers = require("./requestHandlers");

var handle = {};
handle["/"] = requestHandlers.login; //http://localhost:3000/login
handle["/login"] = requestHandlers.login; //http://localhost:3000/login
handle["/loginverify"] = requestHandlers.loginverify; //not an actual page
handle["/search"] = requestHandlers.search; //http://localhost:3000/search
//handle["/searchresults"] = requestHandlers.searchresults;
handle["/createUser"] = requestHandlers.createUser; //http://localhost:3000/createUser
handle["/addLogin"] = requestHandlers.addLogin; //not an actual page
handle["/adminUI"] = requestHandlers.adminUI; //http://localhost:3000/adminUI
handle["/BookEntry"] = requestHandlers.Entry; //http://localhost:3000/BookEntry
handle["/BookEdit"] = requestHandlers.BookEdit; //http://localhost:3000/BookEdit
handle["/ElectronicsEdit"] = requestHandlers.ElectronicsEdit; //http://localhost:3000/ElectronicsEdit
handle["/ObjectEdit"] = requestHandlers.ObjectEdit; //http://localhost:3000/ObjectEdit
handle["/MediaEdit"] = requestHandlers.MediaEdit; //http://localhost:3000/MediaEdit
handle["/FacultyEdit"] = requestHandlers.FacultyEdit; //http://localhost:3000/FacultyEdit
handle["/StudentEdit"] = requestHandlers.StudentEdit; //http://localhost:3000/StudentEdit
handle["/GuestEdit"] = requestHandlers.GuestEdit; //http://localhost:3000/GuestEdit
handle["TransactionsEdit"] = requestHandlers.TransactionsEdit; //http://localhost:3000/TransactionsEdit
server.start(router.route, handle);