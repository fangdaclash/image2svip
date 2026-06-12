import { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.image2svip.app",
  appName: "image2svip",
  webDir: "public",
  server: {
    androidScheme: "https",
    url: "http://localhost:4173",
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: "#171613",
      androidSplashResourceName: "splash",
      showSpinner: true,
      spinnerColor: "#ff563f"
    }
  }
};

export default config;
