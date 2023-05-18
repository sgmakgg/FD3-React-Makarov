import {EventEmitter} from 'events';

let changeCardPropsEvents=new EventEmitter();
export const isEditing = 'isEditing';
export const wasEdited = 'wasEdited';
// в потоке voteEvents будут все события, связанные с голосованием
// событие "EAnswerClicked" - кликнут вариант ответа, его сэмиттирует VotesAnswer и примет VotesBlock
// событие "EFreeAnswerTextChanged" - изменён текст свободного ответа, его сэмиттирует VotesAnswer и примет VotesBlock
// лучше работать не с текстовыми литералами, а объявить переменные с соответствующими значениями:
// const EAnswerClicked="EAnswerClicked";

export {changeCardPropsEvents};
