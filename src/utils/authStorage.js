import AsyncStorage from "@react-native-async-storage/async-storage";

class AuthStorage {
  constructor(namespace = "auth") {
    this.namespace = namespace;
  }

  async getAccessToken() {
    const tokens = await AsyncStorage.getItem(`${this.namespace}:tokens`);

    return tokens ? JSON.parse(tokens).pop() : [];
  }

  async setAccessToken(accessToken) {
    const savedTokens = await this.getAccessToken();
    const newTokens = [...savedTokens, accessToken];

    await AsyncStorage.setItem(
      `${this.namespace}:tokens`,
      JSON.stringify(newTokens)
    );
  }

  async removeAccessToken() {
    await AsyncStorage.removeItem(`${this.namespace}:tokens`);
  }
}

export default AuthStorage;
