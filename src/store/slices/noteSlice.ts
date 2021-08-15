import { createEntityAdapter, createSlice, EntityId } from '@reduxjs/toolkit';

import { RootState } from '@Store/store';

interface getNoteByIdFunc {
  (id: EntityId): (state: RootState) => Note | undefined;
}
const notesAdapter = createEntityAdapter<Note>({ selectId: (note) => note.id });
export const notesSlice = createSlice({
  name: 'note',
  initialState: notesAdapter.getInitialState(),
  reducers: {
    setInitNote: notesAdapter.setAll,
    addNewNote: notesAdapter.addOne,
    deleteNote: notesAdapter.removeOne,
    updateNote: notesAdapter.updateOne,
  },
  extraReducers: {},
});
const notesSelectors = notesAdapter.getSelectors<RootState>((state) => state.note);
export const getListNote = notesSelectors.selectAll;
export const getNoteById: getNoteByIdFunc = (id: EntityId) => (state: RootState) =>
  notesSelectors.selectById(state, id);
export const { addNewNote, deleteNote, updateNote, setInitNote } = notesSlice.actions;
export default notesSlice.reducer;
