import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Image, Dimensions, TextInput, Keyboard, AsyncStorage} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import * as Permissions from "expo-permissions";
import * as ImagePicker from 'expo-image-picker';

interface Props {
  navigation: {
    navigate: any
  }
}

const AddNew: React.FC<Props> = ({navigation}) => {
  const [photo, setPhoto] = useState<any>({ type: ''});
  const [name, setName] = useState<string>('');
  const [keyboardActive, setKeyboardActive] = useState<boolean>(false);
  const [specialise, setSpecialise] = useState<string | number>('');
  const {width, height} = Dimensions.get('screen');

  async function ascForPermissions() {
    const { status } = await Permissions.askAsync(Permissions.MEDIA_LIBRARY);
    if (status !== 'granted') {
      alert('Sorry, we need permissions to make this work!');
      return false
    }
    return true
  }

  // const savePhoto = async () => {
  //   const formData: any = new FormData();
  //   formData.append('file', {
  //     uri: photo.uri,
  //     type: photo.type,
  //     name: 'avatar'
  //   });
  //   formData.append('upload_preset', 'sickfits');
  //   formData.append("api_key", "163971657137886");
  //   try {
  //     const res = await fetch('https://res.cloudinary.com/dwutygab0/image/upload/', {
  //       headers: {
  //         'Accept': 'application/json',
  //         'Content-Type': 'multipart/form-data'
  //       },
  //       method: 'POST',
  //       body: formData
  //     });
  //     const file = await res.json();
  //     console.log(file);
  //   } catch (e) {
  //     console.log(e)
  //   }
  //
  // };

  const saveDoctor = async () => {
    const result = await AsyncStorage.setItem('doctors', JSON.stringify({
      name,
      specialise
    }));
    console.log(name, specialise);
    console.log(result);
    await navigation.navigate('/main')
  };

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
  useEffect(() => {
    Keyboard.addListener("keyboardDidShow", () => setKeyboardActive(true));
    Keyboard.addListener("keyboardDidHide", () => setKeyboardActive(false));
  }, []);

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
      marginTop: 10,
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
      fontSize: 16,
      fontFamily: 'Inter_400Regular',
      marginLeft: -10,
      color: specialise !== '' ? 'black' : '#B5BBBD'
    },
    addButton: {
      width: 320,
      height: 50,
      borderRadius: 4,
      backgroundColor: '#F36E20',
      alignItems: 'center',
      justifyContent: 'center',
    },
    footer: {
      position: keyboardActive ? 'relative' : 'absolute',
      bottom: 0,
      height:105,
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%'
    },
  });

  return (
    <>
    <View style={styles.container}>
      {photo.type === 'image'
        ? (
          <Image source={{ uri: photo.uri }} style={{width: 80, height: 120, marginTop: 20}}/>
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
      <View style={[styles.inputContainer, {borderBottomColor: '#D9D5DC', borderBottomWidth: 1, width: width - 40, padding: 0}]}>
        <Text style={styles.inputText}>Должность</Text>
        <Picker
          style={styles.selectInput}
          selectedValue={specialise}
          onValueChange={value => {
            if (value != "")
              setSpecialise(value);
          }}
        >
          <Picker.Item label="Должность врача" value="" />
          <Picker.Item label="Оптометрист" value="Оптометрист" />
          <Picker.Item label="Врач-офтальмолог" value="Врач-офтальмолог" />
        </Picker>
      </View>
      <View style={styles.footer}>
      <TouchableOpacity onPress={saveDoctor}>
        <View style={styles.addButton}>
          <Text style={styles.footerText}>Добавить врача</Text>
        </View>
      </TouchableOpacity>
      </View>
    </View>
    </>
  )
};

export default AddNew;

