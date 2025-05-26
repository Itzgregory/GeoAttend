import React from "react";
import { Colors } from "../lib/themes/themes";
import { ScrollView, View, useColorScheme } from 'react-native';


import { ViewProps, StyleProp, ViewStyle } from 'react-native';

interface ThemedViewProps extends ViewProps {
  style?: StyleProp<ViewStyle>;
}

const ThemedView: React.FC<ThemedViewProps> = ({ style, ...props }: ThemedViewProps) => {
    const colorScheme = useColorScheme() ?? 'light';
    const theme = Colors[colorScheme] ?? Colors.light;

    return (
    <ScrollView style={[{backgroundColor: theme.background}, style]} {...props} />
  );
}

export default ThemedView




