import { View, StyleSheet, ScrollView } from "react-native";
import { PropsWithChildren } from "react";
import Header from "./Header";
import Colors from "@/constants/Colors";
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

const AppPage = (props: AppPageProps): JSX.Element => {

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
