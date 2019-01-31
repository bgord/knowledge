# Storybook

**How to setup a basic Storybook for an example component?**

`$ ./npm.sh i -D @storybook/react @storybook/addon-centered @storybook/addon-a11y`

`"frontend:storybook": "start-storybook --ci -p 9000 -c .storybook",`

Create a `.storybook` directory.

Add a `config.js` file inside it.

```
import { configure, addDecorator } from '@storybook/react';
import { checkA11y } from '@storybook/addon-a11y';
import centered from '@storybook/addon-centered';

import '../src/scss/global.scss'; // to append some global styles for all the stories

const requireStory = require.context('../stories', true, /story\.js$/);

addDecorator(checkA11y); // to run axe a11y tests in the Storybook panel
addDecorator(centered); // center all the components in the preview window

function loadStories() {
	requireStory.keys().forEach(filename => requireStory(filename));
}

configure(loadStories, module);
```

Create a `stories` directory.

Add an example `input.story.js` story file.

```
import React from 'react';
import { storiesOf } from '@storybook/react';

import { Input } from '../src/elements/input/Input';

storiesOf('Input', module).add('default', () => (
	<Input value="Ananas" id="product name" />
));
```
