export function setAccessToken(token: string) {
  localStorage.setItem('access_token', token);
}

export function getAccessToken(): string | undefined {
  return localStorage.getItem('access_token') || undefined;
}

export function deleteAccessToken() {
  localStorage.removeItem('access_token');
}
