import coloredString from './utils/coloredString';
import * as yargs from 'yargs';
export async function cli() {

  const args = yargs
    .option('start', {
      type: 'boolean',
      default: false
    })
    .option('build', {
      type: 'boolean',
      default: false
    })
    .option('dist', {
      type: 'boolean',
      default: false
    })
    .option('env', {
      type: 'string'
    })
    .help()
    .alias('help', 'h')
    .argv;


  process.env.NODE_ENV = args.env || (args.build ? 'PRODUCTION' : 'DEVELOPMENT');

  console.log(coloredString(`  Running in ${process.env.NODE_ENV} mode`));
  if (args.start) {
    const start = await import('./actions/start');
    start.start();
  }
  if (args.build) {
    const build = await import('./actions/build');
    build.build();
  }
  if (args.dist) {
    const dist = await import('./actions/dist');
    dist.dist();
  }

}