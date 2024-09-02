import { atom } from 'recoil'


export const totalUsageAtom = atom<number>({
    key: 'TotalUsageAtom',
    default: 0
});
// Need to make totalUsage as recoil-atom so as to make sure that as soon as the user reaches
// his/her word limit. Need to stop our service.