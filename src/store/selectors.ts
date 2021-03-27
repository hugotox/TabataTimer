import { RootState } from 'store/store'

export const selectInitialCountdown = (state: RootState) =>
  state.initialCountdown
