import Colors from "@/constants/AppColors";
import { PropsWithChildren } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import Header from "./Header";
import AppTitle from "./texts/AppTitle";

export type AppPageProps = PropsWithChildren<{
  title: string;
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

  return (
    <View style={style.container}>
      <Header />
      <ScrollView>
        <AppTitle>{props.title}</AppTitle>
        {props.children}
      </ScrollView>
    </View>
  );
};

export default AppPage;
