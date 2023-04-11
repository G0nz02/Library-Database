var fs = require('fs');
var sql = require('mssql');
var config = require('./db_connect');
var querystring = require('querystring');
var cons = require('consolidate');



function memberUI(response) {
    console.log("Request handler 'memberUI' was called.");
    var data = fs.readFileSync('memberUI.html');
    response.writeHead(200, { "Content-Type": "text/html" });
    response.write(data);
    response.end();
}

function bookSearch(response) {
    console.log("Request handler 'bookSearch' was called.");
    var data = fs.readFileSync('bookSearch.html');
    response.writeHead(200, { "Content-Type": "text/html" });
    response.write(data);
    response.end();
}

function mediaSearch(response) {
    console.log("Request handler 'mediaSearch' was called.");
    var data = fs.readFileSync('mediaSearch.html');
    response.writeHead(200, { "Content-Type": "text/html" });
    response.write(data);
    response.end();
}

function electronicSearch(response) {
    console.log("Request handler 'electronicSearch' was called.");
    var data = fs.readFileSync('electronicSearch.html');
    response.writeHead(200, { "Content-Type": "text/html" });
    response.write(data);
    response.end();
}

function librarySearch(response, postData) {

    console.log("In librarySearch");
    var conn = new sql.ConnectionPool(config);
    sql.connect(config).then(function () {
        var req = new sql.Request();
        var params = querystring.parse(postData);
        var Title = params['Title'];
        var Author = params['Author'];
        var Genre = params['Genre'];
        var Language = params['Language'];
        var ISBN = params['ISBN'];
        var MediaID = params['MediaID'];
        var MediaType = params['Type'];
        var Publisher = params['Publisher'];
        var SerialNo = params['SerialNo'];
        var Available = params['Available'];

        var mode = params['searchBy'];
        console.log("Mode: " + mode);

        if (mode === 'book') {
            var query = "Select Book_Name as Title, Author, Genre, Language, LTRIM(RTRIM(ISBN)) as ISBN FROM Book WHERE 1=1 ";
        } else if (mode === 'media') {
            var query = "Select Media_Name as Title, Author, Media_Type as MediaType, Publisher_Name as Publisher, LTRIM(RTRIM(Media_ID)) as MediaID FROM Media WHERE 1=1 ";
        } else if (mode === 'electronic') {
            var query = "Select Electronics_Name as Title, LTRIM(RTRIM(Serial_No)) as SerialNo, Available FROM Electronics WHERE 1=1 ";
        }

        if (Title != undefined && Title != "") {
            if (mode === 'book') {
                query = query + " and Book_Name LIKE '%" + Title + "%' ";
            } else if (mode === 'media') {
                query = query + " and Media_Name LIKE '" + Title + "%' ";
            } else if (mode === 'electronic') {
                query = query + " and Electronics_Name LIKE '" + Title + "%' ";
            }
        }

        if (Author != undefined && Author != "") {
            query = query + " and Author LIKE '%" + Author + "%' ";
        }

        if (Genre != undefined && Genre != "") {
            query = query + " and  Genre LIKE '%" + Genre + "%' ";
        }

        if (Language != undefined && Language != "") {
            query = query + " and  Language LIKE '%" + Language + "%' ";
        }

        if (ISBN != undefined && ISBN != "") {
            query = query + " and  ISBN LIKE '%" + ISBN + "%' ";
        }

        if (MediaID != undefined && MediaID != "") {
            query = query + " and  Media_ID LIKE '%" + MediaID + "%' ";
        }

        if (MediaType != undefined && MediaType != "") {
            query = query + " and  Media_Type LIKE '%" + MediaType + "%' ";
        }

        if (Publisher != undefined && Publisher != "") {
            query = query + " and  Publisher_Name LIKE '%" + Publisher + "%' ";
        }

        if (SerialNo != undefined && SerialNo != "") {
            query = query + " and  Serial_No LIKE '%" + SerialNo + "%' ";
        }

        if (mode === 'electronic') {
            query = query + " and  Available LIKE '%" + 1 + "%' ";
        }

        console.log("Final query \n" + query);

        req.query(query).then(function (recordset) {
            console.log("Search Complete");

            if (recordset.recordsets.length > 0) {
                console.log("Found " + recordset.recordsets.length + " records");
                const resultArray = recordset.recordsets[0];
                response.writeHead(200, { "Content-Type": "application/json" });
                var jsontxt = JSON.stringify(resultArray);
                response.write(jsontxt);
                //response.write(resultArray);

                response.end();
            }
            else {
                console.log("No records found")
                response.write("No records found");
            }
        }).catch(function (err) {
            console.error("error");
            console.log(err);
        });

    }).catch(function (err) {
        console.error("Unable to search");
        console.log(err);
    });

}

