import React from 'react';
import Collection from './components/Collection';
import './index.scss';

const categs = [
  { "name": "Все" },
  { "name": "Море" },
  { "name": "Горы" },
  { "name": "Архитектура" },
  { "name": "Города" }
];

function App() {
  const [categoryId, setCategoryId] = React.useState(0);
  const [page, setPage] = React.useState(1);
  const [isLoading, setIsLoading] = React.useState(true);    //для момента, когда происходит переход между категориями
  const [searchValue, setSearchValue] = React.useState('');
  const [collections, setCollections] = React.useState([]);

  React.useEffect(() => {
    setIsLoading(true);
  
    const category = categoryId ? `category=${categoryId}` : '';
  
    fetch(
      `https://648b049d17f1536d65ea229b.mockapi.io/Photos?page=${page}&limit=3&${category}`
    )
      .then((res) => res.json())
      .then((json) => {
        setCollections(json);
      })
      .catch((err) => {
        console.warn(err);
        alert('Ошибка при получении данных');
      })
      .finally(() => setIsLoading(false));
  }, [categoryId, page]);

  return (
    <div className="App">
      <h1>Моя коллекция фотографий</h1>
      <div className="top">
        <ul className="tags">
          {categs.map((obj,index) => ( 
            <li 
              onClick={() => setCategoryId(index)}
              className={categoryId == index ? 'active' : ''} 
              key={obj.name}>{obj.name}
            </li>
          ))}
        </ul>
        <input 
          value={searchValue} 
          onChange={(e) => setSearchValue(e.target.value)} 
          className="search-input" 
          placeholder="Поиск по названию" 
        />
      </div>
      <div className="content">
        {isLoading ? ( 
          <h2>Идёт загрузка...</h2>
        ) : (
          collections
            .filter((obj) => obj.name.toLowerCase().includes(searchValue.toLowerCase()))
            .map((obj, index) => (
          <Collection key={index} name={obj.name} images={obj.photos} />
          )))          
        }
      </div>
      <ul className="pagination">
        {
            [...Array(3)].map((_, i) =>                 //вообще с бэка мы должны получать, сколько у нас есть коллекций, тут я лишь условно беру значение
            <li
              onClick={() => setPage(i + 1)}
              className={page == i + 1 ? 'active' : ''} 
            >{i + 1}</li>)                       
        }
      </ul>
    </div>
  );
}

export default App;
