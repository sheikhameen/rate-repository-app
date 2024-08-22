import { useApolloClient, useQuery } from "@apollo/client";
import { useNavigate } from "react-router-native";
import { useEffect } from "react";

import useAuthStorage from "../hooks/useAuthStorage";

const SignOut = () => {
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();
  const navigate = useNavigate();

  useEffect(() => {
    const signOut = async () => {
      await authStorage.removeAccessToken();
      apolloClient.resetStore();
      navigate("/signIn");
    };
    signOut();
  }, []);

  return null;
};

export default SignOut;