function bookReserve(response, postData, sessionData) {
    var queryOne = "";
    var queryTwo = "";
    var queryThree ="";
    var firstChar = sessionData.logginId.charAt(0);
    sql.connect(config).then(function () {

        switch (firstChar) {
            case 'S':
                queryOne = "SELECT count(*) as Count FROM Reservation WHERE Student_ID=@userID AND Active_Void_Status = 1 AND Book_ID IS NOT NULL";
                queryTwo = "SELECT count(*) as Count FROM Transactions WHERE StudentID=@userID AND Active_Void_Status = 1 AND Book_ID IS NOT NULL";
                break;
            case 'G':
                queryOne = "SELECT count(*) as Count FROM Reservation WHERE Guest_ID=@userID AND Active_Void_Status = 1 AND Book_ID IS NOT NULL";
                queryTwo = "SELECT count(*) as Count FROM Transactions WHERE Guest_ID=@userID AND Active_Void_Status = 1 AND Book_ID IS NOT NULL";
                break;
            case 'F':
                queryOne = "SELECT count(*) as Count FROM Reservation WHERE Faculty_ID=@userID AND Active_Void_Status = 1 AND Book_ID IS NOT NULL";
                queryTwo = "SELECT count(*) as Count FROM Transactions WHERE Faculty_ID=@userID AND Active_Void_Status = 1 AND Book_ID IS NOT NULL";
        }


        var reserved = 0;
        var borrowed = 0;
        var req = new sql.Request();
        req.input('userId', sql.NVarChar, sessionData.logginId);

        var bookLimit = 0;

        switch (firstChar) {
            case 'S':
                bookLimit = 5;
                break;
            case 'G':
                bookLimit = 2;
                break;
            case 'F':
                bookLimit = 30;
        }

        var params = querystring.parse(postData);
        var ISBN = params['ISBN'];
        if (ISBN !== undefined) {
            ISBN = ISBN.trim();
        }
        req.input('isbn', sql.NVarChar, ISBN);

        switch (firstChar) {
            case 'S':
                queryThree = "SELECT holdPosition FROM Reservation WHERE Student_ID=@userID AND Active_Void_Status = 1 AND Book_ID=@isbn";
                break;
            case 'G':
                queryThree = "SELECT holdPosition FROM Reservation WHERE Guest_ID=@userID AND Active_Void_Status = 1 AND Book_ID=@isbn";
                break;
            case 'F':
                queryThree = "SELECT holdPosition FROM Reservation WHERE Faculty_ID=@userID AND Active_Void_Status = 1 AND Book_ID=@isbn";
        }

        req.query(queryThree).then(function (recordset) {
            if (recordset.recordsets[0].length > 0) { 
                console.log("Already reserved: " + ISBN);
                response.write("Item has already been reserved. Cannot reserve again");
                response.end();
            } else {

                req.query(queryOne).then(function (recordset) {
                    reserved = recordset.recordsets[0][0].Count;
                    console.log("revered ------------------------: " + reserved);
                    req.query(queryTwo).then(function (rs) {
                        borrowed = rs.recordsets[0][0].Count;
                        console.log("reserved: " + reserved + " borrowed: " + borrowed)
                        var total = reserved + borrowed;
                        if (total < bookLimit) {
                            //req.input('isbn', sql.NVarChar, ISBN);

                            var queryStr = "";
                            var queryAvailCopies = "";
                            var holdPosition = 0;

                            var firstChar = sessionData.logginId.charAt(0);

                            req.query("SELECT ISBN, Num_of_Copies FROM Book WHERE ISBN=@isbn").then(function (recordset) {
                                if (recordset.recordsets[0].length > 0) {
                                    var availCopies = recordset.recordsets[0][0].Num_of_Copies;
                                    console.log("Available Copies: " + availCopies);
                                    if (availCopies > 0) {

                                        queryStr = "INSERT INTO Reservation (Creation_Date, Expiration_Date, Created_By, Updated_By, Book_ID, holdPosition, Active_Void_Status,";
                                        switch (firstChar) {
                                            case 'S': queryStr += "Student_ID) VALUES (getdate(), getdate(), @userId, @userId, @isbn, 0, 1, @userId)"; break;
                                            case 'F': queryStr += "Faculty_ID) VALUES (getdate(), getdate(), @userId, @userId, @isbn, 0, 1, @userId)"; break;
                                            case 'G': queryStr += "Guest_ID) VALUES (getdate(), getdate(), @userId, @userId, @isbn, 0, 1, @userId)"; break;

                                        }
                                        availCopies = availCopies - 1;
                                        queryAvailCopies = "UPDATE Book SET Num_of_Copies = '" + availCopies + "' WHERE ISBN = '" + ISBN + "';";
                                        console.log("Query to be executed with id: " + sessionData.logginId);
                                        console.log(queryStr);
                                        req.query(queryStr).then(function (recordset) {
                                            console.log("Reservation added 1");
                                            req.query(queryAvailCopies).then(function (recordset) {
                                                console.log("Available number of copies changed to: " + availCopies);
                                                response.write("Reservation successful");
                                                response.end();
                                            })
                                        });

                                    } else {
                                        req.query("SELECT max(holdPosition) as holdPosition FROM Reservation WHERE Book_ID = @isbn AND Active_Void_Status = 1").then(function (recordset) {
                                            console.log("query executed in getHold");
                                            if (recordset.recordsets[0].length > 0) {
                                                holdPosition = recordset.recordsets[0][0].holdPosition;
                                                console.log("Holds: " + holdPosition)
                                                if (holdPosition === undefined) {
                                                    holdPosition = 0;
                                                }
                                                holdPosition += 1;
                                            }
                                            console.log("Returned hold: " + holdPosition);
                                            req.input('holdPosition', holdPosition);
                                            queryStr = "INSERT INTO Reservation (Creation_Date, Expiration_Date, Created_By, Updated_By, Book_ID, holdPosition, Active_Void_Status,";
                                            switch (firstChar) {
                                                case 'S': queryStr += "Student_ID) VALUES (getdate(), getdate(), @userId, @userId, @isbn, @holdPosition, 1, @userId)"; break;
                                                case 'F': queryStr += "Faculty_ID) VALUES (getdate(), getdate(), @userId, @userId, @isbn, @holdPosition, 1, @userId)"; break;
                                                case 'G': queryStr += "Guest_ID) VALUES (getdate(), getdate(), @userId, @userId, @isbn, @holdPosition, 1, @userId)"; break;

                                            }
                                            console.log("Reservation add query: " + queryStr);
                                            req.query(queryStr).then(function (recordset) {
                                                console.log("Reservation added");
                                                response.write("Hold position: " + holdPosition);
                                                response.end();
                                            });
                                            return;
                                        }).catch(function (err) {
                                            console.error("Unable to search");
                                            console.log(err);
                                        });


                                    }

                                } else {
                                    response.write(err);
                                    response.end();
                                    return;
                                }

                            }).catch(function (err) {
                                console.log(err);
                                response.end();
                                return;
                            });

                        }
                        else {
                            console.log("Returning from limitReached: true");
                            response.write("Book borrow limit reached.");
                            response.end();
                        }
                    }).catch(function (err) {
                        console.log(err);
                        response.end();
                        return;
                    });
                }).catch(function (err) {
                    console.log(err);
                    response.end();
                    return;
                });

            }

        }).catch(function (err) {
            console.log(err);
            response.end();
            return;
        });


    }).catch(function (err) {
        console.error("Unable to search");
        console.log(err);
    });


}

