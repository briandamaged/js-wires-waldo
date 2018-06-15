
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

    getBar: {
      create() {
        return {};
      },

      async wire(bar) {
        bar["foo"] = await this.getFoo();
      }
    },


  });
}





async function run() {
  const appInit = AppInit();

  const knex = await appInit.getFoo();

  console.log(knex);
}




run();
