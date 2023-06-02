import {EventEmitter} from 'events';

export let mcClientEvents = new EventEmitter();
export const isDeleting = 'isDeleting';
export const isEditing = 'isEditing';
export const isSaving = 'isSaving';