const util = require('util');

function TestPlugin(options) {
}

// entryOption
// afterPlugins

TestPlugin.prototype.apply = (compiler) => {
  console.log('Running plugin');

  // printStuff(compiler, 'entryOption'); // none
  // printStuff(compiler, 'afterPlugins'); // compiler
  // printStuff(compiler, 'afterResolvers'); // compiler
  // printStuff(compiler, 'environment'); // none
  // printStuff(compiler, 'afterEnvironment'); // none
  // printStuff(compiler, 'beforeRun'); // compiler
  // printStuff(compiler, 'run'); // compiler
  // printStuff(compiler, 'watchRun'); // compiler

  // printStuff(compiler, 'normalModuleFactory'); // normalModuleFactory
  // printStuff(compiler, 'contextModuleFactory'); // contextModuleFactory

  // printStuff(compiler, 'compile'); // compilationParams

  // Don't have access to any chunks yet
  // printStuff(compiler, 'thisCompilation'); // compilation
  // printStuff(compiler, 'compilation'); // compilation
  // printStuff(compiler, 'make'); // compilation

  // I should uncomment afterCompile
  // printStuff(compiler, 'afterCompile'); // compilation
  // printStuff(compiler, 'shouldEmit'); // compilation
  printStuff(compiler, 'emit'); // compilation
  // printStuff(compiler, 'afterEmit'); // compilation

  // printStuff(compiler, 'done'); // stats
  // printStuff(compiler, 'failed'); // error
  // printStuff(compiler, 'invalid'); // fileName, changeTime
  // printStuff(compiler, 'watchClose'); // none

  printSTuff()
};

function printStuff(compiler, hookName) {
  console.log(`Running hook: ${hookName}`);

  compiler.plugin(hookName, (compilation, callback) => {
      console.log(`Actually running hook: ${hookName}`);
      // console.log('compilation: ' + util.inspect(compilation));
      // console.log('compilation dependencies: ' + util.inspect(compilation.fileDependencies));

      if (compilation.chunks) {
        for (let chunk of compilation.chunks) {
          // console.log('chunk id: ' + chunk.id);
          console.log('chunk ids: ' + chunk.ids);
          // console.log(chunk);

          for (let filename of chunk.files) {
            console.log('chunk filename: ' + filename);
          }

          for (let module of chunk.modulesIterable) {
            if (!module.id) {
              continue;
            }

            // console.log(`index: ${module.index}`);
            console.log('  module id: ' + module.id);
            // console.log('  module resource: ' + module.resource);
            // console.log('    module hash: ' + module.hash);
            // console.log('    module rendered hash: ' + module.renderedHash);
            // console.log('    module build hash: ' + module._buildHash);

            if (/\.html$/.test(module.id)) {
              let filename = module.id;
              filename = filename.replace(/^\.\//, '');
              // compilation.assets[filename] = createFile(module._source._value)
            }

            // console.log('module: ' + util.inspect(module));
            // console.log('  chunk module source: ' + module._source._value);
            // console.log('\n\n\n\n\n\n');
            // console.log('\n');

            // if (module.fileDependencies) {
            //   for (let filepath of module.fileDependencies) {
            //     console.log('  file dependency: ' + filepath);
            //   }
            // }

          }

        }
      }

      if (compilation.assets) {
        console.log(util.inspect(compilation.assets));

        for (let asset in compilation.assets) {
          console.log('asset: ' + asset);
          // console.log('asset source: ' + compilation.assets[asset].source());
        }

        // let filelist = 'In this build:\n\n';
        // for (let filename in compilation.assets) {
        //   filelist += ('- ' + filename + '\n');
        // }
        // compilation.assets['filelist.md'] = {
        //   source: () => {
        //     return filelist;
        //   },
        //   size: () => {
        //     return filelist.length;
        //   }
        // };
      }

      console.log(`Done running: ${hookName}`);
      // console.log('');
      // console.log('');
      if (callback && typeof callback === 'function') {
        callback();
      }
    }
  )
}


function createFile(source) {
  return {
    source: () => {
      return source;
    },
    size: () => {
      return source.length;
    }
  };
}

module.exports = TestPlugin;