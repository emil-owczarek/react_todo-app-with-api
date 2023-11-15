import { useState } from 'react';
import './SidePanel.scss';

export const SidePanel = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openNav = () => {
    setIsOpen(true);
  };

  const closeNav = () => {
    setIsOpen(false);
  };

  return (
    <>
      <button type="button" className="openbtn" onClick={openNav}>
        &#9776; Learn More
      </button>
      <div id="mySidepanel" className={`sidepanel ${isOpen ? 'open' : ''}`}>
        <button type="button" className="closebtn" onClick={closeNav}>
          &times;
        </button>
        <ul className="panel__list">
          <p className="panel__text">
            Do you have a list of books to read? I used to have one too, but
            eventually, I resigned to the fate that I&apos;d never read
            everything I wanted. But if your faith is still unshaken, let me
            introduce you to Books To Read. Make yourself at home.
          </p>
          <li className="list__element">
            - all books are stored on the server
          </li>
          <li className="list__element">
            - enjoy full editing control: add, delete, or rename books with a
            simple double-click
          </li>
          <li className="list__element">
            - advanced error handling: handles problems
            with a server such as
            &apos;unable to load/add/edit/remove books.&apos;
            It also checks for empty titles; you can easily try the last one :)
          </li>
          <li className="list__element">
            - mark books as read; the app
            automatically tracks how many you have
            left
          </li>
          <li className="list__element">
            - filter books by their completion status
          </li>
          <li className="list__element">
            - fully scalable for a seamless experience on both desktop and
            mobile devices
          </li>
        </ul>
        <p className="panel__tags">#React #TypeScript #SASS #REST API</p>
        <p className="panel__text">
          Your entries will be public. Feel free to leave recommendations and
          messages or mess everything up. You&apos;re anonymous - do as you
          wish!
        </p>
      </div>
    </>
  );
};
