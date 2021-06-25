// eslint-disable-next-line
import { createSelector } from 'reselect';

export const getInventory = state => state.inventory.data;
export const getIsInventoryLoading = state => state.inventory.isLoading;