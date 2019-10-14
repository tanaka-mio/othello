
export const state = () => ({
  message: ''
})
export const mutations = {
  getMessage (state, message) {
    // 取得したメッセージを格納
    this.state.message = message
  }
}
