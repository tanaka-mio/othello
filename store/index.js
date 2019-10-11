export const state = () => ({
  message: ''
})
export const mutations = {
  getapi (state) {
    state.message = 'GETできたよ'
  }
}
