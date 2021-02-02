import React from 'react';
import {Text, View, FlatList, StyleSheet, TouchableOpacity} from 'react-native';

interface Props {
  navigation: {
    navigate: any
  }
}

const Doctors: React.FC<Props> = ({navigation}) => {
  return (
    <>
      <FlatList
        data={[]}
        renderItem={() => <Text>Doctor</Text>}
        ListHeaderComponent={() => (
          <View style={styles.flatListStyles}>
            <Text style={styles.headerText}>Наши Врачи</Text>
          </View>
        )}
      />
      <View style={styles.footer}>
        <TouchableOpacity onPress={() => navigation.navigate('/create')}>
          <View style={styles.button}>
            <Text style={styles.footerText}>Добавить врача</Text>
            <Text style={{position: 'absolute', right: 20, color: 'white', fontSize: 25}}>+</Text>
          </View>
        </TouchableOpacity>
      </View>
    </>
  )
};

export default Doctors;

const styles = StyleSheet.create({
  flatListStyles: {
    marginTop: 50,
    alignItems: 'center'
  },
  headerText: {
    fontSize: 18,
    fontFamily: 'Inter_700Bold',
    textTransform: 'uppercase'
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    height:105,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%'
  },
  button: {
    width: 320,
    height: 50,
    borderRadius: 4,
    backgroundColor: '#F36E20',
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerText: {
    fontSize: 16,
    color: 'white',
    textTransform: 'uppercase',
    fontFamily: 'SourceSansPro_600SemiBold'
  }
});