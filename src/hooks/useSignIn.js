import { useApolloClient, useMutation } from "@apollo/client";
import { AUTHENTICATE } from "../graphql/mutations";
import useAuthStorage from "../hooks/useAuthStorage";

const useSignIn = () => {
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();
  const [mutate, result] = useMutation(AUTHENTICATE);

  const signIn = async ({ username, password }) => {
    try {
      const { data } = await mutate({
        variables: {
          credentials: {
            username,
            password,
          },
        },
      });
      const token = data.authenticate.accessToken;
      await authStorage.setAccessToken(token);
      apolloClient.resetStore();
      return token;
    } catch (e) {
      throw new Error(e);
    }
  };

  return [signIn, result];
};

export default useSignIn;
