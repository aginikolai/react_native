import React, {useState} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Image, Dimensions, TextInput} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import * as Permissions from "expo-permissions";
import * as ImagePicker from 'expo-image-picker';

const AddNew: React.FC = () => {
  const [photo, setPhoto] = useState<any>({ type: ''});
  const [name, setName] = useState<string>('');
  const [specialise, setSpecialise] = useState<string>('')
  const {width, height} = Dimensions.get('screen');

  async function ascForPermissions() {
    const { status } = await Permissions.askAsync(Permissions.MEDIA_LIBRARY);
    if (status !== 'granted') {
      alert('Sorry, we need permissions to make this work!');
      return false
    }
    return true
  }

  const pickPhoto: () => Promise<void> = async () => {
    const permission = await ascForPermissions();
    if (!permission) {
      return
    } else {
      try {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 0.7,
        });
        if (!result.cancelled) {
          setPhoto(result)
        }
      } catch (error) {
        console.log(error)
      }
    }
  };

  return (
    <>
    <View style={styles.container}>
      {photo.type === 'image'
        ? (
          <Image source={{ uri: photo.uri }} style={{width: width/1.5, height: height/3, marginTop: 20}}/>
        ) : (
          <TouchableOpacity onPress={pickPhoto}>
            <View style={styles.button}>
              <Text style={styles.footerText}>Добавить фотографию</Text>
            </View>
          </TouchableOpacity>
        )
      }
      <View style={styles.inputContainer}>
        <Text style={styles.inputText}>Имя</Text>
        <TextInput
          style={styles.input}
          placeholder="Введите имя врача"
          value={name}
          onChangeText={(text: string) => setName(text)}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputText}>Должность</Text>
        <Picker
          mode='dropdown'
          selectedValue={specialise}
          style={{height: 50, width: '100%'}}
          onValueChange={(itemValue, itemIndex) =>
           setSpecialise(itemValue)
          }>
          <Picker.Item label="Оптометрист" value="Оптометрист" />
          <Picker.Item label="Врач-офтальмолог" value="Врач-офтальмолог" />
        </Picker>
      </View>
    </View>
    </>
  )
};

export default AddNew;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  button: {
    marginTop: 20,
    width: 320,
    height: 50,
    borderRadius: 4,
    backgroundColor: '#0B54A6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerText: {
    fontSize: 16,
    color: 'white',
    textTransform: 'uppercase',
    fontFamily: 'SourceSansPro_600SemiBold'
  },
  inputContainer: {
    width: '100%',
    padding: 20,
    marginTop: 10
  },
  inputText: {
    fontFamily: 'OpenSans_400Regular',
    fontSize: 16
  },
  input: {
    height: 50,
    width: '100%',
    justifyContent: 'center',
    borderBottomColor: '#D9D5DC',
    borderBottomWidth: 1,
    fontSize: 16,
    fontFamily: 'Inter_400Regular'
  },
  selectInput: {
    height: 50,
    width: '100%',
    justifyContent: 'center',
    borderBottomColor: '#D9D5DC',
    borderBottomWidth: 1,
    fontSize: 16,
    fontFamily: 'Inter_400Regular'
  }
})