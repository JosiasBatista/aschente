import React, { useContext, useState } from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';

import { styles } from './styles';
import { Challenge, ChallengeEnrollment, deleteChallengeWithId, exitChallenge, restartChallenge } from '../../service/challenges';
import { THEME } from '../../theme';
import { ConfirmationModal } from '../ConfirmationModal';
import Toast from 'react-native-root-toast';
import UserContext from '../../context/UserContext';
import ChallengeEnrollContext from '../../context/ChallengeEnrollContext';

interface EditOrRemoveProps {
  challenge: Challenge,
  challengeEnrollment: ChallengeEnrollment
}

export function EditOrDeleteChallenge({ challenge, challengeEnrollment }: EditOrRemoveProps) {
  const [isOptionsOpen, setIsOptionsOpen] = useState<boolean>(false);
  const [isExclusionModalOpen, setIsExclusionModalOpen] = useState<boolean>(false);
  const [isRestartModalOpen, setIsRestartModalOpen] = useState<boolean>(false);
  const [isExitModalOpen, setIsExitModalOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const { userRegistered } = useContext(UserContext);
  const { refresh } = useContext(ChallengeEnrollContext);
  const navigation = useNavigation();

  const deleteChallenge = () => {
    setLoading(true);

    deleteChallengeWithId(challenge.id).then(() => {
      Toast.show("Desafio excluído com sucesso!");

      navigation.navigate("home");
    }).catch(() => {
      Toast.show("Houve um erro ao deletar!");
    }).finally(() => {
      setLoading(false);
    })
  }

  const callExitChallenge = () => {
    setLoading(true);

    exitChallenge(challengeEnrollment.id || "", userRegistered.email).then(async () => {
      Toast.show("Desembarque concluído com sucesso!");

      console.log(refresh)
      if (typeof refresh === "function") {
        await refresh();
      }
      navigation.navigate("home");
    }).catch(() => {
      Toast.show("Erro ao desembarcar, tente novamente!");
    }).finally(() => setLoading(false))
  }

  const callRestartChallenge = () => {
    setLoading(true);

    restartChallenge(challengeEnrollment.id || "").then(() => {
      Toast.show("Desafio reiniciado com sucesso!");
      navigation.navigate("home");
    }).catch(() => {
      Toast.show("Falha ao reiniciar, tente novamente!");
    }).finally(() => setLoading(false))
  }

  const navigateToEdition = () => {
    navigation.navigate("editChallenge");
  }

  const isOwnedByUserAndPrivate = () => {
    return (
      !challenge.isPublic &&
      challenge.creatorId === userRegistered.id
    )
  }

  return (
    <View style={styles.container}>
      <ConfirmationModal
        messages={{
          title: "Vai mesmo excluir?",
          description: "Deseja de fato fazer a exclusão desse desafio?"
        }}
        closeModal={() => setIsExclusionModalOpen(false)}
        isOpen={isExclusionModalOpen}
        executeAction={deleteChallenge}
        loading={loading}
      />

      <ConfirmationModal
        messages={{
          title: "Deseja mesmo desembarcar?",
          description: "Desembarcar irá fazer com que todo o progresso seja perdido."
        }}
        closeModal={() => setIsExitModalOpen(false)}
        isOpen={isExitModalOpen}
        executeAction={callExitChallenge}
        loading={loading}
      />

      <ConfirmationModal
        messages={{
          title: "Deseja mesmo recomeçar?",
          description: "Recomeçar irá fazer com que todo o progresso seja perdido."
        }}
        closeModal={() => setIsRestartModalOpen(false)}
        isOpen={isRestartModalOpen}
        executeAction={callRestartChallenge}
        loading={loading}
      />

      {isOptionsOpen &&
        <View style={styles.optionsCont}>
          {isOwnedByUserAndPrivate() &&
            <>
              <TouchableOpacity onPress={navigateToEdition}>
                <Text style={styles.option}>Editar</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setIsExclusionModalOpen(true)}>
                <Text style={styles.option}>Deletar</Text>
              </TouchableOpacity>
            </>
          }
          <TouchableOpacity onPress={() => setIsRestartModalOpen(true)}>
            <Text style={styles.option}>Recomeçar</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setIsExitModalOpen(true)}>
            <Text style={styles.option}>Desembarcar</Text>
          </TouchableOpacity>
        </View>
      }

      <TouchableOpacity 
        style={styles.selectOptionsButton} 
        onPress={() => setIsOptionsOpen(oldValue => !oldValue)}
      >
        <FontAwesome name="cog" color={THEME.COLORS.WHITE_TEXT} size={18} />
      </TouchableOpacity>
    </View>
  );
}