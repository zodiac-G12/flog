import i18next from 'i18next';

await i18next.init({
  lng: 'ja',
  debug: true,
  resources: {
    ja: {
      translation: {
        serviceName: 'FLOG',
        title: '"ぞでぃあっく" の技術ブログ',
      },
    },
  },
});

export const i18n = i18next;
