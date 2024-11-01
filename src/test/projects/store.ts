import { configureStore } from '@reduxjs/toolkit'
import UI from "@/test/projects/store/UI/UI";

export default configureStore({
    reducer: {
        ui: UI,
    },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
// export type RootState = ReturnType<typeof store.getState>
// // Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
// export type AppDispatch = typeof store.dispatch
