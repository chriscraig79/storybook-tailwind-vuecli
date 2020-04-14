import tw from '../../tailwind.config';

function isObject(value) {
  return value && typeof value === 'object' && value.constructor === Object;
}

const colorMapper = (colors) => {
  const twColors = Object.keys(colors);

  return twColors.map((color) => {
    if (isObject(colors[color])) {
      const twColorVariations = Object.keys(colors[color]);
      const variations = twColorVariations.map((variation) => ({
        color: variation,
        bg: `bg-${color}-${variation}`,
        hex: colors[color][variation],
      }));

      return { name: color, variations };
    }
    return {
      name: color,
      variations: [{
        color,
        bg: `bg-${color}`,
        hex: colors[color],
      }],
    };
  });
};

const colors = colorMapper(tw.theme.colors);

const templateDecorator = () => ({
  template: `
<div class="bg-white">
    <div class="container pt-6">
      <story />
    </div>
</div>
    `,
});

export default {
  decorators: [
    templateDecorator,
  ],
  title: 'Brand',
};

export const colorPalette = () => ({
  components: { },
  data: () => ({
    colors,
  }),
  template: `
<div>
  <div v-for="color in colors" class="mb-6">
    <h3 class="capitalize font-semibold mb-2 text-lg text-gray-900">{{ color.name }}</h3>
    <div class="flex flex-wrap">
      <div v-for="variation in color.variations" class="w-1/2 md:w-1/3 flex flex-grow mb-3">
        <div :class="variation.bg" class="border-solid border border-gray-300 rounded p-3 h-12 w-12 mr-4"></div>
        <div class="flex flex-col flex-grow items-start justify-center">
          <div class="capitalize font-semibold text-sm text-gray-700">{{ variation.color }}</div>
          <div class="font-mono text-xs text-pink-400">{{ variation.hex }}</div>
        </div>
      </div>
    </div>
  </div>
</div>
  `,
});