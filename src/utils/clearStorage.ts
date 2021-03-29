import storage from '@react-native-async-storage/async-storage'

// for dev only
export const clearStorage = () => {
  return storage.clear()
}
