import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, List, ListItem } from 'semantic-ui-react';
import { Header, Icon, Image } from 'semantic-ui-react'
import { Activity } from '../models/Activity';
import Navbar from './Navbar';
import ActivityDashboard from '../../features/activities/ActivityDashboard.tsx';
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  // selectedActivity control if the ActivityDetails Component is displayed
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined)
  // editMode control if the ActivityForm Component is displayed
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    axios.get<Activity[]>("https://localhost:7264/api/activities").then(response => {
      setActivities(response.data);
    })
  }, []);

  const handleSelectActivity  = (id: string) => setSelectedActivity(activities.find(act => act.id === id));
  const handleCancelSelectActivity = () => setSelectedActivity(undefined);

  const handleCloseForm = () => setEditMode(false);

  const handleOpenForm = (id? : string) => {
    id ? handleSelectActivity(id) : handleCancelSelectActivity();
    setEditMode(true);
  }
  
  const handleCreateOrEditActivity = (activity: Activity) => {
    // edit Activity when activity.id is true, create Activity when activity.id is false
    activity.id ? setActivities([...activities.filter(act => act.id !== activity.id), activity]) 
      : setActivities([...activities, {...activity, id: uuidv4()}]);

    // close ActivityForm, open ActivityDetails
    setEditMode(false);
    setSelectedActivity(activity);
  }

  const handleDeleteActivity = (id: string) => {
    setActivities([...activities.filter(act => act.id !== id)]);
  }

  return (
    <>
        <Navbar openForm={handleOpenForm}/>
        {/* <Header icon='users' content='Reactivities' /> */}
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
        <Container style={{marginTop: '7em'}}>
          <ActivityDashboard activities={activities}
          selectedActivity={selectedActivity}
          cancelSelectActivity={handleCancelSelectActivity}
          selectActivity={handleSelectActivity}
          editMode = {editMode}
          openForm={handleOpenForm}
          closeForm={handleCloseForm}
          createOrEdit={handleCreateOrEditActivity}
          deleteActivity={handleDeleteActivity}
          />
        </Container>

    </>
  );
}

export default App;
