import React, { useState, useEffect } from 'react';
import { NativeBaseProvider, Box, Button, Center, FlatList, Text, TextArea, Select, CheckIcon } from 'native-base';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

// Define o tipo para navegação
type ConsultationsListScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'ConsultationsList'
>;

type Props = {
  navigation: ConsultationsListScreenNavigationProp;
};

// Define o tipo das consultas
type Consultation = {
  id: string;
  doctor: string;
  date: string;
  status: string;
};

const ConsultationsListScreen = ({ navigation }: Props) => {
  const [consultations, setConsultations] = useState<Consultation[]>([]);
  const [username, setUsername] = useState('');
  const [role, setRole] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // Fetch dos dados do usuário e consultas
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = await AsyncStorage.getItem('token');

        // Obter dados do usuário
        const userResponse = await axios.get('http://192.168.x.x:3000/auth/user', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsername(userResponse.data.username);
        setRole(userResponse.data.role);

        // Obter consultas
        const consultationsResponse = await axios.get('http://192.168.x.x:3000/consultas', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setConsultations(consultationsResponse.data);
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []);

  // Função para editar consulta
  const handleEditConsultation = (consultationId: string) => {
    navigation.navigate('EditConsultation', { consultationId });
  };

  // Função para solicitar alteração
  const handleRequestChange = (consultationId: string) => {
    alert(`Solicitação de alteração enviada para consulta ${consultationId}`);
  };

  // Exibir mensagem de carregamento enquanto os dados não são carregados
  if (isLoading) {
    return (
      <NativeBaseProvider>
        <Center flex={1}>
          <Text>Carregando...</Text>
        </Center>
      </NativeBaseProvider>
    );
  }

  return (
    <NativeBaseProvider>
      <Center flex={1} bg="white">
        <Box>
          <Text mb={4}>Bem-vindo, {username} ({role})</Text>
          <FlatList
            data={consultations}
            renderItem={({ item }) => (
              <Box borderBottomWidth="1" mb={4} p={2}>
                <Text fontSize="md">Consulta com {item.doctor}</Text>
                <Text fontSize="sm">Data: {item.date}</Text>
                <Text fontSize="sm">Status: {item.status}</Text>

                {role === 'admin' ? (
                  <Button mt={2} onPress={() => handleEditConsultation(item.id)}>
                    Editar Consulta
                  </Button>
                ) : (
                  <>
                    <TextArea placeholder="Descreva sua solicitação" mt={2} tvParallaxProperties={undefined} onTextInput={undefined} autoCompleteType={undefined} />
                    <Button mt={2} onPress={() => handleRequestChange(item.id)}>
                      Solicitar Alteração
                    </Button>
                  </>
                )}
              </Box>
            )}
            keyExtractor={(item) => item.id.toString()}
          />
        </Box>
      </Center>
    </NativeBaseProvider>
  );
};

export default ConsultationsListScreen;
