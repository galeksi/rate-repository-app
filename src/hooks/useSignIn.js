import { useMutation } from "@apollo/client";
import { USER_SIGNIN } from "../graphql/queries";

const useSignIn = () => {
  const [mutate, result] = useMutation(USER_SIGNIN);

  const signIn = async ({ username, password }) => {
    await mutate({
      variables: { credentials: { username, password } },
    });
    console.log(result.data.authenticate.accessToken);
    return result.data;
  };

  return [signIn, result];
};

export default useSignIn;
