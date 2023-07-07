import { View } from "react-native";
import { USER_SIGNUP } from "../graphql/queries";
import { useMutation } from "@apollo/client";
import useSignIn from "../hooks/useSignIn";
import { useNavigate } from "react-router-native";
import { Formik } from "formik";
import * as yup from "yup";
import FormikTextInput from "./FormikTextInput";
import ButtonPrimary from "./ButtonPrimary";

const initialValues = {
  username: "",
  password: "",
  passwordConfirmation: "",
};

const validationSchema = yup.object().shape({
  username: yup.string().required("Username is required").min(5).max(30),
  password: yup.string().required("Password is required").min(5).max(30),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords not matching")
    .required("Passwords must match"),
});

const SignUpForm = () => {
  const [mutate] = useMutation(USER_SIGNUP);
  const [signIn] = useSignIn();
  const navigate = useNavigate();

  const signUp = async (values) => {
    const { username, password } = values;

    try {
      await mutate({
        variables: { user: { username, password } },
      });
      await signIn({ username, password });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={signUp}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => (
        <View style={{ backgroundColor: "white" }}>
          <FormikTextInput
            name="username"
            placeholder="Repository owner name"
          />
          <FormikTextInput
            name="password"
            placeholder="Password"
            secureTextEntry
          />
          <FormikTextInput
            name="passwordConfirmation"
            placeholder="Password confirmation"
            secureTextEntry
          />
          <ButtonPrimary text="Sign up" handlePress={handleSubmit} />
        </View>
      )}
    </Formik>
  );
};

export default SignUpForm;