function mediaReserve(response, postData, sessionData) {
    var queryOne = "";
    var queryTwo = "";
    var queryThree ="";
    var firstChar = sessionData.logginId.charAt(0);
    sql.connect(config).then(function () {

        switch (firstChar) {
            case 'S':
                queryOne = "SELECT count(*) as Count FROM Reservation WHERE Student_ID=@userID AND Active_Void_Status = 1 AND Media_ID IS NOT NULL";
                queryTwo = "SELECT count(*) as Count FROM Transactions WHERE StudentID=@userID AND Active_Void_Status = 1 AND Media_ID IS NOT NULL";
                break;
            case 'G':
                queryOne = "SELECT count(*) as Count FROM Reservation WHERE Guest_ID=@userID AND Active_Void_Status = 1 AND Media_ID IS NOT NULL";
                queryTwo = "SELECT count(*) as Count FROM Transactions WHERE Guest_ID=@userID AND Active_Void_Status = 1 AND Media_ID IS NOT NULL";
                break;
            case 'F':
                queryOne = "SELECT count(*) as Count FROM Reservation WHERE Faculty_ID=@userID AND Active_Void_Status = 1 AND Media_ID IS NOT NULL";
                queryTwo = "SELECT count(*) as Count FROM Transactions WHERE Faculty_ID=@userID AND Active_Void_Status = 1 AND Media_ID IS NOT NULL";
        }


        var reserved = 0;
        var borrowed = 0;
        var req = new sql.Request();
        req.input('userId', sql.NVarChar, sessionData.logginId);
        var mediaLimit = 0;

        switch (firstChar) {
            case 'S':
                mediaLimit = 5;
                break;
            case 'G':
                mediaLimit = 2;
                break;
            case 'F':
                mediaLimit = 30;
        }

        var params = querystring.parse(postData);

        var MediaID = params['MediaID'];
        if (MediaID !== undefined) {
            MediaID = MediaID.trim();
        }
        req.input('mediaid', sql.NVarChar, MediaID);

        switch (firstChar) {
            case 'S':
                queryThree = "SELECT holdPosition FROM Reservation WHERE Student_ID=@userID AND Active_Void_Status = 1 AND Media_ID=@mediaid";
                break;
            case 'G':
                queryThree = "SELECT holdPosition FROM Reservation WHERE Guest_ID=@userID AND Active_Void_Status = 1 AND Media_ID=@mediaid";
                break;
            case 'F':
                queryThree = "SELECT holdPosition FROM Reservation WHERE Faculty_ID=@userID AND Active_Void_Status = 1 AND Media_ID=@mediaid";
        }

        req.query(queryThree).then(function (recordset) {
            if (recordset.recordsets[0].length > 0) { 
                console.log("Already reserved: " + MediaID);
                response.write("Media has already been reserved. Cannot reserve again");
                response.end();
            } else {

                req.query(queryOne).then(function (recordset) {
                    reserved = recordset.recordsets[0][0].Count;
                    console.log("revered ------------------------: " + reserved);
                    req.query(queryTwo).then(function (rs) {
                        borrowed = rs.recordsets[0][0].Count;
                        console.log("reserved: " + reserved + " borrowed: " + borrowed)
                        var total = reserved + borrowed;
                        if (total < mediaLimit) {

                            console.log("MediaID-" + MediaID + "-");

                            var queryStr = "";
                            var queryAvailCopies = "";
                            var holdPosition = 0;

                            var firstChar = sessionData.logginId.charAt(0);

                            req.query("SELECT Media_ID, Num_of_Copies FROM Media WHERE Media_ID=@mediaid").then(function (recordset) {
                                if (recordset.recordsets[0].length > 0) {
                                    var availCopies = recordset.recordsets[0][0].Num_of_Copies;
                                    console.log("Available Copies: " + availCopies);
                                    if (availCopies > 0) {

                                        queryStr = "INSERT INTO Reservation (Creation_Date, Expiration_Date, Created_By, Updated_By, Media_ID, holdPosition, Active_Void_Status,";
                                        switch (firstChar) {
                                            case 'S': queryStr += "Student_ID) VALUES (getdate(), getdate(), @userId, @userId, @mediaid, 0, 1, @userId)"; break;
                                            case 'F': queryStr += "Faculty_ID) VALUES (getdate(), getdate(), @userId, @userId, @mediaid, 0, 1, @userId)"; break;
                                            case 'G': queryStr += "Guest_ID) VALUES (getdate(), getdate(), @userId, @userId, @mediaid, 0, 1, @userId)"; break;

                                        }
                                        availCopies = availCopies - 1;
                                        queryAvailCopies = "UPDATE Media SET Num_of_Copies = '" + availCopies + "' WHERE Media_ID = '" + MediaID + "';";
                                        console.log("Query to be executed with id: " + sessionData.logginId);
                                        console.log(queryStr);
                                        req.query(queryStr).then(function (recordset) {
                                            console.log("Reservation added 1");
                                            req.query(queryAvailCopies).then(function (recordset) {
                                                console.log("Available number of copies changed to: " + availCopies);
                                                response.write("Reservation successful");
                                                response.end();
                                            })
                                        });

                                    } else {
                                        req.query("SELECT max(holdPosition) as holdPosition FROM Reservation WHERE Media_ID = @mediaid AND Active_Void_Status = 1").then(function (recordset) {
                                            console.log("query executed in getHold");
                                            if (recordset.recordsets[0].length > 0) {
                                                holdPosition = recordset.recordsets[0][0].holdPosition;
                                                console.log("Holds: " + holdPosition)
                                                if (holdPosition === undefined) {
                                                    holdPosition = 0;
                                                }
                                                holdPosition += 1;
                                            }
                                            console.log("Returned hold: " + holdPosition);
                                            req.input('holdPosition', holdPosition);
                                            queryStr = "INSERT INTO Reservation (Creation_Date, Expiration_Date, Created_By, Updated_By, Media_ID, holdPosition, Active_Void_Status,";
                                            switch (firstChar) {
                                                case 'S': queryStr += "Student_ID) VALUES (getdate(), getdate(), @userId, @userId, @mediaid, @holdPosition, 1, @userId)"; break;
                                                case 'F': queryStr += "Faculty_ID) VALUES (getdate(), getdate(), @userId, @userId, @mediaid, @holdPosition, 1, @userId)"; break;
                                                case 'G': queryStr += "Guest_ID) VALUES (getdate(), getdate(), @userId, @userId, @mediaid, @holdPosition, 1, @userId)"; break;

                                            }
                                            console.log("Reservation add query: " + queryStr);
                                            req.query(queryStr).then(function (recordset) {
                                                console.log("Reservation added");
                                                response.write("Hold position: " + holdPosition);
                                                response.end();
                                            });
                                            return;
                                        }).catch(function (err) {
                                            console.error("Unable to search");
                                            console.log(err);
                                        });


                                    }

                                } else {
                                    response.write(err);
                                    response.end();
                                    return;
                                }

                            }).catch(function (err) {
                                console.log(err);
                                response.end();
                                return;
                            });

                        }
                        else {
                            console.log("Returning from limitReached: true");
                            response.write("Media borrow limit reached.");
                            response.end();
                        }
                    }).catch(function (err) {
                        console.log(err);
                        response.end();
                        return;
                    });
                }).catch(function (err) {
                    console.log(err);
                    response.end();
                    return;
                });

            }

        }).catch(function (err) {
            console.log(err);
            response.end();
            return;
        });



    }).catch(function (err) {
        console.error("Unable to search");
        console.log(err);
    });


}

