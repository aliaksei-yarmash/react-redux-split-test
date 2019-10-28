export default (state = 0, action) => {
  switch (action.type) {
    case 'INCREMENT_2':
      return state + 1
    case 'DECREMENT_2':
      return state - 1
    default:
      return state
  }
}
