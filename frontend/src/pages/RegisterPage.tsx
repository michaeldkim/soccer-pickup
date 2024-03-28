import React from 'react';
import Form from "../components/Form"

const RegisterPage: React.FC = () => {
  return <Form route="/api/user/refresh" method="register" />
};

export default RegisterPage;