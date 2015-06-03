import WorkbenchLauncher from '../src/WorkbenchLauncher';
import styles from '../src/Workbench.less';

describe('WorkbenchLauncher', function () {
  let instance;
  let node;

  describe('without contexts', function () {
    beforeEach(function () {
      node = document.createElement('div');
      instance = new WorkbenchLauncher();
      instance.renderTo(node);
    });

    it('has the `root` class', function () {
      expect(node).toHaveDescendant(`.${styles.root}`);
    });
  });
});
