import { Pressable, StyleSheet, View } from "react-native";
import { useNavigate } from "react-router-native";
import { useMutation } from "@apollo/client";
import { useFormik } from "formik";
import * as yup from "yup";

import { CREATE_USER } from "../graphql/mutations";
import useSignIn from "../hooks/useSignIn";
import TextInput from "./TextInput";
import theme from "../theme";
import Text from "./Text";

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(5, "Username must contain at least 5 characters")
    .max(30, "Username must contain at most 30 characters")
    .required("Username is required"),
  password: yup
    .string()
    .min(5, "Password must contain at least 5 characters")
    .max(50, "Password must contain at most 50 characters")
    .required("Password is required"),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Password confirmation is required"),
});

const initialValues = {
  username: "",
  password: "",
  passwordConfirm: "",
};

export const SignUpContainer = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <View style={styles.container}>
      <TextInput
        value={formik.values.username}
        onChangeText={formik.handleChange("username")}
        placeholder="Username"
        autoCapitalize="none"
        errorMessage={formik.touched.username && formik.errors.username}
      />

      <TextInput
        value={formik.values.password}
        onChangeText={formik.handleChange("password")}
        placeholder="Password"
        autoCapitalize="none"
        errorMessage={formik.touched.password && formik.errors.password}
      />

      <TextInput
        value={formik.values.passwordConfirm}
        onChangeText={formik.handleChange("passwordConfirm")}
        placeholder="Confirm Password"
        autoCapitalize="none"
        errorMessage={
          formik.touched.passwordConfirm && formik.errors.passwordConfirm
        }
      />

      <Pressable style={styles.submit} onPress={formik.handleSubmit}>
        <Text style={styles.submitText}>Sign up</Text>
      </Pressable>
    </View>
  );
};

const SignUp = () => {
  const [createUser] = useMutation(CREATE_USER);
  const [signIn] = useSignIn();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      await createUser({
        variables: {
          user: {
            username,
            password,
          },
        },
      });
      await signIn({ username, password });
      navigate("/");
    } catch (e) {
      console.log(e);
    }
  };

  return <SignUpContainer onSubmit={onSubmit} />;
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    display: "flex",
    gap: 16,
  },
  inputContainer: {
    display: "flex",
    gap: 4,
  },
  input: {
    borderWidth: 1,
    paddingVertical: 8,
    paddingHorizontal: 16,
    fontSize: theme.fontSizes.heading,
    borderRadius: 4,
    borderColor: theme.colors.border,
    backgroundColor: "#fff",
  },
  inputError: {
    borderColor: theme.colors.danger,
  },
  submit: {
    backgroundColor: theme.colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 4,
  },

  submitText: {
    color: "#fff",
    fontSize: theme.fontSizes.heading,
    textAlign: "center",
    fontWeight: theme.fontWeights.bold,
  },
});

export default SignUp;
