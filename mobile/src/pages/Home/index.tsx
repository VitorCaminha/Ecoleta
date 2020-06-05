import React, { useState, useEffect } from 'react';
import { StyleSheet, ImageBackground, View, Image, Text, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { Feather as Icon } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import RNPickerSelect from 'react-native-picker-select';

interface IBGEUF {
  sigla: string;
}

interface IBGECITY {
  nome: string;
}

const Home: React.FC = () => {
  const [ufs, setUfs] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);

  const [selectedUf, setSelectedUf] = useState<string>('0');
  const [selectedCity, setSelectedCity] = useState<string>('0');

  const navigation = useNavigation();

  useEffect(() => {
    axios.get<IBGEUF[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados').then(res => {
      const ufInitials = res.data.map(ufInitial => ufInitial.sigla);

      setUfs(ufInitials);
    });
  }, []);

  useEffect(() => {
    if (selectedUf === '0') {
      return;
    }

    axios
      .get<IBGECITY[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`)
      .then(res => {
        const cityNames = res.data.map(cityName => cityName.nome);

        setCities(cityNames);
      });
  }, [selectedUf])

  function handleNavigate() {
    navigation.navigate('Points', {
      uf: selectedUf,
      city: selectedCity,
    })
  }

  return (
    <ImageBackground
      source={require('../../assets/home-background.png')}
      style={styles.container}
      imageStyle={{ width: 274, height: 368 }}
    >
      <View style={styles.main}>
        <Image source={require('../../assets/logo.png')} />
        <View>
          <Text style={styles.title}>Seu marketplace de coleta de resíduos.</Text>
          <Text style={styles.description}>Ajudamos pessoas a encontrarem pontos de coleta de forma eficiente.</Text>
        </View>
      </View>

      <View style={styles.footer}>
        <RNPickerSelect
          value={selectedUf}
          placeholder={{ label: 'Selecione o estado', value: '0' }}
          items={
            ufs.map(uf => ({
              label: uf,
              value: uf,
            }))
          }
          onValueChange={value => setSelectedUf(value)}
          style={pickerSelectStyles}
          useNativeAndroidPickerStyle={false}
          Icon={() => <Icon name="chevron-down" size={16} color="#A0A0B2" />}
        />
        <RNPickerSelect
          value={selectedCity}
          placeholder={{ label: 'Selecione a cidade', value: '0' }}
          items={
            cities.map(city => ({
              label: city,
              value: city,
            }))
          }
          onValueChange={value => setSelectedCity(value)}
          style={pickerSelectStyles}
          useNativeAndroidPickerStyle={false}
          Icon={() => <Icon name="chevron-down" size={16} color="#A0A0B2" />}
        />

        <RectButton style={styles.button} onPress={handleNavigate}>
          <View style={styles.buttonIcon}>
            <Icon name="arrow-right" color="#FFF" size={24} />
          </View>
          <Text style={styles.buttonText}>Entrar</Text>
        </RectButton>
      </View>
    </ImageBackground>
  );
}

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
  },

  main: {
    flex: 1,
    justifyContent: 'center',
  },

  title: {
    color: '#322153',
    fontSize: 32,
    fontFamily: 'Ubuntu_700Bold',
    maxWidth: 260,
    marginTop: 64,
  },

  description: {
    color: '#6C6C80',
    fontSize: 16,
    marginTop: 16,
    fontFamily: 'Roboto_400Regular',
    maxWidth: 260,
    lineHeight: 24,
  },

  footer: {},

  select: {},

  input: {
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 10,
    marginBottom: 8,
    paddingHorizontal: 24,
    fontSize: 16,
  },

  button: {
    backgroundColor: '#34CB79',
    height: 56,
    flexDirection: 'row',
    borderRadius: 10,
    overflow: 'hidden',
    alignItems: 'center',
    marginTop: 16,
  },

  buttonIcon: {
    height: 56,
    width: 56,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10
  },

  buttonText: {
    flex: 1,
    justifyContent: 'center',
    textAlign: 'center',
    color: '#FFF',
    fontFamily: 'Roboto_500Medium',
    fontSize: 16,
  }
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    height: 56,
    backgroundColor: '#FFF',
    color: '#6C6C80',
    borderRadius: 10,
    marginBottom: 8,
    paddingHorizontal: 24,
    paddingRight: 40, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    height: 56,
    backgroundColor: '#fff',
    color: '#6C6C80',
    marginBottom: 8,
    borderRadius: 10,
    paddingHorizontal: 24,
    paddingRight: 40, // to ensure the text is never behind the icon
  },
  placeholder: {
    color: '#A0A0B2',
    fontSize: 16,
  },
  iconContainer: {
    top: 20,
    right: 14,
  },
});