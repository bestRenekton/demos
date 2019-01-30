//model
export interface DvaModel {
    namespace: any,
    state: any,
    subscriptions: any,
    effects: any,
    reducers: any,
}
export interface Subscriptions {
    // (preState: object, action: ReduxAction): object
    dispatch: any,
    history: any,
}
export interface Effects {
    call: any,
    put: any,
    select: any,
}
//dispatch
export interface Action {
    type: string,
    payload: any,
}
// export interface DvaModelReducers {
//     [reducerName: string]: DvaModelReducer
// }

// export interface DvaModelEffectFn {
//     (action: ReduxAction, sagaEffects: ReduxSagaEffects): any
// }

export interface ReduxSagaTaker {
    type: string,
    [propsName: string]: any
}
// problem
// export interface DvaModelEffectWithTaker extends Array<ReduxSagaTaker | DvaModelEffectFn> {
//     [index: number]: ReduxSagaTaker | DvaModelEffectFn,
// }

// export type DvaModelEffect = DvaModelEffectFn | DvaModelEffectWithTaker

// export interface DvaModelEffects {
//     [effectName: string]: DvaModelEffect
// }

