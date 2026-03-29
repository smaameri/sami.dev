// @ts-check
import {defineConfig} from 'astro/config';
import starlight from '@astrojs/starlight';
import starlightUiTweaks from 'starlight-ui-tweaks'
import starlightBlog from 'starlight-blog'

// https://astro.build/config
export default defineConfig({
  integrations: [
    starlight({
      title: 'Sami M.',
      social: [{icon: 'linux', label: 'Notes', href: 'https://github.com/smaameri'}],
      sidebar: [
        {
          label: 'My notes',
          autogenerate: {directory: 'notes'},
        },
      ],
      customCss: ['./src/styles/custom.css'],
      plugins: [
        starlightUiTweaks({
          navbarLinks: [
            {label: "Notes", href: "/notes"},
            {label: "Blog", href: "/blog"},
          ],
        }),
        starlightBlog()
      ],
    }),
  ],
});
