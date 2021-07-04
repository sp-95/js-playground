import type INotification from '@/@types/notification'
import type { RootState } from '@app/store'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface NotificationsState {
  messages: INotification[]
}

const initialState: NotificationsState = {
  messages: [],
}

export const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    addNotification: (state, action: PayloadAction<INotification>) => {
      state.messages = [...state.messages, action.payload]
    },
    removeNotification: (state, action: PayloadAction<string>) => {
      state.messages = state.messages.filter(
        (message) => message.id !== action.payload
      )
    },
  },
})

export const { addNotification, removeNotification } =
  notificationsSlice.actions

export const selectNotifications = (state: RootState): INotification[] =>
  state.notifications.messages

export default notificationsSlice.reducer