function mediaReserve_old(response, postData, sessionData) {
    var conn = new sql.ConnectionPool(config);

    sql.connect(config).then(function () {

        var req = new sql.Request();
        var params = querystring.parse(postData);
        var MediaID = params['MediaID'];
        if (MediaID !== undefined) {
            MediaID = MediaID.trim();
        }
        console.log("MediaID-" + MediaID + "-");
        req.input('mediaid', sql.NVarChar, MediaID);
        var borrow = 1;
        var queryStr = "";
        var queryAvailCopies = "";
        var holdPosition = 0;

        req.input('userId', sessionData.logginId)

        req.query("SELECT Media_ID, Num_of_Copies FROM Media WHERE Media_ID=@mediaid").then(function (recordset) {
            if (recordset.recordsets[0].length > 0) {
                var availCopies = recordset.recordsets[0][0].Num_of_Copies;
                console.log("Available Copies: " + availCopies);
                if (availCopies > 0) {
                    queryStr = "INSERT INTO Reservation (Creation_Date, Expiration_Date, Created_By, Updated_By, Faculty_ID, Media_ID, holdPosition, Active_Void_Status) VALUES (getdate(), getdate(), @userId, @userId, @userId, @mediaid, 0, 1)";
                    availCopies = availCopies - 1;
                    queryAvailCopies = "UPDATE Media SET Num_of_Copies = '" + availCopies + "' WHERE Media_ID = '" + MediaID + "';";
                } else {
                    req.query("SELECT max(holdPosition) as holdPosition FROM Reservation WHERE Media_ID = @mediaid").then(function (recordset) {
                        if (recordset.recordsets[0].length > 0) {
                            holdPosition = recordset.recordsets[0][0].holdPosition;
                            console.log("Holds: " + holdPosition)
                            if (holdPosition === undefined) {
                                holdPosition = 0;
                            }
                            holdPosition += 1;
                            req.input('holdPosition', sql.Int, holdPosition);
                            borrow = 0;
                        }
                    }).catch(function (err) {
                        console.error("Unable to reserve");
                        console.log(err);
                    });
                    queryStr = "INSERT INTO Reservation (Creation_Date, Expiration_Date, Created_By, Updated_By, Faculty_ID, Media_ID, holdPosition, Active_Void_Status) VALUES (getdate(), getdate(), 'F111122223', 'F111122223', 'F111122223', @mediaid, @holdPosition, 1)";
                }

                req.query(queryStr).then(function (recordset) {
                    console.log("Media Reservation added");
                    req.query(queryAvailCopies).then(function (recordset) {
                        console.log("Available number of copies changed to: " + availCopies);
                        if (borrow === 1) {
                            response.write("Reservation successful");
                        } else {
                            response.write("Hold position: " + holdPosition);
                        }
                        response.end();
                    })
                });

            } else {
                response.write(err);
                response.end();
                return;
            }

        }).catch(function (err) {
            console.log(err);
            response.end();
            return;
        });


    }).catch(function (err) {
        console.error("Unable to search");
        console.log(err);
    });
}

