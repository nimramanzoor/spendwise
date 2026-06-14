export function getFriendlyAuthError(error) {
  const code = error?.code || '';

  if (code.includes('invalid-email')) {
    return 'Please enter a valid email address.';
  }

  if (code.includes('user-not-found') || code.includes('invalid-credential')) {
    return 'We could not find an account with those credentials.';
  }

  if (code.includes('wrong-password')) {
    return 'That password does not look right.';
  }

  if (code.includes('email-already-in-use')) {
    return 'This email is already linked to an account.';
  }

  if (code.includes('weak-password')) {
    return 'Use a stronger password with at least 6 characters.';
  }

  if (code.includes('network-request-failed')) {
    return 'Network request failed. Please check your connection.';
  }

  return error?.message || 'Something went wrong. Please try again.';
}
