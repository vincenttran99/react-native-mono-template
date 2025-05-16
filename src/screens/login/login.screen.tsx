import React, { useCallback, useMemo } from "react";
import BButton from "components/base/base.button";
import { SubmitHandler, useForm } from "react-hook-form";
import FTextInput from "components/form/form.textInput";
import BText from "components/base/base.text";
import { useLingui } from "@lingui/react";
import { msg } from "@lingui/core/macro";
import BView from "components/base/base.view";
import { useLoginMutation } from "api/auth/auth.queries";
import { LoginPayload } from "api/auth/auth.api";
import { showErrorMessage } from "helpers/global.helper";
import BKeyboardAvoidingView from "components/base/base.keyboardAvoidingView";
import { handleApiRequestHelper } from "helpers/api.helper";

export default function LoginScreen() {
  // define the form
  const { control, handleSubmit } = useForm<LoginPayload>();

  // for multiple language
  const { _ } = useLingui();

  // query
  const { mutateAsync: loginUser } = useLoginMutation();

  //some stuff :D
  const ruleInput = useMemo(() => {
    return {
      email: {
        required: {
          value: true,
          message: _(msg`Email should not be empty`),
        },
        pattern: {
          value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
          message: _(msg`Email is not valid`),
        },
      },
      password: {
        required: {
          value: true,
          message: _(msg`Password should not be empty`),
        },
      },
    };
  }, [_]);

  const login: SubmitHandler<LoginPayload> = useCallback(async (data) => {
    /**
     * You can simply use the request directly
     *
     * const response = await loginUser(data);
     * console.log(response);
     *
     * But we recommend using the helper function
     *
     * handleRequestHelper is a helper function to handle the request
     * It will handle the loading, error, success, etc
     *
     * @param request: The request function
     * @param params: The params of the request
     * @param onSuccess: The function will be called when the request is success
     * @param onError: The function will be called when the request is error
     */
    handleApiRequestHelper({
      request: loginUser,
      params: data,
      onSuccess: (response) => {
        // Do something if you want
      },
      onFailed: (error) => {
        showErrorMessage(_(msg`Login failed`));
        // Do something if you want
      },
    });
  }, []);

  return (
    <BKeyboardAvoidingView
      flex={1}
      justifyContent="center"
      paddingHorizontal="xl"
      gap="xxl"
    >
      <BView alignItems="flex-start" width={"100%"}>
        <BText variant={"xxl"} fontWeight={"bold"}>
          {_(msg`Hello`) + ","}
        </BText>

        <BText variant={"md"}>{_(msg`Login to continue`)}</BText>
      </BView>

      <BView width={"100%"}>
        <BView gap="xxs">
          <FTextInput
            name={"email"}
            control={control}
            placeholder={_(msg`Your email`)}
            rules={ruleInput.email}
            leftIcon="email"
            keyboardType={"email-address"}
          />
          <FTextInput
            name={"password"}
            control={control}
            placeholder={_(msg`Your password`)}
            rules={ruleInput.password}
            secureTextEntry
            leftIcon="lock"
          />
        </BView>

        <BButton
          onPress={handleSubmit(login)}
          size={"md"}
          marginTop="lg"
          label={_(msg`Login`)}
        />
      </BView>
    </BKeyboardAvoidingView>
  );
}
