// uno.config.ts
import {
  defineConfig, presetAttributify, presetIcons,
  presetTypography, presetUno, presetWebFonts,
  transformerDirectives, transformerVariantGroup
} from 'unocss'

export default defineConfig({
  shortcuts: [
    // ...
  ],
  theme: {
    colors: {
      primaryOrange: "#F07900",
      alloyOrange: "#CC6600",
      utOrange: "#FF850A",
      princetonOrange: "#FF9933",

      sandyBrown: "#FFAD5C",

      primaryRed: "#E13F2A",
      engineeringRed: "#C4301C",
      vermillion: "#E34E3B",
      tomato: "#E65E4C",
      bittersweet: "#E86E5E",

      primaryGray: "#747474",
      davyGray: "#525252",
      dimGray: "#666666",
      battleshipGray: "#8F8F8F",

      primaryPlatinum: "#D9D9D9",
      silver: "#A3A3A3",
      silver2: "#B8B8B8",
      silver3: "#CCCCCC",
      AntiFlashWhite: "#EBEBEB",
      zomp: "#43AA8B",
    },
    extend: {
      outline: {
        def: '1px solid #0000ff',
      },
    },
  },
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      extraProperties: {
        "display": "inline-block",
        "vertical-align": "middle",
      },
    }),
    presetTypography(),
    presetWebFonts({
      provider: "google",
      fonts: {
        maven: "Maven Pro",
      },
    }),
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
})