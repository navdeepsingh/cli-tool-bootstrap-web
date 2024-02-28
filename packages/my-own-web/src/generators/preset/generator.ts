import {
  addDependenciesToPackageJson,
  addProjectConfiguration,
  formatFiles,
  generateFiles,
  Tree,
  updateJson,
} from '@nx/devkit';
import * as path from 'path';
import { PresetGeneratorSchema } from './schema';

export async function presetGenerator(
  tree: Tree,
  options: PresetGeneratorSchema
) {
  const projectRoot = `.`;
  addProjectConfiguration(tree, options.name, {
    root: projectRoot,
    projectType: 'application',
    targets: {},
  });

  updateJson(tree, 'package.json', (json) => {
    json.scripts = json.scripts || {};

    json.scripts.start = 'vite build && vite preview';
    return json;
  });

  generateFiles(tree, path.join(__dirname, 'files'), projectRoot, options);
  await formatFiles(tree);

  return addDependenciesToPackageJson(
    tree,
    {},
    {
      vite: '^5.1.4',
      typescript: '^5.2.2',
    }
  );
}

export default presetGenerator;
