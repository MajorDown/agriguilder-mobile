import Colors from "@/constants/AppColors";
import { useAppContext } from "@/contexts/AppContext";
import { PropsWithChildren } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import Header from "./Header";
import LoginRedirector from "./LoginRedirector";
import AppText from "./texts/AppText";
import AppTitle from "./texts/AppTitle";

export type AppPageProps = PropsWithChildren<{
  title: string;
  adminOnly?: boolean;
  memberOnly?: boolean;
}>;

const style = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 0,
    backgroundColor: Colors.dark,
  }
});

const AppPage = (props: AppPageProps) => {
  const { admin, member } = useAppContext();

  return (
    <View style={style.container}>
      <Header />
      <ScrollView>
        <AppTitle>{props.title}</AppTitle>
        {props.adminOnly && !admin && <>
          <AppText>Cette page est réservé aux admin.</AppText>
          <LoginRedirector />
        </>}
        {props.memberOnly && !member && <>
          <AppText>Cette page est réservé aux membres.</AppText>
          <LoginRedirector />
        </>}
        {props.children}
      </ScrollView>
    </View>
  );
};

export default AppPage;
