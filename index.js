var server = require("./server");
var router = require("./router");
var requestHandlers = require("./requestHandlers");
var EditrequestHandlers = require("./EditrequestHandlers");
var mUI_requestHandlers = require("./mUI_requestHandlers");
var requestHandlersReport = require("./requestHandlersReport");

var handle = {};
handle["/"] = requestHandlers.login; //http://localhost:3000/login
handle["/login"] = requestHandlers.login; //http://localhost:3000/login
handle["/loginverify"] = requestHandlers.loginverify; //not an actual page
handle["/PasswordChanger"] = requestHandlers.PasswordChanger; //http://localhost:3000/PasswordChanger

handle["/memberUI"] = mUI_requestHandlers.memberUI; //http://localhost:3000/memberUI
handle["/bookSearch"] = mUI_requestHandlers.bookSearch; //http://localhost:3000/bookSearch
handle["/mediaSearch"] = mUI_requestHandlers.mediaSearch; //http://localhost:3000/mediaSearch
handle["/electronicSearch"] = mUI_requestHandlers.electronicSearch; //http://localhost:3000/electronicSearch
handle["/borrowHolds"] = mUI_requestHandlers.borrowHolds; //http://localhost:3000/borrowHolds

handle["/librarySearch"] = mUI_requestHandlers.librarySearch; //http://localhost:3000/librarySearch
handle["/bookReserve"] = mUI_requestHandlers.bookReserve; 
handle["/mediaReserve"] = mUI_requestHandlers.mediaReserve; 
handle["/electronicReserve"] = mUI_requestHandlers.electronicReserve; 

handle["/bookReservations"] = mUI_requestHandlers.bookReservations; 
handle["/mediaReservations"] = mUI_requestHandlers.mediaReservations; 
handle["/electronicReservations"] = mUI_requestHandlers.electronicReservations; 

handle["/bookTransactions"] = mUI_requestHandlers.bookTransactions; 
handle["/mediaTransactions"] = mUI_requestHandlers.mediaTransactions; 
handle["/electronicTransactions"] = mUI_requestHandlers.electronicTransactions; 

handle["/BookdeleteReservation"] = mUI_requestHandlers.BookdeleteReservation; 
handle["/MediadeleteReservation"] = mUI_requestHandlers.MediadeleteReservation; 
handle["/ElectronicdeleteReservation"] = mUI_requestHandlers.ElectronicdeleteReservation; 

handle["/profile"] = mUI_requestHandlers.profile; //http://localhost:3000/profile

handle["/getInfo"] = requestHandlers.getInfo;

handle["/search"] = requestHandlers.search; //http://localhost:3000/search
handle["/createUser"] = requestHandlers.createUser; //http://localhost:3000/createUser
handle["/addLogin"] = requestHandlers.addLogin; //not an actual page
handle["/adminUI"] = requestHandlers.adminUI; //http://localhost:3000/adminUI

handle["/BookEntry"] = requestHandlers.BookEntry; //http://localhost:3000/BookEntry
handle["/ElectronicsEntry"] = requestHandlers.ElectronicsEntry; //http://localhost:3000/ElectronicsEntry
handle["/MediaEntry"] = requestHandlers.MediaEntry; //http://localhost:3000/MediaEntry
handle["/ObjectEntry"] = requestHandlers.ObjectEntry; //http://localhost:3000/ObjectEntry
handle["/TransactionEntry"] = requestHandlers.TransactionEntry; //http://localhost:3000/TransactionEntry
handle["/Checkin"] = requestHandlers.Checkin; //http://localhost:3000/Checkin

handle["/BookEdit"] = requestHandlers.BookEdit; //http://localhost:3000/BookEdit
handle["/ElectronicsEdit"] = requestHandlers.ElectronicsEdit; //http://localhost:3000/ElectronicsEdit
handle["/ObjectEdit"] = requestHandlers.ObjectEdit; //http://localhost:3000/ObjectEdit
handle["/MediaEdit"] = requestHandlers.MediaEdit; //http://localhost:3000/MediaEdit

