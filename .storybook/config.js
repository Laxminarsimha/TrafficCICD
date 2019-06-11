import { addDecorator, configure } from '@storybook/angular';
import { withOptions } from '@storybook/addon-options';

addDecorator(withOptions({ name: 'Common Components', showSearchBox: false }));

import { setConsoleOptions } from '@storybook/addon-console';
const panelExclude = setConsoleOptions({}).panelExclude;


//  Import all stories from the parent project, these will be stories that
//  are not specific to the components in the library and form any project
//  intro documentation, and will appear first in the menu
const introContext = require.context('../src/app', true, /\.stories\.[t|j]s$/);

//  Import all stories from the component library, this includes all
//  files ending in *.stories.ts from subdirectories inside src/app
const libraryContext = require.context(
    '../projects/common-component-lib/src/lib',
    true,
    /\.stories\.[t|j]s$/
);

//  Function to load each context
function loadContext(context) {
    const stories = [];
    let indexStory = null;

    //  Load files from the library context
    context.keys().forEach(filename => {
        if (/index\.stories\.ts/.test(filename)) {
            indexStory = filename;
        } else {
            stories.push(filename);
        }
    });

    stories.sort();

    if (indexStory) {
        stories.unshift(indexStory);
    }

    stories.forEach(filename => context(filename));
}

//  Function to load all contexts
function loadStories() {
    loadContext(introContext);
    loadContext(libraryContext);
}

configure(loadStories, module);
