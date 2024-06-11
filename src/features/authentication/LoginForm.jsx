import { useState } from "react";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import Input from "../../ui/Inputs";
import FormRowVertical from "../../ui/FormRowVertical";
import { useLogin } from "./useLogin";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { LoginData, isLoading } = useLogin();

  console.log(isLoading);

  function handleSubmit(e) {
    e.preventDefault();
    LoginData(
      { email, password },
      {
        onSettled: () => {
          setEmail("");
          setPassword("");
        },
      }
    );

    if (!email || !password) return;
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRowVertical label="Email address">
        <Input
          type="email"
          id="email"
          // This makes this form better for password managers
          autoComplete="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disable={isLoading}
        />
      </FormRowVertical>
      <FormRowVertical label="Password">
        <Input
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disable={isLoading}
        />
      </FormRowVertical>
      <FormRowVertical>
        <Button size="large">{!isLoading ? "Login" : "Loading..."}</Button>
      </FormRowVertical>
    </Form>
  );
}

export default LoginForm;
