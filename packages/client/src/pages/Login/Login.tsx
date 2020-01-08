/** @jsx jsx */
import { jsx } from "@emotion/core";
import React, { useState, useCallback, Fragment, useEffect, useMemo } from "react";
import { Input, Button, Form } from "antd";
import { ILoginProps } from "./Login.types";
import { wrapperLoginStyles, buttonsWrapperStyle } from "./Login.styles";
import { FormItem } from "../../components/FormItem/FormItem";
import { some } from "lodash";
import { gql } from "apollo-boost";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { Spinner } from "../../components/Spinner/Spinner";

enum EFieldsNames {
  EMAIL,
  LOGIN,
  PASSWORD,
  NAME,
  CONFIRM_PASSWORD,
}

const query = gql`
  {
    login
  }
`;

const registrationMutation = gql`
  mutation Registrations($name: String!, $login: String!, $email: String!, $password: String!) {
    registration(params: { login: $login, name: $name, email: $email, password: $password })
  }
`;

const Login: React.FC<ILoginProps> = props => {
  const {
    getFieldDecorator,
    getFieldsError,
    getFieldValue,
    validateFields,
    validateFieldsAndScroll,
  } = props.form;

  const [isRegister, setIsRegister] = useState(false);
  const [disabledButton, setDisabledButton] = useState(true);
  const [confirmDirty, setConfirmDirty] = useState(false);

  const { loading } = useQuery(query);

  const [registration, { loading: loadingRegistr }] = useMutation(registrationMutation);

  const formErrors = getFieldsError();

  const isFormError = useMemo(() => some(formErrors), [formErrors]);

  useEffect(() => {
    setDisabledButton(isFormError || loadingRegistr);
  }, [isFormError, loadingRegistr]);

  const onSubmit = useCallback(
    e => {
      e.preventDefault();
      validateFieldsAndScroll((err, values) => {
        if (!err) {
          if (isRegister) {
            registration({
              variables: {
                login: values[EFieldsNames[EFieldsNames.LOGIN]],
                email: values[EFieldsNames[EFieldsNames.EMAIL]],
                name: values[EFieldsNames[EFieldsNames.NAME]],
                password: values[EFieldsNames[EFieldsNames.CONFIRM_PASSWORD]],
              },
            });
          } else {
            console.warn("login", values);
          }
        }
      });
    },
    [validateFieldsAndScroll, isRegister, registration],
  );

  const onRegistr = useCallback(() => {
    setIsRegister(true);
  }, []);

  const handleConfirmBlur = (e: any) => {
    const { value } = e.target;
    setConfirmDirty(confirmDirty || !!value);
  };

  const compareToFirstPassword = useCallback(
    (rule: any, value: any, callback: any) => {
      if (value && value !== getFieldValue(EFieldsNames[EFieldsNames.PASSWORD])) {
        callback("Пароли не совпадают!");
      } else {
        callback();
      }
    },
    [getFieldValue],
  );

  const validateToNextPassword = useCallback(
    (rule: any, value: any, callback: any) => {
      if (value && confirmDirty) {
        validateFields([EFieldsNames[EFieldsNames.CONFIRM_PASSWORD]], { force: true });
      }
      callback();
    },
    [confirmDirty, validateFields],
  );

  if (loading) {
    return <Spinner />;
  }

  return (
    <div css={wrapperLoginStyles}>
      <Form onSubmit={onSubmit} layout="vertical">
        <FormItem>
          {getFieldDecorator(EFieldsNames[EFieldsNames.LOGIN], {
            rules: [
              {
                required: true,
                message: "Пожалуйста введите имя пользователя",
              },
            ],
          })(<Input placeholder={"Имя пользователя"} />)}
        </FormItem>

        {isRegister ? (
          <Fragment>
            <FormItem>
              {getFieldDecorator(EFieldsNames[EFieldsNames.NAME], {
                rules: [
                  {
                    required: true,
                    message: "Введите свое имя",
                  },
                ],
              })(<Input placeholder={"Имя"} />)}
            </FormItem>

            <FormItem>
              {getFieldDecorator(EFieldsNames[EFieldsNames.EMAIL], {
                rules: [
                  {
                    required: true,
                    message: "Пожалуйста введите E-mail",
                  },
                  {
                    type: "email",
                    message: "Введенный E-mail не валидный!",
                  },
                ],
              })(<Input placeholder={"Email"} />)}
            </FormItem>
          </Fragment>
        ) : null}

        <FormItem hasFeedback={true}>
          {getFieldDecorator(EFieldsNames[EFieldsNames.PASSWORD], {
            rules: [
              {
                required: true,
                message: "Пожалуйста введите пароль",
              },
              {
                validator: validateToNextPassword,
              },
            ],
          })(<Input.Password placeholder={"Пароль"} />)}
        </FormItem>

        {isRegister ? (
          <FormItem hasFeedback={true}>
            {getFieldDecorator(EFieldsNames[EFieldsNames.CONFIRM_PASSWORD], {
              rules: [
                {
                  required: true,
                  message: "Пожалуйста повторите введенный пароль",
                },
                {
                  validator: compareToFirstPassword,
                },
              ],
            })(<Input.Password placeholder={"Повторите пароль"} onBlur={handleConfirmBlur} />)}
          </FormItem>
        ) : null}

        <div css={buttonsWrapperStyle}>
          {isRegister ? (
            <Button
              type="primary"
              htmlType="submit"
              disabled={disabledButton}
              loading={loadingRegistr}
            >
              Зарегистрироваться
            </Button>
          ) : (
            <React.Fragment>
              <Button type="primary" htmlType="submit">
                Войти
              </Button>
              <Button type="link" onClick={onRegistr}>
                Регистрация
              </Button>
            </React.Fragment>
          )}
        </div>
      </Form>
    </div>
  );
};

export default Form.create<ILoginProps>({ name: "login" })(Login);
