import { defineStore } from 'pinia';
import {UserInfosState} from "@/types/pinia";

/**
 * @function useUserInfo
 * @returns {UserInfosStore}
 */
export const useUserInfo = defineStore('userInfo', {
    state: (): UserInfosState<any> => ({
        userInfos: {
            userName: '',
            photo: '',
            time: 0,
            roles: [],
            authBtnList: [],
        },
    }),

    actions: {

    },
});
