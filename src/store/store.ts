import storage from '@react-native-async-storage/async-storage'
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import { presetsSlice } from 'store/presetsSlice'
import { timerSlice } from 'store/timerSlice'

const timerPersistConfig = {
  key: 'timer',
  storage,
  blacklist: ['currentState'],
}

const rootPersistConfig = {
  key: 'root',
  storage,
  blacklist: ['timer'],
}

const rootReducer = combineReducers({
  timer: persistReducer(timerPersistConfig, timerSlice.reducer),
  presets: presetsSlice.reducer,
})

const persistedReducer = persistReducer(rootPersistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: true,
      serializableCheck: false,
    }),
})

export const persistor = persistStore(store)
// persistor.purge()

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
