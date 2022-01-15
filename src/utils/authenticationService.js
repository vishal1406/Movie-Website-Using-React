class authenticationService {
  registerSuccessfulLogin(userId) {
    console.log("registerSuccessfulLogin");
    sessionStorage.setItem("authenticatedUser", userId);
  }
  logout() {
    sessionStorage.removeItem("authenticatedUser");
  }
  isUserLoggedIn() {
    let user = sessionStorage.getItem("authenticatedUser");
    if (user === null) {
      return false;
    }
    return true;
  }
}
export default new authenticationService();
