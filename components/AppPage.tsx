import Colors from "@/constants/AppColors";
import { useAdminContext } from "@/contexts/adminContext";
import { useMemberContext } from "@/contexts/memberContext";
import { PropsWithChildren } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import Header from "./Header";
import LoadMessage from "./LoadMessage";
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
  },
  content: {
    width: '90%',
  }
});

const AppPage = (props: AppPageProps) => {
  const adminCtxt = useAdminContext();
  const memberCtxt = useMemberContext();
  const isLoading = adminCtxt.loading && memberCtxt.loading;

  return (
    <View style={style.container}>
      <Header />
      {isLoading && <LoadMessage />}
      {!isLoading && <ScrollView style={style.content}>
        <AppTitle>{props.title}</AppTitle>
        {props.adminOnly && !adminCtxt.admin && <>
          <AppText>Cette page est réservé aux admin.</AppText>
          <LoginRedirector />
        </>}
        {props.memberOnly && !memberCtxt.member && <>
          <AppText>Cette page est réservé aux membres.</AppText>
          <LoginRedirector />
        </>}
        {props.adminOnly && adminCtxt.admin && props.children}
        {props.memberOnly && memberCtxt.member && props.children}
        {!props.adminOnly && !props.memberOnly && props.children}
      </ScrollView>}
    </View>
  );
};

export default AppPage;
