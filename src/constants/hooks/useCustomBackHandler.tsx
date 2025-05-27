import { useRouter, useFocusEffect } from "expo-router";
import { BackHandler } from "react-native";
import { useCallback } from "react";

interface UseCustomBackHandlerProps {
  replaceRoute: string;
}

const useCustomBackHandler = ({ replaceRoute }: UseCustomBackHandlerProps): void => {
  const router = useRouter();

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        router.replace(replaceRoute);
        return true;
      };

      const subscription = BackHandler.addEventListener("hardwareBackPress", onBackPress);

      return () => subscription.remove();
    }, [router, replaceRoute])
  );
};

export default useCustomBackHandler;