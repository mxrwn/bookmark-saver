import { useEffect, useRef, useState } from 'react';
import './bookmark.css';
import edit from './../../assets/edit.svg';

export default function Bookmark({title, link, id, db, update}) {

  const [linkState, setLinkState] = useState(link)
  const [actions, setActions] = useState(false);
  const [editState, setEditState] = useState(false);

  const titleRef = useRef()
  const linkRef = useRef()


  useEffect(() => {
    console.log('test')
    if(!link.startsWith('www.')){
      console.log("testttt")
      setLinkState(`https://www.${link}`)
    }
    if(!link.startsWith('https://')){
      setLinkState(`https://${link}`)
    }
  }, [])
 
  useEffect(() => {
    
    console.log(editState)
  
  }, [editState])

  const UpdateBookmark = async () => {
    const newBookmark = {
      id,
      title: titleRef.current.value === '' ? title : titleRef.current.value,
      link: linkRef.current.value === '' ? link : linkRef.current.value
    }
    await db.bookmarks.put(newBookmark);


    const bookmarks = await db.bookmarks.toArray();

    update(bookmarks);

    setEditState(false);
    setActions(false);
  }

  const DeleteBookmark = async () => {
    await db.bookmarks.delete(id)

    const bookmarks = await db.bookmarks.toArray();

    update(bookmarks);

  }

  const GoToLink = () => {
    window.open(linkState, "_blank")
  }

  return (
    <div className='bookmark' >
      <div className='head' onClick={GoToLink}>
        <h1>{title}</h1>
        <a href={linkState} target='_blank'>{linkState}</a>
      </div>
      <img src={`https://www.google.com/s2/favicons?sz=64&domain_url=${link}`}/>
      <div className={actions ? 'toggle_actions active' : 'toggle_actions'} onClick={() => setActions(!actions)}>
        <div className="bar one"></div>
        <div className="bar two"></div>
      </div>
      <div className={actions ? 'actions active' : 'actions'} >
        <div className='delete' onClick={DeleteBookmark}>
        <div className="bar one"></div>
        <div className="bar two"></div>
        </div>
        <div className='edit' onClick={() => setEditState(!editState)}>
        <img src={edit}/>
        </div>
      </div>
      <div className={editState ? 'inputBox active': 'inputBox'} id='bookmark'>
            <input type="text" placeholder="Title.." ref={titleRef}/>
            <input type="text" placeholder="Link.." ref={linkRef}/>
            <div className="buttons">
              <button id="submit" onClick={UpdateBookmark}>submit</button>
              <button id="cancel" onClick={() => setEditState(false)}>cancel</button>
            </div>
          </div>
    </div>
  )
}
