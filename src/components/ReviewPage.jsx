import { Pressable, StyleSheet, View } from "react-native";
import { useNavigate } from "react-router-native";
import { useMutation } from "@apollo/client";
import { useFormik } from "formik";
import * as yup from "yup";

import Text from "./Text";
import theme from "../theme";
import TextInput from "./TextInput";
import { CREATE_REVIEW } from "../graphql/mutations";

const validationSchema = yup.object().shape({
  ownerUsername: yup.string().required("Repository owner name is required"),
  repoName: yup.string().required("Repository name is required"),
  rating: yup
    .number()
    .required("Rating is required")
    .min(0, "Rating must be higher than or equal to 0")
    .max(100, "Rating must be lower than or equal to 100"),
  review: yup.string(),
});

const initialValues = {
  ownerUsername: "",
  repoName: "",
  rating: "",
  review: "",
};

const ReviewForm = ({ onSubmit }) => {
  const formik = useFormik({
    validationSchema,
    initialValues,
    onSubmit,
  });

  return (
    <View style={styles.container}>
      <Text fontSize="heading" fontWeight="bold">
        Create a Review
      </Text>
      <TextInput
        value={formik.values.ownerUsername}
        onChangeText={formik.handleChange("ownerUsername")}
        placeholder="Repository owner name"
        errorMessage={
          formik.touched.ownerUsername && formik.errors.ownerUsername
        }
      />
      <TextInput
        value={formik.values.repoName}
        onChangeText={formik.handleChange("repoName")}
        placeholder="Repository name"
        errorMessage={formik.touched.repoName && formik.errors.repoName}
      />
      <TextInput
        value={formik.values.rating}
        onChangeText={formik.handleChange("rating")}
        placeholder="Rating between 0 and 100"
        errorMessage={formik.touched.rating && formik.errors.rating}
      />
      <TextInput
        value={formik.values.review}
        onChangeText={formik.handleChange("review")}
        placeholder="Review"
        errorMessage={formik.touched.review && formik.errors.review}
        multiline
      />
      <Pressable style={styles.submit} onPress={formik.handleSubmit}>
        <Text style={styles.submitText}>Create a review</Text>
      </Pressable>
    </View>
  );
};

const ReviewPage = () => {
  const [createReview] = useMutation(CREATE_REVIEW);
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const { ownerUsername, rating, repoName, review } = values;

    try {
      await createReview({
        variables: {
          review: {
            ownerName: ownerUsername,
            rating: parseInt(rating),
            repositoryName: repoName,
            text: review,
          },
        },
      });
      navigate(`/repositories/${ownerUsername}.${repoName}`);
    } catch (e) {
      console.log(e);
    }
  };

  return <ReviewForm onSubmit={onSubmit} />;
};

export default ReviewPage;

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
