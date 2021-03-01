export const getLang = () => {
  return window.localStorage.getItem('lang') || navigator.language
}

export const PR = n => new Intl.PluralRules(getLang()).select(n)

export const numFormat = n => new Intl.NumberFormat(getLang()).format(n)