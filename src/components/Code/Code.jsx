import './Code.css'

import { TextInput, Paper, Textarea, Button } from '@mantine/core'
import { useForm } from '@mantine/form'
import { CodeInput } from '@srsholmes/react-code-input'

const Code = ({ onFormSubmit }) => {
  const form = useForm({
    initialValues: {
      name: '',
      code: '',
    },
  })

  const handleSubmit = async () => {
    const formData = new FormData()

    formData.append('name', form.values.name)
    formData.append('code', form.values.code)
    formData.append('execution_response', eval(form.values.code))

    const response = await fetch(
      'https://nikostin.pythonanywhere.com/api/codes/',
      {
        method: 'POST',
        body: formData,
      }
    )

    if (response.ok) {
      form.reset()
      onFormSubmit() // Обновляем данные после успешной отправки формы
    }
  }

  return (
    <Paper w={300} withBorder p="xs">
      <TextInput
        label="Имя"
        description="Оно сохраниться на веб"
        placeholder="Input placeholder"
        {...form.getInputProps('name')}
      />
      <Textarea
        label="Code"
        description="Sava"
        placeholder="Input placeholder"
        {...form.getInputProps('code')}
      />

      <Button onClick={handleSubmit} fullWidth mt="xs">
        Сохранить
      </Button>
    </Paper>
  )
}

export default Code
