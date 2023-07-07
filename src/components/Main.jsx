import { StyleSheet, View, StatusBar } from "react-native";
import { Route, Routes, Navigate } from "react-router-native";

import RepositoryList from "./RepositoryList";
import RepositoryView from "./RepositoryView";
import AppBar from "./AppBar";
import SignIn from "./SignIn";
import SignUpForm from "./SignUpForm";
import ReviewForm from "./ReviewForm";
import ReviewList from "./ReviewList";

import theme from "../theme";

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: theme.colors.background,
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <StatusBar />
      <AppBar />
      <Routes>
        <Route path="/" element={<RepositoryList />} exact />
        <Route path="/:id" element={<RepositoryView />} exact />
        <Route path="/signin" element={<SignIn />} exact />
        <Route path="/signup" element={<SignUpForm />} exact />
        <Route path="/reviewform" element={<ReviewForm />} exact />
        <Route path="/reviews" element={<ReviewList />} exact />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </View>
  );
};

export default Main;
