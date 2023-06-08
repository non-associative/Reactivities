import React, { useState } from 'react'
import { Button, Item, Label, Segment } from 'semantic-ui-react'
import { Activity } from '../../../app/models/Activity'

interface Props {
    activities: Activity[],
    selectActivity: (id: string)=> void,
    cancelSelectActivity: ()=> void,
    deleteActivity: (id: string) => void
    submitting: boolean
}

export default function ActivityList({activities, selectActivity, cancelSelectActivity, deleteActivity, submitting }: Props) {
    const [target, setTarget] = useState('');
    const handleDeleteActivity = (e: React.MouseEvent<HTMLButtonElement>, id: string) => {
        setTarget(e.currentTarget.name);
        deleteActivity(id);
    }

  return (
    <Segment>
        <Item.Group divided>
            {activities.map(activity => (
                <Item key={activity.id}>
                    <Item.Content>
                        <Item.Header as='a'>{activity.title}</Item.Header>
                        <Item.Meta>{activity.date}</Item.Meta>
                        <Item.Description>
                            <div>{activity.description}</div>
                            <div>{activity.city}, {activity.venue}</div>
                        </Item.Description>
                        <Item.Extra>
                            <Button onClick={() => selectActivity(activity.id)} floated='right' content='View' color='blue'></Button>
                            <Button 
                            name={activity.id}
                            loading={submitting && activity.id === target} 
                            onClick={(e) => handleDeleteActivity(e, activity.id)} 
                            floated='right' 
                            content='Delete' 
                            color='blue'></Button>
                            <Label basic content={activity.category}/>
                        </Item.Extra>
                    </Item.Content>
                </Item>
            ) )}
  </Item.Group>
    </Segment>
  )
}
