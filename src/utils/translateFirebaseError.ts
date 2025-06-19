export function translateFirebaseError(code: string): string {
  const messages: Record<string, string> = {
    'auth/email-already-in-use': 'Este e-mail já está em uso.',
    'auth/invalid-email': 'E-mail inválido.',
    'auth/user-disabled': 'Este usuário foi desativado.',
    'auth/user-not-found': 'Usuário não encontrado.',
    'auth/wrong-password': 'Senha incorreta.',
    'auth/weak-password': 'A senha precisa ter pelo menos 6 caracteres.',
    'auth/missing-email': 'Informe o e-mail.',
    'auth/missing-password': 'Informe a senha.',
    'auth/too-many-requests': 'Muitas tentativas. Tente novamente mais tarde.',
    'auth/operation-not-allowed': 'Essa operação não está habilitada.',
    'auth/invalid-credential':
      'Credenciais inválidas. Verifique seu e-mail e senha.',
  };

  return messages[code] || 'Ocorreu um erro. Tente novamente.';
}
