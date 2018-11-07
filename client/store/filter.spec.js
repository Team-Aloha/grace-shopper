import {expect} from 'chai'
import {setVisibilityFilter} from './filter'
import filterReducer from './filter'
import configureMockStore from 'redux-mock-store'
const mockStore = configureMockStore()

describe('Visibility reducer', () => {
  let store
  let mockAxios

  const initialState = {
    visibilityFilter: -1
  }

  beforeEach(() => {
    store = mockStore(initialState)
  })

  afterEach(() => {
    store.clearActions()
  })

  describe('setVisibilityFilter action creator', () => {
    it('should return an action with visibilityFilter', async () => {
      await store.dispatch(setVisibilityFilter(99))
      const actions = store.getActions()
      expect(actions[0].visibilityFilter).to.be.equal(99)
    })
    it('reducer should return default state if given no param', async () => {
      const action = {type: 'WILLNOTMATCH'}
      const state = {visibilityFilter: 1}
      const result = filterReducer(state, action)
      expect(result).to.be.deep.equal({visibilityFilter: 1})
    })
  })
})
