import Header from "./components/header";
import initialEmails from "./data/emails";
import "./styles/app.css";
import { useState } from "react";

function App() {
  console.log('Rendering App...')
  
  // Use initialEmails for state
  const [emails, setEmails] = useState(initialEmails);
  const [hideRead, setHideRead] = useState(false)
  const [showEmails, setShowEmails] = useState(true)
  const [showStarred, setShowStarred] = useState(false)


  const displayEmails = (email) => {
    let emailClass = 'email '
      if (email.read) {
        emailClass += 'read'
      } else {
        emailClass += 'unread'
      }
    return (
      <li className={emailClass} key={email.id}>
        <div className="select">
          <input className="select-checkbox" type="checkbox" onChange={() => toggleRead(email)} checked={email.read}/>
        </div>
        <div className="star">
          <input className="star-checkbox" type="checkbox" onChange={() => toggleStarred(email)} checked={email.starred}/>
        </div>
        <div className="sender">{email.sender}</div>
        <div className="title">{email.title}</div>
      </li>
    )
  }

  const getunreadEmails = () => {
    if (!hideRead) {
      setShowEmails(false)
      setShowStarred(false)
      setHideRead(true)
    }
    else {
      setShowEmails(true)
      setHideRead(false)
      setShowStarred(false)
    }
  
  }

  const getStarredEmails = () => {
    if (!showStarred) {
      setShowEmails(false)
      setHideRead(false)
      setShowStarred(true)
    }
    else {
      setShowEmails(true)
      setHideRead(false)
      setShowStarred(false)
    }
  }

  const toggleStarred = target => {
    
    const updatedEmail = emails.map(email => 
      email === target ? {...email, starred: !email.starred} : email)
      setEmails(updatedEmail) 
  }

  const toggleRead = target => {
    
    const updatedEmail = emails.map(email => 
      email === target ? {...email, read: !email.read} : email)
      setEmails(updatedEmail) 
  }

  const unreadEmails = emails.filter(email => !email.read)
  const starredEmails = emails.filter(email => email.starred)
    
  const countUnread = () => {
    const unreadEmails = emails.filter(email => !email.read)
    return unreadEmails.length
  }

  const countStarred = () => {
    const starredEmails = emails.filter(email => email.starred)
    return starredEmails.length
  }

  return (
    <div className="app">
      <Header />
      <nav className="left-menu">
        <ul className="inbox-list">
          <li
            className="item active"
            // onClick={() => {}}
          >
            <span className="label">Inbox</span>
            <span className="count">{countUnread()}</span>
          </li>
          <li
            className="item"
            onClick={getStarredEmails}
          >
            <span className="label">Starred</span>
            <span className="count">{countStarred()}</span>
          </li>

          <li className="item toggle">
            <label for="hide-read">Hide read</label>
            <input
              id="hide-read"
              type="checkbox"
              checked={hideRead}
              onChange={getunreadEmails}
            />
          </li>
        </ul>
      </nav>
      <main className="emails">
        <ul>
          {showEmails && emails.map((email) => displayEmails(email))}
          {hideRead && unreadEmails.map((email) => displayEmails(email))}
          {showStarred && starredEmails.map((email) => displayEmails(email))}
        </ul>
      </main>
    </div>
  );
}

export default App;