function electronicReserve(response, postData, sessionData) {
    var queryOne = "";
    var queryTwo = "";
    var queryThree ="";
    var firstChar = sessionData.logginId.charAt(0);
    sql.connect(config).then(function () {

        switch (firstChar) {
            case 'S':
                queryOne = "SELECT count(*) as Count FROM Reservation WHERE Student_ID=@userID AND Active_Void_Status = 1 AND Electronics_ID IS NOT NULL";
                queryTwo = "SELECT count(*) as Count FROM Transactions WHERE StudentID=@userID AND Active_Void_Status = 1 AND Electronics_ID IS NOT NULL";
                break;
            case 'G':
                queryOne = "SELECT count(*) as Count FROM Reservation WHERE Guest_ID=@userID AND Active_Void_Status = 1 AND Electronics_ID IS NOT NULL";
                queryTwo = "SELECT count(*) as Count FROM Transactions WHERE Guest_ID=@userID AND Active_Void_Status = 1 AND Electronics_ID IS NOT NULL";
                break;
            case 'F':
                queryOne = "SELECT count(*) as Count FROM Reservation WHERE Faculty_ID=@userID AND Active_Void_Status = 1 AND Electronics_ID IS NOT NULL";
                queryTwo = "SELECT count(*) as Count FROM Transactions WHERE Faculty_ID=@userID AND Active_Void_Status = 1 AND Electronics_ID IS NOT NULL";
        }


        var reserved = 0;
        var borrowed = 0;
        var req = new sql.Request();
        req.input('userId', sql.NVarChar, sessionData.logginId);
        var electronicLimit = 0;

        switch (firstChar) {
            case 'S':
                electronicLimit = 1;
                break;
            case 'G':
                electronicLimit = 0;
                break;
            case 'F':
                electronicLimit = 5;
        }

        var params = querystring.parse(postData);

        var SerialNo = params['SerialNo'];
        if (SerialNo !== undefined) {
            SerialNo = SerialNo.trim();
        }
        req.input('serialno', sql.NVarChar, SerialNo);

        // switch (firstChar) {
        //     case 'S':
        //         queryThree = "SELECT holdPosition FROM Reservation WHERE Student_ID=@userID AND Active_Void_Status = 1 AND Electronics_ID=@serialno";
        //         break;
        //     case 'G':
        //         queryThree = "SELECT holdPosition FROM Reservation WHERE Guest_ID=@userID AND Active_Void_Status = 1 AND Electronics_ID=@serialno";
        //         break;
        //     case 'F':
        //         queryThree = "SELECT holdPosition FROM Reservation WHERE Faculty_ID=@userID AND Active_Void_Status = 1 AND Electronics_ID=@serialno";
        // }

        // req.query(queryThree).then(function (recordset) {
        //     if (recordset.recordsets[0].length > 0) { 
        //         console.log("Already reserved: " + MediaID);
        //         response.write("Electronic not available anymore");
        //         response.end();
        //     } else {

                req.query(queryOne).then(function (recordset) {
                    reserved = recordset.recordsets[0][0].Count;
                    console.log("revered ------------------------: " + reserved);
                    req.query(queryTwo).then(function (rs) {
                        borrowed = rs.recordsets[0][0].Count;
                        console.log("reserved: " + reserved + " borrowed: " + borrowed)
                        var total = reserved + borrowed;
                        if (total < electronicLimit) {

                            console.log("SerialNo-" + SerialNo + "-");

                            var queryStr = "";
                            var queryAvailable = "";

                            var firstChar = sessionData.logginId.charAt(0);

                            req.query("SELECT Serial_No, Available FROM ELectronics WHERE Serial_No=@serialno").then(function (recordset) {
                                if (recordset.recordsets[0].length > 0) {
                                    var available = recordset.recordsets[0][0].Available;
                                    console.log("Available: " + available);
                                    if (available === true) {

                                        queryStr = "INSERT INTO Reservation (Creation_Date, Expiration_Date, Created_By, Updated_By, Electronics_ID, holdPosition, Active_Void_Status,";
                                        switch (firstChar) {
                                            case 'S': queryStr += "Student_ID) VALUES (getdate(), getdate(), @userId, @userId, @serialno, 0, 1, @userId)"; break;
                                            case 'F': queryStr += "Faculty_ID) VALUES (getdate(), getdate(), @userId, @userId, @serialno, 0, 1, @userId)"; break;
                                            case 'G': queryStr += "Guest_ID) VALUES (getdate(), getdate(), @userId, @userId, @serialno, 0, 1, @userId)"; break;

                                        }
                                        available = false;
                                        queryAvailable = "UPDATE Electronics SET Available = '" + available + "' WHERE Serial_No = '" + SerialNo + "';";
                                        console.log("Query to be executed with id: " + sessionData.logginId);
                                        console.log(queryStr);
                                        req.query(queryStr).then(function (recordset) {
                                            console.log("Reservation added Electronic");
                                            req.query(queryAvailable).then(function (recordset) {
                                                console.log("Electronic Availability: " + available);
                                                response.write("Reservation successful");
                                                response.end();
                                            })
                                        });

                                    } else {
                                        response.write(err);
                                        response.end();
                                        return;
                                    }

                                } else {
                                    response.write(err);
                                    response.end();
                                    return;
                                }

                            }).catch(function (err) {
                                console.log(err);
                                response.end();
                                return;
                            });

                        }
                        else {
                            console.log("Returning from limitReached: true");
                            response.write("Electronic borrow limit reached.");
                            response.end();
                        }
                    }).catch(function (err) {
                        console.log(err);
                        response.end();
                        return;
                    });
                }).catch(function (err) {
                    console.log(err);
                    response.end();
                    return;
                });

        //     }

        // }).catch(function (err) {
        //     console.log(err);
        //     response.end();
        //     return;
        // });



    }).catch(function (err) {
        console.error("Unable to search");
        console.log(err);
    });


}
function profile(response){
    console.log("Request handler 'profile' was called.");
    var data = fs.readFileSync('profile.html');
    response.writeHead(200, { "Content-Type": "text/html" });
    response.write(data);
    response.end();
}



exports.memberUI = memberUI;
exports.bookSearch = bookSearch;
exports.mediaSearch = mediaSearch;
exports.electronicSearch = electronicSearch;
exports.librarySearch = librarySearch;
exports.bookReserve = bookReserve;
exports.mediaReserve = mediaReserve;
exports.electronicReserve = electronicReserve;
exports.profile = profile;
