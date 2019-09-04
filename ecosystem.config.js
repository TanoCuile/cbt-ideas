module.exports = {
  apps: {
    wait_ready: true,
    name: 'cbt-tmp-ideas',
    script: './node_modules/.bin/ts-node',
    args: '-r tsconfig-paths/register src/main.ts',
    watch: true,
  },
};
