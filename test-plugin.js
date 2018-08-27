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
  printStuff(compiler, 'afterCompile'); // compilation
  // printStuff(compiler, 'shouldEmit'); // compilation
  // printStuff(compiler, 'emit'); // compilation
  // printStuff(compiler, 'afterEmit'); // compilation

  // printStuff(compiler, 'done'); // stats
  // printStuff(compiler, 'failed'); // error
  // printStuff(compiler, 'invalid'); // fileName, changeTime
  // printStuff(compiler, 'watchClose'); // none
};

function printStuff(compiler, hookName) {
  console.log(`Running hook: ${hookName}`);

  compiler.plugin(hookName, (compilation, callback) => {
      console.log(`Actually running hook: ${hookName}`);

      // console.log('compilation: ' + util.inspect(compilation));

      if (compilation.chunks) {
        for (let chunk of compilation.chunks) {
          console.log('chunk id: ' + chunk.id);
          console.log('chunk ids: ' + chunk.ids);
          // console.log(chunk);

          for (let module of chunk.modulesIterable) {
            console.log(`index: ${module.index}`);
            console.log('  chunk module resource: ' + module.resource);
            if (!module.id) {
              continue;
            }

            if(/\.html$/.test(module.id)) {
              compilation.assets[module.id] = createFile(module._source._value)
            }

            // console.log('module: ' + util.inspect(module));
            console.log('  chunk module source: ' + module._source._value);
            // console.log('\n\n\n\n\n\n');
            console.log('\n');

            if (module.fileDependencies) {
              for (let filepath of module.fileDependencies) {
                console.log('  chunk file dependency: ' + filepath);
              }
            }
          }

          for (let filename of chunk.files) {
            console.log('  chunk filename: ' + filename);
          }
        }
      }

      if (compilation.assets) {
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
      console.log('');
      console.log('');
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