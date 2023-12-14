/**
 * Defines a type-parameterized update function which is expected to check whether the incoming
 * user interaction (state) requires an update to the pending-resolution-state (refs).
 * @param refs A collection of React reference objects used to track real-time updates to the
 * resolution state in between firings of the resolver.
 * @param state A collection of values received from whatever caller wishes to trigger an update.
 * @returns True if the operation resulted in a change to ref value that requires scheduling
 * a resolution, else false. If the function returns true, the rate-limited function framework
 * will schedule a resolution operation if required.
 */
export type DebounceThrottleUpdater<T, TRefs> = (refs: TRefs, state: T) => boolean;
/**
 * Defines a type-parameterized state resolution function which maps the pending state (refs)
 * to the external system state (e.g. a reducer) using the needed props.
 *
 * This function is expected to set the refs (pending-resolution-state) to a neutral state, but
 * does not need to do any tracking of whether a resolution actually is pending--that's handled
 * by the framework.
 * @param refs A collection of React reference objects which track the pending-resolution state.
 * @param props An implementation-dependent set of values and functions which allow the resolver
 * to affect some external state at resolution time.
 */
export type DebounceThrottleResolver<TRefs, ResolverProps> = (refs: TRefs, props: ResolverProps) => void;
/**
 * Hook sets up the infrastructure for a throttled rate-limited function. A throttler schedules resolution
 * so that it occurs once every `timeMs` ms, as long as there is input which hasn't been resolved.
 *
 * @param updateFn The function to call on new input from the data stream.
 * @param resolveFn The function which resolves any pending changes.
 * @param refs The set of refs which track state-pending-resolution between resolutions.
 * @param resolverProps Any additional data or functions needed for the resolver to operate.
 * @param timeMs The delay between first input and resolution. The resolve function will not fire more
 * frequently than this.
 * @returns A callback mapping an instance of state T (the user input) to void.
 */
export declare const useThrottler: <T, TRefs, ResolverProps>(updateFn: DebounceThrottleUpdater<T, TRefs>, resolveFn: DebounceThrottleResolver<TRefs, ResolverProps>, refs: TRefs, resolverProps: ResolverProps, timeMs?: number) => {
    throttler: (state: T) => void;
    cancelThrottled: () => void;
};
/**
 * Hook sets up the infrastructure for a debounced rate-limited function. A debouncer schedules resolution
 * so that it does not occur until `timeMs` seconds have passed since the last unresolved input. Any new
 * input before resolution will reset the timer.
 *
 * @param updateFn The function to call on new input from the data stream.
 * @param resolveFn The function which resolves any pending changes.
 * @param refs The set of refs which track state-pending-resolution between resolutions.
 * @param resolverProps Any additional data or functions needed for the resolver to operate.
 * @param timeMs The delay between last input and resolution. The resolve function will not execute until
 * this many seconds have passed since the last input was received.
 * @returns A callback mapping an instance of state T (the user input) to void.
 */
export declare const useDebouncer: <T, TRefs, ResolverProps>(updateFn: DebounceThrottleUpdater<T, TRefs>, resolveFn: DebounceThrottleResolver<TRefs, ResolverProps>, refs: TRefs, resolverProps: ResolverProps, timeMs?: number) => {
    debouncer: (state: T) => void;
    cancelDebouncer: () => void;
};
