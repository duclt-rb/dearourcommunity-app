import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { computed } from '@angular/core';

interface CounterState {
  count: number;
}

const initialState: CounterState = {
  count: 0,
};

export const CounterStore = signalStore(
  withState(initialState),
  withComputed(({ count }) => ({
    doubleCount: computed(() => count() * 2),
  })),
  withMethods(({ count, ...store }) => ({
    increment() {
      patchState(store, { count: count() + 1 });
    },
    decrement() {
      patchState(store, { count: count() - 1 });
    },
    reset() {
      patchState(store, initialState);
    },
  })),
);

export type CounterStore = InstanceType<typeof CounterStore>;
