import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import axios from 'axios';
import './App.css';
import 'semantic-ui-css/semantic.min.css'
import { List, ListItem } from 'semantic-ui-react';

function App() {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    axios.get("https://localhost:7264/api/activities").then(response => {
      console.log(response);
      setActivities(response.data);
    })
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

        {/* <ul> 
          {
            // 注意这里的id和title都是小写，即使Activity类中定义的Properties是大写
           activities.map((activity: any) => (
           <li key={activity.id}>
              {activity.title}
              </li>
              ))
          }
          </ul> 
        */}

        <List bulleted>
          {
            // 注意这里的id和title都是小写，即使Activity类中定义的Properties是大写
            activities.map((activity: any) => (
            <ListItem key={activity.id}>
                {activity.title}
                </ListItem>
                ))
        }
        </List>
      </header>
    </div>
  );
}

export default App;
