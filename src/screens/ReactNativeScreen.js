

import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';


const Section = ({children, title}) => {
    const isDarkMode = useColorScheme() === 'dark';
    return (
      <View style={styles.sectionContainer}>
        <Text
          style={[
            styles.sectionTitle,
            {
              color: '#6495ed',
            },
          ]}>
          {title}
        </Text>
        <Text
          style={[
            styles.sectionDescription,
            {
              color: '#6495ed',
            },
          ]}>
          {children}
        </Text>
      </View>
    );
  };

 const ReactNativeScreen = () => {
    const isDarkMode = useColorScheme() === 'dark';
  
    const backgroundStyle = {
      backgroundColor: '#ff69b4',//hot pink
    };
  
    return (
      <SafeAreaView style={backgroundStyle}>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={backgroundStyle}>
          <View
            style={{
              backgroundColor: '#ff69b4',
            }}>
            <Section title="Step One">
              Edit <Text style={styles.highlight}>ReactNativeScreen</Text> to change this
              screen and then come back to see your edits.
            </Section>
            <Section title="Step Two">
              Edit <Text style={styles.highlight}>ReactNativeScreen</Text> to change this
              screen and then come back to see your edits.
            </Section>
            <Section title="Step Three">
              Edit <Text style={styles.highlight}>ReactNativeScreen</Text> to change this
              screen and then come back to see your edits.
            </Section>
            <Section title="Step Four">
              Edit <Text style={styles.highlight}>ReactNativeScreen</Text> to change this
              screen and then come back to see your edits.
            </Section>
            <Section title="Step Five">
              Edit <Text style={styles.highlight}>ReactNativeScreen</Text> to change this
              screen and then come back to see your edits.
            </Section>
            <Section title="See Your Changes">
            </Section>
            <Section title="Debug">
            </Section>
            <Section title="Learn More">
              Read the docs to discover what to do next:
            </Section>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  };


const styles = StyleSheet.create({
    sectionContainer: {
      marginTop: 32,
      paddingHorizontal: 24,
    },
    sectionTitle: {
      fontSize: 24,
      fontWeight: '600',
    },
    sectionDescription: {
      marginTop: 8,
      fontSize: 18,
      fontWeight: '400',
    },
    highlight: {
      fontWeight: '700',
    },
  });

  export default ReactNativeScreen