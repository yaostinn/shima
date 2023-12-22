import React from 'react'
import './Code.css'

import { TextInput, Paper, Textarea, Button } from '@mantine/core'
import { useForm } from '@mantine/form'
import { CodeProps } from '../../types'

const Code: React.FC<CodeProps> = ({ onFormSubmit }) => {
  const form = useForm({
    initialValues: {
      name: '',
      code: '',
    },
  })
  const handleResponseSava = async () => {
    const response = await fetch('http://localhost:8000/submit', {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(form.values.code),
    })

    const data = await response.json()

    return data.stdout
  }

  const handleSubmit = async () => {
    const formData = new FormData()

    formData.append('name', form.values.name)
    formData.append('code', form.values.code)
    formData.append('execution_response', await handleResponseSava())

    const response = await fetch(
      'https://nikostin.pythonanywhere.com/api/codes/',
      {
        method: 'POST',
        body: formData,
      }
    )

    if (response.ok) {
      form.reset()
      onFormSubmit() // Refresh data after successful form submission
    }
  }

  return (
    <Paper className="code" data-testid="cypress-form">
      <TextInput
        id="name"
        label="Имя"
        description="Оно сохранится на веб"
        placeholder="ex: Никита Остин"
        {...form.getInputProps('name')}
        className="text"
        data-testid="cypress-form-name"
      />
      <Textarea
        id="code"
        label="Code"
        placeholder="SavaScript, ex: (2+2)*3"
        {...form.getInputProps('code')}
        className="text"
        data-testid="cypress-form-code"
      />

      <Button
        onClick={handleSubmit}
        fullWidth
        mt="xs"
        data-testid="cypress-form-button"
      >
        Сохранить
      </Button>
    </Paper>
  )
}

export default Code
