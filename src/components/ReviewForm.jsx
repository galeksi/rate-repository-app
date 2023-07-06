import { View } from "react-native";
import { CREATE_REVIEW } from "../graphql/queries";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-native";
import { Formik } from "formik";
import * as yup from "yup";
import FormikTextInput from "./FormikTextInput";
import ButtonPrimary from "./ButtonPrimary";

const initialValues = {
  username: "",
  repository: "",
  rating: "",
  review: "",
};

const validationSchema = yup.object().shape({
  username: yup.string().required("Repository owner is required"),
  repository: yup.string().required("Repository name is required"),
  rating: yup.number().required("Rating is required").min(0).max(100),
});

const ReviewForm = () => {
  const [mutate] = useMutation(CREATE_REVIEW);
  const navigate = useNavigate();

  const submitReview = async (values) => {
    const { username, repository, review, rating } = values;
    const response = await mutate({
      variables: {
        review: {
          ownerName: username,
          repositoryName: repository,
          rating: Number(rating),
          text: review,
        },
      },
    });

    navigate(`/${response.data.createReview.repositoryId}`);
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={submitReview}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => (
        <View>
          <FormikTextInput
            name="username"
            placeholder="Repository owner name"
          />
          <FormikTextInput name="repository" placeholder="Repository name" />
          <FormikTextInput
            name="rating"
            placeholder="Rating between 0 and 100"
          />
          <FormikTextInput
            name="review"
            placeholder="Review"
            multiline={true}
            style={{ height: 100 }}
          />
          <ButtonPrimary text="Create review" handlePress={handleSubmit} />
        </View>
      )}
    </Formik>
  );
};

export default ReviewForm;
