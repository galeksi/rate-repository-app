import { useMutation, useApolloClient } from "@apollo/client";
import { USER_SIGNIN } from "../graphql/queries";
import { useAuthStorage } from "./useAuthStorage";

const useSignIn = () => {
  const [mutate, result] = useMutation(USER_SIGNIN);
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();

  const signIn = async ({ username, password }) => {
    const data = await mutate({
      variables: { credentials: { username, password } },
    });
    const token = data.data.authenticate.accessToken;
    await authStorage.setAccessToken(token);
    apolloClient.resetStore();

    return data;
  };

  return [signIn, result];
};

export default useSignIn;
