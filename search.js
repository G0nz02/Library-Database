<html>
    <h1>
        <b>
            Library Search
        </b>
    </h1>
<body>
    <form>
    <label for="selectType"> Select Type: </label>
        <select id="searchType" name="searchType">
            <option value="book">Book</option>
            <option value="media">Media</option>
            <option value="electronic">Electronic</option>
            <option value="object">Object</option>
        <br></br></select>
    </form>
    <div id='booksid' >
    <form action="/searchBooks" method="post">
        <input hidden name='searchBy' value='book'></input>

        <label for="bookName"> Name: </label>
        <input type="text" id="bookname" name="BookName"><br></br></input>

        <label for="Author"> Author: </label>
        <input type="text" id="author" name="Author"><br></br></input>

        <label for="Genre"> Genre: </label>
        <select id="genre" name="Genre">
            <option value="adventure">Adventure</option>
            <option value="action">Action</option>
            <option value="fantasy">Fantasy</option>
            <option value="drama">Drama</option>
            <option value="romance">Romance</option>
            <option value="scifi">SciFi</option>
            <option value="thriller">Thriller</option>
            <option value="horror">Horror</option>
            <option value="comedy">Comedy</option>
            <option value="mystery">Mystery</option>
            <option value="supernatural">Supernatural</option>
        </select><br></br>

        <label for="Language"> Language: </label>
        <select id="language" name="Language">
            <option value="english">English</option>
            <option value="french">French</option>
            <option value="spanish">Spanish</option>
        </select><br></br>

        <label for="ISBN"> ISBN: </label>
        <input type="text" id="isbn" name="ISBN"><br></br></input>

        <input type="submit" value="Search" />

    </form>
    </div>

    <div id='mediaid' >
    <form action="/searchMedia" method="post">
        <input hidden name='searchBy' value='media'></input>

        <label for="mediaName"> Name: </label>
        <input type="text" id="medianame" name="MediaName"><br></br></input>

        <label for="Author"> Author: </label>
        <input type="text" id="author" name="Author"><br></br></input>

        <label for="MediaType"> Type of Media: </label>
        <select id="mediatype" name="mediaType">
            <option value="dvd">DVD</option>
            <option value="cd">CD</option>
            <option value="newspaper">Newspaper</option>
            <option value="magazine">Magazine</option>
        </select><br></br>

        <input type="submit" value="Search" />

    </form>
    </div>

    <div id='electronicid' >
    <form action="/searchElectronics" method="post">
        <input hidden name='searchBy' value='electronic'></input>

        <label for="electronicName"> Name: </label>
        <input type="text" id="electronicname" name="ElectronicName"><br></br></input>

        <label for="serialNo"> Serial #: </label>
        <input type="text" id="serialno" name="SerialNo"><br></br></input>

        <input type="submit" value="Search" />

    </form>
    </div>

    <script>
      const el = document.getElementById('searchType');
      const bookdiv = document.getElementById('booksid');
      const mediadiv = document.getElementById('mediaid');
      const electronicdiv = document.getElementById('electronicid');
      
      mediadiv.style.display = 'none';
      electronicdiv.style.display = 'none';
      el.addEventListener('change', function handleChange(event) {
         if (event.target.value === 'book') {
            bookdiv.style.display = 'block';
            mediadiv.style.display = 'none';
            electronicdiv.style.display = 'none';
         } else if (event.target.value === 'media') {
            bookdiv.style.display = 'none';
            mediadiv.style.display = 'block';
            electronicdiv.style.display = 'none';
         } else if(event.target.value === 'electronic') {
            mediadiv.style.display = 'none';
            bookdiv.style.display = 'none';
            electronicdiv.style.display = 'block';
         }
      });
   </script>    
</body>    
</html>