import Editable from './Editable';

export default ({ step, storyMode }) => (
  <div>
    <Editable {...step} elm="h2" selector="title" storyMode={storyMode} />
    <Editable {...step} elm="p" selector="text" storyMode={storyMode} />
  </div>
);
