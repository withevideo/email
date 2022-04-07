var http = require('https');
var fs = require('fs');
const readline = require('readline');
const prefix = 'freemail_domains ';

const url =
  'https://svn.apache.org/repos/asf/spamassassin/trunk/rules/20_freemail_domains.cf';
const temp = 'temp.txt';
const dest = 'data/freemail.json';

/**
 * @param {string} url
 * @param {string} dest
 * @param {() => void} cb
 */
function download(url, dest, cb) {
  var file = fs.createWriteStream(dest);
  http
    .get(url, function (response) {
      response.pipe(file);
      file.on('finish', function () {
        file.close(cb); // close() is async, call cb after close completes.
      });
    })
    .on('error', function (err) {
      // Handle errors
      fs.unlink(dest); // Delete the file async. (But we don't check the result)
      if (cb) cb(err.message);
    });
}

/**
 * @param {string} source
 * @param {(line: string) => Promise<void>} cb
 */
async function processLineByLine(source, cb) {
  const fileStream = fs.createReadStream(source);

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  for await (const line of rl) {
    await cb(line);
  }
}

console.log('Downloading...');
download(url, temp, async function () {
  try {
    console.log('Downloaded freemail list to ' + dest);

    console.log('Creating or clearing destination file...');
    fs.rmSync(dest, {force: true});
    fs.closeSync(fs.openSync(dest, 'w'));
    console.log('Destination file created or cleared at ' + dest);

    console.log('Writing to destination file...');

    /** @type {{[key: string]: Set<string>}} */
    const setByFirstChar = {};
    await processLineByLine(temp, function (line) {
      if (!line.startsWith(prefix)) return;
      const domains = line.slice(prefix.length).trim().split(' ');
      domains.forEach((d) => {
        if (!d) return;
        const firstChar = d[0];
        if (!setByFirstChar[firstChar]) {
          setByFirstChar[firstChar] = new Set();
        }
        setByFirstChar[firstChar].add(d);
      });
    });

    const writer = fs.createWriteStream(dest, {flags: 'a'});
    writer.write('{\n');

    let index = 0;

    const entries = Object.entries(setByFirstChar);
    entries.sort();
    for (let i = 0; i < entries.length; i++) {
      const [firstChar, set] = entries[i];

      writer.write(`  "${firstChar}": [\n`);

      let setIndex = 0;
      for (const key of set.keys()) {
        let regexKey = key.replace(/\./g, '\\\\.');
        regexKey = regexKey.replace(/\*/g, '[^.]+');
        regexKey = '^' + regexKey + '$';
        writer.write(
          `    "${regexKey}"${setIndex === set.size - 1 ? '' : ','}\n`,
        );
        setIndex++;
      }

      writer.write(`  ]${index === entries.length - 1 ? '' : ','}\n`);
      index++;
    }

    writer.write('}');
    writer.end();
    console.log('Destination file written at ' + dest);
  } catch (error) {
    console.error('ERROR:', error);
  }

  console.log('Cleaning up temp file...');
  fs.rmSync(temp);
  console.log("Temp file cleaned up, you're good to go!");
});
