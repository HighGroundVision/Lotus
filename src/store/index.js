import { createStore } from 'vuex'
import { HostChoice } from './HC/'
import { BalancedDraft } from './BD/'
import { SingleDraft } from './SD/'

export default createStore({
  modules: {
    hc: HostChoice,
    bd: BalancedDraft,
    sd: SingleDraft,
  },
})
