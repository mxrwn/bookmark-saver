import './style.css';
import Bookmark from "./components/Bookmark/Bookmark";
import {useEffect, useState, useRef} from 'react';
import Dexie from 'dexie';

function App() {

  const [addToggle, setAddToggle] = useState(false);
  const [bookmarks, setBookmarks] = useState([]);
  const title = useRef();
  const link = useRef();
  const db = new Dexie('Bookmarks');
  db.version(1).stores({
    bookmarks: '++id, title, link'
  })

  useEffect(() => {
    GetBookmarks();
  }, [])
  useEffect(() => {
    console.log(bookmarks);
  }, [bookmarks])

  const GetBookmarks = async () => {
    const book = await db.bookmarks.toArray();
    console.log(typeof book);
    setBookmarks(book);
  }

  const SaveBookmark = async ()  => {

    await db.bookmarks.add({
      title: title.current.value,
      link: link.current.value
    })

    const book = await db.bookmarks.toArray();

    setBookmarks(book);
  }

  return (
    <div className="app">
      <div className="bookmarks">
        {
          bookmarks[0] ?
          bookmarks.map((bookmark) => (
              <Bookmark title={bookmark.title} link={bookmark.link} key={bookmark.id} id={bookmark.id} db={db} update={setBookmarks}/>
          )) : ''
        }
        
        <div className="add" >
          <div className={!addToggle ? "add_button" : "add_button active"} onClick={() => setAddToggle(!addToggle)}>
            <div className="bar one"></div>
            <div className="bar two"></div>
          </div>
          <div className={addToggle ? 'inputBox active': 'inputBox'}>
            <input type="text" placeholder="Title.." ref={title}/>
            <input type="text" placeholder="Link.." ref={link}/>
            <div className="buttons">
              <button id="submit" onClick={SaveBookmark}>submit</button>
              <button id="cancel" onClick={() => setAddToggle(false)}>cancel</button>
            </div>
            
          </div>
        </div>
      </div>
      
    </div>
  );
}

export default App;
