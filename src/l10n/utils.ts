const cache = {};

export const getMessages = (locale: string, scope?: string) => {
  let path = locale;
  if (scope) {
    path = `${scope}/${locale}`;
  }

  if (cache[path]) {
    return cache[path];
  }

  let messages;

  try {
    messages = require(`./${path}.json`);
  } catch (e) {
    if (locale === 'en') {
      throw e;
    }
    messages = getMessages('en', scope);
  }
  cache[path] = messages;
  return messages;
};
