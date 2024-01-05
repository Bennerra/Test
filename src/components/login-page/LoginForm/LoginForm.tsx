import React, { FC } from "react";
import styled from "styled-components";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { SiteContainer, BigButton } from "../../../styles/components";
import { FormLoginLayout, FormTitle } from "./styles";

import { HeaderForm } from "../HeaderForm";
import { RadioList } from "../RadioList";
import { useForm } from "react-hook-form";
import {IFormField} from "../../../models/IFormField";
import FormField from "../FormField/FormField";

const MainForm = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const options: IFormField[] = [
  {
    label: "Имя",
    name: "name",
  },
  {
    label: "Фамилия",
    name: "lastName",
  },
  {
    label: "Отчество",
    name: "middleName",
  },
  {
    label: "Название ИП",
    name: "companyName",
  },
  {
    label: "ИНН",
    name: "inn",
  },
  {
    label: "Номер телефона",
    name: "number",
  },
  {
    label: "Почта",
    name: "email",
  },
  {
    label: "Пароль",
    name: "password",
  },
];

type FormData = {
  name: string;
  lastName: string;
  middleName?: string;
  companyName?: string;
  inn?: string;
  number?: string;
  email?: string;
  password: string;
  status: string;
};

const shema = yup.object().shape({
  name: yup.string().required("Это обязательное поле!"),
  lastName: yup.string().required("Это обязательное поле!"),
  companyName: yup.string().required("Это обязательное поле!"),
  inn: yup.string().required("Это обязательное поле!"),
  number: yup.string().required("Это обязательное поле!"),
  email: yup
    .string()
    .required("Это обязательное поле!")
    .email("Некорректный email"),
  password: yup
    .string()
    .required("Это обязательное поле!")
    .min(8, "Пароль должен быть не менее 8 символов"),
});

const LoginForm: FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    mode: "onBlur",
    resolver: yupResolver(shema) as any,
  });

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  return (
    <>
      <HeaderForm />
      <SiteContainer>
        <FormLoginLayout>
          <FormTitle color="#353535" variant="h1">
            Присоединяйся к SunRay!
          </FormTitle>
          <MainForm onSubmit={handleSubmit(onSubmit)}>
            <RadioList name="status" control={control} />
            {options.map((option) => (
              <FormField
                key={option.name}
                name={option.name}
                control={control}
                label={option.label}
                errors={errors}
              />
            ))}
            <BigButton
              style={{ marginTop: "51px" }}
              variant="contained"
              color="primary"
              type="submit"
            >
              Далее
            </BigButton>
          </MainForm>
        </FormLoginLayout>
      </SiteContainer>
    </>
  );
};

export default LoginForm;
