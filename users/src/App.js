import React from 'react';
import './index.scss';
import { Success } from './components/Success';
import { Users } from './components/Users';

// Тут список пользователей: https://reqres.in/api/users

function App() {

  const[users, setUsers] = React.useState([]);            //состояние для пользователей
  const[invites, setInvites] = React.useState([]);        //состояние для приглашенных пользователей
  const[isLoading, setLoading] = React.useState(true);    //состояние для загрузчика
  const[success, setSuccess] = React.useState(false)      //состояние для "приглашения отправлены"
  const[searchValue, setSearchValue] = React.useState('');//состояние для контролируемого мной инпута(отслеживаем написанное) 

  React.useEffect(() => {
    fetch('https://reqres.in/api/users')              //запрос на бэкенд для получения пользователей
    .then((res) => res.json())                        //вытаскиваем даннные в формате json
    .then((json) => {                                 //из json вытягиваем только массив data с нашими пользователями
      setUsers(json.data);                            //в users запихиваем наш массив объектов data
    })
    .catch((err) => {                                 //обрабатываем ошибку в случае ошибки получения
      console.warn(err);                              //выкидываем эту ошибку в консоль
      alert('Ошибка при получении пользователей');    //оповещаем пользователя об ошибке
    })
    .finally(() => setLoading(false))                 //в любом случае убираем псевдозагрузку
  }, [])                                              //нет зависимостей для useEffect,поэтому постой массив
                                                
  const onChangeSearchValue = (event) => {
    setSearchValue(event.target.value);               //отслеживаю, что у меня в инпуте написано
  }

  const onClickInvite = (id) => {
    if(invites.includes(id)){
      setInvites((prev) => prev.filter(_id => _id != id))
    } else {
      setInvites((prev) => [...prev, id]);
    }
  }

  const onClickSendInvites = () => {
    setSuccess(true);
  }

  return (
    <div className="App">
      {
        success ? (
          <Success count={invites.length}/>
        ) : (
        <Users 
          onChangeSearchValue={onChangeSearchValue}
          searchValue = {searchValue}
          items={users} 
          isLoading={isLoading}
          invites={invites}
          onClickInvite={onClickInvite}
          onClickSendInvites={onClickSendInvites}
      />
      )}
    </div> 
  );
}

export default App;

