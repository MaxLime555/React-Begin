import React from 'react';
import './index.scss';

const questions = [
  {
    title: 'React - это ... ?',
    variants: ['библиотека', 'фреймворк', 'приложение'],
    correct: 0,
  },
  {
    title: 'Компонент - это ... ',
    variants: ['приложение', 'часть приложения или страницы', 'то, что я не знаю что такое'],
    correct: 1,
  },
  {
    title: 'Что такое JSX?',
    variants: [
      'Это простой HTML',
      'Это функция',
      'Это тот же HTML, но с возможностью выполнять JS-код',
    ],
    correct: 2,
  },
  {
    title: 'Что такое CSS',
    variants: [
      'Это CSS',
      'Это что-то сложное',
      'Это каскадная таблица стилей',
    ],
    correct: 2,
  },
  {
    title: 'Какой тег отвечает за отображение изображений на странице?',
    variants: [
      '<photo>',
      '<img>',
      '<kartinka>'
    ],
    correct: 1,
  },
];

function Result({correct}) {
  return (
    <div className="result">
      <img src="https://cdn-icons-png.flaticon.com/512/2278/2278992.png" />
      <h2>Вы отгадали {correct} ответа из {questions.length}</h2>
      <a href="/">
        <button>Попробовать снова</button>
      </a>
    </div>
  );
}

function Game({step, question, onClickVariants}) {
  const percentage = Math.round(step / questions.length * 100);  {/*процент шкалы прогресса */}

  return (
    <>
      <div className="progress">
        <div style={{ width: `${percentage}%` }} className="progress__inner"></div>
      </div>
      <h1>{question.title}</h1>
      <ul>
        {
          question.variants.map((text, index) => 
            <li onClick={() => {onClickVariants(index)}} key={text}>{text}</li>
          )  
        }
      </ul>
    </>
  );
}

function App() {
  const [step, setStep] = React.useState(0);   {/*состояние для вопросов */}
  const [correct, setCorrect] = React.useState(0); {/*состояние для правильных ответов, считаем */}
  const question = questions[step];
  
  const onClickVariants = (index) => {     {/*увеличиваем при ответе */}
    setStep(step + 1);

    if (index == question.correct){
      setCorrect(correct + 1);
    }
  }

  return (
    <div className="App">
      {
        step != questions.length ? (<Game step={step} question={question} onClickVariants={onClickVariants} />
        ) : (
        <Result correct={correct}/>
        )
      }
    </div>
  );
}

export default App;
