import { it, expect } from '@jest/globals';
import {
  TUserResponse
} from '../../utils/burger-api';
import {
    getUser,
    checkUserAuth,
    loginUser,
    logoutUser,
    updateUser,
    registerUser,
    userAuthSlice,
    IUserAuth,
    initialState
} from './userAuthSlice';

describe('тест userAuthSlice', () => {
    beforeAll(() => {// устанавливаю глобальный объект localStorage с помощью мок-функций
        // создаю методы для теста
        global.localStorage = {
            setItem: jest.fn(),
            getItem: jest.fn(),
            removeItem: jest.fn(),
            clear: jest.fn(),
            key: jest.fn(),
            length: 0
        };
    });
    // мокаю куки и их значение для теста
    jest.mock('../../utils/cookie', () => ({
        setCookie: jest.fn(),
        getCookie: jest.fn(),
        deleteCookie: jest.fn(),
    }));
    // очищаю моки
    afterAll(() => {
        jest.clearAllMocks();
    });


    // создаю ложные данные пользователя для тестов
    const mockUserResponse: TUserResponse = {
        success: true,
        user: {
          email: 'david@yandex.ru',
          name: 'David'
        }
    };
    // Регистрация
    it('тест userRegister.rejected', () => {
        const action = {
            type: registerUser.rejected.type
          };
          const stateTest = userAuthSlice.reducer(initialState, action);
          const stateCheck: IUserAuth = { ...initialState, error: 'ошибка регистрации' };
          expect(stateTest).toEqual(stateCheck);
    });
    it('тест userRegister.pending', () => {
        const action = {
            type: registerUser.pending.type
          };
          const stateTest = userAuthSlice.reducer(initialState, action);
          const stateCheck: IUserAuth = { ...initialState, isLoading: true };
          expect(stateTest).toEqual(stateCheck);
    });
    it('тест userRegister.fulfilled', () => {
        const action = {
            type: registerUser.fulfilled.type,
            payload: mockUserResponse
          };
          const stateTest = userAuthSlice.reducer(initialState, action);
          const stateCheck: IUserAuth = { ...initialState, userData: mockUserResponse.user };
          expect(stateTest).toEqual(stateCheck);
    });
    // getUser
    it('тест getUser.rejected', () => {
        const action = {
            type: getUser.rejected.type
        };
        const stateTest = userAuthSlice.reducer(initialState, action);
        const stateCheck: IUserAuth = { ...initialState, error: 'ошибка загрузки пользователя' };
        expect(stateTest).toEqual(stateCheck);
    });
    it('тест getUser.pending', () => {
        const action = {
            type: getUser.pending.type
        };
        const stateTest = userAuthSlice.reducer(initialState, action);
        const stateCheck: IUserAuth = { ...initialState, isLoading: true };
        expect(stateTest).toEqual(stateCheck);
    });
    it('тест getUser.fulfilled', () => {
        const action = {
            type: getUser.fulfilled.type,
            payload: mockUserResponse
        };
        const stateTest = userAuthSlice.reducer(initialState, action);
        const stateCheck: IUserAuth = { ...initialState, userData: mockUserResponse.user, isAuthChecked: true };
        expect(stateTest).toEqual(stateCheck);
    });
    // Логин
    it('тест loginUser.rejected', () => {
        const action = {
            type: loginUser.rejected.type
          };
          const stateTest = userAuthSlice.reducer(initialState, action);
          const stateCheck: IUserAuth = { ...initialState, error: 'ошибка входа' };
          expect(stateTest).toEqual(stateCheck);
    });
    it('тест loginUser.pending', () => {
        const action = {
            type: loginUser.pending.type
          };
          const stateTest = userAuthSlice.reducer(initialState, action);
          const stateCheck: IUserAuth = { ...initialState, isLoading: true };
          expect(stateTest).toEqual(stateCheck);
    });
    it('тест loginUser.fulfilled', () => {
        const action = {
            type: loginUser.fulfilled.type,
            payload: mockUserResponse.user
          };
          const stateTest = userAuthSlice.reducer(initialState, action);
          const stateCheck: IUserAuth = { ...initialState, userData: mockUserResponse.user, isAuthChecked: true };
          expect(stateTest).toEqual(stateCheck);
    });
// Логаут
    it('тест logoutUser.rejected', () => {
        const action = {
            type: logoutUser.rejected.type
        };
        const stateTest = userAuthSlice.reducer(initialState, action);
        const stateCheck: IUserAuth = { ...initialState, error: 'ошибка входа', isAuthChecked: true };
        expect(stateTest).toEqual(stateCheck);
    });
    it('тест logoutUser.pending', () => {
        const action = {
            type: logoutUser.pending.type
        };
        const stateTest = userAuthSlice.reducer(initialState, action);
        const stateCheck: IUserAuth = { ...initialState, isLoading: true };
        expect(stateTest).toEqual(stateCheck);
    });
    it('тест logoutUser.fulfilled', () => {
        const action = {
            type: logoutUser.fulfilled.type,
        };
        const stateTest = userAuthSlice.reducer(initialState, action);
        const stateCheck: IUserAuth = initialState;
        expect(stateTest).toEqual(stateCheck);
    });
// обновление данных
    it('тест updateUser.rejected', () => {
        const action = {
            type: updateUser.rejected.type
        };
        const stateTest = userAuthSlice.reducer(initialState, action);
        const stateCheck: IUserAuth = { ...initialState, error: 'ошибка обновления пользователя' };
        expect(stateTest).toEqual(stateCheck);
    });
    it('тест updateUser.pending', () => {
        const action = {
            type: updateUser.pending.type
        };
        const stateTest = userAuthSlice.reducer(initialState, action);
        const stateCheck: IUserAuth = { ...initialState, isLoading: true };
        expect(stateTest).toEqual(stateCheck);
    });
    it('тест updateUser.fulfilled', () => {
        const action = {
            type: updateUser.fulfilled.type,
            payload: mockUserResponse
        };
        const stateTest = userAuthSlice.reducer(initialState, action);
        const stateCheck: IUserAuth = { ...initialState, userData: mockUserResponse.user };
        expect(stateTest).toEqual(stateCheck);
    });
// Проверка данных пользователя
    it('тест checkUserAuth.rejected', () => {
        const action = {
            type: checkUserAuth.rejected.type
        };
        const stateTest = userAuthSlice.reducer(initialState, action);
        const stateCheck: IUserAuth = { ...initialState, error: 'пользователь не зарегистрирован', isAuthChecked: false };
        expect(stateTest).toEqual(stateCheck);
    });
    it('тест checkUserAuth.pending', () => {
        const action = {
            type: checkUserAuth.pending.type
        };
        const stateTest = userAuthSlice.reducer(initialState, action);
        const stateCheck: IUserAuth = { ...initialState, isLoading: true };
        expect(stateTest).toEqual(stateCheck);
    });
    it('тест checkUserAuth.fulfilled', () => {
        const action = {
            type: checkUserAuth.fulfilled.type,
            payload: mockUserResponse
        };
        const stateTest = userAuthSlice.reducer(initialState, action);
        const stateCheck: IUserAuth = { ...initialState, isAuthChecked: true };
        expect(stateTest).toEqual(stateCheck);
    });
});