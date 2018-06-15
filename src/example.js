
const {WW} = require('./index');


function AppInit(config) {
  return WW({

    getFoo: {
      create() {
        return {}
      },

      async wire(foo) {
        foo["bar"] = await this.getBar();
      }
    },

    async getBar() {
      const foo = await this.getFoo();
      return {foo};
    }
  });
}





async function run() {
  const appInit = AppInit();

  const knex = await appInit.getFoo();

  console.log(knex);
}




run();
