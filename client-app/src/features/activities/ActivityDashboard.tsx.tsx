import React from 'react'
import { Grid, GridColumn, List, ListItem } from 'semantic-ui-react'
import { Activity } from '../../app/models/Activity'
import ActivityList from './dashboard/ActivityList'
import ActivityDetails from './details/ActivityDetails'
import { cwd } from 'process'
import ActivityForm from './form/ActivityForm'

interface Props {
    activities: Activity[],
    selectedActivity: Activity | undefined,
    selectActivity: (id: string)=> void,
    cancelSelectActivity: ()=> void,
    editMode: boolean,
    openForm: (id: string) => void,
    closeForm: () => void,
    createOrEdit: (activity: Activity) => void,
    deleteActivity: (id: string) => void
}

export default function ActivityDashboard({activities, selectedActivity, selectActivity, cancelSelectActivity,
                                          editMode, openForm, closeForm, createOrEdit, deleteActivity}: Props) {
  return (
    <Grid>
        <GridColumn width={10}>
          <ActivityList activities={activities} selectActivity={selectActivity}
           cancelSelectActivity={cancelSelectActivity}
           deleteActivity={deleteActivity}/>
        </GridColumn>
        <GridColumn width='6'>
          {/* <ActivityDetails activity={activities[0]}></ActivityDetails> */}

          {/* Because ActivityDetails Component is loading before it's actually got access to the activity object,
              we must make sure the existence of activities[0] */}
          {selectedActivity && !editMode &&
          <ActivityDetails activity={selectedActivity} openForm={openForm} cancelSelectActivity={cancelSelectActivity}/>}

          {editMode &&
          <ActivityForm createOrEdit={createOrEdit} closeForm={closeForm} selectedActivity={selectedActivity}/>}
        </GridColumn>
    </Grid>
  )
}