handle["/FacultyEdit"] = requestHandlers.FacultyEdit; //http://localhost:3000/FacultyEdit
handle["/StudentEdit"] = requestHandlers.StudentEdit; //http://localhost:3000/StudentEdit
handle["/GuestEdit"] = requestHandlers.GuestEdit; //http://localhost:3000/GuestEdit
handle["/TransactionsEdit"] = requestHandlers.TransactionsEdit; //http://localhost:3000/TransactionsEdit
handle["/ReservationsEdit"] = requestHandlers.ReservationsEdit; //http://localhost:3000/ReservationsEdit

handle["/StudentEntry"] = requestHandlers.StudentEntry; //http://localhost:3000/StudentEntry
handle["/GuestEntry"] = requestHandlers.GuestEntry; //http://localhost:3000/GuestEntry
handle["/FacultyEntry"] = requestHandlers.FacultyEntry; //http://localhost:3000/FacultyEntry
handle["/SearchBooks"] = requestHandlers.SearchBooks; //http://localhost:3000/bookSearch
handle["/AdminEntry"] = requestHandlers.AdminEntry; //http://localhost:3000/AdminEntry

handle["/AdminReportMain"] = requestHandlers.AdminReportMain; //http://localhost:3000/AdminReportMain
handle["/AdminReportBook"] = requestHandlers.AdminReportBook; //http://localhost:3000/AdminReportBook
handle["/AdminReportBookSearch"] = requestHandlers.AdminReportBookSearch; //http://localhost:3000/AdminReportBookSearch

handle["/addItem"] = requestHandlers.addItem; //http://localhost:3000/addItem
handle["/DeleteBook"] = requestHandlers.DeleteBook; //http://localhost:3000/DeleteBook
handle["/UpdateBook"] = requestHandlers.UpdateBook; //http://localhost:3000/BookUpdate

handle["/SearchElectronics"] = EditrequestHandlers.SearchElectronics; //http://localhost:3000/ElectronicsUpdate
handle["/UpdateElectronics"] = EditrequestHandlers.UpdateElectronics; //http://localhost:3000/ElectronicsUpdate
handle["/DeleteElectronics"] = EditrequestHandlers.DeleteElectronics; //http://localhost:3000/DeleteElectronics

handle["/SearchObjects"] = EditrequestHandlers.SearchObjects; //http://localhost:3000/SearchObjects
handle["/UpdateObjects"] = EditrequestHandlers.UpdateObjects; //http://localhost:3000/UpdateObjects
handle["/DeleteObjects"] = EditrequestHandlers.DeleteObjects; //http://localhost:3000/DeleteObjects

handle["/SearchMedia"] = EditrequestHandlers.SearchMedia; //http://localhost:3000/SearchMedia
handle["/UpdateMedia"] = EditrequestHandlers.UpdateMedia; //http://localhost:3000/UpdateMedia
handle["/DeleteMedia"] = EditrequestHandlers.DeleteMedia; //http://localhost:3000/DeleteMedia

handle["/insertTransaction"] = requestHandlers.insertTransaction; //http://localhost:3000/insertTransaction
handle["/SearchTransactions"] = EditrequestHandlers.SearchTransactions; //http://localhost:3000/SearchTransactions
handle["/UpdateTransactions"] = EditrequestHandlers.UpdateTransactions; //http://localhost:3000/UpdateTransactions
handle["/DeleteTransactions"] = EditrequestHandlers.DeleteTransactions; //http://localhost:3000/DeleteTransactions
handle["/pullTransactions"] = requestHandlers.pullTransactions; //http://localhost:3000/pullTransactions
handle["/checkInItem"] = requestHandlers.checkInItem; //http://localhost:3000/checkIn
handle["/rTot"] = requestHandlers.rTot; //http://localhost:3000/rTot

handle["/pullReservation"] = requestHandlers.pullReservation; //http://localhost:3000/pullReservations
handle["/SearchReservations"] = EditrequestHandlers.SearchReservations; //http://localhost:3000/SearchReservations
handle["/UpdateReservations"] = EditrequestHandlers.UpdateReservations; //http://localhost:3000/UpdateReservations
handle["/DeleteReservations"] = EditrequestHandlers.DeleteReservations; //http://localhost:3000/DeleteReservations

