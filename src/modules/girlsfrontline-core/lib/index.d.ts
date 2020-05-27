import * as api from './api';
import Doll from './doll';
import Equip from './equip';
import Fairy from './fairy';
declare const dolls: Doll[];
declare const equips: Equip[];
declare const fairies: Fairy[];
declare const gfcore: {
    dolls: Doll[];
    equips: Equip[];
    fairies: Fairy[];
    api: typeof api;
};
export { dolls, equips, fairies, api };
export default gfcore;
