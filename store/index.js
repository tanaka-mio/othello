
export const state = () => ({
  message: ''
})
export const mutations = {
  getapi (state, message) {
    // 取得したメッセージを格納
    this.state.message = message
  }
}