handle["/SearchFaculty"] = EditrequestHandlers.SearchFaculty; //http://localhost:3000/SearchFaculty
handle["/UpdateFaculty"] = EditrequestHandlers.UpdateFaculty; //http://localhost:3000/UpdateFaculty

handle["/SearchStudent"] = EditrequestHandlers.SearchStudent; //http://localhost:3000/SearchStudent
handle["/UpdateStudent"] = EditrequestHandlers.UpdateStudent; //http://localhost:3000/UpdateStudent

handle["/SearchGuests"] = EditrequestHandlers.SearchGuests; //http://localhost:3000/SearchGuest
handle["/UpdateGuests"] = EditrequestHandlers.UpdateGuests; //http://localhost:3000/UpdateGuest


handle["/UserReportSum"] = requestHandlersReport.UserReportSum; //http://localhost:3000/UserReportSum
handle["/TransactionReportSum"] = requestHandlersReport.TransactionReportSum; //http://localhost:3000/TransactionReportSum
handle["/MaxReportSum"] = requestHandlersReport.MaxReportSum; //http://localhost:3000/MaxReportSum

handle["/AvailableBooks"] = requestHandlersReport.AvailableBooks; //http://localhost:3000/AvailableBooks
handle["/AdminTransactions"] = requestHandlers.AdminTransactions; //http://localhost:3000/AdminTransactions
handle["/AdminTransactionsStatus"] = requestHandlers.AdminTransactionsStatus; //http://localhost:3000/AdminTransactionsStatus
handle["/AdminTransactionsSearch"] = requestHandlers.AdminTransactionsSearch; //http://localhost:3000/AdminTransactionsSearch


handle["/AdminSFaculty"] = requestHandlers.AdminSFaculty; //http://localhost:3000/AdminSFaculty
handle["/AdminSGuest"] = requestHandlers.AdminSGuest; //http://localhost:3000/AdminSGuest
handle["/AdminSStudents"] = requestHandlers.AdminSStudents; //http://localhost:3000/AdminSStudents

handle['/TransactionPeriods'] = requestHandlersReport.TransactionPeriods; //http://localhost:3000/TransactionPeriods
handle['/TransactionStatusBooks'] = requestHandlersReport.TransactionStatusBooks; //http://localhost:3000/TransactionStatusBooks
handle['/TransactionStatusElectronics'] = requestHandlersReport.TransactionStatusElectronics; //http://localhost:3000/TransactionStatusElectronics
handle['/TransactionStatusMedia'] = requestHandlersReport.TransactionStatusMedia; //http://localhost:3000/TransactionStatusMedia
handle['/TransactionStatusObjects'] = requestHandlersReport.TransactionStatusObjects; //http://localhost:3000/TransactionStatusObjects
handle['/TransactionPeriodsBalance'] = requestHandlersReport.TransactionPeriodsBalance; //http://localhost:3000/TransactionperiodsBalance

handle['/SuspendedStudents'] = requestHandlersReport.SuspendedStudents; //http://localhost:3000/SuspendedStudents
handle['/SuspendedFaculty'] = requestHandlersReport.SuspendedFaculty; //http://localhost:3000/SuspendedFaculty
handle['/SuspendedGuests'] = requestHandlersReport.SuspendedGuests; //http://localhost:3000/SuspendedGuests

handle['/AdminReportLateFee'] = requestHandlers.AdminReportLateFee; //http://localhost:3000/AdminReportLateFees
handle['/TransactionStatusLate'] = requestHandlersReport.TransactionStatusLate; //http://localhost:3000/TransactionStatusLate

handle["/AdminNewUserReport"] = requestHandlers.AdminNewUserReport; //http://localhost:3000/AdminNewUserReport

handle['/NewUserBookReport'] = requestHandlersReport.NewUserBookReport; //http://localhost:3000/TransactionperiodsBalance
handle['/NewUserElecReport'] = requestHandlersReport.NewUserElecReport; //http://localhost:3000/TransactionperiodsBalance
handle['/NewUserMediaReport'] = requestHandlersReport.NewUserMediaReport; //http://localhost:3000/TransactionperiodsBalance

server.start(router.route, handle);


