import React from "react";
import "./Code.css";

import { TextInput, Paper, Textarea, Button } from "@mantine/core";
import { useForm } from "@mantine/form";
import { CodeProps } from "../../types";

const Code: React.FC<CodeProps> = ({ onFormSubmit }) => {
  const form = useForm({
    initialValues: {
      name: "",
      code: "",
    },
  });

  const handleSubmit = async () => {
    const formData = new FormData();

    formData.append("name", form.values.name);
    formData.append("code", form.values.code);
    formData.append("execution_response", eval(form.values.code).toString());

    const response = await fetch(
      "https://nikostin.pythonanywhere.com/api/codes/",
      {
        method: "POST",
        body: formData,
      }
    );

    if (response.ok) {
      form.reset();
      onFormSubmit(); // Refresh data after successful form submission
    }
  };

  return (
    <Paper className="code">
      <TextInput
        label="Имя"
        description="Оно сохранится на веб"
        placeholder="Input placeholder"
        {...form.getInputProps("name")}
        className="text"
      />
      <Textarea
        label="Code"
        description="Save"
        placeholder="Input placeholder"
        {...form.getInputProps("code")}
        className="text"
      />

      <Button onClick={handleSubmit} fullWidth mt="xs">
        Сохранить
      </Button>
    </Paper>
  );
};

export default Code;
