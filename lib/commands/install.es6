var child = require('child_process');
var spawnSync = child.spawnSync;
var join = require('path').join;

module.exports = function(cli) {
  var args = cli.args.slice(1);
  var installer = args[0];
  var plugin = args[1];

  var installerMap = new Map([
    ['ember', [join(cli.cwd, 'node_modules', '.bin', 'ember'), 'install', plugin]],
    ['sails', ['npm', 'install', '--save', plugin]]
  ]);

  var dirMap = new Map([
    ['ember', cli.feDir],
    ['sails', cli.apiDir]
  ]);

  var command = installerMap.get(installer);
  var currDir = dirMap.get(installer);

  cli.debug(command[0], ...command.slice(1), currDir);
  cli.ui(`Installing ${plugin.white()} into ${currDir.white()}...`);

  spawnSync(command[0], command.slice(1), {cwd: currDir});
  cli.ui('Installation complete!');
};
