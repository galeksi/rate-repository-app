import { useMutation } from "@apollo/client";
import { USER_SIGNIN } from "../graphql/queries";

const useSignIn = () => {
  const [mutate, result] = useMutation(USER_SIGNIN);

  const signIn = async ({ username, password }) => {
    const data = await mutate({
      variables: { credentials: { username, password } },
    });
    // console.log(data.data.authenticate.accessToken);
    return data;
  };

  return [signIn, result];
};

export default useSignIn;
