import { Platform } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import uuid from 'react-native-uuid';
import { storage } from '../service';

interface GetImageProps {
  setImage: React.Dispatch<React.SetStateAction<string>>
  proportion?: [number, number]
}

export const getImage = async (
  setImage: React.Dispatch<React.SetStateAction<string>>, 
  proportion: [number, number] = [1, 1]
) => {
  if (Platform.OS !== 'web') {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
      }
  }

  let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: proportion,
      quality: 0.8,
  });

  if (!result.canceled) {
      setImage(result.assets[0].uri);

      return;
  }
}

export async function uploadImage(fileURI: string, folderName: string) {
  const blob: any = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        console.log(e);
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", fileURI, true);
      xhr.send(null);
  });

  const uuid = generateUUID();

  // GETTING REF FOR STORAGE
  var ref = storage.ref().child(`images/${folderName}/${uuid}`);

  // PUTTING FILE
  const snapshot = await ref.put(blob);

  blob.close();

  // GETTING DOWNLOAD  URL
  const remoteURL = await snapshot.ref.getDownloadURL();

  // RETURNING URL
  return remoteURL;
}

function generateUUID() {
  return uuid.v4();
}