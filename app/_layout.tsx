import { SplashScreen, Stack } from "expo-router";
import { useFonts } from "expo-font";
import "./global.css";
import { useEffect } from "react";
import GlobalProvider from "@/lib/global-provider";

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();
export default function RootLayout() {
    const [fontsLoaded, error] = useFonts({
        "Rubik-Bold": require("../assets/fonts/Rubik-Bold.ttf"),
        "Rubik-ExtraBold": require("../assets/fonts/Rubik-ExtraBold.ttf"),
        "Rubik-SemiBold": require("../assets/fonts/Rubik-SemiBold.ttf"),
        "Rubik-Medium": require("../assets/fonts/Rubik-Medium.ttf"),
        "Rubik-Light": require("../assets/fonts/Rubik-Light.ttf"),
        "Rubik-Regular": require("../assets/fonts/Rubik-Regular.ttf"),
    });
    useEffect(() => {
        if (fontsLoaded || error) {
            SplashScreen.hideAsync();
        }
    }, [fontsLoaded, error]);
    if (!fontsLoaded && !error) {
        return null;
    }
    return (
        <GlobalProvider>
            <Stack
                screenOptions={{
                    headerShown: false,
                }}
            />
        </GlobalProvider>
    );
}
