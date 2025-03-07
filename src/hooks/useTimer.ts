import { useSetState } from 'ahooks';

export const useTimer = () => {

    const [state, setState] = useSetState();

    return state;
}