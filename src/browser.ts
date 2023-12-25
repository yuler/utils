/**
 * Retrieves the value of a cookie by its name.
 * @param name - The name of the cookie.
 * @returns The value of the cookie, or undefined if the cookie does not exist.
 * @example
 * // Assuming a cookie named "username" with value "JohnDoe" exists
 * const username = getCookie("username");
 * console.log(username); // Output: "JohnDoe"
 */
export function getCookie(name: string) {
  const cookies = document.cookie ? document.cookie.split('; ') : []
  const prefix = `${encodeURIComponent(name)}=`
  const cookie = cookies.find(cookie => cookie.startsWith(prefix))

  if (cookie) {
    const value = cookie.split('=').slice(1).join('=')

    if (value) {
      return decodeURIComponent(value)
    }
  }

  return
}
