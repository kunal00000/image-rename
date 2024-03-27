const { FusesPlugin } = require('@electron-forge/plugin-fuses');
const { FuseV1Options, FuseVersion } = require('@electron/fuses');

module.exports = {
  packagerConfig: {
    asar: true,
    name: 'ReTitle',
    icon: './assets/iconFix',
  },
  rebuildConfig: {},
  makers: [
    {
      name: '@electron-forge/maker-dmg',
      config: {
        name: 'ReTitle',
        icon: './assets/iconFix.icns',
        iconSize: 80,
        background: './assets/background.png',
        contents: (opts) => {
          return [
            { x: 340, y: 100, type: 'link', path: '/Applications' },
            { x: 100, y: 100, type: 'file', path: opts.appPath },
            { x: 186, y: 765, type: 'position', path: '.VolumeIcon.icns' },
            { x: 1000, y: 3000, type: 'position', path: '.background' },
          ];
        },
        additionalDMGOptions: {
          window: {
            size: {
              width: 540,
              height: 425,
            },
            position: {
              x: 400,
              y: 500,
            },
          },
        },
      },
    },
    {
      name: '@electron-forge/maker-zip',
      platforms: ['darwin'],
    },
  ],

  plugins: [
    {
      name: '@electron-forge/plugin-auto-unpack-natives',
      config: {},
    },
    // Fuses are used to enable/disable various Electron functionality
    // at package time, before code signing the application
    new FusesPlugin({
      version: FuseVersion.V1,
      [FuseV1Options.RunAsNode]: false,
      [FuseV1Options.EnableCookieEncryption]: true,
      [FuseV1Options.EnableNodeOptionsEnvironmentVariable]: false,
      [FuseV1Options.EnableNodeCliInspectArguments]: false,
      [FuseV1Options.EnableEmbeddedAsarIntegrityValidation]: true,
      [FuseV1Options.OnlyLoadAppFromAsar]: true,
    }),
  ],
};
