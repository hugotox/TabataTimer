import storage from '@react-native-async-storage/async-storage'
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import { presetsSlice } from 'store/presetsSlice'
import { timerSlice } from 'store/timerSlice'

const rootReducer = combineReducers({
  timer: timerSlice.reducer,
  presets: presetsSlice.reducer,
})

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['currentState', 'currentRep', 'currentSet'],
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: true,
      serializableCheck: false,
    }),
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
