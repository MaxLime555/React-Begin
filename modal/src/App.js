import React, {useState} from 'react';
import './index.scss';

const Modal = ({open, setOpen, children}) => (
  <div className={`overlay animated ${open ? 'show' : ''}`}>
    <div className="modal">
      <svg onClick={() => setOpen(false)} height="200" viewBox="0 0 200 200" width="200">
        <title />
        <path d="M114,100l49-49a9.9,9.9,0,0,0-14-14L100,86,51,37A9.9,9.9,0,0,0,37,51l49,49L37,149a9.9,9.9,0,0,0,14,14l49-49,49,49a9.9,9.9,0,0,0,14-14Z" />
      </svg>
      {children} {/*рендерится какой-то динамический контент, который я передаю в Modal */}
    </div>
  </div>
)

function App() {

  const[open, setOpen] = useState(false); /*отвечает за открытое/закрытое модальное окно */

  return (
    <div className="App">
      <button onClick={() => setOpen(true)} className="open-modal-btn"> {/*условное добавление класса видимости/невидимости */}
        ✨ Открыть окно
      </button>
      <Modal open={open} setOpen={setOpen}>
      <img src="https://media.tenor.com/s5FIe_do3HIAAAAd/%D0%BA%D0%BE%D1%82-%D1%87%D0%B0%D0%B2%D0%BA%D0%B0%D0%B5%D1%82.gif" alt=""/>
      {/*вот тот самый динамический контент */}
      </Modal>
    </div>
  );
}

export default App;
