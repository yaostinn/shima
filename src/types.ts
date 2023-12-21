export interface CodeTableData {
  id: number;
  name: string;
  code: string;
  execution_response: string;
  created_at: string;
  updated_at: string;
}

export interface CodeProps {
  onFormSubmit: () => void;
}
