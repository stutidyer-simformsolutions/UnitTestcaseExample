import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { DisplayDataWithClass, DisplayDataWithFC, Home } from "../Containers";
const Stack = createNativeStackNavigator();
const MainNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="DisplayDataWithClass" component={DisplayDataWithClass} options={{ title: 'Statefull Component' }}/>
        <Stack.Screen name="DisplayDataWithFC" component={DisplayDataWithFC} options={{ title: 'Stateless Component' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigator;
