import React, { useEffect, useState } from 'react';
import { Container, List, ListItem } from 'semantic-ui-react';
import { Activity } from '../models/Activity';
import Navbar from './Navbar';
import ActivityDashboard from '../../features/activities/ActivityDashboard.tsx';
import { v4 as uuidv4 } from 'uuid';
import agent from '../api/agent';
import LoadingComponent from './LoadingComponent';
import { response } from 'express';

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  // selectedActivity control if the ActivityDetails Component is displayed
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined)
  // editMode control if the ActivityForm Component is displayed
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  // control loading animation for the submit button
  const [submitting, setSubmitting] = useState(false);


  useEffect(() => {
    agent.Activities.list().then(response => {
      let activities: Activity[] = [];
      // format date string
      response.forEach(activity => {
        activity.date = activity.date.split('T')[0];
        activities.push(activity);
      })

      // App component will be re-rendered when their state such as loading changes
      setLoading(false);
      setActivities(response);
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
    setSubmitting(true);
    if(activity.id) { // edit activity
      agent.Activities.update(activity).then(() => {
        setActivities([...activities.filter(act => act.id !== activity.id), activity])
        // close ActivityForm, open ActivityDetails
        setSelectedActivity(activity)
        setEditMode(false);
        setSubmitting(false);
      })
    }else { // crreate activity
      activity.id = uuidv4();
      agent.Activities.create(activity).then(() => {
        setActivities([...activities, activity])
        // close ActivityForm, open ActivityDetails
        setSelectedActivity(activity)
        setEditMode(false);
        setSubmitting(false);
      })
    }


  }

  const handleDeleteActivity = (id: string) => {
    setSubmitting(true);
    agent.Activities.delete(id).then(() => {
      setActivities([...activities.filter(act => act.id !== id)]);
      setSubmitting(false);

      setEditMode(false);
      setSelectedActivity(undefined);
    });
  }

  if(loading) return (<LoadingComponent content='Loading app' />)
  
  return (
    <>
        <Navbar openForm={handleOpenForm}/>
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
          submitting={submitting}
          />
        </Container>

    </>
  );
}

export default App;
