import { createStore } from 'vuex'
import { Persona } from './Persona/'
import { HostChoice } from './HC/'
import { BalancedDraft } from './BD/'
import { SingleDraft } from './SD/'
import { AllPick } from './AP/'

export default createStore({
  modules: {
    hc: HostChoice,
    bd: BalancedDraft,
    sd: SingleDraft,
    ap: AllPick,
    persona: Persona,
  },
})
