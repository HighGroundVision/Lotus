import { createStore } from 'vuex'
import { Persona } from './Persona/'
import { HostChoice } from './HC/'
import { BalancedDraft } from './BD/'
import { SingleDraft } from './SD/'

export default createStore({
  modules: {
    hc: HostChoice,
    bd: BalancedDraft,
    sd: SingleDraft,
    persona: Persona,
  },
})
