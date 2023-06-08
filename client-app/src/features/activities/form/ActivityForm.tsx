import React, { ChangeEvent, useState } from 'react'
import { Button, Checkbox, Form } from 'semantic-ui-react'
import { Activity } from '../../../app/models/Activity'

interface Props {
  selectedActivity: Activity | undefined,
  closeForm: () => void,
  createOrEdit: (activity: Activity) => void,
}


export default function ActivityForm({closeForm, selectedActivity, createOrEdit}: Props) {
  const initialActivity = selectedActivity ??= {
      id: '',
      title: '',
      date: '',
      description: '',
      category: '',
      city: '',
      venue: ''
  }
  const [activity, setActivity] = useState(initialActivity);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> ) => {
    const {name, value} = event.target;
    setActivity({...activity, [name]: value});
  }

  const handleSubmit = () => {
    createOrEdit(activity)
  }

  return (
    <Form onSubmit={handleSubmit} autoComplete='off'>
        <Form.Input placeholder='Title' name='title' value={activity.title} onChange={handleInputChange}/>
        <Form.TextArea placeholder='Description' name='description' value={activity.description} onChange={handleInputChange}/>
        <Form.Input placeholder='category' name='category' value={activity.category} onChange={handleInputChange}/>
        <Form.Input placeholder='Date' name='date' value={activity.date} onChange={handleInputChange}/>
        <Form.Input placeholder='City' name='city' value={activity.city} onChange={handleInputChange}/>
        <Form.Input placeholder='Venue' name='venue' value={activity.venue} onChange={handleInputChange}/>

        <Button floated='right' positive type='submit' content='Submit'></Button>
        <Button onClick={closeForm} floated='right'  type='button' content='Cancel'></Button>
  </Form>
  )
}
