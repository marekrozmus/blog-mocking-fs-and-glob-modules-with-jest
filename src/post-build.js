const fs = require('fs');
const glob = require('glob');

function main({ verbose } = { verbose: false }) {
  try {
    const htmlFiles = glob.globSync('./website/**/*.html');

    for (let i = 0; i < htmlFiles.length; i++) {
      const file = htmlFiles[i];

      const data = fs.readFileSync(file, { encoding: 'utf8' });

      const foundItems = [
        ...data.matchAll(
          /\[post_build_start\](\S*\w*)\[post_build_end\]/g,
        ),
      ];

      if (foundItems.length !== 0) {
        const results = Array.from(foundItems);

        verbose && console.log(`\nProcessing file: ${file}`);

        let newFileData = data;

        for (let i = 0; i < results.length; i++) {
          const [decoratedItem, item] = results[i];
          const newItem = 'THIS IS NEW VALUE';

          if (item !== newItem) {
            verbose && console.log(` - Replacing: ${item} => ${newItem}`);
            newFileData = newFileData.replace(decoratedItem, newItem);
          }
        }

        verbose && console.log(' Writing file...');
        fs.writeFileSync(htmlFiles[i], newFileData, 'utf8');
        verbose && console.log('DONE\n');
      }
    }
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

// to run only if specific param ('run') is added to package.json script
if (process.argv.includes('run')) {
  main({ verbose: true });
}

module.exports = { main };
