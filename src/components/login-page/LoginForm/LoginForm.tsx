import React, { FC, useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

import {
  TBuyerLoginFormData,
  TSellerLoginFormData,
} from "@/models/LoginFormData";
import { loginFormSchema } from "@/utils/schems/LoginFormSchems";
import { field } from "./types";

import { RadioList } from "../RadioList";
import { BuyerForm } from "../BuyerForm";
import { SellerForm } from "../SellerForm";

import { SiteContainer } from "@/styles/components";
import { LoginFormLayout } from "@/layouts/LoginFormLayout";
import { useAppDispatch } from "@/hooks/redux";
import { addUser } from "@/store/userSlice";

const LoginForm: FC = () => {
  const [status, setStatus] = useState("");
  const dispatch = useAppDispatch();

  const {
    control,
    handleSubmit,
    watch,
    resetField,
    formState: { errors },
  } = useForm<TBuyerLoginFormData | TSellerLoginFormData>({
    mode: "onBlur",
    resolver: yupResolver(loginFormSchema) as any,
  });

  const onSubmit = (data: TBuyerLoginFormData | TSellerLoginFormData) => {
    dispatch(addUser(data));
  };

  useEffect(() => {
    setStatus(watch("status"));
  });

  useEffect(() => {
    const arr = [
      "email",
      "number",
      "inn",
      "companyName",
      "name",
      "lastName",
      "password",
    ];

    arr.forEach((name: field) => {
      resetField(name);
    });
  }, [status]);

  return (
    <>
      <SiteContainer>
        <LoginFormLayout handleSubmit={handleSubmit} onSubmit={onSubmit}>
          <RadioList
            helperText={errors?.status?.message}
            name="status"
            control={control}
          />
          {status === "buyer" && (
            <BuyerForm errors={errors} control={control} />
          )}
          {status === "seller" && (
            <SellerForm errors={errors} control={control} />
          )}
        </LoginFormLayout>
      </SiteContainer>
    </>
  );
};

export default LoginForm;
